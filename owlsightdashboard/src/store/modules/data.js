import { reactive } from 'vue'
import Axios from "axios";

export const data = reactive({
    uniqueCount: null,
    pageVisitCount: [],
    //not used atm
    dataUniqueVisitData: [],
    result: [],
    getUniqueCount() {
        return new Promise((resolve, reject) => {
        // Axios.get(`http://localhost:3000/totalUniqueVisits`).then((response) => {
        Axios.get(`https://owlsight-api.onrender.com/totalUniqueVisits`).then((response) => {
            this.uniqueCount = response.data.length;
            resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    getPageVisitsWithCount() {
        return new Promise((resolve, reject) => {
            // Axios.get(`http://localhost:3000/pageVisitsWithCounts`).then((response) => {
            Axios.get(`https://owlsight-api.onrender.com/pageVisitsWithCounts`).then((response) => {
                for (let index = 0; index < response.data.length; index++) {
                    this.pageVisitCount.push(response.data[index]);
                }
                resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
    },
    //not used atm
    getChartDataUniqueVisitData() {

        let array = [];
        
        // function Last7Days () {
            for (var i=0; i<7; i++) {
                var d = new Date();
                d.setDate(d.getDate() - i);
                this.result.push( formatDate(d) )
            }
        
            // return(result.join(','));
         //}
        return new Promise((resolve, reject) => {
            
            Axios.get(`https://owlsight-api.onrender.com/chartDataUniqueVisitData/${this.result.join(',')}`).then((response) => {
                for (let index = 0; index < response.data.length; index++) {
                    array.push(response.data[index]);
                }

                this.dataUniqueVisitData = array.slice();
                console.log('testtest ' + JSON.stringify(this.dataUniqueVisitData));
                // not quite right 
                
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
})

function formatDate(date){
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        date = mm+'-'+dd+'-'+yyyy;
        return date
}