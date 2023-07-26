import { reactive } from 'vue'
import Axios from "axios";

export const data = reactive({
    uniqueCount: null,
    pageVisitCount: [],
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
                console.log(response.data)
                }).catch((error) => {
                    reject(error);
                });
            });
    }
})