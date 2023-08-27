<script>
import { firebaseAuth } from '@/api/firebaseauth.js';
import { users } from '../store/modules/users.js'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      domain: '',
      signUp: false,
      scriptTextInput: '',
      users
    }
  },
  methods: {
    switchToSignUp(){
      this.signUp = true;
    },
    switchToSignIn(){
      this.signUp = false;
    },
    // push the person to the credit card stepper
    signMeUp() {
      let { auth, createUserWithEmailAndPassword } = firebaseAuth;
      createUserWithEmailAndPassword(auth, this.username, this.password)
        .then((user) => {
          var newUserPayload = {
            // username: payload.username,
            'username': this.username,
            'domain': this.domain,
            'userGuid': user.user.uid
          }
          this.users.domain = this.domain;
          this.users.createNewInternalUser(newUserPayload);
          this.username = null;
          this.password = null;
          console.log('new user created')
          this.$router.push('/PricingTable')
        })
        .catch((error) => {
          console.log('error creating new user');
        });
    },
    signIn() {
      let { auth, signInWithEmailAndPassword } = firebaseAuth;

      signInWithEmailAndPassword(auth, this.username, this.password).then((userCredential) => {
        const { uid } = userCredential.user;
        this.username = null;
        this.password = null;
        this.$router.push('/dashboard')
      }).catch((error) => {
        console.log('error logging in');
      });
    },
    resetPasswordEmail () {
      let { auth, sendPasswordResetEmail } = firebaseAuth;
      
      sendPasswordResetEmail(auth, this.username)
        .then(() => {
            this.passwordSent = true;
        })
        .catch((error) => {
            var errorMessage = error.message;
        });
    },
    copyScript () {
      navigator.clipboard.writeText('<script>src="https://owlsight.onrender.com/main.js"' + '<' + '/script>');
    }
  }
}
</script>
<!-- Sign In -->

<!-- Sign Up -->
<template class="grid">
  <Card v-if="this.signUp" class="col-6 col-offset-3">
      <template #title> Sign Up </template>
      <template #content>
          <template class="block">
            <label for="firstname1">Username</label>
            <template class="flex pt-1">
              <input 
                v-model="username" 
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" 
                type="email"
                placeholder="email@gmail.com">
            </template>
          </template>

          <template class="block pt-3">
            <label for="lastname1">Password</label>
            <template class="flex pt-1">
              <input 
                v-model="password" 
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" 
                type="password"
                placeholder="Password">
            </template>
          </template>
          
          <!-- todo -->
          <template class="block pt-3">
            <label for="lastname1">Domain</label>
            <template class="flex pt-1">
              <input 
                v-model="domain" 
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" 
                type="text"
                placeholder="testing.com">
            </template>
          </template>

          <template class="flex justify-content-center p-3">
            <div class="card flex justify-content-center">
              <!-- <Textarea value="<script></script>" rows="3" cols="60" /> -->
                <Panel header="Copy the script tag and insert at the bottom of your body tag">
                    <p>
                      <code>
                        &lt;script>src="https://owlsight.onrender.com/main.js"&lt;/script>
                      </code>
                    </p>
                    <p><Button label="Copy to clipboard" class="" plain text v-on:click="copyScript()" icon="pi pi-copy" /></p>
                </Panel>
            </div>
          </template>

          <template class="flex justify-content-center p-3">
            <Button class="" v-on:click="signMeUp()"  label="Sign In" />
          </template>
          <template class="flex justify-content-center p-1">
            <Button v-on:click="switchToSignIn()" label="Have an Account? Sign In" link />
          </template>
      </template>
  </Card>

  <Card v-else class="col-6 col-offset-3">
      <template #title> Sign In </template>
      <template #content>
          <template class="block">
            <label for="firstname1">Username</label>
            <template class="flex pt-1">
              <input 
                v-model="username" 
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" 
                type="email"
                placeholder="email@gmail.com">
            </template>
          </template>

          <template class="block pt-3">
            <label for="lastname1">Password</label>
            <template class="flex pt-1">
              <input 
                v-model="password" 
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" 
                type="password"
                placeholder="Password">
            </template>
          </template>
          <template class="flex justify-content-center p-3">
            <Button class="" v-on:click="signIn()"  label="Sign In" />
          </template>
          <template class="flex justify-content-center p-1">
            <Button v-on:click="switchToSignUp()" label="New Here? Sign Up!" link />
          </template>
      </template>
  </Card>
</template>
<style>
code { 
  background: #474749;
  color: rgb(178, 226, 215);
  word-wrap: break-word;
  box-decoration-break: clone;
  /* padding: .1rem .3rem .2rem; */
  border-radius: .2rem;
}
</style>