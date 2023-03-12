<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeOn }">
    <div class="column is-one-quarter">
      <BarraLateral @onChangeTheme="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <Notify />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BarraLateral from './components/BarraLateral.vue';
import Notify from './components/Notify.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Notify
  },
  data() {
    return {
      darkModeOn: false,
    }
  },
  methods: {
    changeTheme(darkMode: boolean) {
      this.darkModeOn = darkMode;
    }
  }

});
</script>

<style>
main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.dark-mode {
  --bg-primario: #10101d; /*  #2b2d42; */
  --texto-primario: #ddd;
}

.content {
  background-color: var(--bg-primario);
}
</style>
