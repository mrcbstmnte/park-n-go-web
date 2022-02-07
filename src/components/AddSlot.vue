<template>
  <el-dialog
    v-model="open"
    width="30%"
    top="30vh"
    title="Add Entry Point">
    <el-form
      ref="slotForm"
      :rules="rules"
      :model="slotForm">
      <el-form-item
        :label-width="82"
        label="Type"
        prop="type">
        <el-select
          v-model="slotForm.type"
          placeholder="Type">
          <el-option label="Small" value="small"></el-option>
          <el-option label="Medium" value="medium"></el-option>
          <el-option label="Large" value="large"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-for="entryPoint in entryPoints"
        :key="entryPoint.id"
        :label="entryPoint.name"
        :label-width="82"
        prop="distance">
        <el-input-number
          v-model.number="slotForm.distance[entryPoint.id]"
          :label="entryPoint.name"
          :min="0"
          :max="1"
        ></el-input-number>
      </el-form-item>

      <div class="dialog__footer">
        <el-button
          type="primary"
          :loading="isLoading"
          @click="submitForm">
          Create
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddSlot',
  data() {
    return {
      isLoading: false,

      slotForm: {
        type: '',
        distance: {}
      },
      rules: {
        type: [
          {
            type: 'string',
            required: true,
            message: 'Please enter a valid type',
            trigger: 'change'
          }
        ],
        distance: {
          type: 'object',
          required: true
        }
      }
    }
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    entryPoints: {
      type: Array,
      required: true
    }
  },
  emits: ['submitted'],
  methods: {
    submitForm() {
      this.$refs.slotForm.validate((valid) => {
        if (!valid) {
          return false
        }

        this.$emit('submitted', {
          type: this.slotForm.type,
          distance: this.slotForm.distance
        })
      })
    }
  }
}
</script>

<style scoped>
.el-input-number.el-input-number--default {
  width: 225px;
}
</style>