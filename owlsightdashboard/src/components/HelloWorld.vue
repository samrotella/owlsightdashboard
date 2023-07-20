<script>
import { useFirestore } from 'vuefire'
import { firebaseAuth } from '@/api/firebaseauth.js';

export default {
  name: 'LogIn',
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: null,
      loginErrors: null,
      loginAttempts: 0,
      userGuid: null,
      isSignUp: null,
      passwordSent: false
    }
  },
  methods: {
    // ...mapActions("meeting", ["updateUserNameAction", "getMeetings"]),
    // ...mapMutations('user', ['setUserAuthState', 'setFirebaseUserGuid']),
    signIn () {
      let { auth, signInWithEmailAndPassword } = firebaseAuth;
      this.loginErrors = null;

      signInWithEmailAndPassword(auth, this.username, this.password).then((userCredential) => {
        const { uid } = userCredential.user;
        // this.updateUserNameAction(uid);
        // this.setFirebaseUserGuid(uid);
        // this.setUserAuthState(true);
        this.username = null;
        this.password = null;
        console.log('in');
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
          //this.$router.push('HomeDashboard')
        })
        .catch((error) => {
          console.log('error creating new user');
          this.loginErrors = error.message;
        });
    },
  }
}
</script>

<template>
  <!-- <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div> -->

  <!-- Login -->
  <div class="">
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
    <button 
      v-on:click="signUp()" 
      class="">
        Create Account
    </button>
  </div>

<!-- End Login -->
</template>

<style scoped>
h1 {
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
}
</style>
