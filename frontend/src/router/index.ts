import { createRouter, createWebHistory } from 'vue-router'
import ItemCrud from '@/components/ItemCrud.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'crud',
      component: ItemCrud
    }
  ]
})

export default router
