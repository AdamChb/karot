<template>
    <section id="my-account" class="blue">
        <div id="container1">
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
            <div id="ingredients" class="scrollable-parent">
                <h2>Your ingredients</h2>
                <div class="scrollable">
                    <div v-for="(ingredient, i) in ingredients" :key="i">
                        <div class="ingredient">
                            <p>{{ ingredient }}</p>
                            <p>x</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="allergies" class="scrollable-parent">
                <h2>Your allergies</h2>
                <div class="scrollable">
                    <div v-for="(allergy, i) in allergies" :key="i">
                        <div class="allergy">
                            <p>{{ allergy }}</p>
                            <p>x</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="my-meals" class="scrollable-parent">
            <h2>Your liked recipes</h2>
            <div class="scrollable">
                <div class="blue recipe-card" v-for="(recipe, i) in recipes" :key="i">
                    <RecipeCard :recipe="recipe"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import RecipeCard from '@/components/RecipeCard.vue';

export default {
    name: "MyAccount",
    components: {
        RecipeCard,
    },
    data() {
        return {
            ingredients: ["Tomato", "Onion", "Garlic", "Pasta", "Olive oil", "Salt", "Pepper"],
            allergies: ["Gluten", "Lactose", "Peanuts", "Onion", "Garlic", "Pasta", "Olive oil", "Salt", "Pepper", "Onion", "Garlic", "Pasta", "Olive oil", "Salt", "Pepper", "Onion", "Garlic", "Pasta", "Olive oil", "Salt", "Pepper", "Onion", "Garlic", "Pasta", "Olive oil", "Salt", "Pepper", "Onion", "Garlic", "Pasta", "Olive oil", "Salt", "Pepper", "Onion", "Garlic", "Pasta", "Olive oil", "Salt", "Pepper", "Onion", "Garlic", "Pasta", "Olive oil", "Salt", "Pepper"],
            recipes: [
                {
                    id: 1,
                    name: 'Pasta with tomato sauce',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'Adam',
                    like: 47,
                },
                {
                    id: 2,
                    name: 'fdthrthfdghfghf',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'fgh',
                    like: 98,
                },
                {
                    id: 3,
                    name: 'mkomlkmlmoopkmlko',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'oooo',
                    like: 349,
                },
                {
                    id: 4,
                    name: 'efzazazsqsazSAZQS',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'aaaaaaa',
                    like: 3498,
                },
                {
                    id: 5,
                    name: 'Pasta with tomato sauce',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'Adam',
                    like: 47,
                },
                {
                    id: 6,
                    name: 'fdthrthfdghfghf',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'fgh',
                    like: 98,
                },
                {
                    id: 7,
                    name: 'mkomlkmlmoopkmlko',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'oooo',
                    like: 349,
                },
                {
                    id: 8,
                    name: 'efzazazsqsazSAZQS',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'aaaaaaa',
                    like: 3498,
                },
                {
                    id: 9,
                    name: 'Pasta with tomato sauce',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'Adam',
                    like: 47,
                },
                {
                    id: 10,
                    name: 'fdthrthfdghfghf',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'fgh',
                    like: 98,
                },
                {
                    id: 11,
                    name: 'mkomlkmlmoopkmlko',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'oooo',
                    like: 349,
                },
                {
                    id: 12,
                    name: 'efzazazsqsazSAZQS',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'aaaaaaa',
                    like: 3498,
                },
                {
                    id: 13,
                    name: 'Pasta with tomato sauce',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'Adam',
                    like: 47,
                },
                {
                    id: 14,
                    name: 'fdthrthfdghfghf',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'fgh',
                    like: 98,
                },
                {
                    id: 15,
                    name: 'mkomlkmlmoopkmlko',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'oooo',
                    like: 349,
                },
                {
                    id: 16,
                    name: 'efzazazsqsazSAZQS',
                    ingredients: ['pasta', 'tomato sauce', 'basil'],
                    instructions: ['Boil the pasta', 'Add the tomato sauce', 'Add basil'],
                    image: 'https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg',
                    author: 'aaaaaaa',
                    like: 3498,
                },
            ]
        }
    }
}
</script>

<style scoped>
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

#account, #ingredients, #allergies {
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

.ingredient, .allergy {
    display: flex;
    justify-content: space-between;
    gap: 1.5em;
    width: fit-content;
    padding: 0.3em 0.5em;
    margin: 0.3em;
    border-radius: 0.4em;
}

.ingredient p, .allergy p {
    margin-bottom: 0;
    color: white;
}

.ingredient {
    background-color: #9ABD36;
}

.allergy {
    background-color: #EA5B0C;
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
    justify-content: flex-start
}

.recipe-card {
    background-color: #ea5b0c   ;
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
