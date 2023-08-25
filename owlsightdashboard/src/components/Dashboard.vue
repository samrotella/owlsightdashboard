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

            <!-- Delete Account Modal -->
            <!-- eslint-disable-next-line -->
            <Dialog v-model:visible="modalVisible" header="Delete Account" :style="{ width: '50vw' }">
                <p>
                    Are you sure you want to delete the account? This action can not be undone.
                </p>
                <Button label="Delete Account" severity="danger" plain text v-on:click="deleteAccount()" icon="pi pi-trash" />
            </Dialog>

            <!-- Settings Side Bar -->
            <!-- eslint-disable-next-line -->
            <Sidebar v-model:visible="visible">
                <h2>Script</h2>
                <p>Insert script tag at the bottom of your website's body tag.</p>
                <p>
                    <code>
                    &lt;script>src="https://owlsight.onrender.com/main.js"&lt;/script>
                    </code>
                </p>
                <Button label="Copy to clipboard" class="" plain text v-on:click="copyScript()" icon="pi pi-copy" />

                <h2>Account Information</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <Button @click="modalVisible = true" label="Delete Account" severity="danger" plain text icon="pi pi-trash" />
            </Sidebar>
            <!-- End Settings Sidebar -->
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
                    <Button v-on:click="changeUTMView('source')" size="small" severity="help" label="UTM Source" plain :outlined="!sourceUTM" />
                    <Button v-on:click="changeUTMView('campaign')" size="small" severity="help" label="UTM Campaign" plain :outlined="!campaignUTM" />
                </template>
                <template v-if="sourceUTM" #content>
                    <div class="card">
                        <DataTable :value="sources" tableStyle="min-width: 20rem">
                            <Column field="URLs" header="Sources"></Column>
                            <Column field="visits" header="Visitors"></Column>
                        </DataTable>
                    </div>
                </template>
                <template v-else #content>
                    <div class="card">
                        <DataTable :value="campaigns" tableStyle="min-width: 20rem">
                            <Column field="URLs" header="Campaigns"></Column>
                            <Column field="visits" header="Visitors"></Column>
                        </DataTable>
                    </div>
                </template>
            </Card>
        </div>
        
        <div class="col-5 col-offset-0">
            <Card>
                <template #title>
                    Details 
                </template>
                <template #subtitle> 
                    <Button size="small" severity="help" label="Operating System" plain/>
                    <Button size="small" severity="help" label="Browser" disabled outlined plain/>
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
            modalVisible: false,
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
            campaignUTM: false,
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
            this.users.deleteStripeCustomer(this.users.customerID).then(() => {
                deleteUser(user).then(() => {
                    // User deleted, push to login
                    this.$router.push('/');
                }).catch((error) => {
                    // An error ocurred
                    // ...
                    console.log(error)
            });
            })
            
        },
        changeUTMView(view) {

            if (view === 'source') {
                this.sourceUTM = true;
                this.campaignUTM = false;
            }
            else if(view === 'campaign') {
                this.sourceUTM = false;
                this.campaignUTM = true;
            }
        },
        copyScript () {
            navigator.clipboard.writeText('<script>src="https://owlsight.onrender.com/main.js"' + '<' + '/script>');
        }
    }
}
</script>