<script>
export default {
  name: "RecipeCard",
  props: {
    recipe: Object,
  },
};
</script>

<template>
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
</template>

<style>
.card img.card-img-top {
    flex: 1;
    object-fit: cover;
}

.card-body {
    padding: 0!important;
    flex: 0;
}

.card-title {
    margin-bottom: 0;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-body p {
    font-size: 0.7em;
}

.card-body .col-sm-9 {
    padding-top: 10px;
}

.card-body .col-sm-3 {
    display: flex;
    align-items: center;
}

.card-body .col-sm-3 h4 {
    font-size: 1em;
    margin: 0!important;
    margin-right: 10px!important;
}
</style>