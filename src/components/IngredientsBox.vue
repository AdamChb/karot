<script setup></script>

<script>
export default {
  props: ["ingredient", "boxColor"],
};
</script>

<template>
  <div class="ingredient-box" v-bind:style="{ 'background-color': boxColor }">
    <p class="ingredient-name">{{ ingredient.name }}</p>
    <img v-if="ingredient.active" src="@/assets/cross.svg" alt="remove" />
    <img v-else src="@/assets/add.svg" alt="add" />
  </div>
</template>

<style scoped>
.ingredient-box {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  height: fit-content;
  border-radius: 7px;
  margin: 0.4em 1em 0.4em 1em;
}
p {
  margin-bottom: 0;
}
img {
  width: 0.5em;
  height: 0.5em;
}
</style>
