<script>
import axios from "axios";
export default {
  data: function () {
    return {
      todos: [],
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
  },
};
</script>

<template>
  <div class="home">
    <h1>All Todos</h1>
    <div v-for="todo in todos" v-bind:key="todo.id">
      <h2>{{ todo.title }}</h2>
    </div>
  </div>
</template>

<style></style>
