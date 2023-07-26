<template class="">
    <Menubar>
        <template #start>
            <img alt="logo" src="../assets/Owlsight.png" height="75" class="mr-2" />
        </template>
        
        <template #end>
            <!-- todo sign out -->
            <Button v-on:click="signOut()" severity="secondary" label="Signout" text />
            <template class="flex">
                Welcome, {{ theName }}!
            </template>
        </template>
    </Menubar>

    <!-- Date Range -->
    <template class="grid pt-3">
        <div class="col-offset-1 card flex">
            <Calendar v-model="dates" selectionMode="range" :manualInput="false" showIcon />
        </div>
    </template>

    <!-- eslint-disable-next-line -->
    <template class="grid pt-3">
        <!-- Total Unique Visits Chart -->
        <Card class="col-5 col-offset-1">
            <template #title> Total Unique Visits </template>
            <!-- eslint-disable-next-line -->
            <template #subtitle> {{ data.uniqueCount }} <h5 style="color: rgb(18, 173, 10);">+3.2%</h5> </template>
            <template #content>
                <div class="card">
                    <Chart type="line" :data="chartDataUniqueVisit" :options="chartOptionsUniqueVisit" class="h-20rem" />
                </div>
            </template>
        </Card>
        <!-- eslint-disable-next-line -->
        <Card class="col-5 col-offset-0 p-3">
            <template #title> Page Visits </template>
            <!-- <template #title> {{ data.pageVisitCount[0].count }} </template> -->
            <template #content>
                <div class="card">
                    <DataTable :value="pages" tableStyle="min-width: 20rem">
                        <Column field="URLs" header="Pages"></Column>
                        <Column field="visits" header="Total Visits"></Column>
                    </DataTable>
                </div>
            </template>
        </Card>
    </template>

    <!-- eslint-disable-next-line -->
    <template class="grid pt-4">
            <!-- eslint-disable-next-line -->
        <Card class="col-5 col-offset-1 p-3">
            <template #title> Sources </template>
            <template #content>
                <div class="card">
                    <DataTable :value="sources" tableStyle="min-width: 20rem">
                        <Column field="URLs" header="Pages"></Column>
                        <Column field="leads" header="Total Leads"></Column>
                    </DataTable>
                </div>
            </template>
        </Card>

        <!-- eslint-disable-next-line -->
        <Card class="col-5 col-offset-0">
            <template #title> Browsers </template>
            <template #content>
                <div class="card flex justify-content-center">
                    <Chart type="pie" :data="chartDataBrowsers" :options="chartOptionsBrowsers" class="w-full md:w-30rem" />
                </div>
            </template>
        </Card>
    </template>
   
</template>

<script>
import { firebaseAuth } from '@/api/firebaseauth.js';
import { getAuth } from "firebase/auth";
import { data } from '../store/modules/data.js'

export default {
    name: 'Welcome',
    data () {
        return {
            theName: null,
            chartDataBrowsers: null,
            totalVisits: null,
            chartOptionsBrowsers: {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            },
            chartDataUniqueVisit: null,
            chartOptionsUniqueVisit: {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            },
            dates: null,
            pages: [],
            sources: null,
            data
        }
    },
    beforeMount (){
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;

        console.log(email);
        this.theName = email;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
        }
        this.totalVisits = this.getTotalVisits();
        this.data.getUniqueCount();
        this.data.getPageVisitsWithCount().then(() => {
            for (let index = 0; index < data.pageVisitCount.length; index++) {

                this.pages.push({URLs: data.pageVisitCount[index]._id, visits: data.pageVisitCount[index].count});   
            }
        });
    },
    mounted() {
        this.chartDataBrowsers = this.setChartDataBrowsers();
        this.chartDataUniqueVisit = this.setchartDataUniqueVisit();
        // for (let index = 0; index < array.length; index++) {
        //     const element = array[index];
            
        // }
        

        this.sources = [{URLs: 'www.google.com', leads: 100}, 
                        {URLs: 'www.linkedin.com', leads: 15},
                        {URLs: 'www.reddit.com', leads: 153},
                        {URLs: 'www.yahoo.com', leads: 125}];
    },
    methods: {
        getUser() {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;

            this.theName = displayName;

            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            const uid = user.uid;
            }
        },
        signOut () {
            let { auth, signOut } = firebaseAuth;
            signOut(auth).then(() => {
                console.log('signed out');
            }).catch(function (error) {
                console.log('couldnt sign out ' + error);
            }).finally(() => {
                this.$router.push('/')
            });
        },
        getTotalVisits() {
            return 1;
        },
        setChartDataBrowsers() {
            const documentStyle = getComputedStyle(document.body);

            return {
                labels: ['Chrome', 'Safari', 'Firefox', 'Other'],
                datasets: [
                    {
                        data: [540, 325, 702, 34],
                        backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-500')]
                    }
                ]
            };
        },
        setchartDataUniqueVisit() {
            const documentStyle = getComputedStyle(document.body);

            return {
                labels: ['Chrome', 'Safari', 'Firefox', 'Other'],
                datasets: [
                    {
                        data: [540, 325, 702, 34],
                        backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-500')]
                    }
                ]
            };
        }
    },
}
</script>