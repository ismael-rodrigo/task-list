
<template >
    <div class="q-gutter-sm">
        <div class="task"  v-for="(task) in tasks" :key='task' >
            <q-checkbox id="check-box" class="q-py-md"  @click="handleClickTask(task)" v-bind:class='{concluded:task.data.status}' v-model="selection" :val="task.data.name" :label="task.data.name" color="orange" />
            <q-separator/>
        </div>
    </div>

</template>

<script setup>

import { collection, query, where, onSnapshot } from "firebase/firestore";
import auth from 'src/composables/useAuthFirebase'
import db from 'src/services/firebase/db'
import {useDataBaseFirestore} from 'src/composables/useDataBaseFirestore'
import { onMounted } from 'vue'
import { doc, setDoc } from "firebase/firestore";

const { ref } = require("@vue/reactivity");



const {newDoc} = useDataBaseFirestore()

let selection = ref([])



let tasks = ref([])



onMounted(()=>{
    const q = query(collection(db,`users/${auth.currentUser.uid}/tasks`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        tasks.value=[]
        selection.value=[]
        querySnapshot.forEach((doc) => {
            tasks.value.push({data:doc.data(),id:doc.id})

            if(doc.data().status){
                selection.value.push(doc.data().name)
            }
            })
        });
})



const handleClickTask =async (task)=>{
   await setDoc(doc(db,`users/${auth.currentUser.uid}/tasks`,task.id), {name:task.data.name , status: !task.data.status}).then(()=>task.data.status = !task.data.status)
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