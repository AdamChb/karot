<template>
    <div class="background">
        <div class="recipe-container">
          <button @click="test(recipe)">Test</button>
            <div class="top">
                <!-- Title, creator, like and ingredients of the recipe -->
                <div class="description">
                        <!-- Recipe name, creator and like -->
                        <div class="head">
                            <!-- Recipe name and creator -->
                            <div class="head-text">
                                <h1>Tagliatelles carbonara</h1>
                                <p>by Mathias</p>
                            </div>
                            <div class="head-likes">
                              <!-- <img
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
                              /> -->
                              <!-- {{ recipe.like }} -->
                            </div>
                        </div>
                        <!-- Ingredients -->
                        <div class="ingredients">
                            <h3>Ingredients</h3>
                        <ul>
                            <li>300g of pasta</li>
                            <li>50g of bacon</li>
                            <li>3 eggs</li>
                            <li>Salt</li>
                            <li>Pepper</li>
                            <li>Parmesan</li>
                        </ul>
                    </div>
                </div>
                <!-- Meal image -->
                <div class="photo">
                    <img src="../assets/carbo.png" alt="Tagliatelles carbonara">
                </div>
            </div>
            <div class="recipe-steps">
                <p>
                    Put a large saucepan of water on to boil. Finely chop the 100g pancetta, having first removed any rind. Finely grate 50g pecorino cheese and 50g parmesan and mix them together. Beat the 3 large eggs in a medium bowl and season with a little freshly grated black pepper. Set everything aside. Add 1 tsp salt to the boiling water, add 350g spaghetti and when the water comes back to the boil, cook at a constant simmer, covered, for 10 minutes or until al dente (just cooked). Squash 2 peeled plump garlic cloves with the blade of a knife, just to bruise it. While the spaghetti is cooking, fry the pancetta with the garlic. Drop 50g unsalted butter into a large frying pan or wok and, as soon as the butter has melted, tip in the pancetta and garlic. Leave to cook on a medium heat for about 5 minutes, stirring often, until the pancetta is golden and crisp. The garlic has now imparted its flavour, so take it out with a slotted spoon and discard. Keep the heat under the pancetta on low. When the pasta is ready, lift it from the water with a pasta fork or tongs and put it in the frying pan with the pancetta. Don't worry if a little water drops in the pan as well (you want this to happen) and don't throw the pasta water away yet. Mix most of the cheese in with the eggs, keeping a small handful back for sprinkling over later. Take the pan of spaghetti and pancetta off the heat. Now quickly pour in the eggs and cheese. Using the tongs or a long fork, lift up the spaghetti so it mixes easily with the egg mixture, which thickens but doesn't scramble, and everything is coated. Add extra pasta cooking water to keep it saucy (several tablespoons should do it). You don't want it wet, just moist. Season with a little salt, if needed. Use a long-pronged fork to twist the pasta on to the serving plate or bowl. Serve immediately with a little sprinkling of the remaining cheese and a grating of black pepper. If the dish does get a little dry before serving, splash in some more hot pasta water and the glossy sauciness will be revived.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { props } from "@/components/RecipeCard.vue"

console.log(props);
</script>

<script>
export default {
  name: "RecipePage",
  methods: {
        toLike(recipe) {
            recipe.liked = !recipe.liked;
            recipe.like += 1;
        },
        unLike(recipe) {
            recipe.liked = !recipe.liked;
            recipe.like -= 1;
        },
        test(recipe) {
          console.log(recipe);
        }
    },
}
</script>

<style scoped>
.background {
  background-color: #2F4858;
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
  justify-content: space-between; /* To separate the description and image */
  gap: 20px; /* Adds space between the description and image */
}

.description {
  flex: 1; /* Makes the description take more space */
}

.photo {
  flex-shrink: 0; /* Prevents the image from shrinking */
  display: flex;
  align-items: flex-start; /* Aligns the image to the top */
}

.photo img {
  max-width: 250px; /* Adjust the size of the image */
  border-radius: 10px; /* Rounds the image corners */
}

.recipe-steps {
  margin-top: 20px;
  text-align: justify;
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
    flex-direction: column;
  }

  .head-likes h2 {
    font-size: 1.4em;
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

  .head-text h1 {
    font-size: 1.3em;
  }

  .head-likes h2 {
    font-size: 1.2em;
  }
}

</style>
