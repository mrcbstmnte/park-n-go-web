<template>
  <div class="lot__container">
    <el-row justify="start" class="nav__container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          Parking Lots
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{ lotId }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>

    <loader :isLoading="isLoading">
      <template #content>
        <el-row justify="space-between">
          <div>
            <el-button
              color="#45d3d3"
              :style="buttonStyle"
              @click="toggleAddSlotDialog">
              <el-icon class="el-icon--left"><Plus /></el-icon> Slot
            </el-button>
            <el-button
              color="#ea5353"
              :style="buttonStyle"
              @click="toggleEntryPointDialog">
              <el-icon class="el-icon--left"><Plus /></el-icon> Entry Point
            </el-button>
          </div>
          <el-dropdown
            trigger="click"
            placement="bottom-start"
            @command="toggleParkDialog">
            <el-button type="primary">
              Park Vehicle <el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="entry in entryPoints"
                  :key="entry.id"
                  :command="entry.id">{{ entry.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-row>

        <el-divider content-position="center"><strong>Parking slots</strong></el-divider>

        <el-row :gutter="20">
          <el-col
            v-for="slot in slots"
            :key="slot.id"
            :span="3">
            <Slot
              :id="slot.id"
              :occupied="slot.occupied"
              :type="slot.type"
              :label="slot.label"
              @clicked="handleSlotClick" />
          </el-col>
        </el-row>
      </template>
    </loader>

    <AddSlot
      :open="addSlotDialogVisible"
      :entry-points="entryPoints"
      @submitted="handlerSlotAdd"
      @close="addSlotDialogVisible = false" />

    <AddEntryPoint
      :open="entryPointDialogVisible"
      @submitted="handleEntryPointAdd"
      @close="entryPointDialogVisible = false" />

    <ParkVehicle
      :open="parkVehicleDialogVisible"
      @submitted="handleVehiclePark"
      @close="parkVehicleDialogVisible = false" />

    <SlotDetails 
      :open="slotDialogVisible"
      :selected="selectedSlot"
      :is-loading="isFetchingSlot"
      @settle="handleInvoiceSettle"
      @close="slotDialogVisible = false"/>

    <PaymentSuccess
      :open="paymentSuccessVisible"
      :amount="amountSettled"
      @payment:close="paymentSuccessVisible = false"
      @close="paymentSuccessVisible = false" />
  </div>
</template>

<script>
import {
  ArrowLeft,
  ArrowDown,
  Plus
} from '@element-plus/icons-vue'

import { api } from '@/service/api'

import Slot from '@/components/Slot.vue'
import AddEntryPoint from '@/components/AddEntryPoint.vue'
import AddSlot from '@/components/AddSlot.vue'
import ParkVehicle from '@/components/ParkVehicle.vue'
import SlotDetails from '@/components/SlotDetails.vue'
import PaymentSuccess from '@/components/PaymentSuccess.vue'
import Loader from '@/components/Loader.vue'

import { showError } from '@/helpers'

export default {
  components: {
    ArrowDown,
    ArrowLeft,
    Plus,

    AddSlot,
    Slot,
    SlotDetails,
    AddEntryPoint,
    ParkVehicle,
    PaymentSuccess,
    Loader
  },
  data () {
    return {
      isLoading: false,
      isFetchingSlot: false,

      addSlotDialogVisible: false,
      entryPointDialogVisible: false,
      parkVehicleDialogVisible: false,
      slotDialogVisible: false,
      paymentSuccessVisible: false,

      lotId: null,
      selectedEntryPointId: null,
      selectedSlot: null,
      amountSettled: 0,

      slots: [],
      entryPoints: [],

      buttonStyle: {
        color: 'white'
      }
    }
  },
  methods: {
    async initData() {
      this.lotId = this.$route.params.id
      this.isLoading = true

      this.entryPoints = await api.entryPoints.list(this.lotId)
      this.slots = await api.slots.list(this.lotId)

      this.isLoading = false
    },
    
    toggleEntryPointDialog() {
      this.entryPointDialogVisible = !this.entryPointDialogVisible
    },
    toggleParkDialog(entryPointId) {
      this.selectedEntryPointId = entryPointId 
      this.parkVehicleDialogVisible = !this.parkVehicleDialogVisible
    },
    toggleSlotDialog() {
      this.slotDialogVisible = !this.slotDialogVisible
    },
    toggleAddSlotDialog() {
      this.addSlotDialogVisible = !this.addSlotDialogVisible
    },

    async handleEntryPointAdd(data) {
      try {
        const name = data.name
        const addedEntryPoint = await api.entryPoints.create(this.lotId, name)

        this.entryPoints.push(addedEntryPoint)
        this.entryPointDialogVisible = false
      } catch (error) {
        showError(error)
      }
    },
    async handleVehiclePark(data) {
      try {
        const { slotId } = await api.invoices.create(this.selectedEntryPointId, {
          vin: data.vin,
          type: data.type
        })

        this.updateOccupancy(slotId, true)

        this.parkVehicleDialogVisible = false
      } catch (error) {
        showError(error)
      }
    },
    async handleSlotClick(slotId) {
      try {
        this.isFetchingSlot = true

        this.toggleSlotDialog()
        
        this.selectedSlot = await api.slots.get(slotId)

        this.isFetchingSlot = false
        this.selectedSlotId = slotId
      } catch (error) {
        showError(error)
      }
    },
    async handlerSlotAdd(data) {
      try {
        const addedSlot = await api.slots.create(this.lotId, [
          data
        ])

        this.slots.push(addedSlot)
        this.addSlotDialogVisible = false
      } catch (error) {
        showError(error)
      }
    },
    async handleInvoiceSettle(data) {
      try {
        const settledInvoice = await api.invoices.settle(data.invoiceId, data.endDate)

        this.amountSettled = settledInvoice.amount
        this.slotDialogVisible = false
        this.paymentSuccessVisible = true
        
        this.updateOccupancy(settledInvoice.slotId, false)
      } catch (error) {
        showError(error)
      }
    },

    updateOccupancy(slotId, occupied) {
      const modifiedSlot = this.slots.find((slot) => slot.id === slotId)
      modifiedSlot.occupied = occupied
    }
  },
  async created() {
    await this.initData()
  }
}
</script>

<style scoped>
.nav__container {
  margin-bottom: 20px;
}
</style>
