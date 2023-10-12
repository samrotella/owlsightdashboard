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
                    Deleting your account will also cancel your subscription. Are you sure you want to delete the account? This action can not be undone.
                </p>
                <Button label="Delete Account" severity="danger" plain text v-on:click="deleteAccount()" icon="pi pi-trash" />
            </Dialog>

            <!-- Edit Billing Details  Modal -->
            <!-- eslint-disable-next-line -->
            <Dialog v-model:visible="editModalVisible" header="Edit Billing Details" :style="{ width: '50vw' }">
                <p>
                    billing details section.
                </p>
                <Button label="Update Details" severity="success" plain text v-on:click="editBillingDetails()" icon="pi pi-check" />
            </Dialog>

            <!-- UTM  Modal -->
            <!-- eslint-disable-next-line -->
            <Dialog v-model:visible="UTMModalVisible" header="Build UTM Link" :style="{ width: '50vw' }">
                <template class="block pt-2 pb-2">
                    <label for="url">Website Address</label>
                    <template class="flex pt-1">
                        <input 
                            v-model="webAddress" 
                            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
                    </template>
                </template>
                <template class="block pt-2 pb-2">
                    <label for="firstname1">UTM Source</label>
                    <template class="flex pt-1">
                        <input 
                            v-model="sourceUrlUTM" 
                            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" >
                    </template>
                </template>
                <template class="block pt-2 pb-2">
                    <label for="firstname1">UTM Medium</label>
                    <template class="flex pt-1">
                        <input 
                            v-model="mediumUrlUTM" 
                            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
                    </template>
                </template>
                <template class="block pt-2 pb-2">
                    <label for="firstname1">UTM Campaign</label>
                    <template class="flex pt-1">
                        <input 
                            v-model="campaignUrlUTM" 
                            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" 
                            type="email"
                            placeholder="email@gmail.com">
                    </template>
                </template>
                <template class="block pt-2 pb-2">
                    <label for="firstname1">UTM Content</label>
                    <template class="flex pt-1">
                        <input 
                            v-model="contentUrlUTM" 
                            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" 
                            type="email"
                            placeholder="email@gmail.com">
                    </template>
                </template>
                <template class="block pt-2 pb-2">
                    <label for="firstname1">UTM Term</label>
                    <template class="flex pt-1">
                        <input 
                            v-model="termUrlUTM" 
                            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" 
                            type="email"
                            placeholder="email@gmail.com">
                    </template>
                </template>
                <template class="block pt-2 pb-2">
                    <!-- eslint-disable-next-line -->
                    <label for="firstname1">UTM Tracking URL</label>
                    <!-- <input 
                            v-model="generatedLink" 
                            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"  
                            disabled> -->
                            <!-- <p>{{ generatedLink }}</p> -->
                            <p>{{ webAddress + sourceUrlUTM + mediumUrlUTM + campaignUrlUTM + contentUrlUTM + termUrlUTM}}</p>
                </template>
                <Button label="Copy Link" severity="success" plain text v-on:click="copyToClipboard()" icon="pi pi-check" />
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
                <p>If you have additional questions, please reach out to us at owlsightanalytics@gmail.com</p>
                <Button @click="editModalVisible = true" label="Update Billing Information" severity="warning" plain text icon="pi pi-pencil" />
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
        <div class="col-10 col-offset-1 lg:col-3 lg:col-offset-1 md:col-10 md:col-offset-1">
            <Card>
                <template #subtitle> Unique Page Visits </template>
                <template #content>
                    <div class="card justify-content-center">
                        <h2>{{ data.uniqueCount }}</h2>
                    </div>
                </template>
            </Card>
        </div>
        
        <div class="col-10 col-offset-1 lg:col-4 lg:col-offset-0 md:col-10 md:col-offset-1">
            <Card>
                <template #subtitle> Total Conversions </template>
                <template #content>
                    <div class="card justify-content-center">
                        <h2>{{ data.convCount }}</h2>
                    </div>
                </template>
            </Card>
        </div>
        <div class="col-10 col-offset-1 lg:col-3 lg:col-offset-0 md:col-10 md:col-offset-1">
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

    <!-- Chart -->
    <template class="grid pt-3">
        <div class="col-10 col-offset-1">
            <Card>
                <template #content>
                    <div class="card">
                        <Chart type="line" :data="chartData" :options="chartOptions" class="h-10rem" />
                    </div>
                </template>
            </Card>
        </div>
    </template>
    <!-- End of Chart -->

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
                <template #title > Campaign Analytics
                    <!--   align-items-center   -->
                    <!-- <template> -->
                        <!-- <Button icon="pi pi-plus" severity="help" rounded outlined aria-label="Favorite" /> -->
                        <Button @click="UTMModalVisible = true" class="pt-4" icon="pi pi-plus" severity="info" text rounded aria-label="Favorite" />
                    <!-- </template> -->
                </template>
                <template #subtitle> 
                    <Button v-on:click="changeUTMView('source')" size="small" severity="info" label="Source" plain :outlined="!sourceUTM" />
                    <Button v-on:click="changeUTMView('medium')" size="small" severity="info" label="Medium" plain :outlined="!mediumUTM" />
                    <Button v-on:click="changeUTMView('campaign')" size="small" severity="info" label="Campaign" plain :outlined="!campaignUTM" />
                    <Button v-on:click="changeUTMView('content')" size="small" severity="info" label="Content" plain :outlined="!contentUTM" />
                    <Button v-on:click="changeUTMView('term')" size="small" severity="info" label="Term" plain :outlined="!termUTM" />
                </template>
                <template v-if="sourceUTM" #content>
                    <div class="card">
                        <DataTable :value="sources" tableStyle="min-width: 20rem">
                            <Column field="URLs" header="Sources"></Column>
                            <Column field="visits" header="Visitors"></Column>
                        </DataTable>
                    </div>
                </template>
                <template v-else-if="mediumUTM" #content>
                    <div class="card">
                        <DataTable :value="medium" tableStyle="min-width: 20rem">
                            <Column field="URLs" header="Medium"></Column>
                            <Column field="visits" header="Visitors"></Column>
                        </DataTable>
                    </div>
                </template>
                <template v-else-if="contentUTM" #content>
                    <div class="card">
                        <DataTable :value="content" tableStyle="min-width: 20rem">
                            <Column field="URLs" header="Content"></Column>
                            <Column field="visits" header="Visitors"></Column>
                        </DataTable>
                    </div>
                </template>
                <template v-else-if="termUTM" #content>
                    <div class="card">
                        <DataTable :value="term" tableStyle="min-width: 20rem">
                            <Column field="URLs" header="Term"></Column>
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
                    <Button size="small" severity="info" label="Operating System" plain/>
                    <Button size="small" severity="info" label="Browser" disabled outlined plain/>
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
            editModalVisible: false,
            UTMModalVisible: false,
            chartDataOperatingSystems: null,
            totalVisits: null,
            generatedLink: null,
            termUrlUTM: null,
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
            medium: [],
            content: [],
            term: [],
            os: [],
            macOS: null,
            otherOS: null,
            winOS: null,
            iphoneOS: null,
            sourceUTM: true,
            campaignUTM: false,
            mediumUTM: false,
            contentUTM: false,
            termUTM: false,
            chartData: null,
            chartOptions: null,
            webAddress: null,
            sourceUrlUTM: null,
            mediumUrlUTM: null,
            campaignUrlUTM: null,
            contentUrlUTM: null,
            termUrlUTM: null,
            data,
            users
        }
    },
    watch: {
        // generatedLink() {
        //     this.generatedLink = this.webAddress;
        //     console.log(ths.generatedLink);
        // }
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
                    this.data.getChartMetrics(this.users.accountDomain).then(() => {
                        this.chartOptions = this.setChartOptions();
                        this.chartData = this.setChartData();
                    });

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

                    this.data.getMediumWithCount(this.users.accountDomain).then(() => {
                        for (let index = 0; index < this.data.mediumVisitCount.length; index++) {
                            if (data.mediumVisitCount[index]._id.medium === null) {
                                this.medium.push({URLs: 'direct', visits: data.mediumVisitCount[index].total_owlGuid});    
                            }
                            else {
                                this.medium.push({URLs: data.mediumVisitCount[index]._id.medium, visits: data.mediumVisitCount[index].total_owlGuid});    
                            }
                        }
                    });

                    this.data.getContentWithCount(this.users.accountDomain).then(() => {
                        for (let index = 0; index < this.data.contentVisitCount.length; index++) {
                            if (data.contentVisitCount[index]._id.content === null) {
                                this.content.push({URLs: 'direct', visits: data.contentVisitCount[index].total_owlGuid});    
                            }
                            else {
                                this.content.push({URLs: data.contentVisitCount[index]._id.content, visits: data.contentVisitCount[index].total_owlGuid});    
                            }
                        }
                    });

                    this.data.getTermWithCount(this.users.accountDomain).then(() => {
                        for (let index = 0; index < this.data.termVisitCount.length; index++) {
                            if (data.termVisitCount[index]._id.term === null) {
                                this.term.push({URLs: 'direct', visits: data.termVisitCount[index].total_owlGuid});    
                            }
                            else {
                                this.term.push({URLs: data.termVisitCount[index]._id.term, visits: data.termVisitCount[index].total_owlGuid});    
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
                this.mediumUTM = false;
                this.contentUTM = false;
                this.termUTM = false;
            }
            else if(view === 'campaign') {
                this.sourceUTM = false;
                this.mediumUTM = false;
                this.campaignUTM = true;
                this.contentUTM = false;
                this.termUTM = false;
            }
            else if (view === 'medium') {
                this.sourceUTM = false;
                this.campaignUTM = false;
                this.mediumUTM = true;
                this.contentUTM = false;
                this.termUTM = false;
            }
            else if (view === 'content') {
                this.contentUTM = true;
                this.sourceUTM = false;
                this.campaignUTM = false;
                this.mediumUTM = false;
                this.termUTM = false;
            }
            else if (view === 'term') {
                this.contentUTM = false;
                this.sourceUTM = false;
                this.campaignUTM = false;
                this.mediumUTM = false;
                this.termUTM = true;
            }
        },
        copyScript () {
            navigator.clipboard.writeText('<script>src="https://owlsight.onrender.com/main.js"' + '<' + '/script>');
        },
        editBillingDetails () {
            console.log('todo');
        },
        buildUTMLink() {
            console.log('todo');
        },
        setChartData() {
            const documentStyle = getComputedStyle(document.documentElement);
            return {
                labels: this.data.chartDates,
                datasets: [
                    {
                        label: 'Total Page Visits',
                        data: this.data.chartMetrics,
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        tension: 0.4
                    }
                ]
            };
        },
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            return {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            };
        }
    }
}
</script>