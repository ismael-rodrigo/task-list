<template>
  <q-layout view="lHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          Task List
        </q-toolbar-title>
        <q-btn class="float-right" size="sm" color="red" @click="handleLogout">Logout</q-btn>
      </q-toolbar>
    </q-header>


    <q-drawer class="side-bar" v-model="leftDrawerOpen" side="left" bordered>
      <img :src="photoUser" alt="">
      <br>
      <p>{{userName}}</p>

      <q-btn class="full-width" unelevated >Task List</q-btn>




      <q-btn id="bottom-btn"  >Sobre</q-btn>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>


        
<script setup>

import { useAuthFirebase } from "src/composables/useAuthFirebase";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import auth from 'src/composables/useAuthFirebase';
import { useDataBaseFirestore } from 'src/composables/useDataBaseFirestore';



const {getDocument} = useDataBaseFirestore()
let userName = ref('')
let photoUser = ref('')

const getUser = async ()=>{
  await getDocument('users',auth.currentUser.uid).then(user =>{
     userName.value=user['nome']
    if(auth.currentUser.photoURL){
      photoUser.value = auth.currentUser.photoURL
    }
    else{
      photoUser.value = 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'
    }
     })


}
getUser()

const {userLogout} = useAuthFirebase()
const router = useRouter()
const leftDrawerOpen = ref(false)

const toggleLeftDrawer  = ()=>{
        leftDrawerOpen.value = !leftDrawerOpen.value
      }

const handleLogout = ()=>{
  userLogout().then(()=>router.push('/login'))
}


</script>

<style>

.side-bar p{
  font-size: x-large;
}

.side-bar img{
  border-radius: 50%;
  width: 100px;
}



.side-bar{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;


  background-image: linear-gradient( to right, rgb(85, 55, 165),rgb(41, 95, 211));
}



#bottom-btn{
  width: 100%;
  position: absolute;
  bottom:1px;
}


</style>