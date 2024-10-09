<!-- ------------------------------
  Karot_2.0 - MyMeals.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the page with all user's saved meals.
------------------------------ -->

<script>
import RecipeCard from "../components/RecipeCard.vue";

export default {
  name: "RecipesPage",
  props: {
    isLoggedIn: Boolean,
    id_user: Number,
  },
  components: {
    RecipeCard,
  },
  data() {
    return {
      recipes: [], // Updated to be populated from the backend
    };
  },
  async created() {
    await this.fetchMeals(); // Fetch meals when the component is created
  },
  methods: {
    // Fetch meals from the backend
    async fetchMeals() {
      try {
        const response = await fetch(`http://localhost:3000/api/get-planned-meals?userId=${this.id_user}`);
        if (!response.ok) {
          throw new Error(`Error fetching meals: ${response.statusText}`);
        }
        const data = await response.json();
        this.recipes = data;
      } catch (error) {
        console.error("Error fetching planned meals:", error);
      }
    },

    // Delete meal from the user's planned meals
    async deleteMeal(recipeId) {
      try {
        const response = await fetch(`http://localhost:3000/api/check-meal?userId=${this.id_user}&recipeId=${recipeId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`Error deleting meal: ${response.statusText}`);
        }
        await this.fetchMeals(); // Refresh the meals list after deletion
      } catch (error) {
        console.error("Error deleting meal:", error);
      }
    },
  },
};
</script>

<template>
  <section class="orange home">
    <div id="row-home">

      <!-- Title -->
      <div class="container-fluid txt-white" id="hook">
        <h1>My meals</h1>
        <p>Check them when they're done !</p>
      </div>

      <!-- Recipes -->
      <div class="container-fluid">
        <div class="container-recipes">
          <div v-for="recipe in recipes" :key="recipe.ID_Recipe" class="recipe">
            <p @click="deleteMeal(recipe.ID_Recipe)">×</p>
            <RecipeCard :recipe="recipe"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Style of the recipes */
.container-recipes p {
  color: white;
  text-align: right;
  margin: 0;
  padding-right: .5em;
  cursor: pointer;
  font-size: 1.5em;
}
.container-recipes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.recipe {
  background-color: #2f4858;
  margin: 1em;
  border-radius: 0.4em;
}

/* Style of the home page */
.home {
  height: fit-content;
  padding: 2em;
}

h1 {
  font-size: 4em !important;
  margin-bottom: 1em;
  font-weight: 800 !important;
}

/* Style of the div #hook */
.container-fluid {
  width: 75%;
  padding: 0.5em 0;
}

#hook {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5em 0 1em 0;
}

#hook h1 {
  margin-bottom: 0.5em;
  line-height: 1.1em;
}

#hook p {
  font-size: 1em;
  font-weight: 400;
}
</style>
