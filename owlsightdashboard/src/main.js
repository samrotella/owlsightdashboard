import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import Card from "primevue/card"
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Chart from 'primevue/chart';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import SelectButton from 'primevue/selectbutton';
import Dialog from 'primevue/dialog';
import Tooltip from 'primevue/tooltip';
import SpeedDial from 'primevue/speeddial';
import Panel from 'primevue/panel';
import Sidebar from 'primevue/sidebar';
import "primevue/resources/themes/vela-blue/theme.css";
import "/node_modules/primeflex/primeflex.css";
import 'primeicons/primeicons.css';


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
app.component('Dialog', Dialog);
app.component('SpeedDial', SpeedDial);
app.component('Textarea', Textarea);
app.component('Panel', Panel);
app.component('Sidebar', Sidebar);
app.directive('tooltip', Tooltip);
app.use(router)
app.use(PrimeVue);

app.mount('#app')
