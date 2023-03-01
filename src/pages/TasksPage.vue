<template>
    <Formulario @onSaveTask="addTask" />
    <div class="list">
        <Box v-if="tasks.length === 0">
            Você ainda não adicionou nenhuma tarefa!
        </Box>
        <img src="@/assets/freetime.jpg" v-if="tasks.length === 0"/>
        
        <Tarefa v-for="(task, index) in tasks" :key="index" :task="task" @onRemoveTask="removeTask(task)" />

    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

import Formulario from '../components/Formulario.vue';
import Box from '../components/Box.vue';
import Tarefa from '../components/Tarefa.vue';

import ITask from '../interfaces/ITask';

export default defineComponent({
    name: 'TasksPage',
    components: {
        Formulario,
        Tarefa,
        Box
    },
    data() {
        return {
            tasks: (localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') as string) : []) as ITask[]
        }
    },
    methods: {
        addTask(task: ITask) {
            console.log("addTask", task);
            this.tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        removeTask(task: ITask) {
            this.tasks.splice(this.tasks.indexOf(task), 1)
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }

});
</script>
  
<style scoped>
.list {
    padding: 1.25rem;
}
</style>
  