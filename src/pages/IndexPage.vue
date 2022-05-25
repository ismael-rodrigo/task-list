<template>
  <h3>Bem vindo, <strong> {{userName}}</strong> !</h3>
  <q-page class="flex flex-center">
    
  </q-page>
</template>





<script setup>
import auth from 'src/composables/useAuthFirebase';
import { useDataBaseFirestore } from 'src/composables/useDataBaseFirestore';
import { ref } from 'vue';


const {getDocument} = useDataBaseFirestore()
let userName = ref('')

const getUser = async ()=>
{
  await getDocument('users',auth.currentUser.uid).then(user => userName.value=user['nome'])
  }

getUser()




const handleGetDocs =async()=>{


}


</script>
