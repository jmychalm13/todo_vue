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
  <div class="home w-screen h-screen bg-gradient-to-br from-blue-200 to-cyan-200">
    <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
      <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Things to do:</span>
      {{ formattedDate }}
    </h1>
    <!-- <div class="paper"></div>
    <div class="paper"></div> -->
    <h1>New Todo</h1>
    <div>
      Title:
      <input type="text" v-model="newTodoParams.title" />
      <button v-on:click="createTodo()">Create Todo</button>
    </div>
    <h1>All Todos</h1>
    <div v-for="todo in todos" v-bind:key="todo.id">
      <h2>{{ todo.title }}</h2>
      <button v-on:click="showTodo(todo)">More Info</button>
    </div>
    <dialog id="todo-details">
      <form method="dialog">
        <h1>Todo Info</h1>
        <p>
          Title:
          <input type="text" v-model="editTodoParams.title" />
        </p>
        <button v-on:click="updateTodo(currentTodo)">Update</button>
        <button v-on:click="destroyTodo(currentTodo)">Destroy Todo</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>
