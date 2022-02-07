<template>
  <el-card
    shadow="hover"
    :body-style="style"
    @click="onClick(id)">
      <el-row justify="center">
        {{ label }}
      </el-row>

      <el-icon :size="20" :color="occupied ? 'red' : 'green'">
        <Van />
      </el-icon>
    </el-card>
</template>

<script>
import { Van } from '@element-plus/icons-vue'

const COLORS_BY_TYPE = {
  small: 'var(--cyan)',
  medium: 'var(--orange)',
  large: 'var(--red)'
}

export default {
  name: 'Slot',
  components: {
    Van
  },
  emits: [
    'clicked'
  ],
  props: {
    id: {
      type: String,
      required: true
    },
    occupied: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    style() {
      const color = COLORS_BY_TYPE[this.type]

      return {
        color: 'var(--darkBlue)',
        cursor: 'pointer',
        fontWeight: 'bold',
        backgroundColor: '#fafafa',
        borderTop: `3px solid ${color}`,
        boxShadow: '0px 30px 40px -20px var(--grayishBlue)',
        paddingBottom: '10px'
      }
    }
  },
  methods: {
    onClick(id) {
      this.$emit('clicked', id)
    }
  }
}
</script>

<style scoped>
.el-card {
  margin-bottom: 20px;
}

.el-row {
  margin-bottom: 6px;
}
</style>