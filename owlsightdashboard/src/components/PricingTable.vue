<template>
   <!-- insert two cards, one 'basic' and one 'pro' -->
   <!-- eslint-disable-next-line -->
   <div>
    <!-- eslint-disable-next-line -->
    <Dialog v-model:visible="freeModalVisible" header="Subscribe to Owlsight Basic" :style="{ width: '50vw' }">
        <p>
            Confirm subscription.
        </p>
        <Button label="Confirm" severity="success" v-on:click="subscribeToFree()" icon="pi pi-check" />
    </Dialog>
    
    <h1 class="flex justify-content-center">Choose your plan</h1>
    <p class="flex justify-content-center">
        Our pricing plans are tailored to be afordable and suit your business need.
    </p>
    <template class="grid">
        <div class="col-10 col-offset-1 lg:col-3 lg:col-offset-1 md:col-10 md:col-offset-1">
            <Card :style="{
                backgroundColor: freePaymentSelected ? '#5F57FF' : '',
                }">
                <template #header>
                    <!-- <img alt="user header" src="../assets/graphic-tablet_1712521.png" /> -->
                </template>
                <template #title> Owlsight Basic </template>
                <template #subtitle> Free </template>
                <template #content>
                    <div class="card justify-content-center">
                        <ul style="font-family: Arial, sans-serif;color: rgb(236, 230, 230);">
                            <li>Unlimited domain</li>
                            <li>10,001 - 50,000 Monthly Page Views</li>
                            <li>Ability to block internal traffic</li>
                            <li>Another Feature</li>
                            <li>More Features</li>
                        </ul> 
                    </div>
                <!-- <button > Subscribe to Pro</button> -->
                </template>
                <template #footer>
                    <Button severity="success" @click="freeModalVisible = true" icon="pi pi-check" label="Subscribe to Basic" />
                    <!-- <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" /> -->
                </template>
            </Card>
        </div>
        
        <div class="col-10 col-offset-1 lg:col-4 lg:col-offset-0 md:col-10 md:col-offset-1">
            <Card :style="{
                backgroundColor: proPaymentSelected ? '#5F57FF' : '',
                }">
                <template #header>
                    <!-- <img alt="user header" src="../assets/graphic-tablet_1712521.png" /> -->
                </template>
                <template #title> Owlsight Pro </template>
                <template #subtitle> $9.99 per Month </template>
                <template #content>
                    <div class="card justify-content-center">
                        <ul style="font-family: Arial, sans-serif;color: rgb(236, 230, 230);">
                            <li>Unlimited domain</li>
                            <li>10,001 - 50,000 Monthly Page Views</li>
                            <li>Ability to block internal traffic</li>
                            <li>Another Feature</li>
                            <li>More Features</li>
                            <li>More Features</li>
                        </ul> 
                    </div>
                <!-- <button > Subscribe to Pro</button> -->
                </template>
                <template #footer>
                    <Button severity="success" v-on:click="subscribeToPro()" icon="pi pi-check" label="Subscribe to Pro" />
                    <!-- <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" /> -->
                </template>
            </Card>
        </div>
        <div class="col-10 col-offset-1 lg:col-3 lg:col-offset-0 md:col-10 md:col-offset-1">
            <Card :style="{
                backgroundColor: premiumPaymentSelected ? '#5F57FF' : '',
                }">
                <template #header>
                    <!-- <img alt="user header" src="../assets/graphic-tablet_1712521.png" /> -->
                </template>
                <template #title> Owlsight Premium </template>
                <template #subtitle> $15.99 per Month </template>
                <template #content>
                    <div class="card justify-content-center">
                        <ul style="font-family: Arial, sans-serif;color: rgb(236, 230, 230);">
                            <li>Unlimited domain</li>
                            <li>10,001 - 50,000 Monthly Page Views</li>
                            <li>Ability to block internal traffic</li>
                            <li>Another Feature</li>
                            <li>More Features</li>
                        </ul> 
                    </div>
                <!-- <button > Subscribe to Pro</button> -->
                </template>
                <template #footer>
                    <Button severity="success" v-on:click="subscribeToPremium()" icon="pi pi-check" label="Subscribe to Premium" />
                    <!-- <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" /> -->
                </template>
            </Card>
        </div>
    </template>

    <div class="grid">
        <form class="col-8 col-offset-2" id="payment-form">
            <div id="payment-element">
                <!-- Elements will create form elements here -->
            </div>
            
            <div id="error-message">
                <!-- Display error message to your customers here -->
            </div>
            <div v-if="paymentSelected">
                <button id="submit">Subscribe</button>
            </div>
        </form>
    </div>
   </div>
</template>

<script>
import { users } from '../store/modules/users.js'
import { data } from '../store/modules/data.js'
import { firebaseAuth } from '@/api/firebaseauth.js';
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
const stripe = Stripe(import.meta.env.VITE_STRIPE);

export default {
    name: 'PricingTable',
    data () {
        return {
            stripeCustomerID: null,
            users,
            paymentSelected: false,
            proPaymentSelected: false,
            premiumPaymentSelected: false,
            freePaymentSelected: false,
            freeModalVisible: false,
            data
        }
    },
    methods: {
        subscribeToFree() {
            if (this.freePaymentSelected === true) {
                this.premiumPaymentSelected = false;
                this.proPaymentSelected = false;
            }
            else {
                this.premiumPaymentSelected = false;
                this.freePaymentSelected = true;
                this.proPaymentSelected = false;
            }

            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                    if (user) {
                        // User is signed in, see docs for a list of available properties
                        // https://firebase.google.com/docs/reference/js/auth.user
                        const uid = user.uid;
                        this.users.getDomain(uid).then((customer) => {
                            this.stripeCustomerID = customer.stripeCustomerId;
                        }).then(() => {
                            let priceID = 'price_1NnBAGC5aHNyJdzZn6Nku5oM';
                            this.users.createSubscription(priceID, this.stripeCustomerID).then((sub) => {
                                this.$router.push('/dashboard');
                            // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5         
                            
                            // pretty sure everything below this comment is not needed. Once the free item is selected, payment isn't needed.
                                // Need to show a differernt button if the client 
                        })
                    });
                }
                else {
                    // User is signed out
                    this.$router.push('/');
                    console.log('didnt work');
                }
            });
        },
        subscribeToPro() {
            if (this.proPaymentSelected === true) {
                this.premiumPaymentSelected = false;
                this.freePaymentSelected = false;
            }
            else {
                this.premiumPaymentSelected = false;
                this.freePaymentSelected = false;
                this.proPaymentSelected = true;
            }
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                    if (user) {
                        // User is signed in, see docs for a list of available properties
                        // https://firebase.google.com/docs/reference/js/auth.user
                        const uid = user.uid;
                        this.users.getDomain(uid).then((customer) => {
                            this.stripeCustomerID = customer.stripeCustomerId;
                            }).then(() => {
                                let priceID = 'price_1Ng93lC5aHNyJdzZB2pxJkfj';
                                this.users.createSubscription(priceID, this.stripeCustomerID).then((sub) => {
                                    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5                                
                                    const options = {
                                        clientSecret: sub.latest_invoice.payment_intent.client_secret,
                                        appearance: {/*...*/},
                                    };
                                    const elements = stripe.elements(options);

                                    // Create and mount the Payment Element
                                    const paymentElement = elements.create('payment');
                                    paymentElement.mount('#payment-element');
                                    const form = document.getElementById('payment-form');
                                    this.paymentSelected = true;

                                    form.addEventListener('submit', async (event) => {
                                    event.preventDefault();

                                    const {error} = await stripe.confirmPayment({
                                        //`Elements` instance that was used to create the Payment Element
                                        elements,
                                        confirmParams: {
                                        // return_url: "http://localhost:5173/dashboard",
                                        return_url: "https://owlsightdashboard.onrender.com/dashboard",
                                        }
                                    });

                                    if (error) {
                                        // This point will only be reached if there is an immediate error when
                                        // confirming the payment. Show error to your customer (for example, payment
                                        // details incomplete)
                                        const messageContainer = document.querySelector('#error-message');
                                        messageContainer.textContent = error.message;
                                    } else {
                                        // Your customer will be redirected to your `return_url`. For some payment
                                        // methods like iDEAL, your customer will be redirected to an intermediate
                                        // site first to authorize the payment, then redirected to the `return_url`.
                                    }
                                });
                            })
                        });

                    } 
                    else 
                    {
                        // User is signed out
                        this.$router.push('/');
                        console.log('didnt work');
                    }
            });
        },
        subscribeToPremium () {
            if (this.premiumPaymentSelected === true) {
                this.proPaymentSelected = false;
                this.freePaymentSelected = false;
            }
            else {
                this.premiumPaymentSelected = true;
                this.proPaymentSelected = false;
                this.freePaymentSelected = false;
            }
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                    if (user) {
                        // User is signed in, see docs for a list of available properties
                        // https://firebase.google.com/docs/reference/js/auth.user
                        const uid = user.uid;
                        this.users.getDomain(uid).then((customer) => {
                            this.stripeCustomerID = customer.stripeCustomerId;
                            }).then(() => {
                                let priceID = 'price_1Ng94FC5aHNyJdzZ5GmbiZFo';
                                this.users.createSubscription(priceID, this.stripeCustomerID).then((sub) => {
                                    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5                                
                                    const options = {
                                        clientSecret: sub.latest_invoice.payment_intent.client_secret,
                                        appearance: {/*...*/},
                                    };
                                    const elements = stripe.elements(options);

                                    // Create and mount the Payment Element
                                    const paymentElement = elements.create('payment');
                                    paymentElement.mount('#payment-element');
                                    const form = document.getElementById('payment-form');
                                    this.paymentSelected = true;

                                    form.addEventListener('submit', async (event) => {
                                    event.preventDefault();

                                    const {error} = await stripe.confirmPayment({
                                        //`Elements` instance that was used to create the Payment Element
                                        elements,
                                        confirmParams: {
                                        // return_url: "http://localhost:5173/dashboard",
                                        return_url: "https://owlsightdashboard.onrender.com/dashboard",
                                        }
                                    });

                                    if (error) {
                                        // This point will only be reached if there is an immediate error when
                                        // confirming the payment. Show error to your customer (for example, payment
                                        // details incomplete)
                                        const messageContainer = document.querySelector('#error-message');
                                        messageContainer.textContent = error.message;
                                    } else {
                                        // Your customer will be redirected to your `return_url`. For some payment
                                        // methods like iDEAL, your customer will be redirected to an intermediate
                                        // site first to authorize the payment, then redirected to the `return_url`.
                                    }
                                });
                            })
                        });

                    } 
                    else 
                    {
                        // User is signed out
                        this.$router.push('/');
                        console.log('didnt work');
                    }
            });
        },
    },
}
</script>