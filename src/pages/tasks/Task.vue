<template>
    <Box class="pointer" @click="selectTask">
        <div class="columns">
            <div class="column is-7">{{ task.description || "Tarefa não definida" }}</div>
            <div class="column is-3">
                {{ task.project?.name || "N/D" }}
            </div>
            <div class="column">
                <Cronometro :secondTime="task.timeInSeconds" />
            </div>
            <!-- <Botao text="remover" @onClick="removeTask()" icon="fas fa-trash" /> -->
            <!-- <span class="icon" >
                <i class="fas fa-edit"></i>
            </span>&nbsp; -->
            <button class="delete" @click="removeTask" />
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from '../../components/Cronometro.vue';
// import Botao from '../../components/Botao.vue';
import Box from '../../components/Box.vue';

import ITask from '../../interfaces/ITask';

export default defineComponent({
    name: 'TaskItem',
    components: {
        Cronometro,
        // Botao,
        Box
    },
    // emits: ["onRemoveTask", "onSelectTask"], // ? pq emits funciona mesmo comentado
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true
        }
    },
    methods: {
        removeTask() {
            console.log("Remover tarefa", this);
            this.$emit("onRemoveTask", this.task);
        },
        selectTask() {
            console.log("Selecionar tarefa", this);
            this.$emit("onSelectTask", this.task);
        }
    }
}
)
</script>

<style scope>
.delete-btn {
    margin-left: auto;
    display: block;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ff3d46' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-trash-2'%3E%3Cpolyline points='3 6 5 6 21 6'/%3E%3Cpath d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/%3E%3Cline x1='10' y1='11' x2='10' y2='17'/%3E%3Cline x1='14' y1='11' x2='14' y2='17'/%3E%3C/svg%3E");
    background-size: 16px;
    background-position: center;
    cursor: pointer;

}
.pointer {
  cursor: pointer;
}
</style>
