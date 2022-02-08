<template>
  <el-dialog
    v-model="open"
    width="30%"
    top="30vh"
    title="Slot Information">
    <el-skeleton :loading="isLoading">
      <template #template>
        <el-skeleton :rows="5" animated />
      </template>
      <template #default>
        <div>
          <el-descriptions
            title="Summary"
            direction="vertical"
            :column="2"
            border>
            <el-descriptions-item label="Label">{{ selected.label }}</el-descriptions-item>
            <el-descriptions-item label="">
              <el-tag
                effect="dark"
                class="mx-1"
                :type="isOccupied ? 'danger' : 'success'">
                {{ isOccupied ? 'Occupied' : 'Vacant' }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Type">
              <el-tag
                effect="dark"
                class="mx-1"
                :type="tagType">
                {{ selected.type }}
              </el-tag>
            </el-descriptions-item>
            
            <el-descriptions-item v-if="selected.vehicle" label="VIN">{{ selected.vehicle.vin }}</el-descriptions-item>

            <el-descriptions-item v-if="selected.vehicle" label="VIN">{{ selected.vehicle.vin }}</el-descriptions-item>
            <el-descriptions-item v-if="selected.invoice" label="Hourly Rate">PHP {{ selected.invoice.rate }}</el-descriptions-item>

            <el-descriptions-item v-if="selected.invoice" label="Started">{{ formattedDate(selected.invoice.started) }}</el-descriptions-item>
          </el-descriptions>
        </div>

        <el-row
          v-if="selected.invoice"
          justify="space-between">
          <el-date-picker
            v-model="endDate"
            type="datetime"
            placeholder="Set end date (optional)"
            value-format="x">
          </el-date-picker>
          <el-button type="success" @click="settle">
            Settle
          </el-button>
        </el-row>
      </template>
    </el-skeleton>
  </el-dialog>
</template>

<script>
import moment from 'moment-timezone'

export default {
  name: 'SlotDetails',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    selected: {
      type: [Object, null],
      required: true
    }
  },
  emits: [
    'settle'
  ],
  data() {
    return {
      endDate: undefined
    }
  },
  computed: {
    isOccupied() {
      return this.selected.occupied
    },
    tagType() {
      if (this.selected.type === 'small') {
        return ''
      } else if (this.selected.type === 'medium') {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  },
  methods: {
    settle() {
      this.$emit('settle', {
        endDate: this.endDate,
        invoiceId: this.selected.invoice.id
      })
    },
    formattedDate(date) {
      return moment.tz(date, 'Asia/Singapore').format('MMMM DD YYYY, h:mm:ss a')
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-top: 20px;
}
</style>