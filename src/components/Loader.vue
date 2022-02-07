<template>
  <el-skeleton
    :loading="isLoading"
    :count="7"
    animated>
    <template #template>
      <el-row :gutter="20">
        <el-col
          v-for="item in new Array(Math.floor(Math.random() * (8 - 2 + 1)) + 2)"
          :span="3" 
          :key="item">
          <el-skeleton-item variant="rect" />
        </el-col>
      </el-row>
    </template>
    <template #default>
      <slot name="content"></slot>
    </template>
  </el-skeleton>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.el-skeleton__item {
  height: 60px;
}

.el-col {
  margin-bottom: 20px;
}
</style>