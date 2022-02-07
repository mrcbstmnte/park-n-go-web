<template>
  <div>
    <h1>Parking Lots</h1>

    <el-row>
      <el-button
        color="#45d3d3"
        :style="{
          color: 'white'
        }"
        @click="toggleAddLotDialog">
        <el-icon class="el-icon--left"><Plus /></el-icon> Lot
      </el-button>
    </el-row>
    
    <el-table :data="lots" style="width: 100%">
      <el-table-column label="Name">
        <template #default="scope">
          <router-link :to="`/${scope.row.id}`">
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <AddLot
    :open="addSlotDialogVisible"
    @submitted="handleAddLot"
    @close="addSlotDialogVisible = false" />
</template>

<script>
import {
  Plus
} from '@element-plus/icons-vue'
import { api } from '@/service/api'

import AddLot from '@/components/AddLot.vue'

export default {
  components: {
    Plus,

    AddLot
  },
  data() {
    return {
      addSlotDialogVisible: false,

      lots: []
    }
  },
  async created() {
    this.lots = await api.lots.list()
  },
  methods: {
    toggleAddLotDialog() {
      this.addSlotDialogVisible = !this.addSlotDialogVisible
    },
    async handleAddLot(data) {
      const createdLot = await api.lots.create(data.name, data.entryPoints)

      this.lots.push(createdLot)
      this.addSlotDialogVisible = false
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>