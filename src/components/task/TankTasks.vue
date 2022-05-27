
<template >
    <div class="q-gutter-sm">
        <div class="task"  v-for="(task) in tasks" :key='task' >
            <q-checkbox id="check-box" class="q-py-md"  @click="handleClickTask(task)" v-bind:class='{concluded:task.data.status}' v-model="selection" :val="task.data.name" :label="task.data.name" color="orange" />
                <span @click="handleDeleteTask(task)" id="icon-delete-task" class="material-icons">
                    delete
                </span>
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
import { doc, setDoc ,deleteDoc } from "firebase/firestore";
import { async } from "@firebase/util";

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


        tasks.value.sort(function(task){
            if(task.data.status){
                return 1
            }
            else{
                return -1
            }
            
        })

        });
})


const handleDeleteTask = async (task)=>{
    await deleteDoc(doc(db, `users/${auth.currentUser.uid}/tasks`, task.id));
}


const handleClickTask = async (task)=>{
   await setDoc(doc(db,`users/${auth.currentUser.uid}/tasks`,task.id), {name:task.data.name , status: !task.data.status}).then(()=>task.data.status = !task.data.status)
}



</script>

<style>

#icon-delete-task{
    position: relative;
    display: inline;
    margin-top: 26px;
    margin-right: 10px;
    float: right;
    vertical-align: middle;
    font-size: large;
    transition: 0.2s;
    cursor: pointer;
}



#icon-delete-task:hover{
    color: rgb(255, 61, 61);
    font-size: x-large;
}



#check-box{
    width: auto;
}

.task {
    display: block;
}

.concluded{
    color: rgb(90, 90, 90);
    text-decoration:line-through;
}



</style>