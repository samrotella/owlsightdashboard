import { reactive } from 'vue'
import Axios from "axios";
export const users = reactive({
    accountDomain: null,
    customerID: null,
    createNewInternalUser(payload) {
      return new Promise((resolve, reject) => {
          Axios.post('https://owlsight-api.onrender.com/createNewUser', {
            username: payload.username,
            userGuid: payload.userGuid,
            domain: payload.domain
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
    },
    getDomain(userGuid) {
      return new Promise((resolve, reject) => {
        Axios.get(`https://owlsight-api.onrender.com/getDomain/${userGuid}`).then((response) => {   
        this.accountDomain = response.data.domain;
        this.customerID = response.data.stripeCustomerId;
            resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    createSubscription(prc, custID) {
      return new Promise((resolve, reject) => {
        Axios.post(`https://owlsight-api.onrender.com/createSubscription`, {
          price: prc,
          customerID: custID,
        }).then((response) => {
        console.log(response.data)
        resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
      });
    },
    deleteStripeCustomer(customerID) {
      return new Promise((resolve, reject) => {
          // Axios.post(`http://localhost:3000/deleteStripeCustomer`, {
          Axios.post(`https://owlsight-api.onrender.com/deleteStripeCustomer`, {
              stripeCustomerID: customerID
            }).then((response) => {
              resolve(response.data);
              }).catch((error) => {
                  reject(error);
              });
      });
  }
})