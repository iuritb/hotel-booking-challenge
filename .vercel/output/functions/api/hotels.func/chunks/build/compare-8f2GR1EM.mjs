import { _ as __nuxt_component_0 } from './nuxt-link-B-3pplSQ.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, resolveComponent, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useCompareStore } from './compare-BaGMz-Y9.mjs';
import { u as useHead } from './server.mjs';
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
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HotelComparisonTable",
  __ssrInlineRender: true,
  props: {
    hotels: {}
  },
  emits: ["remove-hotel"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = resolveComponent("Icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-x-auto bg-white rounded-lg shadow-md p-4" }, _attrs))}>`);
      if (__props.hotels.length === 0) {
        _push(`<h2 class="text-center text-gray-600 text-lg py-8"> Nenhum hotel selecionado para comparação. </h2>`);
      } else {
        _push(`<table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Característica </th><!--[-->`);
        ssrRenderList(__props.hotels, (hotel) => {
          _push(`<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${ssrInterpolate(hotel.name)} `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/hotels/${hotel.id}`,
            class: "text-indigo-600 hover:text-indigo-900 ml-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "ic:round-info",
                  class: "h-4 w-4 inline-block align-text-bottom"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "ic:round-info",
                    class: "h-4 w-4 inline-block align-text-bottom"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button class="text-red-600 hover:text-red-900 ml-2">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:round-close",
            class: "h-4 w-4 inline-block align-text-bottom"
          }, null, _parent));
          _push(`</button></th>`);
        });
        _push(`<!--]--></tr></thead><tbody class="bg-white divide-y divide-gray-200"><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Imagem</td><!--[-->`);
        ssrRenderList(__props.hotels, (hotel) => {
          _push(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><img${ssrRenderAttr("src", hotel.imageUrl)}${ssrRenderAttr("alt", hotel.name)} class="h-24 w-auto object-cover rounded-md"></td>`);
        });
        _push(`<!--]--></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Localização</td><!--[-->`);
        ssrRenderList(__props.hotels, (hotel) => {
          _push(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(hotel.location)}</td>`);
        });
        _push(`<!--]--></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Avaliação</td><!--[-->`);
        ssrRenderList(__props.hotels, (hotel) => {
          _push(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><div class="flex items-center text-yellow-500"><!--[-->`);
          ssrRenderList(5, (n) => {
            _push(`<!--[-->`);
            if (n <= Math.floor(hotel.rating)) {
              _push(ssrRenderComponent(_component_Icon, { name: "ic:round-star" }, null, _parent));
            } else if (n - 0.5 === hotel.rating) {
              _push(ssrRenderComponent(_component_Icon, {
                name: "ic:round-star-half",
                class: "h-5 w-5"
              }, null, _parent));
            } else {
              _push(ssrRenderComponent(_component_Icon, {
                name: "ic:round-star-border",
                class: "h-5 w-5"
              }, null, _parent));
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--><span class="ml-2">${ssrInterpolate(hotel.rating?.toFixed(1) || "N/A")}</span></div></td>`);
        });
        _push(`<!--]--></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Preço / Noite</td><!--[-->`);
        ssrRenderList(__props.hotels, (hotel) => {
          _push(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> R$ ${ssrInterpolate(hotel.pricePerNight?.toFixed(2) || "0.00")}</td>`);
        });
        _push(`<!--]--></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Quartos Disponíveis</td><!--[-->`);
        ssrRenderList(__props.hotels, (hotel) => {
          _push(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(hotel.availableRooms)}</td>`);
        });
        _push(`<!--]--></tr><tr><td class="px-6 py-4 text-sm font-medium text-gray-900 align-top">Comodidades</td><!--[-->`);
        ssrRenderList(__props.hotels, (hotel) => {
          _push(`<td class="px-6 py-4 text-sm text-gray-500"><ul class="list-disc list-inside space-y-1"><!--[-->`);
          ssrRenderList(hotel.amenities, (amenity) => {
            _push(`<li>${ssrInterpolate(amenity)}</li>`);
          });
          _push(`<!--]--></ul></td>`);
        });
        _push(`<!--]--></tr></tbody></table>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HotelComparisonTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const HotelComparisonTable = Object.assign(_sfc_main$1, { __name: "HotelComparisonTable" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "compare",
  __ssrInlineRender: true,
  setup(__props) {
    const compareStore = useCompareStore();
    const handleRemoveHotel = (hotelId) => {
      compareStore.removeHotelFromCompare(hotelId);
    };
    useHead({
      title: "Comparar Hotéis - Meu App de Reservas"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto p-4 md:p-8" }, _attrs))}><h1 class="text-4xl font-bold text-gray-800 mb-6">Comparar Hotéis</h1>`);
      if (unref(compareStore).getComparisonCount === 0) {
        _push(`<div class="text-center py-10"><p class="text-gray-600 text-lg">Nenhum hotel selecionado para comparação.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Voltar para a lista de hotéis `);
            } else {
              return [
                createTextVNode(" Voltar para a lista de hotéis ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(HotelComparisonTable, {
          hotels: unref(compareStore).getHotelsToCompare,
          onRemoveHotel: handleRemoveHotel
        }, null, _parent));
        _push(`<div class="mt-6 text-center"><button class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"> Limpar Todos os Hotéis </button></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/compare.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=compare-8f2GR1EM.mjs.map
