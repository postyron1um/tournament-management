import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/styles/main.css'
import '@/assets/styles/globals.css'
import App from '@/App.vue'
import router from '@/core/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
