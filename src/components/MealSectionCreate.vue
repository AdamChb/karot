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
  props: ["generated"],
  methods: {
    // Functions to display the generated meal
    generatechild() {
      this.$emit("generate");
    },
    resetchild() {
      this.$emit("reset");
    },
  },
};
</script>

<template>
  <!-- Structure of the meal section creation -->
  <MealSectionCreateText
    :generated="generated"
    @generate="generatechild"
    @reset="resetchild"
  />
  <MealSectionCreateResult v-if="generated === 'true'" />
</template>
