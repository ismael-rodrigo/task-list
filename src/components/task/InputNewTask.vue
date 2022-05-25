<template>
  <div class="new-task-container">
      <q-input fullwidth outlined v-model="task" square label="New Task" />
      <q-btn id="btn-new-task" class="bg-blue-grey" square unelevated >+</q-btn>
        
  </div>
</template>

<script setup>
const { ref }=require("@vue/reactivity");

let task = ref('')

</script>

<style>
.new-task-container{
  display: grid;
  grid-template-columns: 9fr 1fr;
}
#btn-new-task{
  border-radius: 0px;
}

</style>