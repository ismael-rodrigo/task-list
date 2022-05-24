<template>
    <div class="container">
        <form class="form" @submit.prevent="handleSubmit">
            <p>Login</p>
            <q-input type="email"    v-model="email"    class="q-mt-sm" dense label="E-mail" />
            <q-input type="password" v-model="password" class="q-mt-sm" dense label="Password" />
            <q-btn   type="submit" class="q-mt-lg full-width "  >Sing in</q-btn>
            <a href="/" >Criar conta?</a>
        </form>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import {useAuthFirebase} from 'src/composables/useAuthFirebase'

const router = useRouter();

const { ref } = require("vue")
const {loginDefault} = useAuthFirebase()

let email = ref('')
let password = ref('')

const handleSubmit = ()=>{
    loginDefault(email.value , password.value).then( response => router.push('/')  )
}







</script>











<style>
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form{
    padding: 30px;

    border: thin solid rgb(219, 219, 219);
    background-color: azure;
    margin-top: 60px;
    width: 30%;
    min-width: fit-content;
    max-width: 400px;
}

.form p{
    font-size: 30px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: rgb(75, 75, 75);
}

.form a{
    text-decoration: none;
    margin-top: 5px;
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(46, 136, 136);
}
.form a:hover{
    color: rgb(65, 167, 167);
}



</style>