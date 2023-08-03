import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import Card from "primevue/card"
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Chart from 'primevue/chart';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import SelectButton from 'primevue/selectbutton';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "/node_modules/primeflex/primeflex.css";


const app = createApp(App)

app.component('Button', Button);
app.component('Card', Card);
app.component('Menubar', Menubar);
app.component('InputText', InputText);
app.component('Chart', Chart);
app.component('Calendar', Calendar);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('SelectButton', SelectButton);
app.use(router)
app.use(PrimeVue);

app.mount('#app')
