import { RouteRecordRaw } from 'vue-router'
import HelloVite from '@/views/HelloVite.vue'

const routingTable : Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'hello',
        component: HelloVite
    }
]

export default routingTable
