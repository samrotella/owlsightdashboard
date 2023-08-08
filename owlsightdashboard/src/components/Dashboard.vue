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
    <!-- <template class="grid pt-3">
        <div class="col-offset-1 card flex">
            <Calendar v-model="dates" selectionMode="range" :manualInput="false" showIcon />
        </div>
    </template> -->

    <!-- eslint-disable-next-line -->
    <template class="grid pt-3">
        <Card class="col-10 col-offset-1 p-3">
            <template #title> Page Visits </template>
            <template #subtitle> Unique Page Visits: {{ data.uniqueCount }} </template>
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
            <template #title> Operating Systems </template>
            <template #content>
                <div class="card flex justify-content-center">
                    <Chart type="pie" :data="chartDataOperatingSystems" :options="chartOptionsBrowsers" class="w-full md:w-30rem" />
                </div>
            </template>
        </Card>
    </template>
   
</template>

<script>
import { firebaseAuth } from '@/api/firebaseauth.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { data } from '../store/modules/data.js'
import { users } from '../store/modules/users.js'

export default {
    name: 'Welcome',
    data () {
        return {
            theName: null,
            chartDataOperatingSystems: null,
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
                    },
                }
            },
            dates: null,
            pages: [],
            sources: null,
            // Update this with the query value from the date picker filter
            chartDataUniqueVisitLabel: [],
            macOS: null,
            otherOS: null,
            winOS: null,
            data,
            users
        }
    },
    beforeMount (){
        //figure out sign in on refresh
        
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            console.log('being hit.');
            if (user) {
                console.log('being hit in if user.');
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log(uid);
                const email = user.email;
                this.theName = email;
                this.users.getDomain(uid).then(() => {
                    this.data.getUniqueCount(this.users.accountDomain);

                    // OS Data - Bruuuutally slow but it works...
                    this.data.getOS(this.users.accountDomain, 'MacIntel').then((macData) => {
                        this.macOS = macData;
                        }).then(() => {
                            this.data.getOS(this.users.accountDomain, 'Win32').then((windowData) => {
                                this.winOS = windowData;
                                    this.data.getOS(this.users.accountDomain, 'other').then((otherData) => {
                                        this.otherOS = otherData;
                                            }).then(() => {
                                                this.chartDataOperatingSystems = this.setChartDataOperatingSystems();
                                            });
                            })
                        });
                    // End OS Nightmare

                    this.data.getPageVisitsWithCount(this.users.accountDomain).then(() => {
                        for (let index = 0; index < this.data.pageVisitCount.length; index++) {
                            this.pages.push({URLs: data.pageVisitCount[index]._id, visits: data.pageVisitCount[index].count});   
                        }
                    });
                });
                // ...
            } else {
                // User is signed out
                this.$router.push('/');
            }
        });
        const user = auth.currentUser;
    },
    mounted() {
        this.sources = [{URLs: 'direct', leads: 100}, 
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
        setChartDataOperatingSystems() {
            const documentStyle = getComputedStyle(document.body);
            return {
                labels: ['Mac', 'Windows', 'Other'],
                datasets: [
                    {
                        data: [this.macOS, this.winOS, this.otherOS],
                        backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-500')]
                    }
                ]
            };
            
        },
    },
}
</script>