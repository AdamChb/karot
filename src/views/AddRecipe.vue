<!-- ------------------------------
  Karot_2.0 - AddRecipe.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the page where a user can add a new recipe
------------------------------ -->

<template>
  <div class="container">
    <div class="recipe-form">
      <!-- Photo upload -->
      <div
        class="photo-upload"
        @dragover.prevent
        @drop.prevent="onDrop"
        @dragenter="dragActive = true"
        @dragleave="dragActive = false"
        :class="{ 'drag-active': dragActive }"
      >
        <!-- Upload button stays inside the drop zone -->
        <button class="upload-btn" @click="uploadImage">Upload a photo</button>
        <input
          type="file"
          @change="onFileChange"
          style="display: none"
          ref="fileInput"
        />
        <p>or drop it here</p>

        <!-- Only show the file name, no image preview -->
        <div v-if="fileName">
          <p class="file-name">{{ fileName }}</p>
        </div>
      </div>

      <!-- Form fields for recipe name, ingredients, and steps -->
      <div class="form-fields">
        <input
          type="text"
          v-model="recipeName"
          placeholder="Enter the name of the recipe"
          class="recipe-input"
        />
        <textarea
          v-model="ingredients"
          placeholder="Enter the ingredients. Ex: 2 cucumbers, 3 tomatoes..."
          class="ingredients-input"
        ></textarea>
        <textarea
          v-model="steps"
          placeholder="Enter the steps. Ex: Cut the tomatoes..."
          class="steps-input"
        ></textarea>
        <button class="submit-btn" @click="submitRecipe">Submit Recipe</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipeName: "",
      ingredients: "",
      steps: "",
      fileName: "", // Store file name instead of image preview
      dragActive: false,
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name; // Set the file name
      }
    },

    uploadImage() {
      this.$refs.fileInput.click(); // Simulate a click to trigger file input
    },

    onDrop(event) {
      this.dragActive = false; // Reset drag-active state
      const file = event.dataTransfer.files[0]; // Get the dropped file
      if (file) {
        this.fileName = file.name; // Set the file name on drop
      }
    },

    // Method to handle recipe submission
    async submitRecipe() {
      if (!this.recipeName || !this.ingredients || !this.steps) {
        alert("Please fill in all fields before submitting the recipe.");
        return;
      }

      // Prepare the data to send
      const recipeData = {
        name: this.recipeName,
        ingredients: this.ingredients.split(","), // Convert string to array
        steps: this.steps,
        image: this.fileName, // Adjust this if you are handling the image differently
        // Include ID_Creator if necessary; make sure to get the current user's ID
        // ID_Creator: currentUserId,
      };

      try {
        const response = await fetch("http://localhost:3000/api/add-recipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipeData),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Recipe added successfully!");
          // Reset the form fields
          this.recipeName = "";
          this.ingredients = "";
          this.steps = "";
          this.fileName = "";
        } else {
          alert(data.error || "Error adding recipe");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while adding the recipe.");
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 78vh;
  max-width: 100%;
  padding: 4rem 0 2rem 0;
  background-color: #2f4858;
  margin-left: 0;
  margin-right: 0;
}

.recipe-form {
  display: flex;
  justify-content: space-between;
  background-color: rgba(242, 242, 242, 0.9);
  padding: 2.5rem;
  border-radius: 0.625rem;
  width: 70%;
  max-width: 62.5rem;
  backdrop-filter: blur(0.625rem);
}

.photo-upload {
  width: 40%;
  height: 12.5rem;
  text-align: center;
  border: 0.125rem dashed #ccc;
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  cursor: pointer;
  transition: border 0.3s ease;
}

.drag-active {
  border-color: #ea5b0c;
}

.upload-btn {
  background-color: #ea5b0c;
  color: white;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;
}

.upload-btn:hover {
  background-color: #d94c09;
}

.file-name {
  margin-top: 0.625rem;
  font-size: 0.875rem;
  color: #333;
  word-break: break-all;
}

.form-fields {
  width: 55%;
}

.recipe-input,
.ingredients-input,
.steps-input {
  width: 100%;
  padding: 0.625rem;
  margin-bottom: 1.25rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.3125rem;
}

.submit-btn {
  background-color: #ea5b0c;
  color: white;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;
  width: 100%;
}

.submit-btn:hover {
  background-color: #d94c09;
}

textarea {
  resize: none;
}

@media (max-width: 48rem) {
  .recipe-form {
    flex-direction: column;
  }

  .photo-upload,
  .form-fields {
    width: 100%;
    margin-bottom: 1.25rem;
  }

  .photo-upload {
    height: auto;
    padding: 1.25rem;
  }

  .file-name {
    font-size: 0.75rem;
  }
}

@media (max-width: 30rem) {
  .upload-btn {
    width: 100%;
    padding: 0.9375rem;
  }

  .submit-btn {
    padding: 0.9375rem;
  }

  .photo-upload {
    padding: 0.9375rem;
  }

  .container {
    padding: 0.625rem;
  }
}
</style>
