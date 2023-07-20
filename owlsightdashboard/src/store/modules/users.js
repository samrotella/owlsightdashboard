const state = () => ({
    isAuthenticated: false,
    firebaseUserGuid: null,
  });
  
//   const mutations = {
//     setUserAuthState (state, boolean) {
//       state.isAuthenticated = boolean;
//     },
//     setFirebaseUserGuid (state, guid) {
//       state.firebaseUserGuid = guid;
//     },
//   };

  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  }