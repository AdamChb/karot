<!-- ------------------------------
  Karot_2.0 - HomePage.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the home page.
------------------------------ -->

<script>
import HomePageFirst from "../components/HomePageFirst.vue";
import HomePageSecond from "../components/HomePageSecond.vue";
import HomePageThird from "../components/HomePageThird.vue";

export default {
  name: "HomePage",
  components: {
    HomePageFirst,
    HomePageSecond,
    HomePageThird,
  },
  props: {
    isLoggedIn: Boolean,
    id_user: Number,
  }
};
</script>

<template>
  <!-- Components that form the home page -->
  <HomePageFirst :isLoggedIn="isLoggedIn" :id_user="id_user"/>
  <HomePageSecond />
  <HomePageThird :isLoggedIn="isLoggedIn" :id_user="id_user"/>
</template>
