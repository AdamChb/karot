<script setup>
import IngredientsBox from "./IngredientsBox.vue";
import IngredientsSearchBar from "./IngredientsSearchBar.vue";

const ingredients = [
  {
    id: 1,
    name: "Pasta",
    active: false,
  },
  {
    id: 2,
    name: "Cheese",
    active: true,
  },
  {
    id: 3,
    name: "Oil",
    active: false,
  },
  {
    id: 4,
    name: "Lettuce",
    active: true,
  },
  {
    id: 5,
    name: "Chicken",
    active: true,
  },
  {
    id: 6,
    name: "Meat",
    active: false,
  },
  {
    id: 7,
    name: "Milk",
    active: true,
  },
  {
    id: 8,
    name: "Flour",
    active: false,
  },
  {
    id: 9,
    name: "Bread",
    active: true,
  },
];

const activeColor = "#9abd36";
const inactiveColor = "#bfbfbf";
</script>

<template>
  <div id="box-search-bar">
    <IngredientsSearchBar />
  </div>
  <div id="container-all-ingredients">
    <div class="container-half-ingredients" id="items-inactive">
      <IngredientsBox
        class="ingredient-box"
        v-for="ingredient in ingredients.filter(
          (ingredient) => !ingredient.active
        )"
        :key="ingredient.id"
        :ingredient="ingredient"
        :boxColor="inactiveColor"
      />
    </div>
    <div class="container-half-ingredients" id="items-active">
      <IngredientsBox
        class="ingredient-box"
        v-for="ingredient in ingredients.filter(
          (ingredient) => ingredient.active
        )"
        :key="ingredient.id"
        :ingredient="ingredient"
        :boxColor="activeColor"
      />
    </div>
  </div>
</template>

<style scoped>
#box-search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  width: 100%;
}

#container-all-ingredients {
  display: flex;
  flex-direction: column;
  height: 70%;
  width: 70%;
  background-color: #ffffff;
  color: white;
  justify-items: space-between;
  border-radius: 20px;
}

.container-half-ingredients {
  display: flex;
  width: 100%;
}

.ingredient-box {
  display: flex;
  flex-wrap: wrap;
  width: 25%;
}

#items-inactive {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  align-content: start;
  height: 70%;
}

#items-active {
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: end;
  align-content: end;
  height: 30%;
}
</style>

<script>
export default {
  name: "IngredientsCreate",
  components: {
    IngredientsBox,
    IngredientsSearchBar,
  },
};
</script>
