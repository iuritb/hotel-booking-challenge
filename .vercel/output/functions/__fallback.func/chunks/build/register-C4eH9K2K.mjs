import { _ as _sfc_main$1 } from './BaseInput--VpxHNSf.mjs';
import { _ as _sfc_main$2 } from './BaseButton-_E5WwLH9.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-C5VT5LEg.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createBlock, openBlock, createTextVNode, useSSRContext } from 'vue';
import { d as useRouter } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const userData = ref({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    useRouter();
    const passwordMismatchError = computed(() => {
      if (userData.value.password && userData.value.confirmPassword && userData.value.password !== userData.value.confirmPassword) {
        return "As senhas n\xE3o coincidem.";
      }
      return "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseInput = _sfc_main$1;
      const _component_BaseButton = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center min-h-[calc(100vh-160px)] py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md"><div><h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900"> Crie sua conta </h2></div><form class="mt-8 space-y-6"><div class="rounded-md shadow-sm -space-y-px">`);
      _push(ssrRenderComponent(_component_BaseInput, {
        id: "name",
        modelValue: userData.value.name,
        "onUpdate:modelValue": ($event) => userData.value.name = $event,
        label: "Nome Completo",
        type: "text",
        placeholder: "Seu nome",
        required: "",
        class: "mb-4"
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseInput, {
        id: "email-address",
        modelValue: userData.value.email,
        "onUpdate:modelValue": ($event) => userData.value.email = $event,
        label: "Endere\xE7o de E-mail",
        type: "email",
        placeholder: "seu@email.com",
        required: "",
        class: "mb-4",
        error: unref(authStore).error && unref(authStore).error.includes("Email") ? unref(authStore).error : ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseInput, {
        id: "password",
        modelValue: userData.value.password,
        "onUpdate:modelValue": ($event) => userData.value.password = $event,
        label: "Senha",
        type: "password",
        placeholder: "********",
        required: "",
        class: "mb-4",
        error: unref(authStore).error && unref(authStore).error.includes("Senha") ? unref(authStore).error : ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseInput, {
        id: "confirm-password",
        modelValue: userData.value.confirmPassword,
        "onUpdate:modelValue": ($event) => userData.value.confirmPassword = $event,
        label: "Confirmar Senha",
        type: "password",
        placeholder: "********",
        required: "",
        class: "mt-4",
        error: passwordMismatchError.value || (unref(authStore).error && unref(authStore).error.includes("Senha") ? unref(authStore).error : "")
      }, null, _parent));
      _push(`</div>`);
      if (passwordMismatchError.value) {
        _push(`<div class="text-red-600 text-sm text-center">${ssrInterpolate(passwordMismatchError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(authStore).error && !passwordMismatchError.value) {
        _push(`<div class="text-red-600 text-sm text-center">${ssrInterpolate(unref(authStore).error)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div>`);
      _push(ssrRenderComponent(_component_BaseButton, {
        type: "submit",
        variant: "primary",
        class: "w-full",
        disabled: unref(authStore).loading || passwordMismatchError.value !== ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(authStore).loading) {
              _push2(`<span${_scopeId}>Registrando...</span>`);
            } else {
              _push2(`<span${_scopeId}>Registrar</span>`);
            }
          } else {
            return [
              unref(authStore).loading ? (openBlock(), createBlock("span", { key: 0 }, "Registrando...")) : (openBlock(), createBlock("span", { key: 1 }, "Registrar"))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form><div class="text-sm text-center"> J\xE1 tem uma conta? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "font-medium text-blue-600 hover:text-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Fa\xE7a login `);
          } else {
            return [
              createTextVNode(" Fa\xE7a login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-C4eH9K2K.mjs.map
