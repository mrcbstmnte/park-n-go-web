<template>
  <el-dialog
    v-model="open"
    width="30%"
    top="30vh"
    title="Add Lot">
    <el-form
      ref="addLotForm"
      :rules="rules"
      :model="addLotForm">
      <el-form-item
        :label-width="100"
        label="Name"
        prop="name">
        <el-input v-model="addLotForm.name"></el-input>
      </el-form-item>
      <el-form-item
        label="Entry points"
        :label-width="100"
        prop="entryPoints">
        <el-input-number
          v-model.number="addLotForm.entryPoints"
          :min="3"
        ></el-input-number>
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
  name: 'AddLot',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submitted'],
  data() {
    return {
      addLotForm: {
        name: '',
        entryPoints: 0
      },
      rules: {
        name: [
          {
            type: 'string',
            required: true,
            message: 'Please enter lot name',
            trigger: 'change'
          }
        ],
        entryPoints: [
          {
            type: 'number',
            required: true,
            message: 'Please enter number of entry points',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.addLotForm.validate((valid) => {
        if (!valid) {
          return false
          
        }

        this.$emit('submitted', {
          name: this.addLotForm.name,
          entryPoints: this.addLotForm.entryPoints
        })
      })
    }
  }
}
</script>