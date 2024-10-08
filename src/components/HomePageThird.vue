<!-- ------------------------------
  Karot_2.0 - HomePageThird.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This component is the third block of the home page.
------------------------------ -->

<script>
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  name: "HomePageThird",
  components: {
    RecipeCard,
  },
  data() {
    return { // TEMP: Base de données temporaire pour tester le front end
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
          liked: false,
        },
        {
          id: 2,
          name: "Hawaiian pizza",
          ingredients: ["pasta", "tomato sauce", "basil"],
          instructions: ["Boil the pasta", "Add the tomato sauce", "Add basil"],
          image:
            "https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg",
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
            "https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg",
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
            "https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg",
          author: "Mat15_the_cook",
          like: 7,
          liked: false,
        },
      ],
    };
  }
};
</script>

<template>
  <section class="orange" id="most-liked-recipes">
    <h1>Most liked recipes</h1>
    <div id="recipes">
      <!-- List of most liked recipes -->
      <div class="recipe-card" v-for="recipe in recipes" :key="recipe.id">
        <RecipeCard :recipe="recipe" />
      </div>
    </div>
  </section>
</template>

<style scoped>
#most-liked-recipes {
  padding: 3em 10em;
}

/* Style of the title of the block */
h1 {
  font-size: 3.2em !important;
  font-weight: 500;
  margin-bottom: 0.6em;
  color: white;
}

/* Disposition of the cards */
#recipes {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 1.8em;
}

.recipe-card {
  background-color: #2f4858;
  margin: 1em;
  border-radius: 0.4em;
}

/* Responsive design */
@media only screen and (max-width: 1750px) {
  #most-liked-recipes {
    padding: 3em 5em;
  }
}

@media only screen and (max-width: 1550px) {
  #recipes {
    flex-wrap: wrap;
    justify-content: center;
    gap: 3em;
  }
}

@media only screen and (max-width: 550px) {
  #most-liked-recipes {
    padding: 3em 1em;
  }

  #most-liked-recipes h1 {
    font-size: 2.5em !important;
    padding: 0 1em;
  }

  #recipes {
    gap: 1em;
  }
}
</style>
