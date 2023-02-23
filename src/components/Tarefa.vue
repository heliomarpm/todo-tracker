<template>
    <div class="box has-text-weight-bold">
        <div class="columns">
            <div class="column is-7">{{ task.description || "Tarefa não definida" }}</div>
            <div class="column">
                <Cronometro :secondTime="task.timeInSeconds" />
            </div>
            <Botao text="remover" @onClick="removeTask" icon="fas fa-remove" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import Botao from './Botao.vue';

import ITask from '../interfaces/ITask';

export default defineComponent({
    name: '_Tarefa',
    components: {
        Cronometro,
        Botao
    },
    emits: ["onRemoveTask"],
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true
        }
    },
    methods: {
        removeTask() {
            console.log("Remover tarefa");
            this.$emit("onRemoveTask", this.task);
        }
    }
}
)
</script>

<style scoped>
.box {
    background-color: #a1c4e4;
    border-radius: 5px;
}
</style>