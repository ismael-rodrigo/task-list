<template>
    <div id="container">
        <form class="form" @submit.prevent="handleSubmit">
            <p>Login</p>
            <q-input type="email"    v-model="email"    class="q-mt-sm"  label="E-mail" />
            <q-input type="password" v-model="password" class="q-mt-sm"  label="Password" />
            <q-btn   type="submit" class="q-mt-lg full-width "  >Sing in</q-btn>
            <a @click="$router.replace('/new-user')" >Criar conta?</a>
            <br>

            <div class="google-login">
            <q-btn  unelevated @click="handleLoginWithGoogle" >
                <q-icon>
                    <img src="~assets/login/googleLoginIcon.png">
                </q-icon>

                <span>
                    Login com Google
                </span>
            </q-btn>
            </div>
        </form>
        
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import {useAuthFirebase} from 'src/composables/useAuthFirebase'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from 'src/composables/useAuthFirebase';
import { useDataBaseFirestore } from 'src/composables/useDataBaseFirestore';

const { ref } = require("vue")
const provider = new GoogleAuthProvider();

const router = useRouter();


const {loginDefault} = useAuthFirebase()
const {getDocument,newDocWithId} = useDataBaseFirestore()
const route = useRouter()

let email = ref('')
let password = ref('')

const handleSubmit = ()=>{
    loginDefault(email.value , password.value).then( response => router.push('/')  )
}

const handleLoginWithGoogle = async ()=>{

signInWithPopup(auth, provider)
  .then(async (result) => {
    if(!await getDocument('users',result.user.uid)){
        await newDocWithId('users',result.user.uid,{nome:result.user.displayName})
        .then((r)=>{
            route.push('/')
            console.log('conta criada!')
        })
        .catch((e)=>console.log(e))
    }
    else{
        route.push('/')
    }})
    .catch((error) => {
        console.log(error)
    });
}

</script>



<style scoped>

#container {
    display: flex ;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form{
    padding: 30px;
    border: thin solid rgb(219, 219, 219);
    background-color: azure;
    margin-top: 60px;
    width: 40%;
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
    margin-top: 10px;
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(46, 136, 136);
}
.form a:hover{
    color: rgb(65, 167, 167);
}

.form img{
    width: 50px;
}

.google-login{
    display: flex;
    justify-content: center;
    align-items: center;
}

.google-login img{
    width: 50px;
    margin-right: 10px;
}



</style>