<script>
export default {
  name: "RecipeCard",
  props: {
    recipe: Object,
  },
};
</script>

<template>
    <div class="card">
        {{ console.log(recipe.image) }}
        <img class="card-img-top" :src="recipe.image" alt="Card image">
        <div class="card-body">
            <div class="row">
                <div class="col-sm-9 col-8">
                    <h4 class="card-title">{{ recipe.name }}</h4>
                    <p>by {{ recipe.author }}</p>
                </div>
                <div class="col-sm-3 col-4">
                    <h4>{{ recipe.like }}</h4>
                    <img src="@/assets/heart.svg" alt="heart">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    height: 27em;
    border: 1px solid white;
    aspect-ratio: 0.84;
    display: flex;
    overflow: hidden;
    border-radius: 10px;
}

.card img.card-img-top {
    flex: 1;
    object-fit: cover;
}

.card-body {
    padding: 0!important;
    flex: 0;
}

.row {
    margin-right: 0;
    margin-left: 0;
}

.card-title {
    margin-bottom: 0;
    width: 100%;
    font-size: 110%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-body p {
    font-size: 80%;
}

.card-body .col-sm-9 {
    padding-top: 10px;
}

.card-body .col-sm-3 {
    display: flex;
    align-items: center;
    padding: 0;
}

.card-body img {
    position: absolute;
    right: 10px;
}

.card-body .col-sm-3 h4 {
    font-size: 1em;
    margin: 0!important;
    margin-right: 10px!important;
    position: absolute;
    right: 35px;
}
</style>