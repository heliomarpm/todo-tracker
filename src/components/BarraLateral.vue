<template>
  <header>
    <div><img src="../assets/logo.png" alt="Logo" /></div>

    <label class="checkbox has-text-center">
      <input type="checkbox" @click="changeTheme" />{{ textAction }}
    </label>

    <nav class="panel mt-5 has-text-left" >
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-list-check"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projects" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
        <li>
          <router-link to="/about" class="link">
            <i class="fas fa-info"></i>
            Sobre
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "_BarraLateral",
  emits: ["onChangeTheme"],
  data() {
    return {
      darkMode: false,
    }
  },
  computed: {
    textAction() {
      return this.darkMode ? " Tema claro " : " Tema escuro";
    }
  },
  methods: {
    changeTheme() {
      this.darkMode = !this.darkMode;
      this.$emit("onChangeTheme", this.darkMode);
    }
  }
});
</script>

<style scoped>
header {
  padding: 0.5rem;
  background-color: #282a36;
  /*  #0d3b66; */
  color: #fff;
  width: 100%;
  height: 100vh;
  text-align: center;
}

header div {
  background: #fff;
  border-radius: 0 0 18px 18px;
}

header img {
  height: 80px;
  margin-left: 10px;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

.panel li {
  margin: 18px 10px;
}
.link {
  color: #fff;
}
.link:hover {
  color: #FAF0CA;
}
.link.router-link-active {
  color: #FAF0CA;
}
</style>
