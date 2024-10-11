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
import IngredientsAllergy from "@/components/IngredientsAllergy.vue";

export default {
  name: "MyAccount",
  components: {
    RecipeCard,
    IngredientsBox,
    IngredientsAllergy,
  },
  props: {
    id_user: Number,
    isLoggedIn: Boolean,
  },
  data() {
    return {
      ingredients: [],
      allergies: [],
      recipes: [],
      ingredientsSelected: [],
      ingredientsUnselected: [],
    };
  },
  async created() {
    await this.fetchRecipes(); // Fetch recipes when the component is created
    await this.fetchAllergies(); // Fetch allergies when the component is created
    await this.fetchIngredients(); // Fetch ingredients when the component is created
  },
  methods: {
    // Function to fetch the allergies of the user
    async fetchAllergies() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/get-allergies?userId=${this.id_user}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching allergies: ${response.statusText}`);
        }
        const data = await response.json();
        this.allergies = data;
      } catch (error) {
        console.error("Error fetching allergies:", error);
      }
    },
    //Delete an allergy
    async removeAllergy(ingredientId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/delete-allergy?userId=${this.id_user}&ingredientId=${ingredientId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error(`Error deleting allergy: ${response.statusText}`);
        }
        await this.fetchAllergies(); // Refresh the allergies list after deletion
      } catch (error) {
        console.error("Error deleting allergy:", error);
      }
    },
    // Function to add an allergy
    async addNewAllergy(ingredientId) {
      try {
        const response = await fetch("http://localhost:3000/api/add-allergy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify the content type
          },
          body: JSON.stringify({
            userId: this.id_user, // Send data in the body
            ingredientId: ingredientId,
          }),
        });
        if (!response.ok) {
          // Handle error response
          const errorData = await response.json();
          throw new Error(errorData.message); // Throw the error message returned from the backend
        }
        await this.fetchAllergies(); // Refresh allergies if successful
      } catch (error) {
        // Display error to the user
        console.error("Error adding allergy:", error.message);
        alert(error.message);
      }
    },
    // Function to fecth the liked recipes
    async fetchRecipes() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/get-liked-recipes?userId=${this.id_user}`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching liked recipes: ${response.statusText}`
          );
        }
        const data = await response.json();
        this.recipes = data;
      } catch (error) {
        console.error("Error fetching liked recipes:", error);
      }
    },
    async fetchIngredients() {
      // Fetch the ingredients from the API
      try {
        const response = await fetch("http://localhost:3000/api/ingredients");
        console.log(response);
        this.ingredientsUnselected = await response.json();
      } catch (error) {
        console.error("Error fetching ingredients:", error);
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
        <IngredientsAllergy
          :ingredientsSelected="ingredientsSelected"
          :ingredientsUnselected="ingredientsUnselected"
          @newAllergy="addNewAllergy"
          @removeAllergy="removeAllergy"
        />
        <div class="scrollable" v-if="allergies">
          <div
            v-for="(allergy, i) in allergies"
            :key="i"
            @click="removeAllergy(allergy.ID_Ingredient)"
          >
            <div class="allergy">
              <IngredientsBox :ingredient="allergy" :active="true" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List of all the user's liked meals -->
    <div id="my-meals" class="scrollable-parent">
      <h2>Your liked recipes</h2>
      <div class="scrollable-recipes">
        <div
          class="blue recipe-card"
          v-for="recipe in recipes"
          :key="recipe.ID_Recipe"
        >
          <RecipeCard
            :recipe="recipe"
            :isLoggedIn="isLoggedIn"
            :id_user="id_user"
          />
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

#ingredients,
#allergies {
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: flex-start;
  height: 65vh;
  border-radius: 0.4em;
  margin: 2vh 0;
  width: 100%;
  color: black;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  padding: 2em;
}

#inputAllergy {
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  border-radius: 0.4em;
  margin: 2vh 0;
  width: 100%;
  color: black;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  padding: 1em 0 1em 1em;
}

#account {
  height: auto;
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0.4em;
  margin: 2vh 0;
  width: 100%;
  color: black;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  padding: 2em;
}

#account h2 {
  margin-bottom: 0.5em;
}

.input-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 1em;
}

.input-group-allergy {
  display: flex;
  flex-direction: row;
  justify-content: center;
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

.scrollable-recipes {
  display: flex;
  justify-content: center;
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
    height: auto;
  }

  #container1 {
    margin-top: 2em;
    width: 100%;
  }

  #my-meals {
    width: 100%;
    margin-top: 3vh;
  }
  #account{
    height: fit-content;
  }
}
</style>
