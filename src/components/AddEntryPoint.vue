<template>
  <el-dialog
    v-model="open"
    width="30%"
    top="30vh"
    title="Add Entry Point">
    <el-form
      ref="entryPointForm"
      :rules="rules"
      :model="entryPointForm">
      <el-form-item label="Name" prop="name">
        <el-input v-model.trim="entryPointForm.name"></el-input>
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
  name: 'AddEntryPoint',
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
      entryPointForm: {
        name: ''
      },
      rules: {
        name: [
          {
            type: 'string',
            required: true,
            message: 'Please enter entry point name',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.entryPointForm.validate((valid) => {
        if (!valid) {
          return false
          
        }

        this.$emit('submitted', {
          name: this.entryPointForm.name
        })
      })
    }
  }
}
</script>