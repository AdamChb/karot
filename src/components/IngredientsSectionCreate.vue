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
  name: "IngredientsSectionCreate",
  emits: ["unselect", "select"],
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
      this.searchfilter = value;
    },

    // Function to search an ingredient with the search bar
    filterSearchBar(ingredientName) {
      if (ingredientName === "") {
        return this.ingredientsUnselected;
      } else {
        return this.ingredientsUnselected.filter((ingredient) =>
          ingredient.Name_Ingredient.toLowerCase().includes(
            ingredientName.toLowerCase() || ''
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
    <IngredientsSearchBar
      @search="updateSearchBar"
    />
  </div>

  <!-- Container for inactive ingredients -->
  <div id="container-all-ingredients">
    <div class="scrollable" id="items-inactive">
      <div
        v-for="ingredient in filterSearchBar(searchfilter)"
        :key="ingredient.id"
      >
        <IngredientsBox
          class="ingredient"
          :ingredient="ingredient"
          :active="false"
          :boxColor="inactiveColor"
          @changeState="select"
        />
      </div>
    </div>

    <!-- Container for active ingredients -->
    <div class="scrollable" id="items-active">
      <div
        v-for="ingredient in ingredientsSelected"
        :key="ingredient.id"
      >
        <IngredientsBox
          class="ingredient"
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

.scrollable {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
  padding: 1em;
  width: 100%;
  border-radius: 0.4em;
  background-color: white;
  color: black;
  height: 75%;
  overflow-y: scroll;
}
.ingredient {
  display: flex;
  justify-content: space-between;
  gap: 1.5em;
  width: fit-content;
  padding: 0.3em 0.5em;
  margin: 0.3em;
  border-radius: 0.4em;
}

/* Position of the search bar */
#box-search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  width: 70%;
}

/* Style of the container for the ingredients */
#container-all-ingredients {
  display: flex;
  flex-direction: column;
  height: 70%;
  width: 70%;
  text-wrap: wrap;
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
  height: 30vh;
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
