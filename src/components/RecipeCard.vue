<script>
export default {
  name: "RecipeCard",
  props: {
    recipe: Object,
  },
  methods: {
        toLike(recipe) {
            recipe.liked = !recipe.liked;
            recipe.like += 1;
        },
        unLike(recipe) {
            recipe.liked = !recipe.liked;
            recipe.like -= 1;
        },
    },
};
</script>

<template>
    <div class="recipe">
        <router-link to="/recipe" :recipe="recipe">
            <div class="img">
                <img :src="recipe.image" alt="recipe image"/>
            </div>
            <h3>{{ recipe.name }}</h3>
            <p class="author">{{ recipe.author }}</p>
        </router-link>
            <div class="likes">
            <img
                v-show="!recipe.liked"
                @click="
                toLike(recipe);
                "
                src="../assets/not-liked.svg"
                alt="like icon"
            />
            <img
                v-show="recipe.liked"
                @click="
                unLike(recipe);
                "
                src="../assets/liked.svg"
                alt="like icon"
            />
            {{ recipe.like }}
        </div>
    </div>
</template>

<style scoped>
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