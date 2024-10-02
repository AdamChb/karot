<script setup>
import { onMounted } from "vue";

// TEMP : Link to the data base

// TEMP : Base de données temporaire pour tester le html
const recipes = [
  {
    id: 1,
    name: "Pasta with tomato sauce",
    ingredients: ["pasta", "tomato sauce", "basil"],
    instructions: ["Boil the pasta", "Add the tomato sauce", "Add basil"],
    image:
      "https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg",
    author: "Adam",
    like: 47,
  },
  {
    id: 2,
    name: "fdthrthfdghfghf",
    ingredients: ["pasta", "tomato sauce", "basil"],
    instructions: ["Boil the pasta", "Add the tomato sauce", "Add basil"],
    image:
      "https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg",
    author: "fgh",
    like: 98,
  },
];

// Permit to display the first item of the carousel
onMounted(() => {
  document.getElementsByClassName("slide")[0].classList.add("active");
  initCarroussel();
});
</script>

<script>
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  name: "HomePageFirst",
  components: {
    RecipeCard,
  },
};

// This function is used to animate the carousel
const initCarroussel = () => {
  // Initialize all of the elements of the carousel
  const slides = document.querySelectorAll(`.slide`);
  const prev = document.querySelector(`.prev`);
  const next = document.querySelector(`.next`);
  let index = 0;

  // Change the active slide
  const activeSlide = (n) => {
    for (let slide of slides) {
      slide.classList.remove("active");
    }
    slides[n].classList.add("active");
  };

  // Active the desired slide
  const prepareCurrentSlide = (ind) => {
    activeSlide(ind);
  };

  // Active the next slide
  const nextSlide = () => {
    if (index == slides.length - 1) {
      index = 0;
      prepareCurrentSlide(index);
    } else {
      index++;
      prepareCurrentSlide(index);
    }
  };

  // Active the previous slide
  const prevSlide = () => {
    if (index == 0) {
      index = slides.length - 1;
      prepareCurrentSlide(index);
    } else {
      index--;
      prepareCurrentSlide(index);
    }
  };

  // Add the event listeners to the buttons
  if (next) next.addEventListener("click", nextSlide);
  if (prev) prev.addEventListener("click", prevSlide);
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
          <button id="start-now">Start now</button>
        </div>
      </div>

      <!-- This container display a carousel with some of 
             the most liked meals of the database -->
      <div class="col-xxl-5 col-12" id="div-carousel">
        <div class="section-carroussel">
          <!-- Button to activate the previous slide -->
          <div class="nav-box prev-box txt-orange">
            <div class="navv prev">
              <p>&#10094;</p>
            </div>
          </div>

          <!-- List of the slides created with Vue.js and 
                     the database -->
          <div class="slide" v-for="recipe in recipes" :key="recipe.id">
            <RecipeCard :recipe="recipe" />
          </div>

          <!-- Button to activate the next slide -->
          <div class="nav-box next-box txt-orange">
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
  width: 6em;
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

.section-carroussel .slide {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  transition: 0.5s;
}

.section-carroussel .slide.active {
  display: flex;
}

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

  /* .card-title {
        font-size: 4vw;
    }

    .card-body p {
        font-size: 2.5vw;
    }

    .card-body .col-sm-3 h4 {
        font-size: 3vw;
    }

    .card-body img {
        width: 4vw;
    } */
}
</style>
