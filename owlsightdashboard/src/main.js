import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import Card from "primevue/card"
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "/node_modules/primeflex/primeflex.css";


const app = createApp(App)

app.component('Button', Button);
app.component('Card', Card);
app.use(router)
app.use(PrimeVue);

app.mount('#app')
