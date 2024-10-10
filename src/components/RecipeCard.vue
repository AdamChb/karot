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
    isLoggedIn: Boolean,
    id_user: Number,
  },
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
  },
};
</script>

<template>
  <div class="recipe">
    <!-- Link to the recipe page -->
    <div @click="goTo(recipe.ID_Recipe)">
      <!-- Image of the recipe -->
      <div class="img">
        <img
          :src="'data:image/jpeg;base64,' + recipe.Image"
          alt="recipe image"
        />
      </div>

      <!-- Name and author of the recipe -->
      <h3>{{ recipe.Name_Recipe }}</h3>
      <p class="author">by {{ recipe.Author_Name }}</p>
    </div>

    <!-- Like button -->
    <div class="likes">
      <img
        v-show="!recipe.Has_Liked"
        @click="toLike(recipe)"
        src="../assets/not-liked.svg"
        alt="like icon"
      />
      <img
        v-show="recipe.Has_Liked"
        @click="unLike(recipe)"
        src="../assets/liked.svg"
        alt="like icon"
      />
      {{ recipe.Likes_Count }}
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
