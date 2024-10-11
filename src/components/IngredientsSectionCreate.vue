<!-- ------------------------------
  Karot_2.0 - IngredientsSectionCreate.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This component is the section where the 
  user can add ingredients to create a meal.
------------------------------ -->

<script setup>
import IngredientsBox from "./IngredientsBox.vue";
import IngredientsSearchBar from "./IngredientsSearchBar.vue";
</script>

<script>
export default {
  props: {
    ingredientsSelected: Array,
    ingredientsUnselected: Array,
  },
  data() {
    // TEMP: Je ne sais pas ce que c'est mais il va falloir le changer...
    return {
      activeColor: "#9abd36",
      inactiveColor: "#bfbfbf",
      searchfilter: "",
    };
  },
  name: "IngredientsCreate",
  components: {
    IngredientsBox,
    IngredientsSearchBar,
  },
  methods: {
    // Function to unselect of an ingredient
    unselect(ingredientId) {
      this.$emit("unselect", ingredientId);
    },

    select(ingredientId) {
      this.$emit("select", ingredientId);
    },

    updateSearchBar(value) {
      console.log(value);
      this.searchfilter = value;
    },

    // Function to search an ingredient with the search bar
    filterSearchBar(ingredientName) {
      if (ingredientName === "") {
        return this.ingredientsUnselected;
      } else {
        return this.ingredientsUnselected.filter((ingredient) =>
          ingredient.Name_Ingredient.toLowerCase().includes(
            ingredientName.toLowerCase()
          )
        );
      }
    },
  },
};
</script>

<template>
  <!-- Ingredient's search bar -->
  <div id="box-search-bar">
    <IngredientsSearchBar @search="updateSearchBar" />
  </div>

  <!-- Container for inactive ingredients -->
  <div id="container-all-ingredients">
    <div class="container-half-ingredients" id="items-inactive">
      <div
        class="container-component-ingredients"
        v-for="ingredient in filterSearchBar(searchfilter)"
        :key="ingredient.id"
      >
        <IngredientsBox
          class="ingredient-box"
          :ingredient="ingredient"
          :active="false"
          :boxColor="inactiveColor"
          @changeState="select"
        />
      </div>
    </div>

    <!-- Container for active ingredients -->
    <div class="container-half-ingredients" id="items-active">
      <div
        class="container-component-ingredients"
        v-for="ingredient in ingredientsSelected"
        :key="ingredient.id"
      >
        <IngredientsBox
          class="ingredient-box"
          :ingredient="ingredient"
          :active="true"
          :boxColor="activeColor"
          @changeState="unselect"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Position of the search bar */
#box-search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  width: 100%;
}

/* Style of the container for the ingredients */
#container-all-ingredients {
  display: flex;
  flex-direction: column;
  height: 70%;
  width: 70%;
  text-wrap: pretty;
  background-color: #ffffff;
  color: white;
  justify-items: space-between;
  border-radius: 20px;
  padding: 0.5em;
}

.container-half-ingredients {
  display: inline-block;
  height: 50%;
  width: 100%;
  overflow-y: scroll;
}

.container-component-ingredients {
  display: flex;
  width: 30%;
}
/* Position of the ingredients in the containers */
#items-inactive {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  align-content: start;
  border-bottom: solid 1px #000000;
  height: 70%;
}

#items-active {
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: end;
  align-content: end;
  border-top: solid 1px #000000;
  height: 30%;
}
</style>
