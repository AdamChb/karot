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
  emits: ["generate", "goNext", "addMeal"],
  props: {
    generated: String,
    actualMeal: Object,
  },

  methods: {
    // Functions to display the generated meal
    generate() {
      this.$emit("generate");
    },
    goNext() {
      this.$emit("goNext");
    },
    addMeal(recipeId) {
      this.$emit("addMeal", recipeId);
    },
  },
};
</script>

<template>
  <!-- Structure of the meal section creation -->
  <MealSectionCreateText :generated="generated" @generate="generate" />
  <MealSectionCreateResult
    v-if="generated !== 'false'"
    :meal="actualMeal"
    :generated="generated"
    @goNext="goNext"
    @addMeal="addMeal"
  />
</template>
