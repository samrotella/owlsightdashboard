import { reactive } from 'vue'
import Axios from "axios";

export const data = reactive({
    uniqueCount: null,
    pageVisitCount: [],
    result: [],
    getUniqueCount(domain) {
        return new Promise((resolve, reject) => {
        // Axios.get(`http://localhost:3000/totalUniqueVisits`).then((response) => {
        // Axios.get(`https://owlsight-api.onrender.com/totalUniqueVisits`).then((response) => {
        Axios.get(`https://owlsight-api.onrender.com/totalUniqueVisits/domain/${domain}`).then((response) => {
            this.uniqueCount = response.data.length;
            resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    getPageVisitsWithCount(domain) {
        return new Promise((resolve, reject) => {
            // Axios.get(`http://localhost:3000/pageVisitsWithCounts`).then((response) => {
            Axios.get(`https://owlsight-api.onrender.com/pageVisitsWithCounts/domain/${domain}`).then((response) => {
                for (let index = 0; index < response.data.length; index++) {
                    this.pageVisitCount.push(response.data[index]);
                }
                resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
    },
    getOS(domain, OS) {
        return new Promise((resolve, reject) => {
            Axios.get(`https://owlsight-api.onrender.com/operatingSystem/domain/${domain}/OS/${OS}`).then((response) => {
                console.log(response.data.length);
                resolve(response.data.length);
                }).catch((error) => {
                    reject(error);
                });
        });
    }
})