<script>
import HeaderKarot from "./components/HeaderKarot";
import FooterKarot from "./components/FooterKarot";

export default {
  name: "App",
  components: {
    HeaderKarot,
    FooterKarot,
  },
};
</script>

<template>
  <router-link to="/">HomePage</router-link> |
  <router-link to="/logIn">LogIn</router-link> |
  <router-link to="/signUp">SignUp</router-link> |
  <router-link to="/myAccount">MyAccount</router-link> |
  <HeaderKarot />
  <router-view />
  <FooterKarot />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&display=swap");

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
