import { createRouter, createWebHistory } from 'vue-router'

import ParkingLots from '@/views/ParkingLots.vue'

const routes = [
  {
    path: '/',
    name: 'ParkingLots',
    component: ParkingLots
  },
  {
    path: '/:id',
    name: 'Lot',
    component: () => import('@/views/Lot.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router