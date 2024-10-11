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
  name: "IngredientsCreate",
  emits: ["unselect", "select", "addAllergy"],
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
  components: {
    IngredientsBox,
    IngredientsSearchBar,
  },
  methods: {
    // Function to unselect of an ingredient
    removeAllergy(ingredientId) {
      this.$emit("removeAllergy", ingredientId);
    },

    addAllergy(ingredientId) {
      this.$emit("newAllergy", ingredientId);
    },

    updateSearchBar(value) {
      if (value && value.target) {
        this.searchfilter = value.target.value;
      } else {
        this.searchfilter = value;
      }
    },

    // Function to search an ingredient with the search bar
    filterSearchBar(ingredientName) {
      if (ingredientName === "") {
        return this.ingredientsUnselected;
      } else {
        return this.ingredientsUnselected.filter((ingredient) =>
          ingredient.Name_Ingredient.toLowerCase().includes(
            ingredientName.toLowerCase() || ""
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

  <div class="scrollable">
    <div
      v-for="ingredient in filterSearchBar(searchfilter)"
      :key="ingredient.id"
    >
      <IngredientsBox
        class="ingredient"
        :ingredient="ingredient"
        :active="false"
        :boxColor="inactiveColor"
        @changeState="addAllergy"
      />
    </div>
  </div>
</template>

<style scoped>

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
  height: 20%;
  width: 100%;
  padding: 5px;
}

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
</style>
