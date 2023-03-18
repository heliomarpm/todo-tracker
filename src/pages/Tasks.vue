<template>
    <!-- <Formulario @onSaveTask="addTask" /> -->
    <Formulario/>
    <div class="list">
        <Box v-if="tasks.length === 0">
            Você ainda não adicionou nenhuma tarefa!
        </Box>
        <img src="@/assets/freetime.jpg" v-if="tasks.length === 0" />

        <Tarefa v-for="(task, index) in tasks" :key="index" :task="task" @onRemoveTask="removeTask(task)"
            @onSelectTask="selectTask(task)" />

        <div class="modal" :class="{ 'is-active': selectedTask }" v-if="selectedTask">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editando uma tarefa</p>
                    <button @click="closeModal" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label for="descricaoDaTarefa" class="label">
                            Descrição
                        </label>
                        <input type="text" class="input" v-model="selectedTask.description" id="taskDescription" />
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button @click="editTask" class="button is-success">Salvar alterações</button>
                    <button @click="closeModal" class="button">Cancelar</button>
                </footer>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store'

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
    data() {
        return {
            // tasks: (localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') as string) : []) as ITask[]
            selectedTask: null as ITask | null,
        }
    },
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
        },
        selectTask(task: ITask) {
            this.selectedTask = task;
        },
        editTask() {
            console.log("editTask", this.selectedTask);
            this.store.dispatch('EDIT_TASK', this.selectedTask).then(() => this.closeModal());
        },
        closeModal() {
            this.selectedTask = null;
        }
    },
    // created() { //setup já executa o created
    //     // console.log(this.$router);
    // }

});
</script>
  
<style scoped>
.list {
    padding: 1.25rem;
}
</style>
  