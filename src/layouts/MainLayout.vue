<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          Taks List
        </q-toolbar-title>
        <q-btn class="float-right" size="sm" color="red" @click="handleLogout">Logout</q-btn>
      </q-toolbar>
      
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>

import { useAuthFirebase } from "src/composables/useAuthFirebase";
import { useRouter } from 'vue-router';

const {userLogout} = useAuthFirebase()
const router = useRouter()



const handleLogout = ()=>{
  userLogout().then(()=>router.push('/login'))
}


</script>