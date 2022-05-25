<template>
    <div class="task-container">
        <inputNewTask/>
        <tank-tasks/>
    </div>
</template>

<script setup >
import inputNewTask from './InputNewTask.vue'
import TankTasks from './TankTasks.vue'



</script>

<style>
.task-container{
    background-color: rgb(123, 169, 196);

    border-radius: 2px;
}
</style>
