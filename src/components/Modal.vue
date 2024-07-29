<template>
  <dialog id="todo-details" class="w-[60%] min-w-[40%] p-8 bg-fuchsia-100 rounded-2xl shadow-2xl">
    <form method="dialog">
      <h1
        class="drop-shadow-2xl text-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
      >
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Info</span>
      </h1>
      <div class="w-full">
        <p class="text-xl font-semibold text-cyan-700">
          Title:
          <input
            type="text"
            v-model="editTodoParams.title"
            :class="titleClass"
            class="mt-2 p-2 border border-gray-300 rounded"
          />
        </p>
      </div>
      <div class="w-full flex justify-between">
        <button
          v-on:click="updateTodo()"
          class="text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-cyan-600 dark:hover:bg-sky-700 dark:focus:ring-cyan-900"
        >
          Update
        </button>
        <button
          v-on:click="destroyTodo(currentTodo)"
          class="text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-cyan-600 dark:hover:bg-sky-700 dark:focus:ring-cyan-900"
        >
          Destroy Todo
        </button>
        <button
          v-on:click="closeModal"
          class="text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-cyan-600 dark:hover:bg-sky-700 dark:focus:ring-cyan-900"
        >
          Close
        </button>
      </div>
    </form>
  </dialog>
</template>

<script>
export default {
  name: "Modal",
  props: {
    editTodoParams: Object,
    titleClass: String,
    updateTodo: Function,
    destroyTodo: Function,
    closeModal: Function,
  },
  methods: {
    open() {
      this.$refs.dialog.showModal();
    },
    close() {
      this.$refs.dialog.close();
    },
  },
};
</script>
