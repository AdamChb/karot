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
  props: {
    isLoggedIn: Boolean,
    id_user: Number,
  },
  components: {
    RecipeCard,
  },
  data() {
    return {
      recipes: [],
      search: "",
      awaitresponse: false,
    };
  },

  async beforeMount() {
    this.searchRecipe();
  },

  methods: {
    async searchRecipe() {
      try {
        this.recipes = [];
        this.awaitresponse = true;
        const meal_reponse = await fetch(
          `http://127.0.0.1:3000/api/get-search-results?userId=${this.id_user}` +
            (this.search == "" ? "" : "&search=" + this.search)
        );
        this.recipes = await meal_reponse.json();
        this.awaitresponse = false;
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },
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
      <div id="input-box" class="container-fluid">
        <input
          v-model="search"
          type="search"
          placeholder="Research a recipe"
          @keyup.enter="searchRecipe()"
        />
        <img
          id="searchButton"
          @click="searchRecipe()"
          src="../assets/loupe.png"
          alt="search"
        />
      </div>
      <div class="container-fluid">
        <div v-if="awaitresponse" class="loader container-fluid"></div>
        <!-- List of all the recipes corresponding with the research -->
        <div class="container-recipes">
          <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
            <RecipeCard :recipe="recipe" :isLoggedIn="isLoggedIn" :id_user="id_user"/>
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
  justify-content: center;
}
.recipe {
  padding: 2em 1em;
}

#row-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

input {
  width: 95%;
  padding: 0;
  margin: 0;
  transition: 0.3s;
}

input:focus {
  outline: none;
}

#input-box {
  display: flex;
  width: 80%;
  padding: 0.3em 0.5em;
  margin: 1em 0;
  border-radius: 7px;
  border: 2px solid black;
  background-color: white;
  transition: 0.3s;
  justify-content: space-between;
}

#input-box:has(input:focus) {
  transform: scale(1.02);
  transition: 0.3s;
}
#input-box:hover {
  transform: scale(1.02);
  transition: 0.3s;
}

#searchButton {
  cursor: pointer;
  width: 2em;
  height: 2em;
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
  justify-self: center;
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
  font-size: 1.2em;
  font-weight: 500;
  padding: .1em .8em;
  height: auto;
  border-radius: 8px;
  border: 2px solid white;
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

.loader {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #ea5b0c; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 1080px) {
  #hook {
    flex-direction: column;
  }
}
</style>
