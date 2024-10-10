<!-- ------------------------------
  Karot_2.0 - HomePageFirst.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This component is the first block of the home page.
------------------------------ -->

<script>
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  name: "HomePageFirst",
  components: {
    RecipeCard,
  },
  props: {
    isLoggedIn: Boolean,
    id_user: Number,
  },
  data() {
    return {
      // TEMP: Base de donnée temporaire pour tester le front end
      recipes: [],
      currentIndex: 0,
    };
  },
  async beforeMount() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `http://localhost:3000/api/random-recipes?userId=${this.id_user}`,
        options
      );
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        this.recipes = data;
      } else {
        console.error("No recipes found");
      }
    } catch (error) {
      console.error("Error fetching random recipes:", error);
    }
  },
  computed: {
    currentRecipe() {
      return this.recipes[this.currentIndex];
    },
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.recipes.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.recipes.length) % this.recipes.length;
    },
  },
};

</script>

<template>
  <section class="blue home">
    <div class="row" id="row-home">
      <!-- This container is the "hook" of the website
             with a "Sign In" button -->
      <div class="col-xxl-7 col-12">
        <div class="container-fluid txt-white" id="hook">
          <h1>Delicious Recipes</h1>
          <p>
            "Oh no! What am i going to cook with all that stuff?"<br />Easy
            answer: a delicious recipe from Karot! Enter the ingredients you
            have, find trendy recipes and create your own!
          </p>
          <!-- TEMP : A link to the Sign In page is required -->
          <router-link :to="isLoggedIn ? '/createMeals' : '/signUp'">
            <button id="start-now">
              {{ isLoggedIn ? "Create your meals now !" : "Start now" }}
            </button>
          </router-link>
        </div>
      </div>

      <!-- This container displays a carousel with some of 
             the most liked meals of the database -->
      <div class="col-xxl-5 col-12" id="div-carousel">
        <div class="section-carroussel">
          <!-- Button to activate the previous slide -->
          <div class="nav-box prev-box txt-orange" @click="prevSlide">
            <div class="navv prev">
              <p>&#10094;</p>
            </div>
          </div>
          <!-- Slide display for the current recipe -->
          <div class="slide" v-if="currentRecipe" :key="currentRecipe.id">
            <RecipeCard :recipe="currentRecipe" :isLoggedIn="isLoggedIn" :id_user="id_user"/>
          </div>
          <!-- Button to activate the next slide -->
          <div class="nav-box next-box txt-orange" @click="nextSlide">
            <div class="navv next">
              <p>&#10095;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Style of the home page */
.home {
  height: fit-content;
  padding: 2em;
}

.row {
  height: 100%;
  margin: 0 !important;
}

h1 {
  font-size: 4em !important;
  margin-bottom: 1em;
  font-weight: 800 !important;
}

/* Style of the div #hook */
#hook {
  width: 75%;
  padding: 5em 0;
}

#hook h1 {
  width: 70%;
  margin-bottom: 0.5em;
  line-height: 1.1em;
}

#hook p {
  font-size: 1em;
  margin-bottom: 3em;
  font-weight: 400;
}

#start-now {
  font-size: 1.3em;
  font-weight: 500;
  min-width: 6em;
  max-width: 15em;
  padding: 0 0.7em;
  height: 2em;
  border-radius: 10px;
  border: 3px solid white;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
}

/* Style of the carousel */
.section-carroussel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.section-carroussel .nav-box {
  width: auto;
  height: fit-content;
  display: flex;
  align-items: center;
}

.section-carroussel .prev-box {
  justify-content: right;
}

.section-carroussel .next-box {
  justify-content: left;
}

.section-carroussel .navv {
  width: 35px;
  height: 70px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  transition: 0.2s;
}

.section-carroussel .navv:hover {
  cursor: pointer;
  color: white;
  transition: 0.2s;
}

.section-carroussel .navv p {
  margin: 0;
}

.slide {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  transition: 0.5s;
  font-size: 2em;
  background-color: #ea5b0c;
  border-radius: 0.4em;
}

/* No need for .active class anymore since we directly control visibility with v-if */

@media only screen and (max-width: 768px) {
  /* Responsive style for the page */
  #row-home {
    height: fit-content;
  }

  .col-12 {
    height: fit-content;
  }

  #hook {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  #hook h1 {
    font-size: 13vw !important;
  }

  #hook p {
    font-size: 3.4vw;
  }

  #start-now {
    font-size: 4.5vw;
    font-weight: 500;
    width: 27vw;
    height: 9vw;
    border-radius: 10px;
    border: 3px solid white;
    color: white;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .section-carroussel .navv {
    width: 0.5em;
    height: 0.7em;
    font-size: 1em;
  }

  .slide.card {
    height: fit-content;
    width: 70vw;
    margin-top: 10vw;
  }
}
</style>
