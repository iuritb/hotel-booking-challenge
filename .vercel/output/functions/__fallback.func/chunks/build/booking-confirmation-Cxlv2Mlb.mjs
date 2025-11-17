import { _ as __nuxt_component_0 } from './nuxt-link-B9kPwo0C.mjs';
import { v as vueExports, u as useHead } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from '@vue/server-renderer';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@vue/compiler-dom';
import '@vue/runtime-dom';
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import 'vue';
import '@unhead/shared';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "booking-confirmation",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Reserva Confirmada - Meu App de Reservas"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = vueExports.resolveComponent("Icon");
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(vueExports.mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-100 p-4" }, _attrs))}><div class="bg-white rounded-lg shadow-xl p-8 md:p-12 max-w-lg w-full text-center"><div class="text-green-500 mb-6">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ic:round-check-circle",
        class: "h-24 w-24 mx-auto"
      }, null, _parent));
      _push(`</div><h1 class="text-4xl font-bold text-gray-800 mb-4">Reserva Confirmada!</h1><p class="text-lg text-gray-600 mb-6"> Sua reserva foi realizada com sucesso. Voc\xEA receber\xE1 um e-mail de confirma\xE7\xE3o em breve com todos os detalhes. </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Voltar para a P\xE1gina Inicial `);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ic:round-arrow-right-alt",
              class: "ml-3 -mr-1 h-5 w-5"
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createTextVNode(" Voltar para a P\xE1gina Inicial "),
              vueExports.createVNode(_component_Icon, {
                name: "ic:round-arrow-right-alt",
                class: "ml-3 -mr-1 h-5 w-5"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/booking-confirmation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=booking-confirmation-Cxlv2Mlb.mjs.map
