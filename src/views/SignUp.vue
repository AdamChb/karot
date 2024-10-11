<!-- ------------------------------
  Karot_2.0 - SignUp.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the page to sign up.
------------------------------ -->

<script>
// TEMP: Connecter à la base de données pour pouvoir s'inscrire sur le site
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      repeat_password: "",
    };
  },
  props: {
    isLoggedIn: Boolean,
  },
  methods: {
    loggedInUpdate(id) {
      this.$emit(`loggedInUpdate`, id);
    },
    async checkData(event) {
      event.preventDefault()
      if (this.password === this.repeat_password) {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password,
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        };
        try {
          await fetch('http://127.0.0.1:3000/api/new-user', options);
          const response = await fetch(`http://127.0.0.1:3000/api/log-in`, options);
          const data = await response.json();
          this.loggedInUpdate(data.ID_User);
          this.$router.push({ name: 'HomePage' });
        }
        catch(err) {
          console.log(err);
        }
      } else {
        alert("The passwords do not match.");
      }
    },
  },
}
</script>

<template>
  <div id="content">
    <div id="form">
      <h1 id="title">Sign Up</h1>
      <form>
        <!-- Username -->
        <label class="subject" for="username">Username</label>
        <input
          class="input"
          type="text"
          id="username"
          name="username"
          v-model="username"
          required
        />

        <!-- Email -->
        <label class="subject" for="email">Email</label>
        <input class="input" type="email" id="email" name="email" v-model="email" required />

        <!-- Password -->
        <label class="subject" for="password">Password</label>
        <input
          class="input"
          type="password"
          id="password"
          name="password"
          v-model="password"
          required
        />

        <!-- Repeat Password -->
        <label class="subject" for="repeat-password">Repeat Password</label>
        <input
          class="input"
          type="password"
          id="repeat-password"
          name="repeat-password"
          v-model="repeat_password"
          required
        />

        <!-- Button to submit the information -->
        <button id="submit" @click="checkData">Sign up</button>

        <!-- Link to the LogIn page -->
        <p id="login">
          You already have an account ?
          <router-link to="/LogIn"><a>Log in</a></router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Style of the page SignUp */
#content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 50vh;
  width: 100%;
  padding: 4em 0 2em 0;
  background-color: #2f4858;
  background-size: cover;
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

#login {
  margin-top: 1em;
  font-size: 1em;
}

#login a {
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
    width: 60vw;
  }
}

@media (max-width: 480px) {
  #form {
    width: 70vw;
  }
}
</style>
