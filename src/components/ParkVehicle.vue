<template>
  <el-dialog
    v-model="open"
    width="30%"
    top="30vh"
    title="Park Vehicle">
    <el-form
      ref="parkForm"
      :rules="rules"
      :model="parkForm">
      <el-form-item label="V.I.N" prop="vin">
        <el-input v-model.trim="parkForm.vin"></el-input>
      </el-form-item>
      <el-form-item label="Type" prop="type">
        <el-select
          v-model="parkForm.type"
          placeholder="Type">
          <el-option label="Small" value="small"></el-option>
          <el-option label="Medium" value="medium"></el-option>
          <el-option label="Large" value="large"></el-option>
        </el-select>
      </el-form-item>
      <div class="dialog__footer">
        <el-button type="primary" @click="submitForm">
          Create
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'ParkVehicle',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'submitted'
  ],
  data() {
    return {
      parkForm: {
        vin: '',
        type: ''
      },
      rules: {
        vin: [
          {
            type: 'string',
            required: true,
            message: 'Please enter VIN.',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'string',
            required: true,
            message: 'Please select the type',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.parkForm.validate((valid) => {
        if (!valid) {
          return false
          
        }

        this.$emit('submitted', {
          vin: this.parkForm.vin,
          type: this.parkForm.type
        })
      })
    }
  }
}
</script>
