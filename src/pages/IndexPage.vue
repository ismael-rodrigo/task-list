<template>
  
  <br/>
  <p>Bem vindo, <strong> {{userName}}</strong> !</p>
  <q-separator/>
  <br>
  
  <div class="tasks">
    <tasks/>
  </div>

</template>

<script setup>
import tasks from 'components/task/Taks.vue'
import auth from 'src/composables/useAuthFirebase';
import { useDataBaseFirestore } from 'src/composables/useDataBaseFirestore';
import { ref } from 'vue';



const {getDocument} = useDataBaseFirestore()
let userName = ref('')


const getUser = async ()=>{
  await getDocument('users',auth.currentUser.uid).then(user => userName.value=user['nome'])
}
getUser()


</script>


<style>
  .tasks{
    margin-left: auto;
    margin-right: auto;
    width: 500px;

  }
</style>