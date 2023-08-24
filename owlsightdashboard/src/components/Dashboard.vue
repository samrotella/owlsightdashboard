<template>
    <!-- Menu - Including Logo, Logout, and Settings button -->
    <Menubar class="col-10 col-offset-1" style="border-style: none; background-color: #121212 ">
        <template #start>
            <template class="flex">
                <!-- Logo -->
                <img alt="logo" src="../assets/OwlSight.svg" height="175" class="" />
            </template>
        </template>

        <template #end>
            <!-- Sign Out Button -->
            <Button v-on:click="signOut()" severity="secondary" label=" Logout" text />

            <!-- Settings Button -->
            <Button @click="visible = true" icon="pi pi-cog" />

            <!-- Settings Modal -->
            <!-- eslint-disable-next-line -->
            <Dialog v-model:visible="visible" header="Insert script tag at the bottom of your website's body tag" :style="{ width: '50vw' }">
                <p>
                    <code>
                    &lt;script>src="https://owlsight.onrender.com/main.js"&lt;/script>
                    </code>
                </p>
                <p><Button label="Copy to clipboard" class="" plain text v-on:click="copyScript()" icon="pi pi-copy" /></p>
            </Dialog>
        </template>
    </Menubar>
    <!-- End of Menu - Including Logo, Logout, and Settings button -->

    <!-- Date Range -->
    <template class="grid pb-2 pr-6">
        <div class="col-offset-9">
            <Calendar disabled v-model="inputDate" selectionMode="range" dateFormat="mm/dd/y" :manualInput="false" showIcon />
        </div>
    </template>

    <!-- Top Row of Stats -->
    <template class="grid">
        <div class="col-3 col-offset-1">
            <Card>
                <template #subtitle> Unique Page Visits </template>
                <template #content>
                    <div class="card justify-content-center">
                        <h2>{{ data.uniqueCount }}</h2>
                    </div>
                </template>
            </Card>
        </div>
        
        <div class="col-4 col-offset-0">
            <Card>
                <template #subtitle> Total Conversions </template>
                <template #content>
                    <div class="card justify-content-center">
                        <h2>{{ data.convCount }}</h2>
                    </div>
                </template>
            </Card>
        </div>
        <div class="col-3 col-offset-0">
            <Card>
                <template #subtitle> Total Page Visits </template>
                <template #content>
                    <div class="card justify-content-center">
                        <h2>{{ totalPageCount }}</h2>
                    </div>
                </template>
            </Card>
        </div>
    </template>

    
    <!-- eslint-disable-next-line -->
    <template class="grid pt-3">
        <div class="col-10 col-offset-1">
            <Card>
                <template #title> Total Page Visits </template>
                <template #content>
                    <div class="card">
                        <DataTable :value="pages" tableStyle="min-width: 20rem">
                            <Column field="URLs" header="Pages"></Column>
                            <Column field="visits" header="Total Visits"></Column>
                        </DataTable>
                    </div>
                </template>
            </Card>
        </div>
    </template>

    <!-- eslint-disable-next-line -->
    <template class="grid pt-3">
            <!-- eslint-disable-next-line -->
        <div class="col-5 col-offset-1">
            <Card>
                <template #title> UTM Analytics </template>
                <template #subtitle> 
                    <Button v-on:click="changeUTMViewToSouce()" size="small" severity="help" label="UTM Source" plain text />
                    <Button v-on:click="changeUTMViewToCampaign()" size="small" severity="help" label="UTM Campaign" plain text />
                </template>
                <template #content>
                    <div class="card">
                        <DataTable :value="sources" tableStyle="min-width: 20rem">
                            <Column field="URLs" header="Sources"></Column>
                            <Column field="visits" header="Visitors"></Column>
                        </DataTable>
                    </div>
                </template>
            </Card>
        </div>
        
        <!-- <div class="col-5 col-offset-0">
            <Card>
                <template #title> Operating Systems </template>
                <template #content>
                    <div class="card flex justify-content-center">
                        <Chart type="pie" :data="chartDataOperatingSystems" :options="chartOptionsBrowsers" class="w-full md:w-30rem" />
                    </div>
                </template>
            </Card>
        </div> -->
        <div class="col-5 col-offset-0">
            <Card>
                <template #title>
                    Operating Systems 
                </template>
                <template #subtitle> 
                    <button v-on:click="changeOSView()">Change View</button>
                </template>
                <template #content>
                    <div class="card">
                        <DataTable :value="os" tableStyle="min-width: 20rem">
                            <Column field="OperatingSys" header="Sources"></Column>
                            <Column field="visits" header="Visitors"></Column>
                        </DataTable>
                    </div>
                </template>
            </Card>
        </div>
    </template>
   
</template>

<script>
import { firebaseAuth } from '@/api/firebaseauth.js';
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
import { data } from '../store/modules/data.js'
import { users } from '../store/modules/users.js'
const date7 = new Date();
date7.setDate(date7.getDate() - 7);

export default {
    name: 'Welcome',
    data () {
        return {
            visible: false,
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
            inputDate: [date7, new Date()],
            pages: [],
            totalPageCount: 0,
            sources: [],
            campaigns: [],
            os: [],
            macOS: null,
            otherOS: null,
            winOS: null,
            iphoneOS: null,
            sourceUTM: true,
            data,
            users
        }
    },
    beforeMount (){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                const email = user.email;
                
                this.users.getDomain(uid).then(() => {
                    this.data.getUniqueCount(this.users.accountDomain);
                    this.data.getConv(this.users.accountDomain);

                    this.data.getPageVisitsWithCount(this.users.accountDomain).then(() => {
                        for (let index = 0; index < this.data.pageVisitCount.length; index++) {
                            this.pages.push({URLs: data.pageVisitCount[index]._id, visits: data.pageVisitCount[index].count});
                            this.totalPageCount += data.pageVisitCount[index].count;
                        }
                    });

                    this.data.getSourcesWithCount(this.users.accountDomain).then(() => {
                        for (let index = 0; index < this.data.sourceVisitCount.length; index++) {
                            if (data.sourceVisitCount[index]._id.source === null) {
                                this.sources.push({URLs: 'direct', visits: data.sourceVisitCount[index].total_owlGuid});    
                            }
                            else {
                                this.sources.push({URLs: data.sourceVisitCount[index]._id.source, visits: data.sourceVisitCount[index].total_owlGuid});    
                            }
                        }
                    });

                    this.data.getCampaignsWithCount(this.users.accountDomain).then(() => {
                        for (let index = 0; index < this.data.campaignVisitCount.length; index++) {
                            if (data.campaignVisitCount[index]._id.campaign === null) {
                                this.campaigns.push({URLs: 'direct', visits: data.campaignVisitCount[index].total_owlGuid});    
                            }
                            else {
                                this.campaigns.push({URLs: data.campaignVisitCount[index]._id.campaign, visits: data.campaignVisitCount[index].total_owlGuid});    
                            }
                        }
                    });

                    this.data.getOS(this.users.accountDomain).then(() => {
                        for (let index = 0; index < this.data.osVisitCount.length; index++) {
                            this.os.push({OperatingSys: data.osVisitCount[index]._id.operatingSystem, visits: data.osVisitCount[index].total_owlGuid});    
                        }
                    });
                });
            } else {
                // User is signed out
                this.$router.push('/');
            }
        });
        const user = auth.currentUser;
    },
    methods: {
        // Pretty sure this method isn't even being used right now...
        getUser() {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;

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
        deleteAccount() {
            const auth = getAuth();
            const user = auth.currentUser;
            deleteUser(user).then(() => {
                // User deleted, push to login
                }).catch((error) => {
                // An error ocurred
                // ...
            });
        },
        changeUTMViewToSouce() {
            if (this.sourceUTM === true) {
                this.sourceUTM = false;
            }
            else {
                this.sourceUTM = true;
            }
        }
    },
}
</script>