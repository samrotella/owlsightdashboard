import { reactive } from 'vue'
import Axios from "axios";

export const data = reactive({
    uniqueCount: null,
    getUniqueCount() {
        return new Promise((resolve, reject) => {
        Axios.get(`https://owlsight-api.onrender.com/totalUniqueVisits`).then((response) => {
            this.uniqueCount = response.data;
            resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
})