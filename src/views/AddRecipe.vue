<template>
    <div class="container">
      <div class="recipe-form">
        <div class="photo-upload">
          <button class="upload-btn">Upload a photo</button>
          <input type="file" @change="onFileChange" style="display:none" ref="fileInput">
          <p>or drop it here</p>
          <div v-if="image">
            <img :src="image" alt="Recipe photo" class="preview"/>
          </div>
        </div>
  
        <div class="form-fields">
          <input type="text" v-model="recipeName" placeholder="Enter the name of the recipe" class="recipe-input"/>
          
          <textarea v-model="ingredients" placeholder="Enter the ingredients. Ex: 2 cucumbers, 3 tomatoes..." class="ingredients-input"></textarea>
          
          <textarea v-model="steps" placeholder="Enter the steps. Ex: Cut the tomatoes..." class="steps-input"></textarea>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recipeName: '',
        ingredients: '',
        steps: '',
        image: null
      };
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.image = URL.createObjectURL(file);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    font-family: 'Arial', sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .recipe-form {
    display: flex;
    justify-content: space-between;
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
  }
  
  .photo-upload {
    width: 40%;
    text-align: center;
  }
  
  .upload-btn {
    background-color: orange;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .preview {
    margin-top: 10px;
    max-width: 100%;
    border-radius: 10px;
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
  
  textarea {
    resize: none;
  }

  </style>
  