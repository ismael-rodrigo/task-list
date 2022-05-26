<template>
  <div class="new-task-container">
      <q-form @submit.prevent="handleNewTask" >
        <q-input fullwidth outlined v-model="task" square label="New Task" />
        <q-btn type="submit" id="btn-new-task" class="bg-blue-grey" square unelevated >+</q-btn>
      </q-form>
  </div>
</template>


<script setup>
import auth from "src/composables/useAuthFirebase";
import { useDataBaseFirestore } from "src/composables/useDataBaseFirestore";
const { ref }=require("@vue/reactivity");
const {newDoc} = useDataBaseFirestore()
let task = ref('')


const handleNewTask =async ()=>{
  if(task.value=='')return
  newDoc(`users/${auth.currentUser.uid}/tasks`,{name:task.value,status:false}).then(r=>task.value='')
}



</script>



<style>
form{
  display: grid;
  grid-template-columns: 9fr 1fr;
}
#btn-new-task{
  border-radius: 0px;
}

</style>