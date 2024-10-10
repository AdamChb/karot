<!-- ------------------------------
  Karot_2.0 - Recipespage.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the page to display the recipes.
------------------------------ -->

<script>
import RecipeCard from "../components/RecipeCard.vue";

export default {
  name: "RecipesPage",
  components: {
    RecipeCard,
  },
  data() {
    return {
      recipes: [],
    };
  },
};
</script>

<template>
  <section class="orange home">
    <div id="row-home">
      <!-- Title of the page -->
      <div class="container-fluid txt-white" id="hook">
        <h1>Discover recipes</h1>
        <div>
          <p>You want to add your own?</p>
          <!-- TEMP : A link to the Recipe Creation page is required -->
          <router-link to="/addRecipe">
            <button id="start-now">Create your recipe</button>
          </router-link>
        </div>
      </div>

      <!-- Search bar -->
      <div class="container-fluid">
        <input type="search" placeholder="Research a recipe" />
      </div>
      <div class="container-fluid">
        <!-- List of all the recipes corresponding with the research -->
        <div class="container-recipes">
          <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
            <RecipeCard :recipe="recipe" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Style of the search bar */
.container-recipes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.recipe {
  padding: 2em 1em;
}
input {
  width: 100%;
  padding: 0.3em 0.5em;
  margin: 1em 0;
  border-radius: 7px;
  border: 2px solid black;
  transition: 0.3s;
}
input:focus {
  outline: none;
  transform: scale(1.02);
  transition: 0.3s;
}
input:hover {
  transform: scale(1.02);
  transition: 0.3s;
}

.home {
  height: fit-content;
  padding: 2em;
}

.row {
  height: 100%;
  margin: 0 !important;
}

h1 {
  font-size: 4em !important;
  margin-bottom: 1em;
  font-weight: 800 !important;
}

.container-fluid {
  width: 75%;
  padding: 0.5em 0;
}

#hook {
  display: flex;
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

#start-now {
  font-size: 1.3em;
  font-weight: 500;
  padding: 0 0.8em;
  height: 2em;
  border-radius: 10px;
  border: 3px solid white;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  transition: 0.3s;
}
#start-now:hover {
  transform: scale(1.05);
  transition: 0.3s;
}

.recipe-card {
  background-color: #2f4858;
  margin: 1em;
  border-radius: 0.4em;
}
</style>
