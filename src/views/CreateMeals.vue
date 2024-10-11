<!-- ------------------------------
  Karot_2.0 - CreateMeals.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the page to create meals.
------------------------------ -->

<script setup>
import IngredientsSectionCreate from "@/components/IngredientsSectionCreate.vue";
import MealSectionCreate from "@/components/MealSectionCreate.vue";
</script>

<script>
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
      ingredientsSelected: [],
      ingredientsUnselected: [],
    };
  },
  async beforeMount() {
    // Fetch the ingredients from the API
    try {
      const response = await fetch("http://localhost:3000/api/ingredients");
      console.log(response);
      this.ingredientsUnselected = await response.json();
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  },
  methods: {
    // Add meal to the user's planned meals
    async addMeal(recipeId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/check-meal?userId=${this.id_user}&recipeId=${recipeId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: this.id_user,
              recipeId,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`Error adding meal: ${response.statusText}`);
        }
        alert("Meal added to your planned meals!");
      } catch (error) {
        console.error("Error adding meal:", error);
      }
    },
    // Functions to display the generated meal
    async generate() {
      this.generated = "true";
      const result_generate = await fetch(
        "http://localhost:3000/api/generateMeal?ids=" +
          this.ingredientsSelected
            .map((ingredient) => ingredient.ID_Ingredient)
            .join(",")
      );
      this.actualMeal = await result_generate.json();
    },
    // Function to unselect of an ingredient
    unselect(ingredientId) {
      // Find the ingredient in the active list
      console.log(ingredientId);
      console.log(this.ingredientsSelected);
      const ingredient = this.ingredientsSelected.find(
        (ingredient) => ingredient.ID_Ingredient === ingredientId
      );

      // Add the ingredient to the unactive list
      this.ingredientsUnselected.push(ingredient);

      // Remove the ingredient from the active list
      this.ingredientsSelected = this.ingredientsSelected.filter(
        (ingredient) => ingredient.ID_Ingredient !== ingredientId
      );
    },

    // Function to select an ingredient
    select(ingredientId) {
      console.log(ingredientId);
      console.log(this.ingredientsUnselected);
      // Find the ingredient in the unactive list
      const ingredient = this.ingredientsUnselected.find(
        (ingredient) => ingredient.ID_Ingredient === ingredientId
      );

      // Add the ingredient to the active list
      this.ingredientsSelected.push(ingredient);

      // Remove the ingredient from the unactive list
      this.ingredientsUnselected = this.ingredientsUnselected.filter(
        (ingredient) => ingredient.ID_Ingredient !== ingredientId
      );
    },
  },
};
</script>

<template>
  <div id="body-createmeal">
    <!-- Component that contains the selection of ingredients -->
    <div id="ingredients-section">
      <IngredientsSectionCreate
        :ingredientsSelected="ingredientsSelected"
        :ingredientsUnselected="ingredientsUnselected"
        @select="select"
        @unselect="unselect"
      />
    </div>

    <!-- Component that contains the generated meal -->
    <div id="meal-section">
      <MealSectionCreate :generated="generated" @generate="generate" />
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

@media screen and (max-width: 1024px) {
  #body-createmeal {
    flex-direction: column-reverse;
    height: 100vh;
  }

  #ingredients-section {
    width: 100%;
    margin-left: 0;
  }

  #meal-section {
    width: 100%;
    margin-right: 0;
  }
}
</style>
