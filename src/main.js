import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "/";

createApp(App).mount("#app");
