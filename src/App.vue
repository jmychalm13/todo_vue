<script>
import axios from "axios";
export default {
  data: function () {
    return {
      todos: [],
      newTodoParams: {},
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
    </div>
  </div>
</template>

<style></style>
