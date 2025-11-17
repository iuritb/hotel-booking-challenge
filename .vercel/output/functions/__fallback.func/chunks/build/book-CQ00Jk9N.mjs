import { _ as __nuxt_component_0 } from './nuxt-link-C5VT5LEg.mjs';
import { _ as _sfc_main$1 } from './BaseInput--VpxHNSf.mjs';
import { _ as _sfc_main$2 } from './BaseButton-_E5WwLH9.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, createBlock, openBlock, useSSRContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { u as useHead } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { z } from 'zod';
import { u as useSnackbarStore } from './snackbar-khJODdGS.mjs';
import { u as useAuthStore } from './auth-BLFjfOD5.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'nanoid';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "book",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    useSnackbarStore();
    useAuthStore();
    const hotelId = route.params.id;
    const hotel = ref(null);
    const pending = ref(true);
    const error = ref(null);
    const form = ref({
      fullName: "",
      email: "",
      phone: "",
      checkInDate: "",
      checkOutDate: "",
      numberOfGuests: 1,
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cvv: ""
    });
    const today = ref("");
    const minCheckOutDate = computed(() => {
      if (form.value.checkInDate) {
        const d = new Date(form.value.checkInDate);
        d.setDate(d.getDate() + 1);
        return d.toISOString().split("T")[0];
      }
      return today.value;
    });
    watch(() => form.value.checkInDate, (newVal) => {
      if (newVal && form.value.checkOutDate && new Date(newVal) >= new Date(form.value.checkOutDate)) {
        const d = new Date(newVal);
        d.setDate(d.getDate() + 1);
        form.value.checkOutDate = d.toISOString().split("T")[0];
      }
    });
    const submitting = ref(false);
    const errors = ref({});
    computed(() => {
      var _a, _b;
      return z.object({
        fullName: z.string().min(3, "Nome completo \xE9 obrigat\xF3rio e deve ter no m\xEDnimo 3 caracteres."),
        email: z.string().email("Email inv\xE1lido."),
        phone: z.string().min(10, "Telefone inv\xE1lido. Ex: (XX) XXXX-XXXX").regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, "Formato de telefone inv\xE1lido."),
        checkInDate: z.string().refine((val) => {
          const checkIn = new Date(val);
          const dateToday = /* @__PURE__ */ new Date();
          checkIn.setHours(0, 0, 0, 0);
          dateToday.setHours(0, 0, 0, 0);
          return checkIn.getTime() >= dateToday.getTime();
        }, "A data de check-in n\xE3o pode ser no passado."),
        checkOutDate: z.string().refine((val) => {
          if (!form.value.checkInDate) return false;
          return new Date(val) > new Date(form.value.checkInDate);
        }, "A data de check-out deve ser posterior \xE0 data de check-in."),
        numberOfGuests: z.number().min(1, "Pelo menos um h\xF3spede \xE9 necess\xE1rio.").max(((_a = hotel.value) == null ? void 0 : _a.availableRooms) || 5, `N\xFAmero m\xE1ximo de h\xF3spedes \xE9 ${((_b = hotel.value) == null ? void 0 : _b.availableRooms) || 5} (baseado em quartos dispon\xEDveis).`),
        cardNumber: z.string().length(19, "N\xFAmero do cart\xE3o deve ter 16 d\xEDgitos (contando espa\xE7os/h\xEDfens).").regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Formato de cart\xE3o inv\xE1lido (XXXX XXXX XXXX XXXX)."),
        cardHolderName: z.string().min(3, "Nome no cart\xE3o \xE9 obrigat\xF3rio."),
        expiryDate: z.string().length(5, "Data de validade inv\xE1lida (MM/AA).").regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Formato MM/AA inv\xE1lido ou m\xEAs/ano inv\xE1lido.").refine((val) => {
          const [month, year] = val.split("/").map(Number);
          const fullYear = 2e3 + year;
          const today2 = /* @__PURE__ */ new Date();
          const currentMonth = today2.getMonth() + 1;
          const currentYear = today2.getFullYear();
          return fullYear > currentYear || fullYear === currentYear && month >= currentMonth;
        }, "Cart\xE3o expirado."),
        cvv: z.string().min(3, "CVV deve ter 3 ou 4 d\xEDgitos.").max(4, "CVV deve ter 3 ou 4 d\xEDgitos.").regex(/^\d+$/, "CVV inv\xE1lido.")
      });
    });
    watch(() => form.value.cardNumber, (newValue) => {
      let cleaned = newValue.replace(/\D/g, "");
      let formatted = "";
      for (let i = 0; i < cleaned.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formatted += " ";
        }
        formatted += cleaned[i];
      }
      form.value.cardNumber = formatted;
    }, { immediate: true });
    watch(() => form.value.expiryDate, (newValue) => {
      let cleaned = newValue.replace(/\D/g, "");
      if (cleaned.length > 2) {
        cleaned = cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
      }
      form.value.expiryDate = cleaned;
    }, { immediate: true });
    useHead({
      title: computed(() => hotel.value ? `Reservar ${hotel.value.name} - Meu App de Reservas` : "Reservar Hotel")
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_BaseInput = _sfc_main$1;
      const _component_BaseButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto p-4 md:p-8" }, _attrs))} data-v-0f1722bb>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/hotels/${unref(hotelId)}`,
        class: "text-indigo-600 hover:underline mb-6 inline-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u2190 Voltar para os detalhes do hotel `);
          } else {
            return [
              createTextVNode(" \u2190 Voltar para os detalhes do hotel ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (pending.value) {
        _push(`<div class="min-h-[calc(100vh-200px)] flex items-center justify-center" data-v-0f1722bb><p class="text-xl text-gray-700" data-v-0f1722bb>Carregando detalhes do hotel...</p></div>`);
      } else if (error.value) {
        _push(`<div class="min-h-[calc(100vh-200px)] flex items-center justify-center" data-v-0f1722bb><p class="text-red-500 text-lg" data-v-0f1722bb>Erro ao carregar os detalhes do hotel: ${ssrInterpolate(error.value.message)}</p></div>`);
      } else if (hotel.value) {
        _push(`<div class="bg-white rounded-lg shadow-xl p-6 md:p-8" data-v-0f1722bb><h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4" data-v-0f1722bb>Reservar ${ssrInterpolate(hotel.value.name)}</h1><p class="text-lg text-gray-600 mb-6" data-v-0f1722bb>Em ${ssrInterpolate(hotel.value.location)} por R$ ${ssrInterpolate((_a = hotel.value.pricePerNight) == null ? void 0 : _a.toFixed(2))} / noite</p><form class="space-y-6" data-v-0f1722bb><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-0f1722bb><div data-v-0f1722bb><h2 class="text-2xl font-semibold text-gray-700 mb-4" data-v-0f1722bb>Seus Dados</h2><div class="mb-4" data-v-0f1722bb>`);
        _push(ssrRenderComponent(_component_BaseInput, {
          id: "fullName",
          modelValue: form.value.fullName,
          "onUpdate:modelValue": ($event) => form.value.fullName = $event,
          label: "Nome Completo",
          type: "text",
          required: "",
          error: errors.value.fullName
        }, null, _parent));
        _push(`</div><div class="mb-4" data-v-0f1722bb>`);
        _push(ssrRenderComponent(_component_BaseInput, {
          id: "email",
          modelValue: form.value.email,
          "onUpdate:modelValue": ($event) => form.value.email = $event,
          label: "Email",
          type: "email",
          required: "",
          error: errors.value.email
        }, null, _parent));
        _push(`</div><div class="mb-4" data-v-0f1722bb>`);
        _push(ssrRenderComponent(_component_BaseInput, {
          id: "phone",
          modelValue: form.value.phone,
          "onUpdate:modelValue": ($event) => form.value.phone = $event,
          label: "Telefone",
          type: "tel",
          required: "",
          error: errors.value.phone
        }, null, _parent));
        _push(`</div></div><div data-v-0f1722bb><h2 class="text-2xl font-semibold text-gray-700 mb-4" data-v-0f1722bb>Per\xEDodo da Reserva</h2><div class="mb-4" data-v-0f1722bb>`);
        _push(ssrRenderComponent(_component_BaseInput, {
          id: "checkInDate",
          modelValue: form.value.checkInDate,
          "onUpdate:modelValue": ($event) => form.value.checkInDate = $event,
          label: "Data de Check-in",
          type: "date",
          required: "",
          min: today.value,
          error: errors.value.checkInDate
        }, null, _parent));
        _push(`</div><div class="mb-4" data-v-0f1722bb>`);
        _push(ssrRenderComponent(_component_BaseInput, {
          id: "checkOutDate",
          modelValue: form.value.checkOutDate,
          "onUpdate:modelValue": ($event) => form.value.checkOutDate = $event,
          label: "Data de Check-out",
          type: "date",
          required: "",
          min: minCheckOutDate.value,
          error: errors.value.checkOutDate
        }, null, _parent));
        _push(`</div><div class="mb-4" data-v-0f1722bb>`);
        _push(ssrRenderComponent(_component_BaseInput, {
          id: "numberOfGuests",
          modelValue: form.value.numberOfGuests,
          "onUpdate:modelValue": ($event) => form.value.numberOfGuests = $event,
          modelModifiers: { number: true },
          label: "N\xFAmero de H\xF3spedes",
          type: "number",
          min: "1",
          required: "",
          max: hotel.value.availableRooms,
          error: errors.value.numberOfGuests
        }, null, _parent));
        _push(`</div></div></div><hr class="my-8" data-v-0f1722bb><div data-v-0f1722bb><h2 class="text-2xl font-semibold text-gray-700 mb-4" data-v-0f1722bb>Dados do Cart\xE3o de Cr\xE9dito</h2><p class="text-sm text-gray-500 mb-4" data-v-0f1722bb>*Este \xE9 um sistema de reserva de demonstra\xE7\xE3o. N\xE3o use dados de cart\xE3o de cr\xE9dito reais.</p><div class="mb-4" data-v-0f1722bb>`);
        _push(ssrRenderComponent(_component_BaseInput, {
          id: "cardNumber",
          modelValue: form.value.cardNumber,
          "onUpdate:modelValue": ($event) => form.value.cardNumber = $event,
          label: "N\xFAmero do Cart\xE3o",
          type: "text",
          maxlength: "19",
          required: "",
          error: errors.value.cardNumber
        }, null, _parent));
        _push(`</div><div class="mb-4" data-v-0f1722bb>`);
        _push(ssrRenderComponent(_component_BaseInput, {
          id: "cardHolderName",
          modelValue: form.value.cardHolderName,
          "onUpdate:modelValue": ($event) => form.value.cardHolderName = $event,
          label: "Nome no Cart\xE3o",
          type: "text",
          required: "",
          error: errors.value.cardHolderName
        }, null, _parent));
        _push(`</div><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4" data-v-0f1722bb><div data-v-0f1722bb>`);
        _push(ssrRenderComponent(_component_BaseInput, {
          id: "expiryDate",
          modelValue: form.value.expiryDate,
          "onUpdate:modelValue": ($event) => form.value.expiryDate = $event,
          label: "Data de Validade (MM/AA)",
          type: "text",
          maxlength: "5",
          placeholder: "MM/AA",
          required: "",
          error: errors.value.expiryDate
        }, null, _parent));
        _push(`</div><div data-v-0f1722bb>`);
        _push(ssrRenderComponent(_component_BaseInput, {
          id: "cvv",
          modelValue: form.value.cvv,
          "onUpdate:modelValue": ($event) => form.value.cvv = $event,
          label: "CVV",
          type: "text",
          maxlength: "4",
          required: "",
          error: errors.value.cvv
        }, null, _parent));
        _push(`</div></div></div><div class="pt-5" data-v-0f1722bb>`);
        _push(ssrRenderComponent(_component_BaseButton, {
          type: "submit",
          disabled: submitting.value,
          variant: "primary",
          class: "w-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (submitting.value) {
                _push2(`<span data-v-0f1722bb${_scopeId}>Enviando...</span>`);
              } else {
                _push2(`<span data-v-0f1722bb${_scopeId}>Confirmar Reserva</span>`);
              }
            } else {
              return [
                submitting.value ? (openBlock(), createBlock("span", { key: 0 }, "Enviando...")) : (openBlock(), createBlock("span", { key: 1 }, "Confirmar Reserva"))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></form></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/hotels/[id]/book.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const book = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0f1722bb"]]);

export { book as default };
//# sourceMappingURL=book-CQ00Jk9N.mjs.map
