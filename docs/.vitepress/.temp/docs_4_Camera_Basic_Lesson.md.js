import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"4. Camera Basic Course","description":"","frontmatter":{},"headers":[],"relativePath":"docs/4_Camera_Basic_Lesson.md","filePath":"docs/4_Camera_Basic_Lesson.md"}');
const _sfc_main = { name: "docs/4_Camera_Basic_Lesson.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_4-camera-basic-course" tabindex="-1">4. Camera Basic Course <a class="header-anchor" href="#_4-camera-basic-course" aria-label="Permalink to &quot;4. Camera Basic Course&quot;">​</a></h1><h2 id="_4-1-aurora-depth-camera" tabindex="-1">4.1 Aurora Depth Camera <a class="header-anchor" href="#_4-1-aurora-depth-camera" aria-label="Permalink to &quot;4.1 Aurora Depth Camera&quot;">​</a></h2><p>Please click <a href="https://wiki.hiwonder.com/projects/Aurora930-Pro/en/latest/index.html" target="_blank" rel="noreferrer">Aurora930 Pro</a> to get the Aurora Depth Camera basics course.</p><h2 id="_4-2-monocular-camera-usb" tabindex="-1">4.2 Monocular Camera -USB <a class="header-anchor" href="#_4-2-monocular-camera-usb" aria-label="Permalink to &quot;4.2  Monocular Camera -USB&quot;">​</a></h2><p>Please click <a href="https://drive.google.com/drive/folders/1dIG3iqGu9qvjHaaJ70ZTRKdbfzQ3o5kT?usp=sharing" target="_blank" rel="noreferrer">Monocular Camera -USB</a> to get the Monocular Camera -USB basics course.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("docs/4_Camera_Basic_Lesson.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _4_Camera_Basic_Lesson = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _4_Camera_Basic_Lesson as default
};
