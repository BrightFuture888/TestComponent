import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import myEcahrts from "@/components/Common/Echarts/index.vue";
import 'ant-design-vue/dist/antd.css'
const app =createApp(App)
app.component('Aecharts',myEcahrts)

app.use(router).mount('#app')
