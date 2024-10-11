<!-- ------------------------------
  Karot_2.0 - LogIn.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the Log In page
------------------------------ -->

<script>
// TEMP: Lier à la base de données et rediriger vers la page d'accueil
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loggedInUpdate(id) {
      console.log("method " + id);
      this.$emit(`loggedInUpdate`, id);
    },
    async checkData(event) {
      event.preventDefault();
      const user = {
        email: this.email,
        password: this.password,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/log-in`, options);
        const data = await response.json();
        this.loggedInUpdate(data.ID_User);
        this.$router.push({ name: "HomePage" });
      }
      catch(err) {
        console.log(err);
      }
    }
  }
}
</script>

<template>
  <div id="content">
    <div id="form">
      <h1 id="title">Log In</h1>

      <!-- Form with the email and the password -->
      <form>
        <label for="email" class="subject">Username</label>
        <input 
          class="input" 
          type="email" 
          id="email" 
          name="email" 
          v-model="email" 
          required 
        />
        <label for="password" class="subject">Password</label>
        <input
          class="input"
          type="password"
          id="password"
          name="password"
          v-model="password"
          required
        />

        <!-- Button to submit the information -->
        <button id="submit" @click="checkData">Log In</button>
        <p id="signup">
          You don’t have an account ?
          <router-link to="/SignUp"><a>Register now</a></router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Style of the page LogIn */
#content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 50vh;
  width: 100%;
  padding: 4em 0 2em 0;
  background-color: #2f4858;
}

#form {
  height: auto;
  width: 36vw;
  padding: 2.5em;
  margin: 2em 0 2em 0;
  min-height: 40vh;
  background-color: #ffffff;
  border-radius: 25px;
}

#title {
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 1em;
}

.subject {
  font-size: 1em;
  margin-bottom: 0.5em;
  display: block;
}

.input {
  padding: 0.5em;
  margin-bottom: 1em;
  width: 100%;
  border-radius: 5px;
  border: 1px solid black;
}

#submit {
  padding: .3em .6em;
  width: auto;
  border-radius: 8px;
  background-color: #ea5b0c;
  color: white;
  font-weight: 600;
  border: none;
}

#signup {
  margin-top: 1em;
  font-size: 1em;
}

#signup a {
  color: #ea5b0c;
  text-decoration: none;
}

@media (max-width: 1000px) {
  #form {
    width: 50vw;
  }
}

@media (max-width: 768px) {
  #form {
    width: 70vw;
  }
}

@media (max-width: 480px) {
  #form {
    width: 90vw;
  }
}
</style>
