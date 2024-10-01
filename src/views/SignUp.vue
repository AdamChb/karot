<script setup></script>

<template>
  <div id="content">
    <div id="form">
      <h1 id="title">Sign Up</h1>
      <form>
        <label class="subject" for="username">Username</label>
        <input
          class="input"
          type="text"
          id="username"
          name="username"
          required
        />

        <label class="subject" for="email">Email</label>
        <input class="input" type="email" id="email" name="email" required />

        <label class="subject" for="password">Password</label>
        <input
          class="input"
          type="password"
          id="password"
          name="password"
          required
        />

        <label class="subject" for="repeat-password">Repeat Password</label>
        <input
          class="input"
          type="password"
          id="repeat-password"
          name="repeat-password"
          required
        />
        <button type="submit" id="submit">Sign up</button>
        <p id="login">You already have an account ? <router-link to="/LogIn"><a>Log in</a></router-link></p>
      </form>
    </div>
  </div>
</template>

<style scoped>
#content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 50vh;
  width: 100%;
  padding: 4em 0 2em 0;
  background-color: #2F4858;
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
  padding: 0.5em;
  width: 17%;
  border-radius: 15px;
  background-color: #EA5B0C;
  color: white;
  font-weight: 600;
  border: none;
}

#login {
  margin-top: 1em;
  font-size: 1em;
}

#login a {
  color: #EA5B0C;
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
