import { createApp } from 'vue'
import { createPinia } from 'pinia'


//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//Firebase
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './config/firebase';

import App from './App.vue'
import router from './router'

import './assets/main.css'
//Iconos Material Design
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})
//Firebase
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})
//Vuetify
app.use(vuetify)

app.use(createPinia())
app.use(router)

app.mount('#app')
