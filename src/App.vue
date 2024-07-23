<script>
import axios from "axios";
export default {
  data: function () {
    return {
      todos: [],
      newTodoParams: {},
      currentTodo: {},
      editTodoParams: {},
    };
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
  <div class="home">
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
