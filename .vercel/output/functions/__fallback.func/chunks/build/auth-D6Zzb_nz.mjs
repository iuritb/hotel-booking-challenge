import { e as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuthStore } from './auth-BLFjfOD5.mjs';
import 'vue';
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
import '@unhead/shared';
import 'pinia';
import 'vue-router';

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
//# sourceMappingURL=auth-D6Zzb_nz.mjs.map
