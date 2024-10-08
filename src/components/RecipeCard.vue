<!-- ------------------------------
  Karot_2.0 - RecipeCard.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This component is the card for the recipes.
------------------------------ -->

<script>
export default {
  name: "RecipeCard",
  props: {
    recipe: Object,
  },
  methods: {
    // Functions to like or dislike a recipe
    toLike(recipe) {
      recipe.liked = !recipe.liked;
      recipe.like += 1;
      // TEMP: Mettre à jour dans la database
    },
    unLike(recipe) {
      recipe.liked = !recipe.liked;
      recipe.like -= 1;
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
  <div class="recipe">
    <!-- Link to the recipe page -->
    <div @click="goTo(recipe.id)">
      <!-- Image of the recipe -->
      <div class="img">
        <img :src="recipe.image" alt="recipe image" />
      </div>

      <!-- Name and author of the recipe -->
      <h3>{{ recipe.name }}</h3>
      <p class="author">{{ recipe.author }}</p>
    </div>

    <!-- Like button -->
    <div class="likes">
      <img
        v-show="!recipe.liked"
        @click="toLike(recipe)"
        src="../assets/not-liked.svg"
        alt="like icon"
      />
      <img
        v-show="recipe.liked"
        @click="unLike(recipe)"
        src="../assets/liked.svg"
        alt="like icon"
      />
      {{ recipe.like }}
    </div>
  </div>
</template>

<style scoped>
/* Styles for the recipe card */
.recipe {
  padding: 1em;
  transition: 0.3s;
  border-radius: 0.4em;
  cursor: pointer;
  width: 11em;
}

.recipe:hover {
  transform: scale(1.02);
  transition: 0.3s;
}

a {
  text-decoration: none;
}

.img {
  width: 100%;
  height: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recipe img {
  width: 100%;
  height: 100%;
  border-radius: 0.2em;
  object-fit: contain;
}

.recipe h3 {
  font-size: 1em;
  font-weight: 700;
  margin: 0.2em 0 0 0;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe p {
  margin: 0;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.likes {
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
}

.likes img {
  width: 1em;
  margin-right: 0.2em;
}
</style>
