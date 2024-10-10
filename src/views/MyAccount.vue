<!-- ------------------------------
  Karot_2.0 - MyAccount.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the account page.
------------------------------ -->

<script>
import IngredientsBox from "@/components/IngredientsBox.vue";
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  name: "MyAccount",
  components: {
    RecipeCard,
    IngredientsBox,
  },
  props:{
    id_user: Number,
    isLoggedIn: Boolean,
  },
  data() {
    return {
      ingredients: [],
      allergies: [],
      recipes: [],
    };
  },
  async created() {
    await this.fetchRecipes(); // Fetch recipes when the component is created
    await this.fetchAllergies(); // Fetch allergies when the component is created
  },
  methods: {
    // Function to fetch the allergies of the user
    async fetchAllergies() {
      try {
        const response = await fetch(`http://localhost:3000/api/get-allergies?userId=${this.id_user}`);
        if (!response.ok) {
          throw new Error(`Error fetching allergies: ${response.statusText}`);
        }
        const data = await response.json();
        this.allergies = data;
        console.log(this.allergies);
      } catch (error) {
        console.error("Error fetching allergies:", error);
      }
    },
    //Delete an allergy
    deleteAllergy(ingredientId) {
      const queryParams = new URLSearchParams({
        userId: this.userId,
        ingredientId: this.ingredient.id,
      }).toString();

      fetch(`http://localhost:3000/api/delete-allergy?${queryParams}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            // Remove the allergy from the list
            this.allergies = this.allergies.filter(
              (allergy) => allergy !== ingredientId
            );
          } else {
            alert(data.error || "Error deleting allergy");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // Function to fecth the liked recipes
    async fetchRecipes() {
      try {
        const response = await fetch(`http://localhost:3000/api/get-liked-recipes?userId=${this.id_user}`);
        if (!response.ok) {
          throw new Error(`Error fetching liked recipes: ${response.statusText}`);
        }
        const data = await response.json();
        this.recipes = data;
      } catch (error) {
        console.error("Error fetching liked recipes:", error);
      }
  },
  },
};
</script>

<template>
  <section id="my-account" class="blue">
    <div id="container1">
      <!-- Informations of the user's account -->
      <div id="account">
        <h2>Your account</h2>
        <!-- Username change -->
        <div class="input-group">
          <input type="text" id="username" placeholder="CurrentUsername" />
          <button>Change</button>
        </div>
        <!-- Password change -->
        <div class="input-group">
          <input type="password" id="password" placeholder="*************" />
          <button>Change</button>
        </div>
      </div>

      <!-- Allergies of the user -->
      <div id="allergies" class="scrollable-parent">
        <h2>Your allergies</h2>
        <div class="scrollable">
          <div v-for="(allergy, i) in allergies" :key="i" @click="deleteAllergy(allergy.ID_Ingredient)">
            <div class="allergy">
              <p>{{ allergy.Name_Ingredient }}</p>
              <IngredientsBox />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List of all the user's liked meals -->
    <div id="my-meals" class="scrollable-parent">
      <h2>Your liked recipes</h2>
      <div class="scrollable">
        <div class="blue recipe-card" v-for="recipe in recipes" :key="recipe.ID_Recipe">
          <RecipeCard :recipe="recipe" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Style of the page MyAccount */
#my-account {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 130vh;
  padding: 0 10vh;
}

#container1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30vw;
}

#account,
#ingredients,
#allergies {
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: flex-start;
  height: 35vh;
  border-radius: 0.4em;
  margin: 2vh 0;
  width: 100%;
  color: black;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  padding: 1em 0 1em 1em;
}

#account {
  height: 25vh;
  padding: 1em;
}

#account h2 {
  margin-bottom: 0.3em;
}

.input-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 1em;
}

.input-group input {
  width: 55%;
  height: 2.7em;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 0.4em;
}

.input-group button {
  padding: 0.5em 1em;
  height: 2.7em;
  background-color: #ea5b0c;
  color: white;
  border: none;
  border-radius: 0.4em;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
}

.input-group button p {
  margin: 0;
}

.ingredient,
.allergy {
  display: flex;
  justify-content: space-between;
  gap: 1.5em;
  width: fit-content;
  padding: 0.3em 0.5em;
  margin: 0.3em;
  border-radius: 0.4em;
}

.ingredient p,
.allergy p {
  margin-bottom: 0;
  color: white;
}

.ingredient {
  background-color: #9abd36;
}

.allergy {
  background-color: #ea5b0c;
}

#my-meals {
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  width: 50vw;
  height: 103vh;
  border-radius: 0.4em;
  margin: 5vh 0;
  padding: 2em 0;
  color: black;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
}

.scrollable {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
  padding: 1em;
  padding-left: 0;
  width: 100%;
  border-radius: 0.4em;
  background-color: white;
  color: black;
  height: 95%;
  overflow-y: scroll;
}

#ingredients .scrollable,
#allergies .scrollable {
  justify-content: flex-start;
}

.recipe-card {
  background-color: #ea5b0c;
  margin: 1em;
  border-radius: 0.4em;
}

@media only screen and (max-width: 1700px) {
  .input-group input {
    width: 50%;
  }

  .input-group button {
    width: 40%;
  }
}

@media only screen and (max-width: 1200px) {
  #my-account {
    display: flex;
    flex-direction: column;
    height: 220vh;
  }

  #container1 {
    margin-top: 2em;
    width: 100%;
  }

  #my-meals {
    width: 100%;
  }
}
</style>
