<script>
import IngredientsSectionCreate from "@/components/IngredientsSectionCreate.vue";
import MealSectionCreate from "@/components/MealSectionCreate.vue";

export default {
  name: "createMeals",
  components: {
    IngredientsSectionCreate,
    MealSectionCreate,
  },
  data() {
    return {
      generated: "false",
    };
  },
  methods: {
    generate() {
      this.generated = "true";
    },
    reset() {
      this.generated = "false";
    },
  },
};
</script>

<template>
  <div id="body-createmeal">
    <div id="ingredients-section">
      <IngredientsSectionCreate />
    </div>
    <div id="meal-section">
      <MealSectionCreate
        :generated="generated"
        @generate="generate"
        @reset="reset"
      />
    </div>
  </div>
</template>

<style scoped>
#body-createmeal {
  display: flex;
  height: 75vh;
  width: 100vw;
  background-color: #ea5b0c;
  padding-top: 5vh;
  padding-bottom: 5vh;
  box-sizing: content-box;
}

#ingredients-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  height: 100%;
  width: 40vw;
  margin-left: 10vw;
}

#meal-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 40%;
  margin-right: 10vw;
}
</style>
