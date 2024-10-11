<!-- ------------------------------
  Karot_2.0 - MealSectionCreate.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This component is the section where the user can create a meal.
------------------------------ -->

<script setup>
import MealSectionCreateText from "./MealSectionCreateText.vue";
import MealSectionCreateResult from "./MealSectionCreateResult.vue";
</script>

<script>
export default {
  name: "MealSectionCreate",
  props: {
    generated: String,
  },
  data() {
    return {
      meals_generated: [],
      id: 0,
    };
  },

  methods: {
    // Functions to display the generated meal
    generate() {
      this.$emit("generate");
    },
    actualMeal() {
      return this.meals_generated[this.id];
    },
  },
};
</script>

<template>
  <!-- Structure of the meal section creation -->
  <MealSectionCreateText :generated="generated" @generate="generate" />
  <MealSectionCreateResult v-if="generated === 'true'" :meal="actualMeal()" />
</template>
