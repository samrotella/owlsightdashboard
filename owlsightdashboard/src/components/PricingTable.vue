<template>
   <!-- insert two cards, one 'basic' and one 'pro' -->
   <div>
    <template class="grid">
        <div class="col-3 col-offset-1">
            <Card>
                <template #subtitle> Pro </template>
                <template #content>
                    <div class="card justify-content-center">
                    </div>
                <button v-on:click="subscribeToPro()"> Subscribe to Pro</button>
                </template>
            </Card>
        </div>
        
        <div class="col-4 col-offset-0">
            <Card>
                <template #subtitle> Premium </template>
                <template #content>
                    <div class="card justify-content-center"></div>
                </template>
                <button v-on:click="subscribeToPremium()">Subscribe to Premium</button>
            </Card>
        </div>
    </template>
    <form id="payment-form">
        <div id="payment-element">
            <!-- Elements will create form elements here -->
        </div>
        <button id="submit">Subscribe</button>
        <div id="error-message">
            <!-- Display error message to your customers here -->
        </div>
    </form>
   </div>
</template>

<script>
import { users } from '../store/modules/users.js'
import { data } from '../store/modules/data.js'
import { firebaseAuth } from '@/api/firebaseauth.js';
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";

const stripe = Stripe('pk_test_51Nch7ZC5aHNyJdzZYddKrc2rbf8d6akGOFT6MMeJR7pkSQ0HA5ccycRnROmvtrFRyTH8MWrTbl30LHPSdKVTe2Tt00HvLbQLWu');

export default {
    name: 'PricingTable',
    data () {
        return {
            stripeCustomerID: null,
            users,
            data
        }
    },
    methods: {
        subscribeToPro() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/auth.user
                    const uid = user.uid;
                    // const email = user.email;
                    this.users.getDomain(uid).then((customer) => {
                        // console.log(customer.stripeCustomerId);
                        this.stripeCustomerID = customer.stripeCustomerId;
                        
                        // this.subscribeToPro(customer.stripeCustomerId)
                    }).then(() => {
                        let priceID = 'price_1Ng93lC5aHNyJdzZB2pxJkfj';
                        this.users.createSubscription(priceID, this.stripeCustomerID).then((sub) => {
                            // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5
                            
                            const options = {
                                //   clientSecret: 'pi_3NhKlhC5aHNyJdzZ0PGQcYKe_secret_wt7q0BmgYYIRySEaDHWiDsAzj',
                                    clientSecret: sub.latest_invoice.payment_intent.client_secret,
                                // Fully customizable with appearance API.
                                    appearance: {/*...*/},
                            };
                            const elements = stripe.elements(options);

                            // Create and mount the Payment Element
                            const paymentElement = elements.create('payment');
                            paymentElement.mount('#payment-element');
                            const form = document.getElementById('payment-form');

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
                        }).then(() => {
                            
                        })
                    });

                } else {
                    // User is signed out
                    this.$router.push('/');
                    console.log('didnt work');

            }
        });

        


        // let custID = this.stripeCustomerID;
        // console.log(custID);

        },
        subscribeToPremium () {
            let priceID = 'price_1Ng94FC5aHNyJdzZ5GmbiZFo';
        },
        async confirmPayment () {
            const {error} = await stripe.confirmPayment({
                //`Elements` instance that was used to create the Payment Element
                elements,
                confirmParams: {
                    return_url: "https://owlsightdashboard.onrender.com/dashboard",
                }
            });

            if (error) {
                // This point will only be reached if there is an immediate error when
                // confirming the payment. Show error to your customer (for example, payment
                // details incomplete)
                console.log('error on conform payment: ' + error);
                const messageContainer = document.querySelector('#error-message');
                messageContainer.textContent = error.message;
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                console.log('worked? ');
                // Your customer will be redirected to your `return_url`. For some payment
                // methods like iDEAL, your customer will be redirected to an intermediate
                // site first to authorize the payment, then redirected to the `return_url`.
                
            } else {
                console.log('paymentIntent: ' + paymentIntent)
                console.log('paymentIntent.status: ' + paymentIntent.status)
            }
        }
    },
}
// const form = document.getElementById('payment-form');

// form.addEventListener('submit', async (event) => {
//   event.preventDefault();

  
// });
</script>
