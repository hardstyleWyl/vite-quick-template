import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'


createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus, {
        locale: zhCn
    })
    .mount('#app')
