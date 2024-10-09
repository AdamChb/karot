<!-- ------------------------------
  Karot_2.0 - CreateMeals.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the page to create meals.
------------------------------ -->

<script>
import IngredientsSectionCreate from "@/components/IngredientsSectionCreate.vue";
import MealSectionCreate from "@/components/MealSectionCreate.vue";

export default {
  name: "createMeals",
  components: {
    IngredientsSectionCreate,
    MealSectionCreate,
  },
  props: {
    id_user: Number,
  },
  data() {
    return {
      generated: "false",
    };
  },
  methods: {
     // Add meal to the user's planned meals
     async addMeal(recipeId) {
      try {
        const response = await fetch(`http://localhost:3000/api/check-meal?userId=${this.id_user}&recipeId=${recipeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: this.id_user,
            recipeId,
          }),
        });
        if (!response.ok) {
          throw new Error(`Error adding meal: ${response.statusText}`);
        }
        alert("Meal added to your planned meals!");
      } catch (error) {
        console.error("Error adding meal:", error);
      }
    },
    // Functions to display the generated meal
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
    <!-- Component that contains the selection of ingredients -->
    <div id="ingredients-section">
      <IngredientsSectionCreate />
    </div>

    <!-- Component that contains the generated meal -->
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
/* Style of the page CreateMeal */
#body-createmeal {
  display: flex;
  height: 75vh;
  width: 100%;
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
