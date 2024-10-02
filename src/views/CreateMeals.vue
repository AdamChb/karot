<script>
import IngredientsCreate from "@/components/IngredientsCreate.vue";

export default {
  name: "createMeals",
  components: {
    IngredientsCreate,
  },
};
</script>

<template>
  <div id="body-createmeal">
    <div id="ingredients-section">
      <IngredientsCreate />
    </div>
  </div>
</template>

<style scoped>
#body-createmeal {
  display: flex;
  height: 75vh;
  width: 100vw;
  background-color: #ea5b0c;
}

#ingredients-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  height: 100%;
  width: 40vw;
  margin-left: 10vw;
}
</style>
