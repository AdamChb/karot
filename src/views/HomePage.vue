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
  },
};
</script>

<template>
  <!-- Components that form the home page -->
  <HomePageFirst :isLoggedIn="isLoggedIn" />
  <HomePageSecond />
  <HomePageThird />
</template>
