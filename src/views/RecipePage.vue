<!-- ------------------------------
  Karot_2.0 - RecipePage.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the page of a recipe.
------------------------------ -->

<script>
export default {
  name: "RecipePage",
  props: {
    isLoggedIn: Boolean,
    id_user: Number,
  },
  data() {
    return {
      recipe: Object,
    }
  },
  async beforeMount() {
    const ID_Recipe = this.$route.query.id;
    console.log(this.$route.query.id);
    // TEMP: Faire appel à la base de données pour récupérer la recette

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/get-recipe?id_user=${this.id_user}?id_recipe=${ID_Recipe}`, options);
        const data = await response.json();
        this.recipe = data[0];
        console.log(this.recipe);
      } catch (err) {
        console.log(err);
      }
  },
  methods: {
    toLike() {
      this.recipe.liked = !this.recipe.liked;
      this.recipe.like += 1;
      // TEMP: Faire appel à la base de données pour modifier le nombre de likes de la recette
    },
    unLike() {
      this.recipe.liked = !this.recipe.liked;
      this.recipe.like -= 1;
      // TEMP: Faire appel à la base de données pour modifier le nombre de likes de la recette

    },
    test(recipe) { // TEMP: Focntion temporaire pour tester si le code fonctionne bien
      console.log(recipe);
    },
  },  
};
</script>

<template>
  <div class="background">
    <div class="recipe-container">
      <!-- TEMP: Bouton temporaire pour tester la fonction d'appel à la base de données -->
      <button @click="test(recipe)">Test</button> 
      <div class="top">
        <!-- Title, creator, like and ingredients of the recipe -->
        <div class="description">
          <!-- Recipe name, creator and like -->
          <div class="head">
            <!-- Recipe name and creator -->
            <div class="head-text">
              <!-- <h1>{{ recipe.Name_Recipe }}</h1>
              <p>by {{ recipe.ID_Author }}</p> -->
            </div>
            <!-- Like button -->
            <div class="head-likes">
              <!-- <img
                v-show="!recipe.liked"
                @click="
                toLike
                "
                src="../assets/not-liked-orange.svg"
                alt="like icon"
              />
              <img
                v-show="recipe.liked"
                @click="
                unLike
                "
                src="../assets/liked-orange.svg"
                alt="like icon"
              /> -->
              <!-- <p>{{ recipe.like }}</p> -->
            </div>
          </div>

          <!-- Ingredients -->
          <div class="ingredients">
            <h3>Ingredients</h3>
            <ul>
              <!-- <li v-for="(ingredient, i) in recipe.ingredients" :key="i">{{ ingredient }}</li> -->
            </ul>
          </div>
        </div>

        <!-- Meal image -->
        <div class="photo">
          <!-- <img :src="recipe.image" :alt="recipe.name" /> -->
        </div>
      </div>

      <!-- Instructions -->
      <div class="recipe-steps">
        <!-- <p>{{ recipe.instructions }}</p> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style of the RecipePage */
.background {
  background-color: #2f4858;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.recipe-container {
  background-color: #ffffff;
  border-radius: 10px;
  width: 100%;
  max-width: 900px;
  padding: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.top {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.description {
  flex: 1;
}

.photo {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
}

.photo img {
  max-width: 250px;
  border-radius: 10px;
}

.recipe-steps {
  margin-top: 20px;
  text-align: justify;
}

.head-text p {
  margin-bottom: 0.3em;
}

.head-likes {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.head-likes img {
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.3em;
}

.head-likes p {
  margin: 0;
}

/* Responsive design for smaller screens */
@media (max-width: 1024px) {
  .recipe-container {
    padding: 2vh;
    margin-top: 1.2vh;
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .recipe-container {
    padding: 3vh;
    margin: 3vh;
    max-width: 100%;
  }

  .top {
    flex-direction: column-reverse;
  }

  .photo img {
    width: 100%;
    height: auto;
  }

  .recipe-steps p {
    font-size: 1em;
  }
}

@media (max-width: 480px) {
  .recipe-container {
    padding: 2vh;
    max-width: 100%;
  }
}
</style>
