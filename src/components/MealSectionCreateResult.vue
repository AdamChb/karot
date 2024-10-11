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
  props: {
    generated: String,
    meal: Object,
  },
  emits: ["goNext", "addMeal"],
  methods: {
    // Functions to like or dislike a recipe
    async toLike(recipe) {
      if (!this.isLoggedIn) {
        alert("You need to be logged in to like a recipe!");
        return;
      }

      recipe.Has_Liked = !recipe.Has_Liked;
      recipe.Likes_Count += 1;

      const info = {
        id_user: this.id_user,
        id_recipe: recipe.ID_Recipe,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      };
      try {
        await fetch(`http://127.0.0.1:3000/api/like-recipe`, options);
      } catch (err) {
        console.log(err);
      }
    },
    async unLike(recipe) {
      if (!this.isLoggedIn) return;

      recipe.Has_Liked = !recipe.Has_Liked;
      recipe.Likes_Count -= 1;

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        await fetch(
          `http://127.0.0.1:3000/api/unlike-recipe?id_user=${this.id_user}&id_recipe=${recipe.ID_Recipe}`,
          options
        );
      } catch (err) {
        console.log(err);
      }
    },

    // Function to go to the recipe page
    goTo(id) {
      this.$router.push({ path: "/recipe", query: { id } });
    },

    goNext() {
      this.$emit("goNext");
    },

    addMeal() {
      this.$emit("addMeal", this.meal.ID_Recipe);
    },
  },
};
</script>

<template>
  <!-- Generated meal -->
  <div v-if="generated === 'searched'" id="generated-meal">
    <!-- Image of the generated meal -->
    <div id="meal-img">
      <img :src="'data:image/jpeg;base64,' + meal.Image" alt="meal" />
    </div>

    <!-- Information about the generated meal -->
    <div id="meal-info">
      <p id="meal-name">{{ meal.Name_Recipe }}</p>
      <div id="sub-info">
        <div>
          <p id="author">by {{ meal.Autho }}</p>
        </div>
        <!-- Like button -->
        <div class="like">
          {{ meal.like }}
          <img
            v-show="!meal.liked"
            @click="toLike(meal)"
            src="../assets/not-liked-orange.svg"
            alt="like icon"
          />
          <img
            v-show="meal.liked"
            @click="unLike(meal)"
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
            v-for="(ingredient, i) in meal.Ingredients_With_Quantity.split(',')"
            :key="i"
          >
            <p>{{ ingredient }}</p>
          </li>
        </ul>
      </div>

      <!-- More information about the meal -->
      <!-- TEMP: Mettre un VRAI lien vers une page recette -->
      <p id="meal-more" @click="goTo(meal.ID_Recipe)">Click for more...</p>

      <!-- Buttons to reload or add the meal to the user's meals -->
      <div id="buttons-generated">
        <!-- TEMP: Mettre des fonctions sur ces deux boutons -->
        <button class="button-meal" id="reload" @click="goNext()">
          Reload
        </button>
        <button
          class="button-meal"
          id="select"
          @click="addMeal(meal.ID_Recipe)"
        >
          Add to My Meals
        </button>
      </div>
    </div>
  </div>
  <div v-else-if="generated === 'pending'" class="loader container-fluid"></div>
  <div v-else-if="generated === 'end'">
    <p id="end-list">No more meals to show</p>
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
  height: auto;
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
  width: 80%;
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

#end-list {
  font-size: 1.5em;
  font-weight: 600;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 2em;
  color: #7e7e7e;
  margin: 0;
}

.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #ea5b0c; /* Blue */
  border-radius: 50%;
  box-sizing: border-box;
  width: 60px;
  height: 60px;
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
</style>
