<template>
  <header>
    <div><img src="../assets/logo.png" alt="Logo" /></div>

    <label class="checkbox">
      <input type="checkbox" @click="changeTheme" />{{ textAction }}
    </label>
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
  background-color: #0d3b66;
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
</style>
