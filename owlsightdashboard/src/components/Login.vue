<script>
import { firebaseAuth } from '@/api/firebaseauth.js';

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      signUp: false
    }
  },
  methods: {
    // ...mapActions("meeting", ["updateUserNameAction", "getMeetings"]),
    // ...mapMutations('user', ['setUserAuthState', 'setFirebaseUserGuid']),
    switchToSignUp(){
      this.signUp = true;
    },
    switchToSignIn(){
      this.signUp = false;
    },
    signUp () {
      let { auth, createUserWithEmailAndPassword } = firebaseAuth;
      createUserWithEmailAndPassword(auth, this.username, this.password)
        .then((user) => {
          // this.updateUserNameAction(user.user.uid);
          // var newUserPayload = {
          //   'username': this.username,
          //   'userGuid': user.user.uid
          // }
          // this.createNewInternalUser(newUserPayload);
          this.username = null;
          this.password = null;
          console.log('new user created')
          this.$router.push('/dashboard')
        })
        .catch((error) => {
          console.log('error creating new user');
        });
    },
    signIn () {
      let { auth, signInWithEmailAndPassword } = firebaseAuth;

      signInWithEmailAndPassword(auth, this.username, this.password).then((userCredential) => {
        const { uid } = userCredential.user;
        // this.updateUserNameAction(uid);
        // this.setFirebaseUserGuid(uid);
        // this.setUserAuthState(true);
        this.username = null;
        this.password = null;
        console.log('in');
        this.$router.push('/dashboard')
        // this.$router.push({ name: 'HomeDashboard' });
      }).catch((error) => {
        console.log('error logging in');
        this.loginAttempts++;
        this.loginErrors = error.message;
      });
    },
    resetPasswordEmail () {
      let { auth, sendPasswordResetEmail } = firebaseAuth;
      
      sendPasswordResetEmail(auth, this.username)
        .then(() => {
            this.passwordSent = true;
            this.loginErrors = null;
        })
        .catch((error) => {
            var errorMessage = error.message;
            this.loginErrors = errorMessage;
        });
    },
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

          <!-- todo first name -->
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

          <!-- todo last name -->
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
            <label for="lastname1">Organization</label>
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
                v-model="password" 
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" 
                type="password"
                placeholder="Password">
            </template>
          </template>

          <template class="flex justify-content-center p-3">
            <Button class="" v-on:click="signUp()"  label="Create Account" />
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
            <Button class="" v-on:click="signIn()"  label="Create Account" />
          </template>
          <template class="flex justify-content-center p-1">
            <Button v-on:click="switchToSignUp()" label="New Here? Sign Up!" link />
          </template>
      </template>
  </Card>
</template>

  <!-- Login -->
  <!-- <div class="">
    <input 
    v-model="username" 
    class="input" 
    type="email"
    placeholder="email@onespot.com">
    <span class="">
      <i class=""></i>
    </span>
    <input 
    v-model="password" 
    class="input" 
    type="password"
    placeholder="password">
    <span class="">
      <i class=""></i>
    </span>
  </div> -->

<!-- End Login -->

<style>
/* h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */
</style>
