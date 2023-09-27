import { reactive } from 'vue'
import Axios from "axios";

export const data = reactive({
    uniqueCount: 0,
    pageVisitCount: [],
    sourceVisitCount: [],
    campaignVisitCount: [],
    mediumVisitCount: [],
    contentVisitCount: [],
    termVisitCount: [],
    osVisitCount: [],
    result: [],
    chartMetrics: [],
    conversionMetrics: [],
    conversionDates: [],
    chartDates: [],
    convCount: 0,
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
    getChartMetrics (domain) { 
        return new Promise((resolve, reject) => {
            // Axios.get(`http://localhost:3000/pageVisitsWithCounts`).then((response) => {
            Axios.get(`https://owlsight-api.onrender.com/chartMetrics/domain/${domain}`).then((response) => {
                for (let index = 0; index < response.data.length; index++) {
                    this.chartMetrics.push(response.data[index].count);
                    this.chartDates.push(response.data[index]._id);
                }
                resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
    },
    getConversionChartMetrics (domain) { 
        return new Promise((resolve, reject) => {
            // Axios.get(`http://localhost:3000/pageVisitsWithCounts`).then((response) => {
            Axios.get(`https://owlsight-api.onrender.com/conversionchartmetrics/domain/${domain}`).then((response) => {
                for (let index = 0; index < response.data.length; index++) {
                    this.conversionMetrics.push(response.data[index].count);
                    this.conversionDates.push(response.data[index]._id);
                }
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
    getConv(domain) {
        return new Promise((resolve, reject) => {
            Axios.get(`https://owlsight-api.onrender.com/conversions/domain/${domain}`).then((response) => {
                this.convCount = response.data.length;
                resolve(response.data.length);
                }).catch((error) => {
                    reject(error);
                });
        });
    },
    getSourcesWithCount(domain) {
        return new Promise((resolve, reject) => {
            // Axios.get(`http://localhost:3000/sourcesWithCounts/domain/${domain}`).then((response) => {
            Axios.get(`https://owlsight-api.onrender.com/sourcesWithCounts/domain/${domain}`).then((response) => {
                for (let index = 0; index < response.data.length; index++) {
                    this.sourceVisitCount.push(response.data[index]);
                }
                resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
    },
    getCampaignsWithCount(domain) {
        return new Promise((resolve, reject) => {
            // Axios.get(`http://localhost:3000/sourcesWithCounts/domain/${domain}`).then((response) => {
            Axios.get(`https://owlsight-api.onrender.com/campaignsWithCounts/domain/${domain}`).then((response) => {
                for (let index = 0; index < response.data.length; index++) {
                    this.campaignVisitCount.push(response.data[index]);
                }
                resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
    },
    getMediumWithCount(domain) {
        return new Promise((resolve, reject) => {
            // Axios.get(`http://localhost:3000/sourcesWithCounts/domain/${domain}`).then((response) => {
            Axios.get(`https://owlsight-api.onrender.com/mediumWithCounts/domain/${domain}`).then((response) => {
                for (let index = 0; index < response.data.length; index++) {
                    this.mediumVisitCount.push(response.data[index]);
                }
                resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
    },
    getContentWithCount(domain) {
        return new Promise((resolve, reject) => {
            // Axios.get(`http://localhost:3000/sourcesWithCounts/domain/${domain}`).then((response) => {
            Axios.get(`https://owlsight-api.onrender.com/contentWithCounts/domain/${domain}`).then((response) => {
                for (let index = 0; index < response.data.length; index++) {
                    this.contentVisitCount.push(response.data[index]);
                }
                resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
    },
    getTermWithCount(domain) {
        return new Promise((resolve, reject) => {
            // Axios.get(`http://localhost:3000/sourcesWithCounts/domain/${domain}`).then((response) => {
            Axios.get(`https://owlsight-api.onrender.com/termWithCounts/domain/${domain}`).then((response) => {
                for (let index = 0; index < response.data.length; index++) {
                    this.termVisitCount.push(response.data[index]);
                }
                resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
    },
    getOS(domain) {
        return new Promise((resolve, reject) => {
            // Axios.get(`http://localhost:3000/operatingSystem/domain/${domain}`).then((response) => {
            Axios.get(`https://owlsight-api.onrender.com/operatingSystem/domain/${domain}`).then((response) => {
                for (let index = 0; index < response.data.length; index++) {
                    this.osVisitCount.push(response.data[index]);
                }
                resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
        });
    },
})