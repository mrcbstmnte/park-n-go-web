<template>
  <el-dialog
    v-model="open"
    width="30%"
    top="30vh"
    title="">
    <el-result
      icon="success"
      title="Payment Success"
      :sub-title="subTitle">
      <template #extra>
        <el-button type="primary" @click="$emit('payment:close')">Okay</el-button>
      </template>
    </el-result>
  </el-dialog>
</template>

<script>
export default {
  name: 'PaymentSuccess',
  props: {
    amount: {
      type: Number,
      required: true
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ['payment:close'],
  computed: {
    subTitle() {
      return 'Paid a total amount of PHP ' + this.amount
    }
  }
}
</script>