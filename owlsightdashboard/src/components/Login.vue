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
      signInError: '',
      resetPassword: '',
      users
    }
  },
  methods: {
    switchToSignUp(){
      this.signInError = '';
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
          console.log(JSON.stringify(error.code));
          if (error.code === 'auth/invalid-email') {
            // Display invalid email
            this.signInError = 'Username is invalid.';
          }
          else if (error.code === 'auth/missing-password') {
            // Display missing password
            this.signInError = 'Please enter a password.';
          }
          else if (error.code === 'auth/missing-email') {
            this.signInError = 'Please enter an email address.';
          }
          else if (error.code === 'auth/email-already-in-use') {
            this.signInError = 'There is already an account with this username.';
          }
          else if(error.code === 'auth/weak-password') {
            this.signInError = 'This password is weak. Please create a strong password with more than 6 characters'
          }
          else {
            this.signInError = 'Something went wrong, please try again.';
          }
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
        console.log(JSON.stringify(error.code));
        if (error.code === 'auth/wrong-password') {
          // Display wrong password
          this.signInError = 'This username or password were not found';
        }
        else if (error.code === 'auth/user-not-found') {
          // Display user not found
          this.signInError = 'This username or password were not found';
        }
        else if (error.code === 'auth/invalid-email') {
          // Display invalid email
          this.signInError = 'Username is invalid.';
        }
        else if (error.code === 'auth/missing-password') {
          // Display missing password
          this.signInError = 'Please enter a password.';
        }
        else {
          this.signInError = 'Something went wrong, please try again.';
        }
      });
    },
    resetPasswordEmail () {
      this.signInError = '';
      this.resetPassword = 'If we have an email on record, one will be sent momentarily'
      let { auth, sendPasswordResetEmail } = firebaseAuth;
      sendPasswordResetEmail(auth, this.username)
        .then(() => {
            this.passwordSent = true;
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
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
            <label for="firstname1">Email Address</label>
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

          <!-- <template class="flex justify-content-center p-3">
            <div class="card flex justify-content-center">
                <Panel header="Copy the script tag and insert at the bottom of your body tag">
                    <p>
                      <code>
                        &lt;script>src="https://owlsight.onrender.com/main.js"&lt;/script>
                      </code>
                    </p>
                    <p><Button label="Copy to clipboard" class="" plain text v-on:click="copyScript()" icon="pi pi-copy" /></p>
                </Panel>
            </div>
          </template> -->
          <div v-if="signInError">
            <p style="color: rgb(220, 85, 85);"> {{ signInError }} </p>
          </div>
          <template class="flex justify-content-center p-3">
            <Button class="" v-on:click="signMeUp()"  label="Sign Up" />
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
            <label for="firstname1">Email Address</label>
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
          <div v-if="signInError">
            <p style="color: rgb(220, 85, 85);"> {{ signInError }} </p>
          </div>
          <template class="flex justify-content-center p-1">
            <div v-if="resetPassword">
            <p style="color: rgb(118, 142, 220);"> {{ resetPassword }} </p>
          </div>
          </template>
          
          <template class="flex justify-content-center p-3">
            <Button class="" v-on:click="signIn()"  label="Sign In" />
          </template>
          <template class="flex justify-content-center p-1">
            <Button v-on:click="switchToSignUp()" label="New Here? Sign Up!" link />
          </template>
          <template class="flex justify-content-center p-1">
            <Button v-on:click="resetPasswordEmail()" label="Reset Password" link />
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