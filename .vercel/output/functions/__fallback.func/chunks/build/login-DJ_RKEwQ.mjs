import { _ as _sfc_main$1 } from './BaseInput--VpxHNSf.mjs';
import { _ as _sfc_main$2 } from './BaseButton-_E5WwLH9.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-C5VT5LEg.mjs';
import { defineComponent, ref, mergeProps, withCtx, createBlock, openBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { u as useAuthStore } from './auth-BLFjfOD5.mjs';
import 'nanoid';
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
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    useRouter();
    const email = ref("");
    const password = ref("");
    const isLoading = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseInput = _sfc_main$1;
      const _component_BaseButton = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-100 p-4" }, _attrs))}><div class="max-w-md w-full bg-white rounded-lg shadow-md p-8"><h2 class="text-3xl font-extrabold text-center text-gray-900 mb-6">Fazer Login</h2><form><div class="mb-4">`);
      _push(ssrRenderComponent(_component_BaseInput, {
        id: "email-login",
        modelValue: email.value,
        "onUpdate:modelValue": ($event) => email.value = $event,
        label: "Email",
        type: "email",
        placeholder: "seu@email.com",
        required: "",
        class: "w-full"
      }, null, _parent));
      _push(`</div><div class="mb-6">`);
      _push(ssrRenderComponent(_component_BaseInput, {
        id: "password-login",
        modelValue: password.value,
        "onUpdate:modelValue": ($event) => password.value = $event,
        label: "Senha",
        type: "password",
        placeholder: "Sua senha",
        required: "",
        class: "w-full"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_BaseButton, {
        type: "submit",
        variant: "primary",
        class: "w-full",
        disabled: isLoading.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isLoading.value) {
              _push2(`<span${_scopeId}>Entrando...</span>`);
            } else {
              _push2(`<span${_scopeId}>Entrar</span>`);
            }
          } else {
            return [
              isLoading.value ? (openBlock(), createBlock("span", { key: 0 }, "Entrando...")) : (openBlock(), createBlock("span", { key: 1 }, "Entrar"))
            ];
          }
        }),
        _: 1
      }, _parent));
      if (errorMessage.value) {
        _push(`<p class="text-red-600 text-sm text-center mt-4">${ssrInterpolate(errorMessage.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="text-center text-gray-600 text-sm mt-4"> N\xE3o tem uma conta? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "text-blue-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Registre-se aqui.`);
          } else {
            return [
              createTextVNode("Registre-se aqui.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-DJ_RKEwQ.mjs.map
