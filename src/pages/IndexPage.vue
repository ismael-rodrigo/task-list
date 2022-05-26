<template>
  
  <br/>
  <p>Tasks List</p>
  <q-separator/>
  <br>
  
  <div class="tasks">
    <tasks/>
  </div>

</template>

<script setup>
import tasks from 'components/task/Taks.vue'

</script>


<style>
  .tasks{
    margin-left: auto;
    margin-right: auto;
    width: 500px;

  }
</style>