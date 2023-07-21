import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import Card from "primevue/card"
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Chart from 'primevue/chart';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "/node_modules/primeflex/primeflex.css";


const app = createApp(App)

app.component('Button', Button);
app.component('Card', Card);
app.component('Menubar', Menubar);
app.component('InputText', InputText);
app.component('Chart', Chart);
app.use(router)
app.use(PrimeVue);

app.mount('#app')
