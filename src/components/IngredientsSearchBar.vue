<template>
  <div id="ingredients-search-bar">
    <input
      type="search"
      placeholder="Research an ingredient"
      class="searchbar"
    />
  </div>
</template>

<style scoped>
/* Search bar's style */

#ingredients-search-bar {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.searchbar {
  height: 2em;
  box-sizing: border-box;
  width: 70%;
  border: solid 2px #2f4858;
  border-radius: 7px;
  padding: 1em;
  transition: 0.3s;
}

.searchbar:hover {
  transform: scale(1.04);
}

.searchbar:focus {
  transform: scale(1.04);
  outline: none;
}

.searchbar::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  height: 1em;
  width: 1em;
  background-image: url(../assets/cross.png);
  background-size: 1em;
}
</style>

<script>
export default { name: "IngredientsSearchBar" };
</script>
