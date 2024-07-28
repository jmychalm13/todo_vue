<script>
import axios from "axios";
export default {
  data: function () {
    return {
      todos: [],
      newTodoParams: {},
      currentTodo: {},
      editTodoParams: {},
      currentDate: new Date(),
      maxLength: 18,
    };
  },
  computed: {
    formattedDate() {
      return this.currentDate.toDateString();
    },
  },
  created: function () {
    this.indexTodos();
  },
  methods: {
    truncateTitle: function (title) {
      if (title.length > this.maxLength) {
        return title.slice(0, this.maxLength) + "...";
      }
      return title;
    },
    indexTodos: function () {
      axios.get("http://localhost:5000/todos").then((response) => {
        console.log("todos index", response);
        this.todos = response.data;
      });
    },
    createTodo: function () {
      axios
        .post("http://localhost:5000/add", this.newTodoParams)
        .then((response) => {
          console.log("todo create", response);
          this.todos.push(response.data);
          this.newTodoParams = {};
        })
        .catch((error) => {
          console.log("todo create error", error.response);
        });
    },
    showTodo: function (todo) {
      this.currentTodo = todo;
      this.editTodoParams = todo;
      document.querySelector("#todo-details").showModal();
    },
    updateTodo: function (todo) {
      console.log("triggered", todo.id);
      axios
        .patch(`http://localhost:5000/update/${todo.id}`, this.editTodoParams)
        .then((response) => {
          console.log("todo update", response);
          this.currentTodo = {};
        })
        .catch((error) => {
          console.log("todo update error", error.response);
        });
    },
    destroyTodo: function (todo) {
      axios.delete(`http://localhost:5000/delete/${todo.id}`).then((response) => {
        console.log("todo destroy", response);
        var index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
      });
    },
  },
};
</script>

<template>
  <div class="p-6 home w-screen h-screen bg-gradient-to-br from-blue-200 to-cyan-200">
    <div class="paper p-10 border border-t-0 border-cyan-600 rounded-md">
      <h1 class="text-center font-bold text-2xl text-cyan-600">Add Task</h1>
      <div>
        <input
          type="text"
          v-model="newTodoParams.title"
          id="title"
          class="m-2 bg-cyan-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="study for test"
          required
        />
        <button
          v-on:click="createTodo()"
          class="text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-cyan-600 dark:hover:bg-sky-700 dark:focus:ring-cyan-900"
        >
          Create
        </button>
      </div>
    </div>
    <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
      <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Things to do:</span>
      {{ formattedDate }}
    </h1>
    <div class="grid md:grid-cols-3 gap-4">
      <div
        v-for="todo in todos"
        v-bind:key="todo.id"
        class="shadow-lg block rounded-lg bg-white p-6 text-surface shadow-secondary-1 m-4"
      >
        <p class="text-cyan-700 mb-2 text-xl font-medium leading-tight uppercase">{{ truncateTitle(todo.title) }}</p>
        <button
          v-on:click="showTodo(todo)"
          class="text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-cyan-600 dark:hover:bg-sky-700 dark:focus:ring-cyan-900"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          More Info
        </button>
      </div>
    </div>
    <dialog id="todo-details" class="w-[60%] min-w-[40%] p-6 border border-black">
      <form method="dialog">
        <h1>Todo Info</h1>
        <p>
          Title:
          <input type="text" v-model="editTodoParams.title" />
        </p>
        <div class="w-full flex justify-between">
          <button
            v-on:click="updateTodo(currentTodo)"
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
            class="text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-cyan-600 dark:hover:bg-sky-700 dark:focus:ring-cyan-900"
          >
            Close
          </button>
        </div>
      </form>
    </dialog>
  </div>
</template>
