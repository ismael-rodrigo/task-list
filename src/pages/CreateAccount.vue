<template>
    <div class="container">
        <form class="form"  @submit.prevent="handleSubmit">
            <p>Novo usuario</p>
            <q-input type="text"  required    v-model="name"     class="q-mt-sm"  label="Nome" />
            <q-input type="email"  required   v-model="email"    class="q-mt-sm"  label="E-mail" />
            <q-input type="password" required v-model="password" class="q-mt-sm"  label="Password" />
            <q-btn   type="submit" class="q-mt-lg full-width "  >Criar conta</q-btn>
            <a @click="$router.replace('/login')" >login</a>
        </form>
    </div>
</template>

<script setup>
import { getAuth ,createUserWithEmailAndPassword  } from '@firebase/auth';
import app from 'src/services/firebase/app';
import { ref } from 'vue';
import {useDataBaseFirestore} from 'src/composables/useDataBaseFirestore'
import { useRouter } from 'vue-router';

let name = ref('')
let email = ref('')
let password = ref('')

const route = useRouter()
const {newDocWithId} = useDataBaseFirestore()



const handleSubmit = async ()=>{
    const auth = getAuth(app)
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        const user = userCredential.user;
        newDocWithId('users',userCredential.user.uid,{nome:name.value}).then((r)=>{
            route.push('/')
            alert("Conta criada!")})
    })
    .catch((error) => {
        const errorCode = error.code;
        alert(errorCode)
    });
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

    cursor: pointer;
    text-decoration: none;
    margin-top: 10px;
    display: block;
    text-align: center;
    font-size: 13px;
    color: rgb(46, 136, 136);
}
.form a:hover{
    color: rgb(65, 167, 167);
}



</style>