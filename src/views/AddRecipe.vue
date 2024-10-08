<!-- ------------------------------
  Karot_2.0 - AddRecipe.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the page where a user can add a new recipe
------------------------------ -->

<script>
  export default {
  data() {
    return {
      recipeName: '',
      ingredients: '',
      steps: '',
      fileName: '', // Store file name instead of image preview
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
    submitRecipe() {
      if (!this.recipeName || !this.ingredients || !this.steps) {
        alert("Please fill in all fields before submitting the recipe.");
        return;
      }
    }
  }
};
</script>

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
        <input type="file" @change="onFileChange" style="display:none" ref="fileInput">
        <p>or drop it here</p>

        <!-- Only show the file name, no image preview -->
        <div v-if="fileName">
          <p class="file-name">{{ fileName }}</p>
        </div>
      </div>

      <!-- Form fields for recipe name, ingredients, and steps -->
      <div class="form-fields">
        <input type="text" v-model="recipeName" placeholder="Enter the name of the recipe" class="recipe-input"/>
        <textarea v-model="ingredients" placeholder="Enter the ingredients. Ex: 2 cucumbers, 3 tomatoes..." class="ingredients-input"></textarea>
        <textarea v-model="steps" placeholder="Enter the steps. Ex: Cut the tomatoes..." class="steps-input"></textarea>
        <button class="submit-btn" @click="submitRecipe">Submit Recipe</button>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
  .container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 50vh;
  max-width: 100%;
  padding: 4em 0 2em 0;
  background-color: #2f4858;
  margin-left : 0;
  margin-right: 0;
}

.recipe-form {
  display: flex;
  justify-content: space-between;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
}

.photo-upload {
  width: 40%;
  height: 200px; /* Height for the drop zone */
  text-align: center;
  border: 2px dashed #ccc; /* Dashed border */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  cursor: pointer;
  transition: border 0.3s ease;
}

.drag-active {
  border-color: #EA5B0C; /* Change border color when dragging over */
}

.upload-btn {
  background-color: #EA5B0C;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.upload-btn:hover {
  background-color: #d94c09;
}

.file-name {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  word-break: break-all; /* Ensure long file names wrap inside the box */
}

.form-fields {
  width: 55%;
}

.recipe-input, .ingredients-input, .steps-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-btn {
  background-color: #EA5B0C;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.submit-btn:hover {
  background-color: #d94c09;
}

textarea {
  resize: none;
}

@media (max-width: 768px) {
  .recipe-form {
    flex-direction: column; /* Stack the photo upload and form vertically */
  }

  .photo-upload, 
  .form-fields {
    width: 100%; /* Full width for both the photo upload and form fields */
    margin-bottom: 20px; /* Add space between them */
  }
  
  .photo-upload {
    height: auto; /* Adjust height for better fit */
    padding: 20px; /* Add padding to make the drop zone larger */
  }

  .file-name {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .upload-btn {
    width: 100%; /* Make the upload button full width on smaller screens */
    padding: 15px;
  }

  .submit-btn {
    padding: 15px;
  }

  .photo-upload {
    padding: 15px;
  }

  .container {
    padding: 10px; /* Reduce padding for smaller screens */
  }
}

</style>  