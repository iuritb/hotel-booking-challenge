import { v as vueExports } from './server.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from '@vue/server-renderer';
import { nanoid } from 'nanoid';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "BaseInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: {},
    type: { default: "text" },
    placeholder: { default: "" },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    error: { default: "" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const id = `input-${nanoid()}`;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (_ctx.label) {
        _push(`<label${ssrRenderAttr("for", id)} class="block text-sm font-medium text-gray-700 mb-1">${ssrInterpolate(_ctx.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("id", id)}${ssrRenderAttr("type", _ctx.type)}${ssrRenderAttr("value", _ctx.modelValue)}${ssrRenderAttr("placeholder", _ctx.placeholder)}${ssrIncludeBooleanAttr(_ctx.required) ? " required" : ""}${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""} class="${ssrRenderClass([{ "bg-gray-50 cursor-not-allowed": _ctx.disabled }, "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"])}">`);
      if (_ctx.error) {
        _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate(_ctx.error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/BaseInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseInput-BKHxPLRt.mjs.map
