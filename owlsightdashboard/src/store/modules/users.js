import { reactive } from 'vue'
import Axios from "axios";
export const users = reactive({
    createNewInternalUser(payload) {
      return new Promise((resolve, reject) => {
        // Axios.get(`http://localhost:3000/createNewUser`).then((response) => {
          Axios.post('https://owlsight-api.onrender.com/createNewUser', {
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
    }   
})