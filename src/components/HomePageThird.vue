<script>
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  name: "HomePageThird",
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

h1 {
  font-size: 3.2em !important;
  font-weight: 500;
  margin-bottom: 0.6em;
  color: white;
}

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

.card {
  height: 19em;
  aspect-ratio: 0.84;
  display: flex;
  overflow: hidden;
  border-radius: 10px;
  border: none;
}

.card img.card-img-top {
  /* flex: 1; */
  object-fit: cover;
  height: 15em;
}

.card-body {
  padding: 0 !important;
  /* flex: 0; */
}

.card-body .row {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.card-body .row .col-8 {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}

.card-title {
  font-size: 1em;
  margin-bottom: 0;
}

.card-body p {
  font-size: 0.6em;
}

.card-body .col-8 {
  padding: 10px 0 0 25px;
}

.card-body .col-8 p {
  margin-bottom: 5px;
}

.card-body .col-4 {
  display: flex;
  align-items: center;
}

.card-body .col-4 h4 {
  font-size: 0.8em;
  margin: 0 !important;
  margin-right: 10px !important;
}

.card-body .col-4 img {
  width: 1.1em;
  height: 1.1em;
}

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

  .card {
    aspect-ratio: 0.84;
  }

  .card-body .col-8 {
    padding: 10px 0 0 20px;
    font-size: 0.8em;
  }

  .card-body .col-8 p {
    margin-bottom: 3px;
  }

  .card-body .col-4 h4 {
    font-size: 0.7em;
  }

  .card-body .col-4 img {
    width: 1em;
    height: 1em;
  }
}
</style>
