import { _ as __nuxt_component_0 } from './nuxt-link-B-3pplSQ.mjs';
import { _ as __nuxt_component_1 } from './BaseButton-CY40H3Df.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, resolveComponent, createVNode, toDisplayString, useSSRContext, computed } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { u as useCompareStore } from './compare-BaGMz-Y9.mjs';
import { u as useSnackbarStore } from './snackbar-Cm3tZYkf.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { u as useAuthStore } from './auth-a-bFwI9u.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CompareFloatingButton",
  __ssrInlineRender: true,
  setup(__props) {
    const compareStore = useCompareStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = resolveComponent("Icon");
      if (unref(compareStore).getComparisonCount >= 2) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-6 right-6 z-50" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/compare",
          class: "flex items-center justify-center p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200 ease-in-out cursor-pointer group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ic:round-compare-arrows",
                class: "h-6 w-6 mr-2 transition-transform duration-200 group-hover:scale-110"
              }, null, _parent2, _scopeId));
              _push2(`<span class="font-semibold text-lg"${_scopeId}>${ssrInterpolate(unref(compareStore).getComparisonCount)} Hotéis para Comparar </span>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ic:round-arrow-forward",
                class: "h-5 w-5 ml-2 transition-transform duration-200 group-hover:translate-x-1"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "ic:round-compare-arrows",
                  class: "h-6 w-6 mr-2 transition-transform duration-200 group-hover:scale-110"
                }),
                createVNode("span", { class: "font-semibold text-lg" }, toDisplayString(unref(compareStore).getComparisonCount) + " Hotéis para Comparar ", 1),
                createVNode(_component_Icon, {
                  name: "ic:round-arrow-forward",
                  class: "h-5 w-5 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CompareFloatingButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$2, { __name: "CompareFloatingButton" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BaseSnackbar",
  __ssrInlineRender: true,
  setup(__props) {
    const snackbarStore = useSnackbarStore();
    const snackbarTypeClass = computed(() => {
      switch (snackbarStore.type) {
        case "success":
          return "bg-green-500";
        case "error":
          return "bg-red-500";
        case "info":
          return "bg-blue-500";
        default:
          return "bg-gray-700";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      if (unref(snackbarStore).isVisible) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white z-[9999]", snackbarTypeClass.value],
          role: "alert"
        }, _attrs))} data-v-68d254b0><div class="flex items-center" data-v-68d254b0>`);
        if (unref(snackbarStore).type === "success") {
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:round-check-circle",
            class: "h-6 w-6 mr-2"
          }, null, _parent));
        } else if (unref(snackbarStore).type === "error") {
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:round-error",
            class: "h-6 w-6 mr-2"
          }, null, _parent));
        } else if (unref(snackbarStore).type === "info") {
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:round-info",
            class: "h-6 w-6 mr-2"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="font-medium" data-v-68d254b0>${ssrInterpolate(unref(snackbarStore).message)}</span><button class="ml-auto p-1 -mr-1 rounded-full hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white" data-v-68d254b0>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:round-close",
          class: "h-5 w-5"
        }, null, _parent));
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/BaseSnackbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-68d254b0"]]), { __name: "BaseSnackbar" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    useCompareStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_BaseButton = __nuxt_component_1;
      const _component_CompareFloatingButton = __nuxt_component_2;
      const _component_BaseSnackbar = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-100" }, _attrs))}><header class="bg-blue-600 text-white p-4 shadow-md"><nav class="container mx-auto flex justify-between items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-2xl font-bold hover:text-blue-200 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 🏨 Hotel Booking `);
          } else {
            return [
              createTextVNode(" 🏨 Hotel Booking ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="space-x-4">`);
      if (unref(authStore).isAuthenticated) {
        _push(`<!--[--><span>Olá, ${ssrInterpolate(unref(authStore).currentUser?.name || "Usuário")}!</span>`);
        _push(ssrRenderComponent(_component_BaseButton, {
          onClick: ($event) => unref(authStore).logout(),
          variant: "secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Logout`);
            } else {
              return [
                createTextVNode("Logout")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "hover:text-blue-200 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Login`);
            } else {
              return [
                createTextVNode("Login")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/register",
          class: "hover:text-blue-200 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Registrar`);
            } else {
              return [
                createTextVNode("Registrar")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div></nav></header><main class="flex-grow container mx-auto p-4">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CompareFloatingButton, null, null, _parent));
      _push(ssrRenderComponent(_component_BaseSnackbar, null, null, _parent));
      _push(`<footer class="bg-blue-800 text-white p-4 text-center shadow-inner"><div class="container mx-auto"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Hotel Booking Challenge. Todos os direitos reservados. </div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-D6pP8HMe.mjs.map
