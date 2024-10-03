<script setup>
import MealSectionCreateText from "./MealSectionCreateText.vue";
import MealSectionCreateResult from "./MealSectionCreateResult.vue";
</script>

<script>
export default {
  name: "MealSectionCreate",
  props: ["generated"],
  methods: {
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
  <MealSectionCreateText
    :generated="generated"
    @generate="generatechild"
    @reset="resetchild"
  />
  <MealSectionCreateResult v-if="generated === 'true'" />
</template>
