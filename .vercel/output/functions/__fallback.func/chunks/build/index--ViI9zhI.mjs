import { _ as _sfc_main$1 } from './BaseButton-_E5WwLH9.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-C5VT5LEg.mjs';
import { u as useFetch } from './fetch-B81AsGIE.mjs';
import { c as createError } from './server.mjs';
import { defineComponent, withAsyncContext, computed, resolveComponent, unref, mergeProps, withCtx, createBlock, openBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { u as useAuthStore } from './auth-BLFjfOD5.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();
    const hotelId = route.params.id;
    const { data: response, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/hotels/${hotelId}`, "$3rsRQct2yO")), __temp = await __temp, __restore(), __temp);
    const hotel = computed(() => {
      var _a;
      return (_a = response.value) == null ? void 0 : _a.hotel;
    });
    const navigateToBookingPage = () => {
      if (hotel.value) {
        router.push(`/hotels/${hotel.value.id}/book`);
      }
    };
    if (!hotel.value && !pending.value && !error.value) {
      throw createError({ statusCode: 404, statusMessage: "Hotel n\xE3o encontrado", fatal: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Icon = resolveComponent("Icon");
      const _component_BaseButton = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(pending)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center" }, _attrs))}><p class="text-gray-600">Carregando detalhes do hotel...</p></div>`);
      } else if (unref(error)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center" }, _attrs))}><p class="text-red-500">Erro ao carregar os detalhes do hotel: ${ssrInterpolate(unref(error).message)}</p></div>`);
      } else if (hotel.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto p-4 md:p-8" }, _attrs))}><div class="bg-white rounded-lg shadow-lg overflow-hidden"><div class="relative h-64 md:h-96"><img${ssrRenderAttr("src", hotel.value.imageUrl)}${ssrRenderAttr("alt", hotel.value.name)} class="w-full h-full object-cover"><div class="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4 md:p-6"><h1 class="text-white text-3xl md:text-5xl font-bold">${ssrInterpolate(hotel.value.name)}</h1></div></div><div class="p-4 md:p-6 lg:flex lg:space-x-8"><div class="lg:w-2/3"><p class="text-gray-600 mb-4 text-lg">${ssrInterpolate(hotel.value.location)}</p><div class="flex items-center text-yellow-500 mb-4"><!--[-->`);
        ssrRenderList(5, (n) => {
          _push(`<!--[-->`);
          if (n <= Math.floor(hotel.value.rating)) {
            _push(ssrRenderComponent(_component_Icon, { name: "ic:round-star" }, null, _parent));
          } else if (n - 0.5 === hotel.value.rating) {
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
        _push(`<!--]--><span class="ml-2 text-gray-700 text-sm">${ssrInterpolate(((_a = hotel.value.rating) == null ? void 0 : _a.toFixed(1)) || "N/A")} (${ssrInterpolate(hotel.value.reviewsCount)} avalia\xE7\xF5es) </span></div><h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">Descri\xE7\xE3o</h2><p class="text-gray-700 leading-relaxed mb-6">${ssrInterpolate(hotel.value.description)}</p><h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">Comodidades</h2><ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6"><!--[-->`);
        ssrRenderList(hotel.value.amenities, (amenity) => {
          _push(`<li class="flex items-center text-gray-700">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:check",
            class: "text-green-500 mr-2"
          }, null, _parent));
          _push(` ${ssrInterpolate(amenity)}</li>`);
        });
        _push(`<!--]--></ul><h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">Disponibilidade e Pre\xE7o</h2><p class="text-gray-700 mb-4">Quartos dispon\xEDveis: <span class="font-bold">${ssrInterpolate(hotel.value.availableRooms)}</span></p><p class="text-3xl font-bold text-indigo-600 mb-6">R$ ${ssrInterpolate(((_b = hotel.value.pricePerNight) == null ? void 0 : _b.toFixed(2)) || "0.00")} <span class="text-lg text-gray-500">/ noite</span></p></div><div class="lg:w-1/3 bg-gray-50 p-4 md:p-6 rounded-lg shadow-inner mt-8 lg:mt-0"><h2 class="text-2xl font-semibold text-gray-800 mb-4">Reservar este Hotel</h2><p class="text-gray-700 mb-6"> Para prosseguir com a reserva de ${ssrInterpolate(hotel.value.name)}, clique no bot\xE3o abaixo. Voc\xEA ser\xE1 direcionado para um formul\xE1rio de reserva detalhado. </p>`);
        if (unref(authStore).isAuthenticated) {
          _push(ssrRenderComponent(_component_BaseButton, {
            onClick: navigateToBookingPage,
            variant: "primary",
            class: "w-full",
            disabled: hotel.value.availableRooms === 0
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (hotel.value.availableRooms === 0) {
                  _push2(`<span${_scopeId}>Esgotado</span>`);
                } else {
                  _push2(`<span${_scopeId}>Reservar Agora</span>`);
                }
              } else {
                return [
                  hotel.value.availableRooms === 0 ? (openBlock(), createBlock("span", { key: 0 }, "Esgotado")) : (openBlock(), createBlock("span", { key: 1 }, "Reservar Agora"))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="text-center text-gray-700"><p class="mb-2">Voc\xEA precisa estar logado para fazer uma reserva.</p>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/login",
            class: "text-indigo-600 hover:underline font-medium"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Fazer Login `);
              } else {
                return [
                  createTextVNode(" Fazer Login ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` ou `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/register",
            class: "text-indigo-600 hover:underline font-medium"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Registrar `);
              } else {
                return [
                  createTextVNode(" Registrar ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div></div></div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center" }, _attrs))}><p class="text-gray-600">Hotel n\xE3o encontrado.</p></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/hotels/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index--ViI9zhI.mjs.map
