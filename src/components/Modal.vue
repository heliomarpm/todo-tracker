<template>
    <!-- <div class="modal" :class="{ 'is-active': mutableShow }" @keyup.esc="close" v-if="mutableShow"> -->
    <div class="modal" :class="{ 'is-active': show }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    {{ title }}
                </p>
                <button @click="close" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <slot name="body"></slot>
            </section>
            <footer class="modal-card-foot">
                <slot name="footer"></slot>
                <!-- <button @click="editTask" class="button is-success">Salvar alterações</button>
                    <button @click="closeModal" class="button">Cancelar</button> -->
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent({
    name: 'FormModal',
    props: {
        show: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        },
    },
    emits: ['onClose'],
    setup(props, { emit }) {
        // let mutableShow = ref(props.show);

        function close() {
            console.log('close');
            // mutableShow.value = !mutableShow.value;
            emit('onClose');
        }

        const watchKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
            }
        }

        onMounted(() => {
            console.log('mounted');
            // mutableShow.value = true;
            window.addEventListener("keydown", watchKeyDown);
        })


        onUnmounted(() => {
            console.log('unmounted');
            // mutableShow.value = false;
            window.removeEventListener("keydown", watchKeyDown);
        })

        return { close };
    }
})

// export default defineComponent({
//     name: "FormModal",
//     props: {
//         show: {
//             type: Boolean,
//             required: true
//         },
//         title: {
//             type: String,
//             required: true
//         },
//     },
//     data() {
//         return {
//             mutableShow: false
//         }
//     },
//     methods: {
//         close() {
//             console.log('close');
//             this.mutableShow = !this.mutableShow;
//         }
//     },
//     watch: {
//         show(oldVal, newVal) {
//             if (oldVal !== newVal) {
//                 this.mutableShow = !this.mutableShow;
//                 // this.$el.tabIndex = 1;
//                 // this.$nextTick(function() {
//                 //   this.$el.focus();
//                 // });
//             }
//         }
//     },
//     beforeCreate() {
//         console.log('beforeCreate');
//     },
//     created() {
//         console.log('created');
//     },
//     beforeMount() {
//         console.log('beforeMount');
//     },
//     mounted() {
//         console.log('mounted');
//     },
//     beforeUpdate() {
//         console.log('beforeUpdate');
//     },
//     updated() {
//         console.log('updated');
//     },
//     closed() {
//         console.log('closed');
//     },
//     beforeUnmount() {
//         console.log('beforeUnmount');
//     },
//     unmounted() {
//         console.log('unmounted');
//     }
// })

</script>