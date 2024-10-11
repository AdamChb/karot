<!-- ------------------------------
  Karot_2.0 - IngredientsBox.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This component is a box that contains an ingredient.
------------------------------ -->

<script>
export default {
  name: "IngredientsBox",
  props: { ingredient: Object, boxColor: String, active: Boolean },
  methods: {
    // Function to change the state of the ingredient
    changeState() {
      this.$emit("changeState", this.ingredient.ID_Ingredient);
    },
  },
};
</script>

<template>
  <!-- Structure of the ingredient box -->
  <div class="ingredient-box" v-bind:style="{ 'background-color': boxColor }">
    <div id="text_box">
      <p class="ingredient-name">{{ ingredient.Name_Ingredient }}</p>
    </div>
    <div id="img-box" @click="changeState()">
      <img v-if="active" src="@/assets/cross.svg" alt="remove" />
      <img v-else src="@/assets/add.svg" alt="add" />
    </div>
  </div>
</template>

<style scoped>
/* Style of the ingredient box */
.ingredient-box {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
  height: fit-content;
  border-radius: 7px;
  margin: 0.4em 1em 0.4em 1em;
  color: white;
  padding: 0.2em;
  width: 100%;
}
p {
  margin-bottom: 0;
  padding-right: 1em;
}
img {
  width: 0.5em;
  height: 0.5em;
}

#img-box {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
