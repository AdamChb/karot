<!-- ------------------------------
  Karot_2.0 - App.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the main page of the website.
------------------------------ -->

<script>
import HeaderKarot from "./components/HeaderKarot";
import FooterKarot from "./components/FooterKarot";

export default {
  name: "App",
  components: {
    HeaderKarot,
    FooterKarot,
  },
  data() {
    return {
      isLoggedIn: false,
      id_user: 0,
    }
  },
  methods: {
    loggedInUpdate(id) {
      this.id_user = id;
      this.isLoggedIn = this.id_user ? true : false;
    }
  }
};
</script>

<template>
  <!-- TEMP: Ne pas oublier de supprimer cette chose !!!!! -->
  <router-link to="/">HomePage</router-link> |
  <router-link to="/logIn">LogIn</router-link> |
  <router-link to="/signUp">SignUp</router-link> |
  <router-link to="/myAccount">MyAccount</router-link> |

  <!-- General structure of the website -->
  <HeaderKarot :isLoggedIn="isLoggedIn"/>
  <router-view :isLoggedIn="isLoggedIn" :id_user="id_user" @loggedInUpdate="loggedInUpdate"/>
  <FooterKarot />
</template>

<style>
/* Import of the used font */
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&display=swap");

/* General style of the website */
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-family: Inter;
}

.blue {
  background-color: #2f4858;
}

.orange {
  background-color: #ea5b0c;
}

.white {
  background-color: white;
}

.txt-orange {
  color: #ea5b0c;
}

.txt-white {
  color: white;
}

::-webkit-scrollbar-thumb {
  background-color: #ea5b0c;
  border: 4px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;
}

::-webkit-scrollbar {
  width: 16px;
}
</style>
