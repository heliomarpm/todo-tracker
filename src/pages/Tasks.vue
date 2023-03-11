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
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';

import Formulario from './tasks/Add.vue';
import Box from '../components/Box.vue';
import Tarefa from './tasks/Task.vue';

import ITask from '../interfaces/ITask';

export default defineComponent({
    name: 'TasksPage',
    components: {
        Formulario,
        Tarefa,
        Box
    },
    setup() {
        const store = useStore();
        return {
            store,
            tasks: computed(() => store.state.tasks),
        }
    },
    // data() {
    //     return {
    //         tasks: (localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') as string) : []) as ITask[]
    //     }
    // },
    methods: {
        addTask(task: ITask) {
            console.log("addTask", task);
            // this.tasks.push(task);
            // localStorage.setItem('tasks', JSON.stringify(this.tasks));
            this.store.commit('ADD_TASK', task);
        },
        removeTask(task: ITask) {
            console.log("removeTask", task);
            // this.tasks.splice(this.tasks.indexOf(task), 1)
            // localStorage.setItem('tasks', JSON.stringify(this.tasks));
            this.store.commit('REMOVE_TASK', task.id);
        }
    },
    created() {
        // console.log(this.$router);
    }

});
</script>
  
<style scoped>
.list {
    padding: 1.25rem;
}
</style>
  