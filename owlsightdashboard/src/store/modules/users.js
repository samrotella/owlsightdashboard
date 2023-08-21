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
        // console.log('data domain: ' + response.data.domain);    
        this.accountDomain = response.data.domain;
        this.customerID = response.data.stripeCustomerId;
            resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    createSubscription(price, customerID) {
      console.log('price from user: ' + price);
      console.log('price from customerID: ' + customerID);
      return new Promise((resolve, reject) => {
        Axios.post(`https://owlsight-api.onrender.com/createSubscription`).then((response) => {
        // console.log('data domain: ' + response.data.domain);    
        // this.accountDomain = response.data.domain;
        // this.customerID = response.data.stripeCustomerId;
        console.log(response.data)
        resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
      });
    }
    // getCustomerID(userGuid) {
    //   return new Promise((resolve, reject) => {
    //     Axios.get(`https://owlsight-api.onrender.com/getCustomerID/${userGuid}`).then((response) => {
    //     console.log('data domain: ' + response.data.domain);    
    //     this.accountDomain = response.data.domain;
    //         resolve(response.data.domain);
    //         }).catch((error) => {
    //             reject(error);
    //         });
    //     });
    // }
})