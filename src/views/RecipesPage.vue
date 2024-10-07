<script>
import RecipeCard from "../components/RecipeCard.vue";

export default {
  name: "RecipesPage",
  components: {
    RecipeCard,
  },
  data() {
    return {
      recipes: [
        {
          id: 1,
          name: "Pasta with tomato sauce",
          ingredients: ["pasta", "tomato sauce", "basil"],
          instructions: ["Boil the pasta", "Add the tomato sauce", "Add basil"],
          image:
            "https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg",
          author: "Adam",
          like: 47,
        },
        {
          id: 2,
          name: "Hawaiian pizza",
          ingredients: ["pasta", "tomato sauce", "basil"],
          instructions: ["Boil the pasta", "Add the tomato sauce", "Add basil"],
          image: "https://chefcuisto.com/files/2024/09/pizza-hawaienne.jpg",
          author: "Mathias",
          like: 98,
          liked: false,
        },
        {
          id: 3,
          name: "Pineapple Pizza",
          ingredients: ["pasta", "tomato sauce", "basil"],
          instructions: ["Boil the pasta", "Add the tomato sauce", "Add basil"],
          image:
            "data:image/jpeg;base64,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",
          author: "Mat",
          like: 39,
          liked: false,
        },
        {
          id: 4,
          name: "Pizza with pineapple",
          ingredients: ["pasta", "tomato sauce", "basil"],
          instructions: ["Boil the pasta", "Add the tomato sauce", "Add basil"],
          image:
            "https://img.cuisineaz.com/1024x1024/2015/06/23/i17906-pizza-hawaienne.jpg",
          author: "Mat15_the_cook",
          like: 7,
          liked: false,
        },
        {
          id: 5,
          name: "Pizza with pineapple",
          ingredients: ["pasta", "tomato sauce", "basil"],
          instructions: ["Boil the pasta", "Add the tomato sauce", "Add basil"],
          image:
            "https://img.cuisineaz.com/1024x1024/2015/06/23/i17906-pizza-hawaienne.jpg",
          author: "Mat15_the_cook",
          like: 7,
          liked: false,
        },
      ],
    };
  },
};
</script>

<template>
  <section class="orange home">
    <div id="row-home">
      <!-- This container is the "hook" of the website
             with a "Sign In" button -->
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
      <div class="container-fluid">
        <input type="search" placeholder="Research a recipe" />
      </div>
      <div class="container-fluid">
        <div class="container-recipes">
          <div v-for="recipe in recipes" :key="recipe.id" class="recipe">
            <RecipeCard :recipe="recipe" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  width: 13em;
  height: 16em;
}
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
/* Style of the home page */
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

/* Style of the div #hook */
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
</style>
