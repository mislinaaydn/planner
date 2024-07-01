import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "./views/HomeView.vue";
import PlanList from "./views/PlanView.vue";
import PlanAdd from "./views/PlanAddView.vue";
import PlanUpdate from "./views/PlanUpdateView.vue";
import NoteList from "./views/NoteView.vue";
import NoteAdd from "./views/NoteAddView.vue";
import NoteUpdate from "./views/NoteUpdateView.vue";
import PersonAdd from "./views/PersonAddView.vue";
import PersonList from "./views/PersonView.vue";
import DailyList from "./views/DailyView.vue";
import DailyAdd from "./views/DailyAddView.vue";
import DailyContent from "./views/DailyContentView.vue";
import Login from "./views/LoginView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env),
  routes: [
    {
      name: "HomeView",
      path: "/",
      component: HomePage,
    },
    {
      name: "PlanView",
      path: "/PlanView",
      component: PlanList,
    },
    {
      name: "PlanAdd",
      path: "/PlanAddView",
      component: PlanAdd,
    },
    {
      name: "PlanUpdate",
      path: "/PlanUpdateView/:id",
      component: PlanUpdate,
    },
    {
      name: "NoteView",
      path: "/NoteView",
      component: NoteList,
    },
    {
      name: "NoteAdd",
      path: "/NoteAddView",
      component: NoteAdd,
    },
    {
      name: "NoteUpdate",
      path: "/NoteUpdateView/:id",
      component: NoteUpdate,
    },

    {
      name: "PersonAdd",
      path: "/PersonAddView",
      component: PersonAdd,
    },
    {
      name: "PersonView",
      path: "/PersonView",
      component: PersonList,
    },
    {
      name: "DailyView",
      path: "/DailyView",
      component: DailyList,
    },
    {
      name: "DailyAdd",
      path: "/DailyAddView",
      component: DailyAdd,
    },

    {
      name: "DailyContent",
      path: "/DailyContentView/:id",
      component: DailyContent,
    },
    {
      name: "Login",
      path: "/LoginView",
      component: Login,
    },
  ],
});

export default router;
