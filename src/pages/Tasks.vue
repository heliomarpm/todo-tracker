<template>
    <!-- <Formulario @onSaveTask="addTask" /> -->
    <Formulario />
    <div class="list">
        <Box v-if="!hasTasks"> <!-- v-if="tasks.length === 0"> -->
            E ai, tá de boa na lagoa?
        </Box>
        <img src="@/assets/freetime.jpg" v-if="!hasTasks">

        <div class="field" v-if="hasTasks">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Digite para filtrar" v-model="filter" />
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>

        <Tarefa v-for="(task, index) in tasks" :key="index" :task="task" @onRemoveTask="removeTask(task)"
            @onSelectTask="selectTask(task)" />


        <Modal :show="selectedTask != null" title="Editando uma tarefa" v-if="selectedTask">
            <template v-slot:body>
                <div class="field">
                    <label for="descricaoDaTarefa" class="label">
                        Descrição
                    </label>
                    <input type="text" class="input" v-model="selectedTask.description" id="taskDescription" />
                </div>
            </template>
            <template v-slot:footer>
                <button @click="editTask" class="button is-success">Salvar alterações</button>
                <button @click="closeModal" class="button">Cancelar</button>
            </template>
        </Modal>


        <!-- <div class="modal" :class="{ 'is-active': selectedTask }" v-if="selectedTask">
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
        </div>  -->

    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store'

import Formulario from './tasks/Add.vue';
import Box from '../components/Box.vue';
import Tarefa from './tasks/Task.vue';
import Modal from '../components/Modal.vue';

import ITask from '../interfaces/ITask';
import { GET_PROJECTS } from '@/store/types/actions';

export default defineComponent({
    name: 'TasksPage',
    components: {
        Formulario,
        Tarefa,
        Box,
        Modal,
    },
    setup() {
        const store = useStore();
        store.dispatch(GET_PROJECTS);

        const filter = ref("");

        /**
         * FILTRANDO NA MEMORIA APENAS
         */
        const tasks = computed(() => store.state.tasks
            .filter(t => !filter.value || t.description.toLowerCase().includes(filter.value.toLowerCase())));

        return { store, tasks, filter }

        /**
         * FILTRANDO DIRETO NA API, COM UM OBSERVER DO VUE
         */
        // watchEffect(() => {
        //     store.dispatch(GET_TASKS, filter.value);
        // })

        // return {
        //     store,
        //     tasks: computed(() => store.state.tasks),
        //     filter
        // }
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
    computed: {
        hasTasks(): boolean {
            return this.tasks.length > 0;
        }
    }
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
  