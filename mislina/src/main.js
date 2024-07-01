import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap";
import router from "./router.js";

const app = createApp(App);

app.use(bootstrap);
app.use(router);

app.mount("#app");
