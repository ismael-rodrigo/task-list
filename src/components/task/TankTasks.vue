
<template >
    <div class="q-gutter-sm">
        <div class="task"  v-for="(task) in tasks" :key='task' >
            <q-checkbox id="check-box" class="q-py-md" @click="handleClickTask(task)" v-bind:class='{concluded:task.status }' v-model="selection" :val="task" :label="task.name" color="orange" />
            <q-separator/>
        </div>
    </div>

</template>

<script setup>

import { collection, query, where, onSnapshot } from "firebase/firestore";
import auth from 'src/composables/useAuthFirebase'
import db from 'src/services/firebase/db'


const { ref } = require("@vue/reactivity");

import {useDataBaseFirestore} from 'src/composables/useDataBaseFirestore'

const {getCollection} = useDataBaseFirestore()

let isChecked = ref(false)


let selection = ref([])

let tasks = ref([])




const q = query(collection(db, "cities"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
  });
  console.log("Current cities in CA: ", cities.join(", "));
});

unsubscribe()


const handleClickTask = (task)=>{
   task.status = !task.status
}



</script>

<style>

.task {
    display: block;
}

.concluded{
    color: rgb(90, 90, 90);
    text-decoration:line-through;
}



</style>