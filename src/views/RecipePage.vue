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
  data() {
    return {
      recipe: Object,
    }
  },
  beforeMount() {
    console.log(this.$route.query);
    // TEMP: Faire appel à la base de données pour récupérer la recette
    const recipe = {
      id: 1,
      name: "Pasta with tomato sauce",
      ingredients: ["pasta", "tomato sauce", "basil"],
      instructions: "Put a large saucepan of water on to boil. Finely chop the 100g pancetta, having first removed any rind. Finely grate 50g pecorino cheese and 50g parmesan and mix them together. Beat the 3 large eggs in a medium bowl and season with a little freshly grated black pepper. Set everything aside. Add 1 tsp salt to the boiling water, add 350g spaghetti and when the water comes back to the boil, cook at a constant simmer, covered, for 10 minutes or until al dente (just cooked). Squash 2 peeled plump garlic cloves with the blade of a knife, just to bruise it. While the spaghetti is cooking, fry the pancetta with the garlic. Drop 50g unsalted butter into a large frying pan or wok and, as soon as the butter has melted, tip in the pancetta and garlic. Leave to cook on a medium heat for about 5 minutes, stirring often, until the pancetta is golden and crisp. The garlic has now imparted its flavour, so take it out with a slotted spoon and discard. Keep the heat under the pancetta on low. When the pasta is ready, lift it from the water with a pasta fork or tongs and put it in the frying pan with the pancetta. Don't worry if a little water drops in the pan as well (you want this to happen) and don't throw the pasta water away yet. Mix most of the cheese in with the eggs, keeping a small handful back for sprinkling over later. Take the pan of spaghetti and pancetta off the heat. Now quickly pour in the eggs and cheese. Using the tongs or a long fork, lift up the spaghetti so it mixes easily with the egg mixture, which thickens but doesn't scramble, and everything is coated. Add extra pasta cooking water to keep it saucy (several tablespoons should do it). You don't want it wet, just moist. Season with a little salt, if needed. Use a long-pronged fork to twist the pasta on to the serving plate or bowl. Serve immediately with a little sprinkling of the remaining cheese and a grating of black pepper. If the dish does get a little dry before serving, splash in some more hot pasta water and the glossy sauciness will be revived.",
      image:
        "https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg",
      author: "Adam",
      like: 47,
      liked: false,
    }

    this.recipe = recipe;
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
      <!-- TEMP: Bouton temporaire pour tester la fonction d'appel à la base de données -->
      <button @click="test(recipe)">Test</button> 
      <div class="top">
        <!-- Title, creator, like and ingredients of the recipe -->
        <div class="description">
          <!-- Recipe name, creator and like -->
          <div class="head">
            <!-- Recipe name and creator -->
            <div class="head-text">
              <h1>{{  recipe.name }}</h1>
              <p>by {{ recipe.author }}</p>
            </div>
            <!-- Like button -->
            <div class="head-likes">
              <img
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
              />
              <p>{{ recipe.like }}</p>
            </div>
          </div>

          <!-- Ingredients -->
          <div class="ingredients">
            <h3>Ingredients</h3>
            <ul>
              <li v-for="(ingredient, i) in recipe.ingredients" :key="i">{{ ingredient }}</li>
            </ul>
          </div>
        </div>

        <!-- Meal image -->
        <div class="photo">
          <img :src="recipe.image" :alt="recipe.name" />
        </div>
      </div>

      <!-- Instructions -->
      <div class="recipe-steps">
        <p>{{ recipe.instructions }}</p>
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
