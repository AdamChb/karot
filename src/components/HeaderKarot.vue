<script setup>
const toggleMenu = () => {
  if (document.getElementById("header_nav_burger").style.display === "none") {
      document.getElementById("header_nav_burger").style.display = "flex";
  } else {
      document.getElementById("header_nav_burger").style.display = "none";
  }
}
</script>

<template>
  <header>
    <!-- Header for pc -->
    <div id="pc">
      <router-link to="/" class="header_logo">
        <img src="@/assets/logo_header.svg" alt="Logo Karot">
      </router-link>

      <nav id="header_nav">
        <router-link to="/createMeals">Create meals</router-link>
        <router-link to="/recipes">Recipes</router-link>
        <router-link to="/myMeals">My meals</router-link>
        <router-link to="/logIn">Log In</router-link>
      </nav>
    </div>

    <!-- Header for mobile -->
    <div id="tel">
      <div id="header_tel">
        <router-link to="/" class="header_logo">
        <img src="@/assets/logo_header.svg" alt="Logo Karot">
      </router-link>
        
        <!-- Burger button -->
        <div id="menu_button" @click="toggleMenu">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>

      <!-- Navigation bar for mobile -->
      <nav id="header_nav_burger" style="display: none;">
        <router-link to="/createMeals">Create meals</router-link>
        <router-link to="/recipes">Recipes</router-link>
        <router-link to="/myMeals">My meals</router-link>
        <router-link to="/logIn">Log In</router-link>
      </nav>
    </div>
  </header>
</template>
    
<style scoped>
/* Styles of the header */
header {
  background-color: white;
  display: flex;
  align-items: center;
}

header #pc {
  display: flex;
}

header #pc, #header_tel {
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

#tel {
    display: none;
    flex-direction: column;
}


/* Style of the navigation bar for pc */
#header_nav {
  display: flex;
  list-style-type: none;
  justify-content: space-around;
  margin-bottom: 0;
  align-items: center;
}

#header_nav a {
  margin-right: 4em;
  font-size: 1em;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  text-decoration: none;
  color: black;
  transition: .3s;
}

#header_nav a:hover {
    color: #ea5b0c;
    transform: scale(1.15);
    transition: 0.3s;
}

#header_nav a:last-child {
  margin-left: 0;
  background-color: #ea5b0c;
  height: 2em;
  width: 5em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.4em;
  color: white;
  transition: 0.3s;
}

#header_nav a:last-child:hover {
    background-color: black;
    color: white;
    box-shadow: 0px 0px 15px rgba(0, 0, 0);
    transition: 0.3s;
}

/* Style of the logo */
header #pc img {
  height: 3em;
  width: auto;
  margin: 1em 0 1em 4em;
  transition: .3s;
}

header #pc img:hover {
    transform: scale(1.15);
}

#tel {
  width: 100%;
}

/* Style of the navigation bar for mobile */
#header_nav_burger {
    display: none;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: end;
    flex-direction: column;
    background-color: white;
    row-gap: .8em;
    border-top: 1px solid black;
}

#header_nav_burger a {
    font-size: 2.5vh;
    display: flex;
    width: 100%;
    height: 5vh;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    color: black;
    text-decoration: none;
}

#header_nav_burger a:last-child {
    display: flex;
    font-size: 2.5vh;
    height: 6vh;
    background-color: #ea5b0c;
    color: white;
    transition: 0.3s;
}

/* Style for the burger button */
#menu_button {
    height: 31px;
    width: 36px;
    margin-right: 1em;
}

#menu_button div {
    height: 5px;
    width: 36px;
    margin-bottom: 8px;
    transition: 0.3s;
    background-color: #ea5b0c;
    border-radius: 2.5px;
}

header #tel img {
  height: 2.5em;
  width: auto;
  margin: 0.5em 0 0.5em 1em;
  transition: .3s;
}

@media only screen and (max-width: 1100px) {
  /* Switch the activated content when 
  screen's width is lower than 1100px */
    header #pc {
        display: none;
    }

    #tel, #header_tel {
        display: flex;
    }
}
</style> 