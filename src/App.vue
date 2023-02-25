<template>
  <main class="columns is-gapless is-multiline" :class="{'dark-mode': darkModeOn}">
    <div class="column is-one-quarter">
      <BarraLateral @onChangeTheme="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <Formulario @onSaveTask="addTask"/>
      <div class="list">
        <Tarefa v-for="(task, index) in tasks" :key="index" :task="task" />

        <Box v-if="tasks.length===0">
          Você ainda não adicionou nenhuma tarefa!
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
import Box from './components/Box.vue';
import Tarefa from './components/Tarefa.vue';

import ITask from './interfaces/ITask';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box
  },
  data() {
    return {
      tasks: (localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') as string) : []) as ITask[],
      darkModeOn: false,
    }
  },
  methods: {
    addTask(task: ITask) {
      console.log("addTask", task);
      this.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    removeTask(task: ITask) {
      console.log("removeTask", task);
      // this.tasks = this.tasks.filter(t => t.id !== task.id);
      //localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    changeTheme(darkMode: boolean) {
      this.darkModeOn = darkMode;
    }
  }

});
</script>

<style>
.list {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.dark-mode {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.content {
  background-color: var(--bg-primario);
}
</style>
