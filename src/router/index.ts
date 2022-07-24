import { createRouter, createWebHistory } from 'vue-router'
import routingTable from './routingTable'

const router = createRouter({
    history: createWebHistory(),
    routes: routingTable
})
export default router
