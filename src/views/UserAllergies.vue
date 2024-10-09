<!-- ------------------------------
  Karot_2.0 - UserAllergies.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the page to manage the allergies of the user.
------------------------------ -->

<script>
export default {
  name: "UserAllergies",
  components: {},
  data() {
    return {
      // TEMP: Lier à la base de données
      ingredients: [
        { name: "Peanut", id: 1 },
        { name: "Tree nut", id: 2 },
        { name: "Fish", id: 3 },
        { name: "Shellfish", id: 4 },
        { name: "Soy", id: 5 },
        { name: "Wheat", id: 6 },
        { name: "Sesame", id: 7 },
        { name: "Sulfites", id: 8 },
        { name: "Mustard", id: 9 },
        { name: "Celery", id: 10 },
        { name: "Lupin", id: 11 },
        { name: "Molluscs", id: 12 },
        { name: "Gluten", id: 13 },
        { name: "Lactose", id: 14 },
      ],
      allergies: ["Peanut", "Tree nut", "Fish", "Lactose"],
    };
  },
  methods: {
    // Method to add an allergy
    addAllergy(ingredientId) {
      fetch("http://localhost:3000/api/add-allergy", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          userId: this.userId,
          ingredientId: this.ingredient.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            // Update the list of allergies
            this.allergies.push(ingredientId);
          } else {
            alert(data.error || "Error adding allergy");
          }
        })
        .catch((error) => {
          console.error("Erreur:", error);
        });
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
  },
};
</script>

<template>
  <section class="blue home">
    <div class="row" id="row-home">
      <div class="col-xxl-7 col-12">
        <div class="container-fluid" id="hook">
          <div class="container-side">
            <h3>Do you have allergies ?</h3>

            <!-- Search bar -->
            <input type="search" placeholder="Research an ingredient" />
            <ul>
              <!-- List of ingredients -->
              <li
                v-for="(ingredient, i) in ingredients"
                :key="i"
                class="grey ingredient"
                @click="addAllergy(ingredient)"
              >
                {{ ingredient }} +
              </li>
            </ul>
          </div>

          <!-- List of allergies -->
          <div class="container-side">
            <h3>My allergies</h3>
            <ul>
              <li
                v-for="(allergy, i) in allergies"
                :key="i"
                class="orange allergy"
                @click="deleteAllergy(ingredient)"
              >
                {{ allergy }} ×
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Style of the UserAllergies page */
.col-12 {
  width: 100%;
}
.container-fluid {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
}
.container-side {
  width: 100%;
  padding: 2em 3em;
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  margin: 2em;
  border-radius: 15px;
}

input {
  width: 100%;
  padding: 0.3em 0.5em;
  margin: 1em 0;
  border-radius: 7px;
  border: 2px solid black;
  transition: 0.3s;
}
input:focus {
  outline: none;
  transform: scale(1.02);
  transition: 0.3s;
}
input:hover {
  transform: scale(1.02);
  transition: 0.3s;
}
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
li {
  padding: 0.5em;
  margin: 0.5em 0.4em;
  border-radius: 7px;
  cursor: pointer;
  width: fit-content;
  transition: 0.3s;
}

li:hover {
  transform: scale(1.07);
  transition: 0.3s;
}

.ingredient {
  background-color: #f0f0f0;
}

.allergy {
  color: white;
}

.home {
  height: fit-content;
  padding: 2em;
}

.row {
  height: 100%;
  margin: 0 !important;
}
h1 {
  font-size: 4em !important;
  margin-bottom: 1em;
  font-weight: 800 !important;
}
#hook {
  width: 75%;
  padding: 5em 0;
}

#hook h1 {
  width: 70%;
  margin-bottom: 0.5em;
  line-height: 1.1em;
}

#hook p {
  font-size: 1em;
  margin-bottom: 3em;
  font-weight: 400;
}

#start-now {
  font-size: 1.3em;
  font-weight: 500;
  width: 6em;
  height: 2em;
  border-radius: 10px;
  border: 3px solid white;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
}
@media only screen and (max-width: 768px) {
  /* Responsive style for the page */
  #hook {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  .container-fluid {
    flex-direction: column;
  }
}
</style>
