<!-- ------------------------------
  Karot_2.0 - MealSectionCreateText.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This component is the text part of the meal section.
------------------------------ -->

<script>
export default {
  name: "MealSectionCreateText",
  props: { generated: String },
  methods: {
    // Function to display the generated meal
    triggergenerate() {
        this.$emit("generate");
    },
  },
};
</script>

<template>
  <div
    class="container-text-meal"
    :id="generated !== 'false' ? 'container-text-meal-generated' : ''"
  >
    <div class="main-text">
      <!-- Title of the CreateMeal page -->
      <p
        class="title"
        :id="generated !== 'false' ? 'title-generated' : 'title-not-generated'"
      >
        Create meals
      </p>
      <p
        class="subtitle"
        :id="
          generated !== 'false'
            ? 'subtitle-generated'
            : 'subtitletitle-not-generated'
        "
      >
        Based on the ingredients you have
      </p>
    </div>

    <!-- Generate button -->
    <div class="generate-button-box">
      <button class="generate-button" @click="triggergenerate(generated)">
        Generate
      </button>
    </div>

    <!-- Instruction -->
    <div v-if="generated === 'false'" class="instruction">
      <p class="instruction-text">
        Don't forget to add ingredients you have in your fridge !
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Style of the container */
.container-text-meal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 40vw;
}

#container-text-meal-generated {
  height: 60%;
  text-align: center;
}

/* Style of the title */
.main-text {
  text-align: center;
}

.title {
  color: white;
  font-weight: bold;
  margin: 0;
}

#title-generated {
  font-size: 2em;
}

#title-not-generated {
  font-size: 3.5em;
}

/* Style of the subtitle */
.subtitle {
  color: white;
  margin: 0;
}

#subtitle-generated {
  font-size: 1em;
}

#subtitletitle-not-generated {
  font-size: 2em;
}

/* Style of the button */
.generate-button-box {
  display: flex;
  height: fit-content;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2em;
  margin-bottom: 2em;
}

.generate-button {
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: solid white 3px;
  border-radius: 10px;
  padding: 0.5em 1em;
  cursor: pointer;
}

/* Style of the instruction */
.instruction-text {
  font-size: 1em;
  color: white;
}

.instruction {
  display: flex;
  width: 100%;
  margin: 0;
  margin-top: 1em;
  justify-content: center;
}
</style>
