<template>
    <div class="not-found-ass">
        <h1>U FOCKIN WOT M8 ?!</h1>
        <router-link class="go-back-boy" :to="{name: 'PageHome'}">Are you retarded ? GO BACK</router-link>
    </div>
</template>

<style lang="scss" scoped>
    .not-found-ass {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 70vh;
        background: darkred;
        color: white;
    }
    .go-back-boy {
        transition: 0.2s;
        text-decoration: none;
        border: white 1px solid;
        border-radius: 3px;
        padding: 20px;
        margin-left: 30px;
        color: white;
    }
    .go-back-boy:hover {
        cursor: pointer;
        background: white;
        color: black;
    }
</style>
