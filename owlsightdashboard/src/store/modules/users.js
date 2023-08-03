import { reactive } from 'vue'
import Axios from "axios";

export const users = reactive({
    createNewInternalUser(payload) {
      console.log('userID from users.js: ' + payload.userGuid);
      console.log('domain from users.js: ' + payload.domain);
    },
})