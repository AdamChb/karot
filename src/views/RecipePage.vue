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
    // Request the database to get the recipe coresponding with the ID_Recipe
    const ID_Recipe = this.$route.query.id;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/get-recipe?id_user=${this.id_user}&id_recipe=${ID_Recipe}`, options);
      const data = await response.json();
      this.recipe = data[0];
      this.recipe.Ingredients_With_Quantity = this.recipe.Ingredients_With_Quantity.split(", ")
      console.log(this.recipe);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async toLike() {
      if (!this.isLoggedIn) return

      this.recipe.Has_Liked = !this.recipe.Has_Liked;
      this.recipe.Likes_Count += 1;
      
      const info = {
        id_user: this.id_user,
        id_recipe: this.recipe.ID_Recipe,
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      };
      try {
        await fetch(`http://127.0.0.1:3000/api/like-recipe`, options);
      } catch (err) {
        console.log(err);
      }

      console.log(this.recipe);
    },
    async unLike() {
      if (!this.isLoggedIn) return

      this.recipe.Has_Liked = !this.recipe.Has_Liked;
      this.recipe.Likes_Count -= 1;
      
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      try {
        await fetch(`http://127.0.0.1:3000/api/unlike-recipe?id_user=${this.id_user}&id_recipe=${this.recipe.ID_Recipe}`, options);
      } catch (err) {
        console.log(err);
      }
    },
  },  
};
</script>

<template>
  <div class="background">
    <div class="container-button">

    
          <!-- Button to bring the user to the last page -->
        <!-- TEMP - router vers la page précédente -->
        <router-link to="/category" style="text-decoration: none">
          <div class="cta-button">
            <img src="@/assets/back-arrow.svg" alt="arrow icon" />
            Return
          </div>
        </router-link>
    <div class="recipe-container">
      <div class="top">
        <!-- Title, creator, like and ingredients of the recipe -->
        <div class="description">
          <!-- Recipe name, creator and like -->
          <div class="head">
            <!-- Recipe name and creator -->
            <div class="head-text">
              <h1>{{ recipe.Name_Recipe }}</h1>
              <p>by {{ recipe.Author_Name }}</p>
            </div>
            <!-- Like button -->
            <div class="head-likes">
              <img
                v-show="!recipe.Has_Liked"
                @click="
                toLike
                "
                src="../assets/not-liked-orange.svg"
                alt="like icon"
              />
              <img
                v-show="recipe.Has_Liked"
                @click="
                unLike
                "
                src="../assets/liked-orange.svg"
                alt="like icon"
              />
              <p>{{ recipe.Likes_Count }}</p>
            </div>
          </div>

          <!-- Ingredients -->
          <div class="ingredients">
            <h3>Ingredients</h3>
            <ul>
              <li v-for="(ingredient, i) in recipe.Ingredients_With_Quantity" :key="i">{{ ingredient }}</li>
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
        <p>{{ recipe.Steps }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
/* Style of the RecipePage */
.container-button {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
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

/* Style for the return button */
.cta-button {
  box-sizing: border-box;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4em 1em 0.4em 0.7em;
  text-align: center;
  border-radius: 0.4em;
  color: white;
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.3s;
  margin-bottom: 1em;
  animation: fadeInLeft ease 1s;
}
.cta-button:hover {
  transform: scale(1.04);
  transition: 0.3s;
}

.cta-button img {
  width: 20px;
  margin-right: 10px;
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
