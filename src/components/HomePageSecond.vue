<script setup>
    const steps = [
        {
            number: 1,
            text: "Create your account",
            class: "left",
        },
        {
            number: 2,
            text: "Enter the ingredients from your fridge",
            class: "right",
        },
        {
            number: 3,
            text: "Generate meal ideas based on your fridge ingredients",
            class: "left",
        },
        {
            number: 4,
            text: "Browse the recomandations and add your own meals",
            class: "right",
        },
        {
            number: 5,
            text: "Discover our other amazing features",
            class: "left",
        }
    ]
</script>

<template>
    <section id="how-to-use-karot" class="white">
        <div id="title">
            <div id="text">
                <h1 class="txt-orange">How to use <img src="@/assets/logo_header.svg" alt="Logo"> ?</h1>
            </div>
            <img src="@/assets/karot-singing.svg" alt="Karot singing">
        </div>
        <div id="how-to">
            <div v-for="step in steps" :key="step.number">
                <div class="steps" :class="step.class">
                    <div><p>{{ step.number }}</p></div>
                    <p>{{ step.text }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
#how-to-use-karot {
    padding: 3em 10em;
}

/* Style of the title div */
#title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#title #text {
    width: 40%;
    margin-top: 5em;
}

#title #text h1 {
    font-size: 5em!important;
    font-weight: bolder;
    line-height: 1.3em;
}

#title #text img {
    width: 55%;
    margin-bottom: 0.4em;
    margin-right: 0.25em;
}

/* Style of the How To div */
#how-to {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 3em 0;
    /* padding: 0 10em; */
}

.steps {
    display: flex;
    align-items: center;
    margin: 1em 0;
}

.steps div {
    width: 4em;
    height: 4em;
    border-radius: 50%;
    background-color: #ea5b0c;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1em;
}

.steps div p {
    font-size: 3.5em;
    color: white;
    margin-bottom: .2em;
}

.steps p {
    font-family: "Just Me Again Down Here";
}

.steps > p {
    font-size: 2.5em;
    margin: 0 .2em;
    width: 35%;
    line-height: .9em;
}

.steps.right {
    flex-direction: row-reverse;
}

.steps.right > p {
    text-align: right;
}

@media only screen and (max-width: 1300px) {
    #how-to-use-karot {
        padding: .5em;
    }
    
    #title {
        flex-direction: column;
        align-items: center;
    }

    #title #text {
        width: 70%;
    }

    #title #text h1 {
        font-size: 4em!important;
    }

    #title > img {
        padding: 2em 0;
    }
}

@media only screen and (max-width: 900px) {
    #title #text h1 {
        font-size: 3em!important;
    }

    #title #text img {
        width: 75%;
        margin: 0 7px 20px 0;
    }

    #title > img {
        width: 70%;
    }
    
    .steps > p {
        width: 80%;
        font-size: 1.5em;
    }
}
</style>