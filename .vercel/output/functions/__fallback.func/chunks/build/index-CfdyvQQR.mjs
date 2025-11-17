import { _ as _sfc_main$2 } from './BaseInput--VpxHNSf.mjs';
import { _ as _sfc_main$3 } from './BaseButton-_E5WwLH9.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-C5VT5LEg.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, unref, withCtx, createTextVNode, resolveComponent, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { u as useCompareStore } from './compare-Cql3Rq8h.mjs';
import { u as useFetch } from './fetch-B81AsGIE.mjs';
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
import 'vue-router';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HotelCard",
  __ssrInlineRender: true,
  props: {
    hotel: {}
  },
  setup(__props) {
    const props = __props;
    const compareStore = useCompareStore();
    const isCompared = computed(() => {
      return compareStore.isHotelInComparison(props.hotel.id);
    });
    const toggleCompare = () => {
      if (isCompared.value) {
        compareStore.removeHotelFromCompare(props.hotel.id);
      } else {
        compareStore.addHotelToCompare(props.hotel);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = resolveComponent("Icon");
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/hotels/${_ctx.hotel.id}`,
        class: "block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _ctx.hotel.imageUrl)}${ssrRenderAttr("alt", _ctx.hotel.name)} class="w-full h-48 object-cover"${_scopeId}><div class="p-4"${_scopeId}><h3 class="text-xl font-semibold text-gray-800 mb-2"${_scopeId}>${ssrInterpolate(_ctx.hotel.name)}</h3><p class="text-gray-600 text-sm mb-2"${_scopeId}>${ssrInterpolate(_ctx.hotel.location)}</p><div class="flex items-center mb-2"${_scopeId}><div class="flex text-yellow-500"${_scopeId}><!--[-->`);
            ssrRenderList(5, (n) => {
              _push2(`<!--[-->`);
              if (n <= Math.floor(_ctx.hotel.rating)) {
                _push2(ssrRenderComponent(_component_Icon, { name: "ic:round-star" }, null, _parent2, _scopeId));
              } else if (n - 0.5 === _ctx.hotel.rating) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "ic:round-star-half",
                  class: "h-5 w-5"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "ic:round-star-border",
                  class: "h-5 w-5"
                }, null, _parent2, _scopeId));
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></div><span class="ml-2 text-gray-700 text-sm"${_scopeId}>${ssrInterpolate(((_a = _ctx.hotel.rating) == null ? void 0 : _a.toFixed(1)) || "N/A")} (${ssrInterpolate(_ctx.hotel.reviewsCount)} avalia\xE7\xF5es)</span></div><p class="text-gray-900 text-lg font-bold mb-4"${_scopeId}>R$ ${ssrInterpolate(((_b = _ctx.hotel.pricePerNight) == null ? void 0 : _b.toFixed(2)) || "0.00")} / noite</p><button class="${ssrRenderClass([
              "w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
              isCompared.value ? "bg-red-500 text-white hover:bg-red-600" : "bg-indigo-600 text-white hover:bg-indigo-700"
            ])}"${_scopeId}>`);
            if (isCompared.value) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ic:round-check",
                class: "inline-block align-middle mr-1"
              }, null, _parent2, _scopeId));
              _push2(` Na Compara\xE7\xE3o <!--]-->`);
            } else {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ic:round-add",
                class: "inline-block align-middle mr-1"
              }, null, _parent2, _scopeId));
              _push2(` Adicionar \xE0 Compara\xE7\xE3o <!--]-->`);
            }
            _push2(`</button></div>`);
          } else {
            return [
              createVNode("img", {
                src: _ctx.hotel.imageUrl,
                alt: _ctx.hotel.name,
                class: "w-full h-48 object-cover"
              }, null, 8, ["src", "alt"]),
              createVNode("div", { class: "p-4" }, [
                createVNode("h3", { class: "text-xl font-semibold text-gray-800 mb-2" }, toDisplayString(_ctx.hotel.name), 1),
                createVNode("p", { class: "text-gray-600 text-sm mb-2" }, toDisplayString(_ctx.hotel.location), 1),
                createVNode("div", { class: "flex items-center mb-2" }, [
                  createVNode("div", { class: "flex text-yellow-500" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(5, (n) => {
                      return openBlock(), createBlock(Fragment, { key: n }, [
                        n <= Math.floor(_ctx.hotel.rating) ? (openBlock(), createBlock(_component_Icon, {
                          key: 0,
                          name: "ic:round-star"
                        })) : n - 0.5 === _ctx.hotel.rating ? (openBlock(), createBlock(_component_Icon, {
                          key: 1,
                          name: "ic:round-star-half",
                          class: "h-5 w-5"
                        })) : (openBlock(), createBlock(_component_Icon, {
                          key: 2,
                          name: "ic:round-star-border",
                          class: "h-5 w-5"
                        }))
                      ], 64);
                    }), 64))
                  ]),
                  createVNode("span", { class: "ml-2 text-gray-700 text-sm" }, toDisplayString(((_c = _ctx.hotel.rating) == null ? void 0 : _c.toFixed(1)) || "N/A") + " (" + toDisplayString(_ctx.hotel.reviewsCount) + " avalia\xE7\xF5es)", 1)
                ]),
                createVNode("p", { class: "text-gray-900 text-lg font-bold mb-4" }, "R$ " + toDisplayString(((_d = _ctx.hotel.pricePerNight) == null ? void 0 : _d.toFixed(2)) || "0.00") + " / noite", 1),
                createVNode("button", {
                  onClick: withModifiers(toggleCompare, ["prevent"]),
                  class: [
                    "w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    isCompared.value ? "bg-red-500 text-white hover:bg-red-600" : "bg-indigo-600 text-white hover:bg-indigo-700"
                  ]
                }, [
                  isCompared.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode(_component_Icon, {
                      name: "ic:round-check",
                      class: "inline-block align-middle mr-1"
                    }),
                    createTextVNode(" Na Compara\xE7\xE3o ")
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode(_component_Icon, {
                      name: "ic:round-add",
                      class: "inline-block align-middle mr-1"
                    }),
                    createTextVNode(" Adicionar \xE0 Compara\xE7\xE3o ")
                  ], 64))
                ], 2)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HotelCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const authStore = useAuthStore();
    const searchCriteria = ref({
      location: "",
      minPrice: null,
      maxPrice: null,
      minRating: null,
      sortBy: "",
      sortOrder: "asc",
      checkInDate: "",
      checkOutDate: "",
      guests: 1
    });
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/hotels", {
      query: computed(() => ({
        location: searchCriteria.value.location || void 0,
        minPrice: searchCriteria.value.minPrice || void 0,
        maxPrice: searchCriteria.value.maxPrice || void 0,
        minRating: searchCriteria.value.minRating || void 0,
        sortBy: searchCriteria.value.sortBy || void 0,
        sortOrder: searchCriteria.value.sortBy ? searchCriteria.value.sortOrder : void 0
      })),
      transform: (response) => response.hotels
    }, "$pqtWcjQkdb")), __temp = await __temp, __restore(), __temp);
    const hotels = computed(() => data.value || []);
    watch(
      () => searchCriteria.value.sortBy,
      () => {
        if (searchCriteria.value.sortBy) {
          refresh();
        }
      }
    );
    watch(
      () => searchCriteria.value.sortOrder,
      () => {
        refresh();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_BaseInput = _sfc_main$2;
      const _component_BaseButton = _sfc_main$3;
      const _component_HotelCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4" }, _attrs))}><h1 class="text-4xl font-bold text-gray-800 mb-6"> Encontre o hotel perfeito! </h1>`);
      if (unref(authStore).isAuthenticated) {
        _push(`<p class="text-lg text-gray-700 mb-8"> Bem-vindo de volta, <span class="font-semibold">${ssrInterpolate(((_a = unref(authStore).currentUser) == null ? void 0 : _a.name) || "Usu\xE1rio")}</span>! Vamos encontrar sua pr\xF3xima estadia? </p>`);
      } else {
        _push(`<p class="text-lg text-gray-700 mb-8"> Fa\xE7a login ou cadastre-se para aproveitar todas as nossas funcionalidades de reserva! </p>`);
      }
      _push(`<div class="bg-white p-6 rounded-lg shadow-md mb-8"><h2 class="text-2xl font-semibold text-gray-900 mb-4"> Buscar e Filtrar Hot\xE9is </h2><form class="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"><div class="md:col-span-2">`);
      _push(ssrRenderComponent(_component_BaseInput, {
        id: "location-search",
        modelValue: searchCriteria.value.location,
        "onUpdate:modelValue": ($event) => searchCriteria.value.location = $event,
        label: "Localiza\xE7\xE3o",
        placeholder: "Ex: Rio de Janeiro, S\xE3o Paulo...",
        type: "text"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_BaseInput, {
        id: "min-price",
        modelValue: searchCriteria.value.minPrice,
        "onUpdate:modelValue": ($event) => searchCriteria.value.minPrice = $event,
        modelModifiers: { number: true },
        label: "Pre\xE7o M\xEDn.",
        type: "number",
        min: "0",
        step: "10"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_BaseInput, {
        id: "max-price",
        modelValue: searchCriteria.value.maxPrice,
        "onUpdate:modelValue": ($event) => searchCriteria.value.maxPrice = $event,
        modelModifiers: { number: true },
        label: "Pre\xE7o M\xE1x.",
        type: "number",
        min: "0",
        step: "10"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_BaseInput, {
        id: "min-rating",
        modelValue: searchCriteria.value.minRating,
        "onUpdate:modelValue": ($event) => searchCriteria.value.minRating = $event,
        modelModifiers: { number: true },
        label: "Avalia\xE7\xE3o M\xEDn.",
        type: "number",
        min: "1",
        max: "5",
        step: "0.1"
      }, null, _parent));
      _push(`</div><div class="md:col-span-1">`);
      _push(ssrRenderComponent(_component_BaseButton, {
        type: "submit",
        variant: "primary",
        class: "w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Buscar `);
          } else {
            return [
              createTextVNode(" Buscar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="md:col-span-3 mt-4"><label for="sort-by" class="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label><select id="sort-by" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(searchCriteria.value.sortBy) ? ssrLooseContain(searchCriteria.value.sortBy, "") : ssrLooseEqual(searchCriteria.value.sortBy, "")) ? " selected" : ""}>Nenhum</option><option value="pricePerNight"${ssrIncludeBooleanAttr(Array.isArray(searchCriteria.value.sortBy) ? ssrLooseContain(searchCriteria.value.sortBy, "pricePerNight") : ssrLooseEqual(searchCriteria.value.sortBy, "pricePerNight")) ? " selected" : ""}>Pre\xE7o</option><option value="rating"${ssrIncludeBooleanAttr(Array.isArray(searchCriteria.value.sortBy) ? ssrLooseContain(searchCriteria.value.sortBy, "rating") : ssrLooseEqual(searchCriteria.value.sortBy, "rating")) ? " selected" : ""}>Avalia\xE7\xE3o</option></select></div><div class="md:col-span-3 mt-4"><label for="sort-order" class="block text-sm font-medium text-gray-700 mb-1">Ordem</label><select id="sort-order" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"><option value="asc"${ssrIncludeBooleanAttr(Array.isArray(searchCriteria.value.sortOrder) ? ssrLooseContain(searchCriteria.value.sortOrder, "asc") : ssrLooseEqual(searchCriteria.value.sortOrder, "asc")) ? " selected" : ""}>Crescente</option><option value="desc"${ssrIncludeBooleanAttr(Array.isArray(searchCriteria.value.sortOrder) ? ssrLooseContain(searchCriteria.value.sortOrder, "desc") : ssrLooseEqual(searchCriteria.value.sortOrder, "desc")) ? " selected" : ""}>Decrescente</option></select></div><div class="md:col-span-2 hidden">`);
      _push(ssrRenderComponent(_component_BaseInput, {
        id: "check-in-date",
        modelValue: searchCriteria.value.checkInDate,
        "onUpdate:modelValue": ($event) => searchCriteria.value.checkInDate = $event,
        label: "Check-in",
        type: "date"
      }, null, _parent));
      _push(`</div><div class="md:col-span-2 hidden">`);
      _push(ssrRenderComponent(_component_BaseInput, {
        id: "check-out-date",
        modelValue: searchCriteria.value.checkOutDate,
        "onUpdate:modelValue": ($event) => searchCriteria.value.checkOutDate = $event,
        label: "Check-out",
        type: "date"
      }, null, _parent));
      _push(`</div><div class="md:col-span-2 hidden">`);
      _push(ssrRenderComponent(_component_BaseInput, {
        id: "guests",
        modelValue: searchCriteria.value.guests,
        "onUpdate:modelValue": ($event) => searchCriteria.value.guests = $event,
        modelModifiers: { number: true },
        label: "H\xF3spedes",
        type: "number",
        min: "1"
      }, null, _parent));
      _push(`</div></form></div>`);
      if (unref(pending)) {
        _push(`<div class="text-center text-lg text-gray-600"> Carregando hot\xE9is... </div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center text-red-600 text-lg"> Erro ao carregar hot\xE9is: ${ssrInterpolate(unref(error).message || "Verifique sua conex\xE3o.")}</div>`);
      } else if (!hotels.value || hotels.value.length === 0) {
        _push(`<div class="text-center text-gray-600 text-lg"> Nenhum hotel encontrado para sua pesquisa. </div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(hotels.value, (hotel) => {
          _push(ssrRenderComponent(_component_HotelCard, {
            key: hotel.id,
            hotel
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CfdyvQQR.mjs.map
