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
};
</script>

<template>
  <HomePageFirst />
  <HomePageSecond />
  <HomePageThird />
</template>
