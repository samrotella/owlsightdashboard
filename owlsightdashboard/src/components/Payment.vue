<template>
    <!-- <div class="container">
    <section class="row payment-form">
      <h5 class="#e0e0e0 grey lighten-4">
        Payment Method
        <span class="right">$25</span>
      </h5>
      <div class="row">
        <div class="col-md-6 col-lg-4 s12 card-element">
          <label>Card Number</label>
          <div id="card-number-element" class="input-value form-control form-control-border"></div>
        </div>
        <div class="col-md-6 col-lg-4 s6 card-element">
          <label>Expiry Date</label>
          <div id="card-expiry-element"></div>
        </div>
        <div class="col-md-6 col-lg-4 s6 card-element">
          <label>CVC</label>
          <div id="card-cvc-element"></div>
        </div>
      </div>
      <div class="error red text-center white-text">{{stripeValidationError}}</div>
      <div class="row mt-3">
        <div class="col s12 place-order-button-block text-center">
          <button class="btn btn-primary mt-2"  type="button" @click.prevent="placeOrder">Place Order</button>
        </div>
      </div>
    </section>
  </div> -->
    <form id="payment-form">
        <div id="payment-element">
            <!-- Elements will create form elements here -->
        </div>
        <button id="submit">Subscribe</button>
        <div id="error-message">
            <!-- Display error message to your customers here -->
        </div>
    </form>
</template>
<!-- <script src="https://js.stripe.com/v3/"></script> -->
<script>
// import {loadStripe} from '@stripe/stripe-js';
// const stripe = await loadStripe('pk_test_51Nch7ZC5aHNyJdzZYddKrc2rbf8d6akGOFT6MMeJR7pkSQ0HA5ccycRnROmvtrFRyTH8MWrTbl30LHPSdKVTe2Tt00HvLbQLWu');


// export default {
//     name: 'PricingTable',
//     data () {
//         return {
//             stripe:null,
//             cardNumberElement:null,
//             cardExpiryElement:null,
//             cardCVCElement:null,
//             stripeValidationError: ''
//         }
//     },
//     mounted (){
//         // var paymentElement = elements.create('payment');
//         this.stripe = Stripe('pk_test_51Nch7ZC5aHNyJdzZYddKrc2rbf8d6akGOFT6MMeJR7pkSQ0HA5ccycRnROmvtrFRyTH8MWrTbl30LHPSdKVTe2Tt00HvLbQLWu') // add your stripe key
//         const options = {
//             clientSecret: '{{CLIENT_SECRET}}',
//             // Fully customizable with appearance API.
//             appearance: {/*...*/},
//         };

//         // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5
//         const elements = stripe.elements(options);
//         this.createAndMountFormElements()
//     },
//     methods: {
//         createAndMountFormElements() {
//             var elements = this.stripe.elements()
//             this.cardNumberElement = elements.create('cardNumber')
//             this.cardNumberElement.mount('#card-number-element')
//             this.cardExpiryElement=elements.create('cardExpiry')
//             this.cardExpiryElement.mount('#card-expiry-element')
//             this.cardCvcElement=elements.create('cardCvc')
//             this.cardCvcElement.mount('#card-cvc-element')
//             this.cardNumberElement.on('change', this.setValidationError)
//             this.cardExpiryElement.on('change', this.setValidationError)
//             this.cardCvcElement.on('change', this.setValidationError)
//         },
//         setValidationError(event) {
//             console.log('setValidationError', event)
//             this.stripeValidationError = event.error ? event.error.message : ''
//         },
//         placeOrder () {
//             // this.stripe.createToken(this.cardNumberElement).then(result => {
//             //     console.log('result', result)
//             //     if (result.error) {
//             //     this.stripeValidationError = result.error.message
//             //     } else if (result.token) {
//             //     console.log('token', result.token)
//             //     }
//             // })
//         }
//     },
// }

</script>

<!-- <style lang="scss" scoped>
  .payment-form {
    max-width: 100%;
    margin: 20px auto;
    border: 1px solid #ececec;
  }
  .payment-form h5 {
    margin: 0;
    padding: 10px;
    font-size: 1.2rem;
  }
  .card-element {
    margin-top: 5px;
  }
  #card-number-element,
  #card-expiry-element,
  #card-cvc-element {
    background: white;
    padding: 5px;
    border: 1px solid #ececec;
  }
  .place-order-button-block {
    margin: 10px 0;
  }
  button {
    background-color: $app-bgm;
  }
</style> -->