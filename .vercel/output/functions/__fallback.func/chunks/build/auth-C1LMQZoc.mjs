import { i as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuthStore } from './auth-so9f4v0m.mjs';
import '@vue/compiler-dom';
import '@vue/runtime-dom';
import '@vue/shared';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import 'vue';
import '@unhead/shared';
import '@vue/server-renderer';

const auth = defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  authStore.initializeAuth();
  if (!authStore.isAuthenticated && to.path !== "/login" && to.path !== "/register") {
    return navigateTo("/login");
  }
  if (authStore.isAuthenticated && (to.path === "/login" || to.path === "/register")) {
    return navigateTo("/");
  }
});

export { auth as default };
//# sourceMappingURL=auth-C1LMQZoc.mjs.map
