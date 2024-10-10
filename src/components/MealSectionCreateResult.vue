<!-- ------------------------------
  Karot_2.0 - MealSectionCreateResult.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This component is the result of the meal creation.
------------------------------ -->

<script>
export default {
  name: "MealSectionCreateResult",
  data() {
    return {
      recipe: { // TEMP: Base de données temporaire avant de connecter à la base de données
        name: "Tagliatelle Carbonara",
        ingredients: {
          Pasta: "300g",
          Bacon: "50g",
          Eggs: "3",
          Salt: "",
          Pepper: "",
          Parmesan: "",
        },
        instructions: ["Boil the pasta", "Add the tomato sauce", "Add basil"],
        like: 47,
        liked: false,
        id: 1,
      }
    };
  },
  methods: {
    // Functions to like or dislike a recipe
    toLike() {
      this.recipe.liked = !this.recipe.liked;
      this.recipe.like += 1;
      // TEMP: Mettre à jour dans la database
    },
    unLike() {
      this.recipe.liked = !this.recipe.liked;
      this.recipe.like -= 1;
      // TEMP: Mettre à jour dans la database
    },

    // Function to go to the recipe page
    goTo(id) {
      this.$router.push({ path: "/recipe", query: { id } });
    },
  },
};
</script>

<template>
  <!-- Generated meal -->
  <div id="generated-meal">
    <!-- Image of the generated meal -->
    <div id="meal-img">
      <img src="@/assets/meal.png" alt="meal" />
    </div>

    <!-- Information about the generated meal -->
    <div id="meal-info">
      <p id="meal-name">Tagliatelle Carbonara</p>
      <div id="sub-info">
        <div>
          <p id="author">by Mathias</p>
        </div>
        <!-- Like button -->
        <div class="like">
          {{ recipe.like }}
          <img
            v-show="!recipe.liked"
            @click="toLike(recipe)"
            src="../assets/not-liked-orange.svg"
            alt="like icon"
          />
          <img
            v-show="recipe.liked"
            @click="unLike(recipe)"
            src="../assets/liked-orange.svg"
            alt="like icon"
          />
        </div>
      </div>
      <div id="ingredient-box">
        <p id="ingredient-title">Ingredients</p>
        <ul id="ingredient-list">
          <li
            class="ingredient-required"
            v-for="(quantity, name, i) in recipe.ingredients"
            :key="i"
          >
            <span v-if="quantity === ''">{{ name }}</span>
            <span v-else>{{ name }}: {{ quantity }}</span>
          </li>
        </ul>
      </div>

      <!-- More information about the meal -->
       <!-- TEMP: Mettre un VRAI lien vers une page recette -->
      <p id="meal-more" @click="goTo(recipe.id)">Click for more...</p>

      <!-- Buttons to reload or add the meal to the user's meals -->
      <div id="buttons-generated">
        <!-- TEMP: Mettre des fonctions sur ces deux boutons -->
        <button class="button-meal" id="reload">Reload</button>
        <button class="button-meal" id="select">Add to My Meals</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style of the generated recipe card */
p {
  margin-bottom: 0;
}

li {
  list-style-type: none;
}

#generated-meal {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  min-height: fit-content;
  height: 60%;
  width: 100%;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 0.5em;
}

#meal-img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 40%;
}

#meal-img img {
  size: cover;
  width: 100%;
  border-radius: 20px;
}

#meal-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100%;
  width: 50%;
}

#sub-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
}

#meal-name {
  font-size: 1.6em;
  font-weight: 600;
  margin: 0;
}

#author {
  font-size: 0.7em;
  color: #7e7e7e;
  margin: 0;
}

.like {
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  margin: 0;
}

.like img {
  width: 1em;
  height: 1em;
  margin-left: 0.3em;
}

#ingredient-box {
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 50%;
}

#ingredient-title {
  font-size: 1em;
  font-weight: 400;
  margin: 0;
}

#ingredient-list {
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  margin: 0;
  padding-left: 0;
}

.ingredient-required {
  font-size: 0.8em;
  margin: 0;
}

#meal-more {
  font-size: 0.8em;
  margin: 0;
  text-decoration: underline;
  cursor: pointer;
}

#buttons-generated {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: fit-content;
  width: 100%;
  margin-top: 0.5em;
}

.button-meal {
  display: flex;
  background-color: #2f4858;
  text-align: center;
  color: #ffffff;
  border: solid white 3px;
  border-radius: 10px;
  cursor: pointer;
  padding: 0.5em;
}
</style>
