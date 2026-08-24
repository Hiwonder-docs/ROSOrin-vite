// docs/.vitepress/config.mts
import { defineConfig } from "file:///E:/phpstudy_pro/WWW/githup/Jetson%20Series/ROSOrin-vite/node_modules/vitepress/dist/node/index.js";
import fs2 from "node:fs";
import path2 from "node:path";

// docs/.vitepress/autoSidebar.mts
import fs from "fs";
import path from "path";
var __vite_injected_original_dirname = "E:\\phpstudy_pro\\WWW\\githup\\Jetson Series\\ROSOrin-vite\\docs\\.vitepress";
var rControl = /[\u0000-\u001f]/g;
var rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>，。！？、；：（）《》【】,.?/]+/g;
var rCombining = /[\u0300-\u036F]/g;
function generateAnchor(text) {
  return text.normalize("NFKD").replace(rCombining, "").replace(rControl, "").replace(rSpecial, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "").replace(/^(\d)/, "_$1").toLowerCase();
}
function cleanSidebarText(text) {
  return text.replace(/\*\*([^*\n]+?)\*\*/g, "$1").replace(/__([^_\n]+?)__/g, "$1").replace(/<\/?strong>/gi, "").replace(/<\/?b>/gi, "").trim();
}
function isLockedPreviewPage(content) {
  return /<!--\s*preview-locked\s*-->/i.test(content);
}
function buildPageLink(name, anchor) {
  const pagePath = `/docs/${name}.html`;
  const fullPath = anchor ? `${pagePath}#${anchor}` : pagePath;
  return encodeURI(fullPath);
}
function getMarkdownStem(filename) {
  return filename.replace(/\.md$/i, "");
}
function isAppendixStem(stem) {
  const normalized = stem.trim().toLowerCase();
  return normalized === "appendix" || normalized.startsWith("appendix.");
}
function buildSidebarSortKey(filename) {
  const stem = getMarkdownStem(filename);
  if (isAppendixStem(stem)) {
    return [2, [], stem.toLowerCase()];
  }
  const match = stem.match(/^(\d+(?:\.\d+)*)/);
  if (match) {
    return [0, match[1].split(".").map((part) => parseInt(part, 10)), stem.toLowerCase()];
  }
  return [1, [], stem.toLowerCase()];
}
function getSidebar() {
  const pageDir = path.resolve(__vite_injected_original_dirname, "../docs");
  if (!fs.existsSync(pageDir)) return [];
  const files = fs.readdirSync(pageDir).filter((f) => {
    return f.endsWith(".md") && f.toLowerCase() !== "index.md";
  });
  files.sort((a, b) => {
    const [groupA, partsA, stemA] = buildSidebarSortKey(a);
    const [groupB, partsB, stemB] = buildSidebarSortKey(b);
    if (groupA !== groupB) {
      return groupA - groupB;
    }
    if (groupA === 0) {
      const maxLength = Math.max(partsA.length, partsB.length);
      for (let i = 0; i < maxLength; i++) {
        const valueA = partsA[i] ?? -1;
        const valueB = partsB[i] ?? -1;
        if (valueA !== valueB) {
          return valueA - valueB;
        }
      }
    }
    return stemA.localeCompare(stemB, "en");
  });
  const sidebar = [];
  for (const file of files) {
    const name = file.replace(/\.md$/, "");
    const content = fs.readFileSync(path.join(pageDir, file), "utf-8");
    const lockedPreviewPage = isLockedPreviewPage(content);
    const lines = content.split("\n");
    const items = [];
    let pageTitle = "";
    let inCodeBlock = false;
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      if (!inCodeBlock) {
        const h1Match = trimmedLine.match(/^#\s+(.+)$/);
        if (h1Match && !pageTitle) {
          pageTitle = cleanSidebarText(h1Match[1].trim());
          continue;
        }
        const match = trimmedLine.match(/^##\s+(.+)$/);
        if (match) {
          const rawTitle = match[1].trim();
          const title = cleanSidebarText(rawTitle);
          const anchor = generateAnchor(rawTitle);
          items.push({
            text: title,
            link: buildPageLink(name, anchor),
            class: lockedPreviewPage ? "is-preview-locked" : void 0
          });
        }
      }
    }
    sidebar.push({
      text: pageTitle || name,
      link: buildPageLink(name),
      collapsed: false,
      class: lockedPreviewPage ? "is-preview-locked" : void 0,
      items
    });
  }
  return sidebar;
}

// docs/.vitepress/config.mts
import mathjax3 from "file:///E:/phpstudy_pro/WWW/githup/Jetson%20Series/ROSOrin-vite/node_modules/markdown-it-mathjax3/index.js";
var problematicStrongEndingPattern = /[：；，。！？、（）【】《》「」『』“”‘’…]$/u;
var problematicStrongOpeningPattern = /^[（(][^*\n]+?[）)]$/u;
var strongWhitespacePattern = /\*\*([^*\n]+)\*\*/g;
var inlineCodePattern = /(`+[^`]*`+)/g;
var fencePattern = /^\s*(```+|~~~+)/;
var lazyImagePlaceholder = "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%229%22 viewBox=%220 0 16 9%22%3E%3C/svg%3E";
var imageDimensionCache = /* @__PURE__ */ new Map();
var docsBase = normalizeBase(process.env.DOCS_BASE || "/projects/ROSOrin/en/jetson-orin-nano-version/");
var currentVersion = process.env.DOCS_VERSION || "jetson-orin-nano-version";
function normalizeBase(value) {
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}
function replaceOutsideInlineCode(line, replacer) {
  return line.split(inlineCodePattern).map((segment) => segment.startsWith("`") ? segment : replacer(segment)).join("");
}
function normalizeStrongPairs(segment) {
  let normalized = "";
  let cursor = 0;
  while (cursor < segment.length) {
    const openingMarker = segment.indexOf("**", cursor);
    if (openingMarker === -1) {
      normalized += segment.slice(cursor);
      break;
    }
    const closingMarker = segment.indexOf("**", openingMarker + 2);
    if (closingMarker === -1) {
      normalized += segment.slice(cursor);
      break;
    }
    const content = segment.slice(openingMarker + 2, closingMarker);
    const previousChar = openingMarker > 0 ? segment[openingMarker - 1] : "";
    const nextChar = closingMarker + 2 < segment.length ? segment[closingMarker + 2] : "";
    const needsOpeningFix = Boolean(previousChar) && /\S/u.test(previousChar) && problematicStrongOpeningPattern.test(content);
    const needsEndingFix = Boolean(nextChar) && /\S/u.test(nextChar) && problematicStrongEndingPattern.test(content);
    normalized += segment.slice(cursor, openingMarker);
    normalized += needsOpeningFix || needsEndingFix ? `<strong>${content}</strong>` : `**${content}**`;
    cursor = closingMarker + 2;
  }
  return normalized;
}
function normalizeProblematicStrongSyntax(code) {
  let inFence = false;
  let activeFenceMarker = "";
  return code.split("\n").map((line) => {
    const trimmed = line.trimStart();
    const fenceMatch = trimmed.match(fencePattern);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!inFence) {
        inFence = true;
        activeFenceMarker = marker;
      } else if (marker[0] === activeFenceMarker[0] && marker.length >= activeFenceMarker.length) {
        inFence = false;
        activeFenceMarker = "";
      }
      return line;
    }
    if (inFence) {
      return line;
    }
    return replaceOutsideInlineCode(line, (segment) => {
      return normalizeStrongPairs(segment);
    });
  }).join("\n");
}
function trimWhitespaceInsideStrong(code) {
  let inFence = false;
  let activeFenceMarker = "";
  return code.split("\n").map((line) => {
    const trimmed = line.trimStart();
    const fenceMatch = trimmed.match(fencePattern);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!inFence) {
        inFence = true;
        activeFenceMarker = marker;
      } else if (marker[0] === activeFenceMarker[0] && marker.length >= activeFenceMarker.length) {
        inFence = false;
        activeFenceMarker = "";
      }
      return line;
    }
    if (inFence || line.includes("|")) {
      return line;
    }
    return replaceOutsideInlineCode(
      line,
      (segment) => segment.replace(strongWhitespacePattern, (match, content) => {
        const normalized = content.trim();
        if (!normalized || normalized === content) {
          return match;
        }
        return `**${normalized}**`;
      })
    );
  }).join("\n");
}
function preserveBrokenAbsoluteImages() {
  const imageTagPattern = /<img\b[^>]*\bsrc="([A-Za-z]:\\[^"]+)"[^>]*\/?>/g;
  return {
    name: "preserve-broken-absolute-images",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md") || !imageTagPattern.test(code)) {
        return null;
      }
      imageTagPattern.lastIndex = 0;
      const transformed = code.replace(imageTagPattern, (tag) => `{${tag.slice(1, -1)}}`);
      return transformed === code ? null : transformed;
    }
  };
}
function normalizeImagePathSlashes() {
  const imgSrcPattern = /(<img\b[^>]*\bsrc=")([^"]+)("[^>]*>)/gi;
  const mdImgPattern = /(!\[[^\]]*\]\()([^)]+)(\))/g;
  return {
    name: "normalize-image-path-slashes",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md") || !code.includes("<img") && !code.includes("![")) {
        return null;
      }
      let changed = false;
      const fixSlashes = (path3) => {
        if (!path3 || path3.startsWith("http://") || path3.startsWith("https://") || path3.startsWith("data:")) {
          return path3;
        }
        const fixed = path3.replace(/\\/g, "/");
        if (fixed !== path3) changed = true;
        return fixed;
      };
      const transformed = code.replace(imgSrcPattern, (match, prefix, src, suffix) => `${prefix}${fixSlashes(src)}${suffix}`).replace(mdImgPattern, (match, prefix, src, suffix) => `${prefix}${fixSlashes(src)}${suffix}`);
      return changed ? transformed : null;
    }
  };
}
function addNativeLazyLoadingToImages(code) {
  const imageTagPattern = /<img\b[^>]*>/g;
  return code.replace(imageTagPattern, (tag) => {
    if (/\bloading\s*=/.test(tag)) {
      return tag;
    }
    return tag.replace("<img", '<img loading="lazy"');
  });
}
function normalizeProblematicStrongEmphasis() {
  return {
    name: "normalize-problematic-strong-emphasis",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md") || !code.includes("**")) {
        return null;
      }
      const transformed = normalizeProblematicStrongSyntax(code);
      return transformed === code ? null : transformed;
    }
  };
}
function normalizeStrongWhitespace() {
  return {
    name: "normalize-strong-whitespace",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md") || !strongWhitespacePattern.test(code)) {
        return null;
      }
      strongWhitespacePattern.lastIndex = 0;
      const transformed = trimWhitespaceInsideStrong(code);
      return transformed === code ? null : transformed;
    }
  };
}
function lazyLoadHtmlImages() {
  const imageTagPattern = /<img\b[^>]*>/i;
  return {
    name: "lazy-load-html-images",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md") || !imageTagPattern.test(code)) {
        return null;
      }
      const transformed = addNativeLazyLoadingToImages(code);
      return transformed === code ? null : transformed;
    }
  };
}
function getHtmlAttribute(tag, attributeName) {
  const attributePattern = new RegExp(`\\s${attributeName}\\s*=\\s*(["'])(.*?)\\1`, "i");
  const attributeMatch = tag.match(attributePattern);
  return attributeMatch?.[2] || "";
}
function getNumericHtmlAttribute(tag, attributeName) {
  const rawValue = getHtmlAttribute(tag, attributeName);
  if (!/^\d+(?:\.\d+)?$/.test(rawValue)) {
    return null;
  }
  const value = Number(rawValue);
  return Number.isFinite(value) && value > 0 ? value : null;
}
function readPngDimensions(buffer) {
  if (buffer.length < 24 || buffer.toString("binary", 0, 8) !== "\x89PNG\r\n\n" || buffer.toString("ascii", 12, 16) !== "IHDR") {
    return null;
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}
function readGifDimensions(buffer) {
  const signature = buffer.toString("ascii", 0, 6);
  if (buffer.length < 10 || signature !== "GIF87a" && signature !== "GIF89a") {
    return null;
  }
  return {
    width: buffer.readUInt16LE(6),
    height: buffer.readUInt16LE(8)
  };
}
function readJpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 255 || buffer[1] !== 216) {
    return null;
  }
  let offset = 2;
  const startOfFrameMarkers = /* @__PURE__ */ new Set([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207]);
  while (offset + 3 < buffer.length) {
    while (offset < buffer.length && buffer[offset] !== 255) {
      offset += 1;
    }
    while (offset < buffer.length && buffer[offset] === 255) {
      offset += 1;
    }
    if (offset >= buffer.length) {
      return null;
    }
    const marker = buffer[offset];
    offset += 1;
    if (marker === 216 || marker === 217) {
      continue;
    }
    if (offset + 1 >= buffer.length) {
      return null;
    }
    const segmentLength = buffer.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > buffer.length) {
      return null;
    }
    if (startOfFrameMarkers.has(marker)) {
      return {
        width: buffer.readUInt16BE(offset + 5),
        height: buffer.readUInt16BE(offset + 3)
      };
    }
    offset += segmentLength;
  }
  return null;
}
function readWebpDimensions(buffer) {
  if (buffer.length < 30 || buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
    return null;
  }
  const chunkType = buffer.toString("ascii", 12, 16);
  if (chunkType === "VP8X" && buffer.length >= 30) {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3)
    };
  }
  if (chunkType === "VP8L" && buffer.length >= 25 && buffer[20] === 47) {
    const b0 = buffer[21];
    const b1 = buffer[22];
    const b2 = buffer[23];
    const b3 = buffer[24];
    return {
      width: 1 + ((b1 & 63) << 8 | b0),
      height: 1 + ((b3 & 15) << 10 | b2 << 2 | (b1 & 192) >> 6)
    };
  }
  if (chunkType === "VP8 " && buffer.length >= 30 && buffer[23] === 157 && buffer[24] === 1 && buffer[25] === 42) {
    return {
      width: buffer.readUInt16LE(26) & 16383,
      height: buffer.readUInt16LE(28) & 16383
    };
  }
  return null;
}
function readImageDimensions(imagePath) {
  const cachedDimensions = imageDimensionCache.get(imagePath);
  if (imageDimensionCache.has(imagePath)) {
    return cachedDimensions;
  }
  let dimensions = null;
  try {
    const buffer = fs2.readFileSync(imagePath);
    const ext = path2.extname(imagePath).toLowerCase();
    if (ext === ".png") {
      dimensions = readPngDimensions(buffer);
    } else if (ext === ".jpg" || ext === ".jpeg") {
      dimensions = readJpegDimensions(buffer);
    } else if (ext === ".gif") {
      dimensions = readGifDimensions(buffer);
    } else if (ext === ".webp") {
      dimensions = readWebpDimensions(buffer);
    }
  } catch {
    dimensions = null;
  }
  if (!dimensions || dimensions.width <= 0 || dimensions.height <= 0) {
    dimensions = null;
  }
  imageDimensionCache.set(imagePath, dimensions);
  return dimensions;
}
function resolveLocalImagePath(markdownId, src) {
  if (!src || /^(?:https?:|data:|#|\/)/i.test(src) || /^[A-Za-z]:[\\/]/.test(src)) {
    return null;
  }
  let cleanSrc = src;
  try {
    cleanSrc = decodeURIComponent(src);
  } catch {
    cleanSrc = src;
  }
  cleanSrc = cleanSrc.replace(/\\/g, "/").split(/[?#]/, 1)[0];
  return path2.resolve(path2.dirname(markdownId), cleanSrc);
}
function addImageDimensionsToTag(tag, markdownId) {
  if (hasAttribute(tag, "width") && hasAttribute(tag, "height")) {
    return tag;
  }
  const src = getHtmlAttribute(tag, "src") || getHtmlAttribute(tag, "data-lazy-src");
  const imagePath = resolveLocalImagePath(markdownId, src);
  if (!imagePath) {
    return tag;
  }
  const dimensions = readImageDimensions(imagePath);
  if (!dimensions) {
    return tag;
  }
  const currentWidth = getNumericHtmlAttribute(tag, "width");
  const currentHeight = getNumericHtmlAttribute(tag, "height");
  let width = dimensions.width;
  let height = dimensions.height;
  if (currentWidth && !currentHeight) {
    width = currentWidth;
    height = Math.max(1, Math.round(currentWidth * dimensions.height / dimensions.width));
  } else if (!currentWidth && currentHeight) {
    height = currentHeight;
    width = Math.max(1, Math.round(currentHeight * dimensions.width / dimensions.height));
  }
  let preparedTag = tag;
  if (!hasAttribute(preparedTag, "width")) {
    preparedTag = preparedTag.replace("<img", `<img width="${width}"`);
  }
  if (!hasAttribute(preparedTag, "height")) {
    preparedTag = preparedTag.replace("<img", `<img height="${height}"`);
  }
  return preparedTag;
}
function reserveLocalImageDimensions() {
  const imageTagPattern = /<img\b[^>]*>/g;
  return {
    name: "reserve-local-image-dimensions",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md") || !imageTagPattern.test(code)) {
        return null;
      }
      imageTagPattern.lastIndex = 0;
      const transformed = code.replace(imageTagPattern, (tag) => addImageDimensionsToTag(tag, id));
      return transformed === code ? null : transformed;
    }
  };
}
function hasAttribute(tag, attributeName) {
  return new RegExp(`\\s${attributeName}(?:\\s*=|\\s|>)`, "i").test(tag);
}
function addClassNames(tag, classNames) {
  const classPattern = /\sclass=(["'])(.*?)\1/i;
  const classMatch = tag.match(classPattern);
  if (!classMatch) {
    return tag.replace("<img", `<img class="${classNames.join(" ")}"`);
  }
  const existingClassNames = classMatch[2].split(/\s+/).filter(Boolean);
  const mergedClassNames = Array.from(/* @__PURE__ */ new Set([...existingClassNames, ...classNames]));
  return tag.replace(classPattern, ` class=${classMatch[1]}${mergedClassNames.join(" ")}${classMatch[1]}`);
}
function moveImageAttribute(tag, fromAttribute, toAttribute) {
  const attributePattern = new RegExp(`\\s${fromAttribute}=(["'])(.*?)\\1`, "i");
  const attributeMatch = tag.match(attributePattern);
  if (!attributeMatch) {
    return tag;
  }
  return tag.replace(attributePattern, ` ${toAttribute}=${attributeMatch[1]}${attributeMatch[2]}${attributeMatch[1]}`);
}
function prepareHardLazyImageTag(tag) {
  if (!/\sloading=(["'])lazy\1/i.test(tag) || hasAttribute(tag, "data-lazy-src") || /\sclass=(["'])[^"']*\binline-icon\b[^"']*\1/i.test(tag) || /\ssrc=(["'])data:image/i.test(tag)) {
    return tag;
  }
  const srcPattern = /\ssrc=(["'])(.*?)\1/i;
  const srcMatch = tag.match(srcPattern);
  if (!srcMatch || !srcMatch[2]) {
    return tag;
  }
  let preparedTag = tag;
  preparedTag = moveImageAttribute(preparedTag, "srcset", "data-lazy-srcset");
  preparedTag = moveImageAttribute(preparedTag, "sizes", "data-lazy-sizes");
  preparedTag = preparedTag.replace(
    srcPattern,
    ` src="${lazyImagePlaceholder}" data-lazy-src=${srcMatch[1]}${srcMatch[2]}${srcMatch[1]}`
  );
  if (!hasAttribute(preparedTag, "decoding")) {
    preparedTag = preparedTag.replace("<img", '<img decoding="async"');
  }
  if (!hasAttribute(preparedTag, "fetchpriority")) {
    preparedTag = preparedTag.replace("<img", '<img fetchpriority="low"');
  }
  if (!hasAttribute(preparedTag, "data-lazy-image")) {
    preparedTag = preparedTag.replace("<img", '<img data-lazy-image="true"');
  }
  return addClassNames(preparedTag, ["vp-lazy-image", "is-pending"]);
}
function prepareHardLazyImages(code) {
  return code.replace(/<img\b[^>]*>/g, prepareHardLazyImageTag);
}
function escapeHtmlAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function slugDocModuleLabel(label, fallback) {
  return label.normalize("NFKD").replace(/[^\p{Letter}\p{Number}]+/gu, "-").replace(/^-+|-+$/g, "").toLowerCase() || fallback;
}
function parseDocModuleMarker(line) {
  const markerMatch = line.trim().match(/^(:{3,4})(?!:)(.*)$/u);
  if (!markerMatch) {
    return null;
  }
  const colonCount = markerMatch[1].length;
  const info = (markerMatch[2] || "").trim();
  return {
    level: colonCount - 2,
    info,
    isOpen: info.length > 0
  };
}
function parseDocModuleMeta(rawInfo, level) {
  const label = rawInfo.trim() || `Untitled level ${level} block`;
  return {
    id: slugDocModuleLabel(label, `level-${level}`),
    label
  };
}
function docModuleBlockPlugin(md) {
  function docModuleBlock(state, startLine, endLine, silent) {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    const firstLine = state.src.slice(start, max);
    const openingMarker = parseDocModuleMarker(firstLine);
    if (!openingMarker?.isOpen) {
      return false;
    }
    if (silent) {
      return true;
    }
    let nextLine = startLine;
    let autoClosed = false;
    let depth = 1;
    while (nextLine + 1 < endLine) {
      nextLine += 1;
      const lineStart = state.bMarks[nextLine] + state.tShift[nextLine];
      const lineMax = state.eMarks[nextLine];
      const marker = parseDocModuleMarker(state.src.slice(lineStart, lineMax));
      if (!marker || marker.level !== openingMarker.level) {
        continue;
      }
      if (marker.isOpen) {
        depth += 1;
        continue;
      }
      depth -= 1;
      if (depth === 0) {
        autoClosed = true;
        break;
      }
    }
    let contentStartLine = startLine + 1;
    const oldParent = state.parentType;
    const oldLineMax = state.lineMax;
    const meta = parseDocModuleMeta(openingMarker.info, openingMarker.level);
    const openTokenName = openingMarker.level === 1 ? "doc_level_one_block_open" : "doc_level_two_block_open";
    const closeTokenName = openingMarker.level === 1 ? "doc_level_one_block_close" : "doc_level_two_block_close";
    state.parentType = "container";
    state.lineMax = nextLine;
    const openToken = state.push(openTokenName, "section", 1);
    openToken.block = true;
    openToken.map = [startLine, nextLine];
    openToken.meta = meta;
    state.md.block.tokenize(state, contentStartLine, nextLine);
    const closeToken = state.push(closeTokenName, "section", -1);
    closeToken.block = true;
    state.parentType = oldParent;
    state.lineMax = oldLineMax;
    state.line = nextLine + (autoClosed ? 1 : 0);
    return true;
  }
  md.block.ruler.before("fence", "doc_module_block", docModuleBlock, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });
  md.renderer.rules.doc_level_one_block_open = (tokens, idx) => {
    const meta = tokens[idx].meta || { id: "", label: "" };
    return `<section class="doc-level-one-block" data-doc-level-one-id="${escapeHtmlAttribute(meta.id)}" data-doc-level-one-label="${escapeHtmlAttribute(meta.label)}">
`;
  };
  md.renderer.rules.doc_level_two_block_open = (tokens, idx) => {
    const meta = tokens[idx].meta || { id: "", label: "" };
    return `<section class="doc-level-two-block" data-doc-level-two-id="${escapeHtmlAttribute(meta.id)}" data-doc-level-two-label="${escapeHtmlAttribute(meta.label)}">
`;
  };
  md.renderer.rules.doc_level_one_block_close = () => "</section>\n";
  md.renderer.rules.doc_level_two_block_close = () => "</section>\n";
}
var config_default = defineConfig({
  base: docsBase,
  title: "ROSOrin Documentation",
  description: "ROSOrin robot documentation",
  head: [["link", { rel: "icon", href: `${docsBase}favicon.ico` }]],
  ignoreDeadLinks: true,
  transformHtml(code) {
    return prepareHardLazyImages(code);
  },
  vite: {
    assetsInclude: ["**/*.PNG", "**/*.JPG", "**/*.JPEG", "**/*.WEBP", "**/*.BMP", "**/*.ICO", "**/*.SVG", "**/*.MP4", "**/*.MOV", "**/*.AVI", "**/*.WAV", "**/*.MP3", "**/*.emf", "**/*.EMF", "**/*.wmf", "**/*.WMF", "**/*.GIF", "**/*.db"],
    plugins: [
      normalizeImagePathSlashes(),
      normalizeStrongWhitespace(),
      normalizeProblematicStrongEmphasis(),
      preserveBrokenAbsoluteImages(),
      reserveLocalImageDimensions(),
      lazyLoadHtmlImages(),
      {
        name: "ignore-missing-images",
        enforce: "pre",
        resolveId(source, importer) {
          if (!importer) return null;
          const imageExt = /\.(png|jpe?g|gif|webp|bmp|svg|ico|mp4|mov|avi|wav|mp3|emf|wmf|db)$/i;
          if (!imageExt.test(source)) return null;
          const resolvedPath = path2.resolve(path2.dirname(importer), source);
          if (fs2.existsSync(resolvedPath)) return null;
          console.warn(`  [missing-image] Skipping missing image: ${source}`);
          return {
            id: resolvedPath,
            external: false,
            moduleType: "asset"
          };
        },
        load(id) {
          const imageExt = /\.(png|jpe?g|gif|webp|bmp|svg|ico|mp4|mov|avi|wav|mp3|emf|wmf|db)$/i;
          if (!imageExt.test(id)) return null;
          if (fs2.existsSync(id)) return null;
          const placeholderPng = "data:image/svg+xml;base64," + Buffer.from(
            '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" viewBox="0 0 1 1"><rect width="1" height="1" fill="rgba(0,0,0,0)"/></svg>'
          ).toString("base64");
          return `export default "${placeholderPng}"`;
        }
      }
    ]
  },
  markdown: {
    image: {
      lazyLoading: true
    },
    math: true,
    config: (md) => {
      md.use(docModuleBlockPlugin);
      md.use(mathjax3);
    }
  },
  themeConfig: {
    siteTitle: false,
    logo: "/e-logo.png",
    outline: [2, 3],
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "Search",
            buttonAriaLabel: "Search"
          },
          modal: {
            searchBox: {
              resetButtonTitle: "Clear search query",
              resetButtonAriaLabel: "Clear search query",
              cancelButtonText: "Cancel",
              cancelButtonAriaLabel: "Cancel"
            },
            startScreen: {
              recentSearchTitle: "Recent Searches",
              noRecentSearchText: "No recent searches",
              suggestedQueryTitle: "Suggested Queries"
            },
            noResultsScreen: {
              noResultsText: "No results found for",
              suggestedQueryText: "You can try searching for",
              reportMissingResultsText: "Have any queries?",
              reportMissingResultsLinkText: "Report here"
            },
            footer: {
              selectText: "to select",
              navigateText: "to navigate",
              closeText: "to close"
            }
          }
        }
      }
    },
    nav: [
      {
        text: "Version",
        items: [
          { text: "Jetson Orin Nano Version", link: "/projects/ROSOrin/en/jetson-orin-nano-version/" },
          { text: "Jetson Nano Version", link: "/projects/ROSOrin/en/jetson-nano-version/" },
          { text: "Raspberry Pi Version", link: "/projects/ROSOrin/en/raspberry-pi-version/" }
        ]
      },
      { text: "Home", link: "https://www.hiwonder.net/", target: "_self" }
    ],
    sidebar: getSidebar()
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy8udml0ZXByZXNzL2F1dG9TaWRlYmFyLm10cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXHBocHN0dWR5X3Byb1xcXFxXV1dcXFxcZ2l0aHVwXFxcXEpldHNvbiBTZXJpZXNcXFxcUk9TT3Jpbi12aXRlXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxccGhwc3R1ZHlfcHJvXFxcXFdXV1xcXFxnaXRodXBcXFxcSmV0c29uIFNlcmllc1xcXFxST1NPcmluLXZpdGVcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3BocHN0dWR5X3Byby9XV1cvZ2l0aHVwL0pldHNvbiUyMFNlcmllcy9ST1NPcmluLXZpdGUvZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnXG5pbXBvcnQgZnMgZnJvbSAnbm9kZTpmcydcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGdldFNpZGViYXIgfSBmcm9tICcuL2F1dG9TaWRlYmFyLm10cydcbmltcG9ydCBtYXRoamF4MyBmcm9tICdtYXJrZG93bi1pdC1tYXRoamF4MydcblxuY29uc3QgcHJvYmxlbWF0aWNTdHJvbmdFbmRpbmdQYXR0ZXJuID0gL1tcdUZGMUFcdUZGMUJcdUZGMENcdTMwMDJcdUZGMDFcdUZGMUZcdTMwMDFcdUZGMDhcdUZGMDlcdTMwMTBcdTMwMTFcdTMwMEFcdTMwMEJcdTMwMENcdTMwMERcdTMwMEVcdTMwMEZcdTIwMUNcdTIwMURcdTIwMThcdTIwMTlcdTIwMjZdJC91XG5jb25zdCBwcm9ibGVtYXRpY1N0cm9uZ09wZW5pbmdQYXR0ZXJuID0gL15bXHVGRjA4KF1bXipcXG5dKz9bXHVGRjA5KV0kL3VcbmNvbnN0IHN0cm9uZ1doaXRlc3BhY2VQYXR0ZXJuID0gL1xcKlxcKihbXipcXG5dKylcXCpcXCovZ1xuY29uc3QgaW5saW5lQ29kZVBhdHRlcm4gPSAvKGArW15gXSpgKykvZ1xuY29uc3QgZmVuY2VQYXR0ZXJuID0gL15cXHMqKGBgYCt8fn5+KykvXG5jb25zdCBsYXp5SW1hZ2VQbGFjZWhvbGRlciA9XG4gICdkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSUyMmh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJTIyIHdpZHRoPSUyMjE2JTIyIGhlaWdodD0lMjI5JTIyIHZpZXdCb3g9JTIyMCAwIDE2IDklMjIlM0UlM0Mvc3ZnJTNFJ1xuY29uc3QgaW1hZ2VEaW1lbnNpb25DYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH0gfCBudWxsPigpXG5jb25zdCBkb2NzQmFzZSA9IG5vcm1hbGl6ZUJhc2UocHJvY2Vzcy5lbnYuRE9DU19CQVNFIHx8ICcvcHJvamVjdHMvUk9TT3Jpbi9lbi9qZXRzb24tb3Jpbi1uYW5vLXZlcnNpb24vJylcbmNvbnN0IGN1cnJlbnRWZXJzaW9uID0gcHJvY2Vzcy5lbnYuRE9DU19WRVJTSU9OIHx8ICdqZXRzb24tb3Jpbi1uYW5vLXZlcnNpb24nXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUJhc2UodmFsdWU6IHN0cmluZykge1xuICByZXR1cm4gYC8ke3ZhbHVlLnJlcGxhY2UoL15cXC8rfFxcLyskL2csICcnKX0vYFxufVxuXG5mdW5jdGlvbiByZXBsYWNlT3V0c2lkZUlubGluZUNvZGUobGluZTogc3RyaW5nLCByZXBsYWNlcjogKHNlZ21lbnQ6IHN0cmluZykgPT4gc3RyaW5nKSB7XG4gIHJldHVybiBsaW5lXG4gICAgLnNwbGl0KGlubGluZUNvZGVQYXR0ZXJuKVxuICAgIC5tYXAoKHNlZ21lbnQpID0+IChzZWdtZW50LnN0YXJ0c1dpdGgoJ2AnKSA/IHNlZ21lbnQgOiByZXBsYWNlcihzZWdtZW50KSkpXG4gICAgLmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVN0cm9uZ1BhaXJzKHNlZ21lbnQ6IHN0cmluZykge1xuICBsZXQgbm9ybWFsaXplZCA9ICcnXG4gIGxldCBjdXJzb3IgPSAwXG5cbiAgd2hpbGUgKGN1cnNvciA8IHNlZ21lbnQubGVuZ3RoKSB7XG4gICAgY29uc3Qgb3BlbmluZ01hcmtlciA9IHNlZ21lbnQuaW5kZXhPZignKionLCBjdXJzb3IpXG5cbiAgICBpZiAob3BlbmluZ01hcmtlciA9PT0gLTEpIHtcbiAgICAgIG5vcm1hbGl6ZWQgKz0gc2VnbWVudC5zbGljZShjdXJzb3IpXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGNvbnN0IGNsb3NpbmdNYXJrZXIgPSBzZWdtZW50LmluZGV4T2YoJyoqJywgb3BlbmluZ01hcmtlciArIDIpXG5cbiAgICBpZiAoY2xvc2luZ01hcmtlciA9PT0gLTEpIHtcbiAgICAgIG5vcm1hbGl6ZWQgKz0gc2VnbWVudC5zbGljZShjdXJzb3IpXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRlbnQgPSBzZWdtZW50LnNsaWNlKG9wZW5pbmdNYXJrZXIgKyAyLCBjbG9zaW5nTWFya2VyKVxuICAgIGNvbnN0IHByZXZpb3VzQ2hhciA9IG9wZW5pbmdNYXJrZXIgPiAwID8gc2VnbWVudFtvcGVuaW5nTWFya2VyIC0gMV0gOiAnJ1xuICAgIGNvbnN0IG5leHRDaGFyID0gY2xvc2luZ01hcmtlciArIDIgPCBzZWdtZW50Lmxlbmd0aCA/IHNlZ21lbnRbY2xvc2luZ01hcmtlciArIDJdIDogJydcbiAgICBjb25zdCBuZWVkc09wZW5pbmdGaXggPVxuICAgICAgQm9vbGVhbihwcmV2aW91c0NoYXIpICYmIC9cXFMvdS50ZXN0KHByZXZpb3VzQ2hhcikgJiYgcHJvYmxlbWF0aWNTdHJvbmdPcGVuaW5nUGF0dGVybi50ZXN0KGNvbnRlbnQpXG4gICAgY29uc3QgbmVlZHNFbmRpbmdGaXggPVxuICAgICAgQm9vbGVhbihuZXh0Q2hhcikgJiYgL1xcUy91LnRlc3QobmV4dENoYXIpICYmIHByb2JsZW1hdGljU3Ryb25nRW5kaW5nUGF0dGVybi50ZXN0KGNvbnRlbnQpXG5cbiAgICBub3JtYWxpemVkICs9IHNlZ21lbnQuc2xpY2UoY3Vyc29yLCBvcGVuaW5nTWFya2VyKVxuICAgIG5vcm1hbGl6ZWQgKz0gbmVlZHNPcGVuaW5nRml4IHx8IG5lZWRzRW5kaW5nRml4ID8gYDxzdHJvbmc+JHtjb250ZW50fTwvc3Ryb25nPmAgOiBgKioke2NvbnRlbnR9KipgXG4gICAgY3Vyc29yID0gY2xvc2luZ01hcmtlciArIDJcbiAgfVxuXG4gIHJldHVybiBub3JtYWxpemVkXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVByb2JsZW1hdGljU3Ryb25nU3ludGF4KGNvZGU6IHN0cmluZykge1xuICBsZXQgaW5GZW5jZSA9IGZhbHNlXG4gIGxldCBhY3RpdmVGZW5jZU1hcmtlciA9ICcnXG5cbiAgcmV0dXJuIGNvZGVcbiAgICAuc3BsaXQoJ1xcbicpXG4gICAgLm1hcCgobGluZSkgPT4ge1xuICAgICAgY29uc3QgdHJpbW1lZCA9IGxpbmUudHJpbVN0YXJ0KClcbiAgICAgIGNvbnN0IGZlbmNlTWF0Y2ggPSB0cmltbWVkLm1hdGNoKGZlbmNlUGF0dGVybilcblxuICAgICAgaWYgKGZlbmNlTWF0Y2gpIHtcbiAgICAgICAgY29uc3QgbWFya2VyID0gZmVuY2VNYXRjaFsxXVxuICAgICAgICBpZiAoIWluRmVuY2UpIHtcbiAgICAgICAgICBpbkZlbmNlID0gdHJ1ZVxuICAgICAgICAgIGFjdGl2ZUZlbmNlTWFya2VyID0gbWFya2VyXG4gICAgICAgIH0gZWxzZSBpZiAobWFya2VyWzBdID09PSBhY3RpdmVGZW5jZU1hcmtlclswXSAmJiBtYXJrZXIubGVuZ3RoID49IGFjdGl2ZUZlbmNlTWFya2VyLmxlbmd0aCkge1xuICAgICAgICAgIGluRmVuY2UgPSBmYWxzZVxuICAgICAgICAgIGFjdGl2ZUZlbmNlTWFya2VyID0gJydcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGluZVxuICAgICAgfVxuXG4gICAgICBpZiAoaW5GZW5jZSkge1xuICAgICAgICByZXR1cm4gbGluZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVwbGFjZU91dHNpZGVJbmxpbmVDb2RlKGxpbmUsIChzZWdtZW50KSA9PiB7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVTdHJvbmdQYWlycyhzZWdtZW50KVxuICAgICAgfSlcbiAgICB9KVxuICAgIC5qb2luKCdcXG4nKVxufVxuXG5mdW5jdGlvbiB0cmltV2hpdGVzcGFjZUluc2lkZVN0cm9uZyhjb2RlOiBzdHJpbmcpIHtcbiAgbGV0IGluRmVuY2UgPSBmYWxzZVxuICBsZXQgYWN0aXZlRmVuY2VNYXJrZXIgPSAnJ1xuXG4gIHJldHVybiBjb2RlXG4gICAgLnNwbGl0KCdcXG4nKVxuICAgIC5tYXAoKGxpbmUpID0+IHtcbiAgICAgIGNvbnN0IHRyaW1tZWQgPSBsaW5lLnRyaW1TdGFydCgpXG4gICAgICBjb25zdCBmZW5jZU1hdGNoID0gdHJpbW1lZC5tYXRjaChmZW5jZVBhdHRlcm4pXG5cbiAgICAgIGlmIChmZW5jZU1hdGNoKSB7XG4gICAgICAgIGNvbnN0IG1hcmtlciA9IGZlbmNlTWF0Y2hbMV1cbiAgICAgICAgaWYgKCFpbkZlbmNlKSB7XG4gICAgICAgICAgaW5GZW5jZSA9IHRydWVcbiAgICAgICAgICBhY3RpdmVGZW5jZU1hcmtlciA9IG1hcmtlclxuICAgICAgICB9IGVsc2UgaWYgKG1hcmtlclswXSA9PT0gYWN0aXZlRmVuY2VNYXJrZXJbMF0gJiYgbWFya2VyLmxlbmd0aCA+PSBhY3RpdmVGZW5jZU1hcmtlci5sZW5ndGgpIHtcbiAgICAgICAgICBpbkZlbmNlID0gZmFsc2VcbiAgICAgICAgICBhY3RpdmVGZW5jZU1hcmtlciA9ICcnXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpbmVcbiAgICAgIH1cblxuICAgICAgaWYgKGluRmVuY2UgfHwgbGluZS5pbmNsdWRlcygnfCcpKSB7XG4gICAgICAgIHJldHVybiBsaW5lXG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXBsYWNlT3V0c2lkZUlubGluZUNvZGUobGluZSwgKHNlZ21lbnQpID0+XG4gICAgICAgIHNlZ21lbnQucmVwbGFjZShzdHJvbmdXaGl0ZXNwYWNlUGF0dGVybiwgKG1hdGNoLCBjb250ZW50OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBub3JtYWxpemVkID0gY29udGVudC50cmltKClcbiAgICAgICAgICBpZiAoIW5vcm1hbGl6ZWQgfHwgbm9ybWFsaXplZCA9PT0gY29udGVudCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBgKioke25vcm1hbGl6ZWR9KipgXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfSlcbiAgICAuam9pbignXFxuJylcbn1cblxuXG5mdW5jdGlvbiBwcmVzZXJ2ZUJyb2tlbkFic29sdXRlSW1hZ2VzKCkge1xuICBjb25zdCBpbWFnZVRhZ1BhdHRlcm4gPSAvPGltZ1xcYltePl0qXFxic3JjPVwiKFtBLVphLXpdOlxcXFxbXlwiXSspXCJbXj5dKlxcLz8+L2dcblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdwcmVzZXJ2ZS1icm9rZW4tYWJzb2x1dGUtaW1hZ2VzJyxcbiAgICBlbmZvcmNlOiAncHJlJyBhcyBjb25zdCxcbiAgICB0cmFuc2Zvcm0oY29kZTogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgICBpZiAoIWlkLmVuZHNXaXRoKCcubWQnKSB8fCAhaW1hZ2VUYWdQYXR0ZXJuLnRlc3QoY29kZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cblxuICAgICAgaW1hZ2VUYWdQYXR0ZXJuLmxhc3RJbmRleCA9IDBcbiAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0gY29kZS5yZXBsYWNlKGltYWdlVGFnUGF0dGVybiwgKHRhZykgPT4gYHske3RhZy5zbGljZSgxLCAtMSl9fWApXG4gICAgICByZXR1cm4gdHJhbnNmb3JtZWQgPT09IGNvZGUgPyBudWxsIDogdHJhbnNmb3JtZWRcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplSW1hZ2VQYXRoU2xhc2hlcygpIHtcbiAgY29uc3QgaW1nU3JjUGF0dGVybiA9IC8oPGltZ1xcYltePl0qXFxic3JjPVwiKShbXlwiXSspKFwiW14+XSo+KS9naVxuICBjb25zdCBtZEltZ1BhdHRlcm4gPSAvKCFcXFtbXlxcXV0qXFxdXFwoKShbXildKykoXFwpKS9nXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnbm9ybWFsaXplLWltYWdlLXBhdGgtc2xhc2hlcycsXG4gICAgZW5mb3JjZTogJ3ByZScgYXMgY29uc3QsXG4gICAgdHJhbnNmb3JtKGNvZGU6IHN0cmluZywgaWQ6IHN0cmluZykge1xuICAgICAgaWYgKCFpZC5lbmRzV2l0aCgnLm1kJykgfHwgKCFjb2RlLmluY2x1ZGVzKCc8aW1nJykgJiYgIWNvZGUuaW5jbHVkZXMoJyFbJykpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG5cbiAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2VcblxuICAgICAgY29uc3QgZml4U2xhc2hlcyA9IChwYXRoOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKCFwYXRoIHx8IHBhdGguc3RhcnRzV2l0aCgnaHR0cDovLycpIHx8IHBhdGguc3RhcnRzV2l0aCgnaHR0cHM6Ly8nKSB8fCBwYXRoLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgICAgICByZXR1cm4gcGF0aFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpeGVkID0gcGF0aC5yZXBsYWNlKC9cXFxcL2csICcvJylcbiAgICAgICAgaWYgKGZpeGVkICE9PSBwYXRoKSBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgICByZXR1cm4gZml4ZWRcbiAgICAgIH1cblxuICAgICAgY29uc3QgdHJhbnNmb3JtZWQgPSBjb2RlXG4gICAgICAgIC5yZXBsYWNlKGltZ1NyY1BhdHRlcm4sIChtYXRjaCwgcHJlZml4LCBzcmMsIHN1ZmZpeCkgPT4gYCR7cHJlZml4fSR7Zml4U2xhc2hlcyhzcmMpfSR7c3VmZml4fWApXG4gICAgICAgIC5yZXBsYWNlKG1kSW1nUGF0dGVybiwgKG1hdGNoLCBwcmVmaXgsIHNyYywgc3VmZml4KSA9PiBgJHtwcmVmaXh9JHtmaXhTbGFzaGVzKHNyYyl9JHtzdWZmaXh9YClcblxuICAgICAgcmV0dXJuIGNoYW5nZWQgPyB0cmFuc2Zvcm1lZCA6IG51bGxcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkTmF0aXZlTGF6eUxvYWRpbmdUb0ltYWdlcyhjb2RlOiBzdHJpbmcpIHtcbiAgY29uc3QgaW1hZ2VUYWdQYXR0ZXJuID0gLzxpbWdcXGJbXj5dKj4vZ1xuXG4gIHJldHVybiBjb2RlLnJlcGxhY2UoaW1hZ2VUYWdQYXR0ZXJuLCAodGFnKSA9PiB7XG4gICAgaWYgKC9cXGJsb2FkaW5nXFxzKj0vLnRlc3QodGFnKSkge1xuICAgICAgcmV0dXJuIHRhZ1xuICAgIH1cblxuICAgIHJldHVybiB0YWcucmVwbGFjZSgnPGltZycsICc8aW1nIGxvYWRpbmc9XCJsYXp5XCInKVxuICB9KVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVQcm9ibGVtYXRpY1N0cm9uZ0VtcGhhc2lzKCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdub3JtYWxpemUtcHJvYmxlbWF0aWMtc3Ryb25nLWVtcGhhc2lzJyxcbiAgICBlbmZvcmNlOiAncHJlJyBhcyBjb25zdCxcbiAgICB0cmFuc2Zvcm0oY29kZTogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgICBpZiAoIWlkLmVuZHNXaXRoKCcubWQnKSB8fCAhY29kZS5pbmNsdWRlcygnKionKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IG5vcm1hbGl6ZVByb2JsZW1hdGljU3Ryb25nU3ludGF4KGNvZGUpXG4gICAgICByZXR1cm4gdHJhbnNmb3JtZWQgPT09IGNvZGUgPyBudWxsIDogdHJhbnNmb3JtZWRcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplU3Ryb25nV2hpdGVzcGFjZSgpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnbm9ybWFsaXplLXN0cm9uZy13aGl0ZXNwYWNlJyxcbiAgICBlbmZvcmNlOiAncHJlJyBhcyBjb25zdCxcbiAgICB0cmFuc2Zvcm0oY29kZTogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgICBpZiAoIWlkLmVuZHNXaXRoKCcubWQnKSB8fCAhc3Ryb25nV2hpdGVzcGFjZVBhdHRlcm4udGVzdChjb2RlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBzdHJvbmdXaGl0ZXNwYWNlUGF0dGVybi5sYXN0SW5kZXggPSAwXG4gICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IHRyaW1XaGl0ZXNwYWNlSW5zaWRlU3Ryb25nKGNvZGUpXG4gICAgICByZXR1cm4gdHJhbnNmb3JtZWQgPT09IGNvZGUgPyBudWxsIDogdHJhbnNmb3JtZWRcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbGF6eUxvYWRIdG1sSW1hZ2VzKCkge1xuICBjb25zdCBpbWFnZVRhZ1BhdHRlcm4gPSAvPGltZ1xcYltePl0qPi9pXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnbGF6eS1sb2FkLWh0bWwtaW1hZ2VzJyxcbiAgICBlbmZvcmNlOiAncHJlJyBhcyBjb25zdCxcbiAgICB0cmFuc2Zvcm0oY29kZTogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgICBpZiAoIWlkLmVuZHNXaXRoKCcubWQnKSB8fCAhaW1hZ2VUYWdQYXR0ZXJuLnRlc3QoY29kZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cblxuICAgICAgY29uc3QgdHJhbnNmb3JtZWQgPSBhZGROYXRpdmVMYXp5TG9hZGluZ1RvSW1hZ2VzKGNvZGUpXG4gICAgICByZXR1cm4gdHJhbnNmb3JtZWQgPT09IGNvZGUgPyBudWxsIDogdHJhbnNmb3JtZWRcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0SHRtbEF0dHJpYnV0ZSh0YWc6IHN0cmluZywgYXR0cmlidXRlTmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGF0dHJpYnV0ZVBhdHRlcm4gPSBuZXcgUmVnRXhwKGBcXFxccyR7YXR0cmlidXRlTmFtZX1cXFxccyo9XFxcXHMqKFtcIiddKSguKj8pXFxcXDFgLCAnaScpXG4gIGNvbnN0IGF0dHJpYnV0ZU1hdGNoID0gdGFnLm1hdGNoKGF0dHJpYnV0ZVBhdHRlcm4pXG4gIHJldHVybiBhdHRyaWJ1dGVNYXRjaD8uWzJdIHx8ICcnXG59XG5cbmZ1bmN0aW9uIGdldE51bWVyaWNIdG1sQXR0cmlidXRlKHRhZzogc3RyaW5nLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgcmF3VmFsdWUgPSBnZXRIdG1sQXR0cmlidXRlKHRhZywgYXR0cmlidXRlTmFtZSlcbiAgaWYgKCEvXlxcZCsoPzpcXC5cXGQrKT8kLy50ZXN0KHJhd1ZhbHVlKSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBjb25zdCB2YWx1ZSA9IE51bWJlcihyYXdWYWx1ZSlcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkgJiYgdmFsdWUgPiAwID8gdmFsdWUgOiBudWxsXG59XG5cbmZ1bmN0aW9uIHJlYWRQbmdEaW1lbnNpb25zKGJ1ZmZlcjogQnVmZmVyKSB7XG4gIGlmIChcbiAgICBidWZmZXIubGVuZ3RoIDwgMjQgfHxcbiAgICBidWZmZXIudG9TdHJpbmcoJ2JpbmFyeScsIDAsIDgpICE9PSAnXFx4ODlQTkdcXHJcXG5cXHgxQVxcbicgfHxcbiAgICBidWZmZXIudG9TdHJpbmcoJ2FzY2lpJywgMTIsIDE2KSAhPT0gJ0lIRFInXG4gICkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdpZHRoOiBidWZmZXIucmVhZFVJbnQzMkJFKDE2KSxcbiAgICBoZWlnaHQ6IGJ1ZmZlci5yZWFkVUludDMyQkUoMjApXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVhZEdpZkRpbWVuc2lvbnMoYnVmZmVyOiBCdWZmZXIpIHtcbiAgY29uc3Qgc2lnbmF0dXJlID0gYnVmZmVyLnRvU3RyaW5nKCdhc2NpaScsIDAsIDYpXG4gIGlmIChidWZmZXIubGVuZ3RoIDwgMTAgfHwgKHNpZ25hdHVyZSAhPT0gJ0dJRjg3YScgJiYgc2lnbmF0dXJlICE9PSAnR0lGODlhJykpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogYnVmZmVyLnJlYWRVSW50MTZMRSg2KSxcbiAgICBoZWlnaHQ6IGJ1ZmZlci5yZWFkVUludDE2TEUoOClcbiAgfVxufVxuXG5mdW5jdGlvbiByZWFkSnBlZ0RpbWVuc2lvbnMoYnVmZmVyOiBCdWZmZXIpIHtcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPCA0IHx8IGJ1ZmZlclswXSAhPT0gMHhmZiB8fCBidWZmZXJbMV0gIT09IDB4ZDgpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgbGV0IG9mZnNldCA9IDJcbiAgY29uc3Qgc3RhcnRPZkZyYW1lTWFya2VycyA9IG5ldyBTZXQoWzB4YzAsIDB4YzEsIDB4YzIsIDB4YzMsIDB4YzUsIDB4YzYsIDB4YzcsIDB4YzksIDB4Y2EsIDB4Y2IsIDB4Y2QsIDB4Y2UsIDB4Y2ZdKVxuXG4gIHdoaWxlIChvZmZzZXQgKyAzIDwgYnVmZmVyLmxlbmd0aCkge1xuICAgIHdoaWxlIChvZmZzZXQgPCBidWZmZXIubGVuZ3RoICYmIGJ1ZmZlcltvZmZzZXRdICE9PSAweGZmKSB7XG4gICAgICBvZmZzZXQgKz0gMVxuICAgIH1cbiAgICB3aGlsZSAob2Zmc2V0IDwgYnVmZmVyLmxlbmd0aCAmJiBidWZmZXJbb2Zmc2V0XSA9PT0gMHhmZikge1xuICAgICAgb2Zmc2V0ICs9IDFcbiAgICB9XG4gICAgaWYgKG9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGNvbnN0IG1hcmtlciA9IGJ1ZmZlcltvZmZzZXRdXG4gICAgb2Zmc2V0ICs9IDFcbiAgICBpZiAobWFya2VyID09PSAweGQ4IHx8IG1hcmtlciA9PT0gMHhkOSkge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgaWYgKG9mZnNldCArIDEgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjb25zdCBzZWdtZW50TGVuZ3RoID0gYnVmZmVyLnJlYWRVSW50MTZCRShvZmZzZXQpXG4gICAgaWYgKHNlZ21lbnRMZW5ndGggPCAyIHx8IG9mZnNldCArIHNlZ21lbnRMZW5ndGggPiBidWZmZXIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAoc3RhcnRPZkZyYW1lTWFya2Vycy5oYXMobWFya2VyKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiBidWZmZXIucmVhZFVJbnQxNkJFKG9mZnNldCArIDUpLFxuICAgICAgaGVpZ2h0OiBidWZmZXIucmVhZFVJbnQxNkJFKG9mZnNldCArIDMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgb2Zmc2V0ICs9IHNlZ21lbnRMZW5ndGhcbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIHJlYWRXZWJwRGltZW5zaW9ucyhidWZmZXI6IEJ1ZmZlcikge1xuICBpZiAoYnVmZmVyLmxlbmd0aCA8IDMwIHx8IGJ1ZmZlci50b1N0cmluZygnYXNjaWknLCAwLCA0KSAhPT0gJ1JJRkYnIHx8IGJ1ZmZlci50b1N0cmluZygnYXNjaWknLCA4LCAxMikgIT09ICdXRUJQJykge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBjb25zdCBjaHVua1R5cGUgPSBidWZmZXIudG9TdHJpbmcoJ2FzY2lpJywgMTIsIDE2KVxuICBpZiAoY2h1bmtUeXBlID09PSAnVlA4WCcgJiYgYnVmZmVyLmxlbmd0aCA+PSAzMCkge1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogMSArIGJ1ZmZlci5yZWFkVUludExFKDI0LCAzKSxcbiAgICAgIGhlaWdodDogMSArIGJ1ZmZlci5yZWFkVUludExFKDI3LCAzKVxuICAgIH1cbiAgfVxuICBpZiAoY2h1bmtUeXBlID09PSAnVlA4TCcgJiYgYnVmZmVyLmxlbmd0aCA+PSAyNSAmJiBidWZmZXJbMjBdID09PSAweDJmKSB7XG4gICAgY29uc3QgYjAgPSBidWZmZXJbMjFdXG4gICAgY29uc3QgYjEgPSBidWZmZXJbMjJdXG4gICAgY29uc3QgYjIgPSBidWZmZXJbMjNdXG4gICAgY29uc3QgYjMgPSBidWZmZXJbMjRdXG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiAxICsgKCgoYjEgJiAweDNmKSA8PCA4KSB8IGIwKSxcbiAgICAgIGhlaWdodDogMSArICgoKGIzICYgMHgwZikgPDwgMTApIHwgKGIyIDw8IDIpIHwgKChiMSAmIDB4YzApID4+IDYpKVxuICAgIH1cbiAgfVxuICBpZiAoY2h1bmtUeXBlID09PSAnVlA4ICcgJiYgYnVmZmVyLmxlbmd0aCA+PSAzMCAmJiBidWZmZXJbMjNdID09PSAweDlkICYmIGJ1ZmZlclsyNF0gPT09IDB4MDEgJiYgYnVmZmVyWzI1XSA9PT0gMHgyYSkge1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogYnVmZmVyLnJlYWRVSW50MTZMRSgyNikgJiAweDNmZmYsXG4gICAgICBoZWlnaHQ6IGJ1ZmZlci5yZWFkVUludDE2TEUoMjgpICYgMHgzZmZmXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGxcbn1cblxuZnVuY3Rpb24gcmVhZEltYWdlRGltZW5zaW9ucyhpbWFnZVBhdGg6IHN0cmluZykge1xuICBjb25zdCBjYWNoZWREaW1lbnNpb25zID0gaW1hZ2VEaW1lbnNpb25DYWNoZS5nZXQoaW1hZ2VQYXRoKVxuICBpZiAoaW1hZ2VEaW1lbnNpb25DYWNoZS5oYXMoaW1hZ2VQYXRoKSkge1xuICAgIHJldHVybiBjYWNoZWREaW1lbnNpb25zXG4gIH1cblxuICBsZXQgZGltZW5zaW9uczogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9IHwgbnVsbCA9IG51bGxcblxuICB0cnkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhpbWFnZVBhdGgpXG4gICAgY29uc3QgZXh0ID0gcGF0aC5leHRuYW1lKGltYWdlUGF0aCkudG9Mb3dlckNhc2UoKVxuICAgIGlmIChleHQgPT09ICcucG5nJykge1xuICAgICAgZGltZW5zaW9ucyA9IHJlYWRQbmdEaW1lbnNpb25zKGJ1ZmZlcilcbiAgICB9IGVsc2UgaWYgKGV4dCA9PT0gJy5qcGcnIHx8IGV4dCA9PT0gJy5qcGVnJykge1xuICAgICAgZGltZW5zaW9ucyA9IHJlYWRKcGVnRGltZW5zaW9ucyhidWZmZXIpXG4gICAgfSBlbHNlIGlmIChleHQgPT09ICcuZ2lmJykge1xuICAgICAgZGltZW5zaW9ucyA9IHJlYWRHaWZEaW1lbnNpb25zKGJ1ZmZlcilcbiAgICB9IGVsc2UgaWYgKGV4dCA9PT0gJy53ZWJwJykge1xuICAgICAgZGltZW5zaW9ucyA9IHJlYWRXZWJwRGltZW5zaW9ucyhidWZmZXIpXG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICBkaW1lbnNpb25zID0gbnVsbFxuICB9XG5cbiAgaWYgKCFkaW1lbnNpb25zIHx8IGRpbWVuc2lvbnMud2lkdGggPD0gMCB8fCBkaW1lbnNpb25zLmhlaWdodCA8PSAwKSB7XG4gICAgZGltZW5zaW9ucyA9IG51bGxcbiAgfVxuXG4gIGltYWdlRGltZW5zaW9uQ2FjaGUuc2V0KGltYWdlUGF0aCwgZGltZW5zaW9ucylcbiAgcmV0dXJuIGRpbWVuc2lvbnNcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUxvY2FsSW1hZ2VQYXRoKG1hcmtkb3duSWQ6IHN0cmluZywgc3JjOiBzdHJpbmcpIHtcbiAgaWYgKCFzcmMgfHwgL14oPzpodHRwcz86fGRhdGE6fCN8XFwvKS9pLnRlc3Qoc3JjKSB8fCAvXltBLVphLXpdOltcXFxcL10vLnRlc3Qoc3JjKSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBsZXQgY2xlYW5TcmMgPSBzcmNcbiAgdHJ5IHtcbiAgICBjbGVhblNyYyA9IGRlY29kZVVSSUNvbXBvbmVudChzcmMpXG4gIH0gY2F0Y2gge1xuICAgIGNsZWFuU3JjID0gc3JjXG4gIH1cblxuICBjbGVhblNyYyA9IGNsZWFuU3JjLnJlcGxhY2UoL1xcXFwvZywgJy8nKS5zcGxpdCgvWz8jXS8sIDEpWzBdXG4gIHJldHVybiBwYXRoLnJlc29sdmUocGF0aC5kaXJuYW1lKG1hcmtkb3duSWQpLCBjbGVhblNyYylcbn1cblxuZnVuY3Rpb24gYWRkSW1hZ2VEaW1lbnNpb25zVG9UYWcodGFnOiBzdHJpbmcsIG1hcmtkb3duSWQ6IHN0cmluZykge1xuICBpZiAoaGFzQXR0cmlidXRlKHRhZywgJ3dpZHRoJykgJiYgaGFzQXR0cmlidXRlKHRhZywgJ2hlaWdodCcpKSB7XG4gICAgcmV0dXJuIHRhZ1xuICB9XG5cbiAgY29uc3Qgc3JjID0gZ2V0SHRtbEF0dHJpYnV0ZSh0YWcsICdzcmMnKSB8fCBnZXRIdG1sQXR0cmlidXRlKHRhZywgJ2RhdGEtbGF6eS1zcmMnKVxuICBjb25zdCBpbWFnZVBhdGggPSByZXNvbHZlTG9jYWxJbWFnZVBhdGgobWFya2Rvd25JZCwgc3JjKVxuICBpZiAoIWltYWdlUGF0aCkge1xuICAgIHJldHVybiB0YWdcbiAgfVxuXG4gIGNvbnN0IGRpbWVuc2lvbnMgPSByZWFkSW1hZ2VEaW1lbnNpb25zKGltYWdlUGF0aClcbiAgaWYgKCFkaW1lbnNpb25zKSB7XG4gICAgcmV0dXJuIHRhZ1xuICB9XG5cbiAgY29uc3QgY3VycmVudFdpZHRoID0gZ2V0TnVtZXJpY0h0bWxBdHRyaWJ1dGUodGFnLCAnd2lkdGgnKVxuICBjb25zdCBjdXJyZW50SGVpZ2h0ID0gZ2V0TnVtZXJpY0h0bWxBdHRyaWJ1dGUodGFnLCAnaGVpZ2h0JylcbiAgbGV0IHdpZHRoID0gZGltZW5zaW9ucy53aWR0aFxuICBsZXQgaGVpZ2h0ID0gZGltZW5zaW9ucy5oZWlnaHRcblxuICBpZiAoY3VycmVudFdpZHRoICYmICFjdXJyZW50SGVpZ2h0KSB7XG4gICAgd2lkdGggPSBjdXJyZW50V2lkdGhcbiAgICBoZWlnaHQgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKChjdXJyZW50V2lkdGggKiBkaW1lbnNpb25zLmhlaWdodCkgLyBkaW1lbnNpb25zLndpZHRoKSlcbiAgfSBlbHNlIGlmICghY3VycmVudFdpZHRoICYmIGN1cnJlbnRIZWlnaHQpIHtcbiAgICBoZWlnaHQgPSBjdXJyZW50SGVpZ2h0XG4gICAgd2lkdGggPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKChjdXJyZW50SGVpZ2h0ICogZGltZW5zaW9ucy53aWR0aCkgLyBkaW1lbnNpb25zLmhlaWdodCkpXG4gIH1cblxuICBsZXQgcHJlcGFyZWRUYWcgPSB0YWdcbiAgaWYgKCFoYXNBdHRyaWJ1dGUocHJlcGFyZWRUYWcsICd3aWR0aCcpKSB7XG4gICAgcHJlcGFyZWRUYWcgPSBwcmVwYXJlZFRhZy5yZXBsYWNlKCc8aW1nJywgYDxpbWcgd2lkdGg9XCIke3dpZHRofVwiYClcbiAgfVxuICBpZiAoIWhhc0F0dHJpYnV0ZShwcmVwYXJlZFRhZywgJ2hlaWdodCcpKSB7XG4gICAgcHJlcGFyZWRUYWcgPSBwcmVwYXJlZFRhZy5yZXBsYWNlKCc8aW1nJywgYDxpbWcgaGVpZ2h0PVwiJHtoZWlnaHR9XCJgKVxuICB9XG5cbiAgcmV0dXJuIHByZXBhcmVkVGFnXG59XG5cbmZ1bmN0aW9uIHJlc2VydmVMb2NhbEltYWdlRGltZW5zaW9ucygpIHtcbiAgY29uc3QgaW1hZ2VUYWdQYXR0ZXJuID0gLzxpbWdcXGJbXj5dKj4vZ1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3Jlc2VydmUtbG9jYWwtaW1hZ2UtZGltZW5zaW9ucycsXG4gICAgZW5mb3JjZTogJ3ByZScgYXMgY29uc3QsXG4gICAgdHJhbnNmb3JtKGNvZGU6IHN0cmluZywgaWQ6IHN0cmluZykge1xuICAgICAgaWYgKCFpZC5lbmRzV2l0aCgnLm1kJykgfHwgIWltYWdlVGFnUGF0dGVybi50ZXN0KGNvZGUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG5cbiAgICAgIGltYWdlVGFnUGF0dGVybi5sYXN0SW5kZXggPSAwXG4gICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IGNvZGUucmVwbGFjZShpbWFnZVRhZ1BhdHRlcm4sICh0YWcpID0+IGFkZEltYWdlRGltZW5zaW9uc1RvVGFnKHRhZywgaWQpKVxuICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkID09PSBjb2RlID8gbnVsbCA6IHRyYW5zZm9ybWVkXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhc0F0dHJpYnV0ZSh0YWc6IHN0cmluZywgYXR0cmlidXRlTmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKGBcXFxccyR7YXR0cmlidXRlTmFtZX0oPzpcXFxccyo9fFxcXFxzfD4pYCwgJ2knKS50ZXN0KHRhZylcbn1cblxuZnVuY3Rpb24gYWRkQ2xhc3NOYW1lcyh0YWc6IHN0cmluZywgY2xhc3NOYW1lczogc3RyaW5nW10pIHtcbiAgY29uc3QgY2xhc3NQYXR0ZXJuID0gL1xcc2NsYXNzPShbXCInXSkoLio/KVxcMS9pXG4gIGNvbnN0IGNsYXNzTWF0Y2ggPSB0YWcubWF0Y2goY2xhc3NQYXR0ZXJuKVxuXG4gIGlmICghY2xhc3NNYXRjaCkge1xuICAgIHJldHVybiB0YWcucmVwbGFjZSgnPGltZycsIGA8aW1nIGNsYXNzPVwiJHtjbGFzc05hbWVzLmpvaW4oJyAnKX1cImApXG4gIH1cblxuICBjb25zdCBleGlzdGluZ0NsYXNzTmFtZXMgPSBjbGFzc01hdGNoWzJdLnNwbGl0KC9cXHMrLykuZmlsdGVyKEJvb2xlYW4pXG4gIGNvbnN0IG1lcmdlZENsYXNzTmFtZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLmV4aXN0aW5nQ2xhc3NOYW1lcywgLi4uY2xhc3NOYW1lc10pKVxuICByZXR1cm4gdGFnLnJlcGxhY2UoY2xhc3NQYXR0ZXJuLCBgIGNsYXNzPSR7Y2xhc3NNYXRjaFsxXX0ke21lcmdlZENsYXNzTmFtZXMuam9pbignICcpfSR7Y2xhc3NNYXRjaFsxXX1gKVxufVxuXG5mdW5jdGlvbiBtb3ZlSW1hZ2VBdHRyaWJ1dGUodGFnOiBzdHJpbmcsIGZyb21BdHRyaWJ1dGU6IHN0cmluZywgdG9BdHRyaWJ1dGU6IHN0cmluZykge1xuICBjb25zdCBhdHRyaWJ1dGVQYXR0ZXJuID0gbmV3IFJlZ0V4cChgXFxcXHMke2Zyb21BdHRyaWJ1dGV9PShbXCInXSkoLio/KVxcXFwxYCwgJ2knKVxuICBjb25zdCBhdHRyaWJ1dGVNYXRjaCA9IHRhZy5tYXRjaChhdHRyaWJ1dGVQYXR0ZXJuKVxuXG4gIGlmICghYXR0cmlidXRlTWF0Y2gpIHtcbiAgICByZXR1cm4gdGFnXG4gIH1cblxuICByZXR1cm4gdGFnLnJlcGxhY2UoYXR0cmlidXRlUGF0dGVybiwgYCAke3RvQXR0cmlidXRlfT0ke2F0dHJpYnV0ZU1hdGNoWzFdfSR7YXR0cmlidXRlTWF0Y2hbMl19JHthdHRyaWJ1dGVNYXRjaFsxXX1gKVxufVxuXG5mdW5jdGlvbiBwcmVwYXJlSGFyZExhenlJbWFnZVRhZyh0YWc6IHN0cmluZykge1xuICBpZiAoXG4gICAgIS9cXHNsb2FkaW5nPShbXCInXSlsYXp5XFwxL2kudGVzdCh0YWcpIHx8XG4gICAgaGFzQXR0cmlidXRlKHRhZywgJ2RhdGEtbGF6eS1zcmMnKSB8fFxuICAgIC9cXHNjbGFzcz0oW1wiJ10pW15cIiddKlxcYmlubGluZS1pY29uXFxiW15cIiddKlxcMS9pLnRlc3QodGFnKSB8fFxuICAgIC9cXHNzcmM9KFtcIiddKWRhdGE6aW1hZ2UvaS50ZXN0KHRhZylcbiAgKSB7XG4gICAgcmV0dXJuIHRhZ1xuICB9XG5cbiAgY29uc3Qgc3JjUGF0dGVybiA9IC9cXHNzcmM9KFtcIiddKSguKj8pXFwxL2lcbiAgY29uc3Qgc3JjTWF0Y2ggPSB0YWcubWF0Y2goc3JjUGF0dGVybilcbiAgaWYgKCFzcmNNYXRjaCB8fCAhc3JjTWF0Y2hbMl0pIHtcbiAgICByZXR1cm4gdGFnXG4gIH1cblxuICBsZXQgcHJlcGFyZWRUYWcgPSB0YWdcbiAgcHJlcGFyZWRUYWcgPSBtb3ZlSW1hZ2VBdHRyaWJ1dGUocHJlcGFyZWRUYWcsICdzcmNzZXQnLCAnZGF0YS1sYXp5LXNyY3NldCcpXG4gIHByZXBhcmVkVGFnID0gbW92ZUltYWdlQXR0cmlidXRlKHByZXBhcmVkVGFnLCAnc2l6ZXMnLCAnZGF0YS1sYXp5LXNpemVzJylcbiAgcHJlcGFyZWRUYWcgPSBwcmVwYXJlZFRhZy5yZXBsYWNlKFxuICAgIHNyY1BhdHRlcm4sXG4gICAgYCBzcmM9XCIke2xhenlJbWFnZVBsYWNlaG9sZGVyfVwiIGRhdGEtbGF6eS1zcmM9JHtzcmNNYXRjaFsxXX0ke3NyY01hdGNoWzJdfSR7c3JjTWF0Y2hbMV19YFxuICApXG5cbiAgaWYgKCFoYXNBdHRyaWJ1dGUocHJlcGFyZWRUYWcsICdkZWNvZGluZycpKSB7XG4gICAgcHJlcGFyZWRUYWcgPSBwcmVwYXJlZFRhZy5yZXBsYWNlKCc8aW1nJywgJzxpbWcgZGVjb2Rpbmc9XCJhc3luY1wiJylcbiAgfVxuICBpZiAoIWhhc0F0dHJpYnV0ZShwcmVwYXJlZFRhZywgJ2ZldGNocHJpb3JpdHknKSkge1xuICAgIHByZXBhcmVkVGFnID0gcHJlcGFyZWRUYWcucmVwbGFjZSgnPGltZycsICc8aW1nIGZldGNocHJpb3JpdHk9XCJsb3dcIicpXG4gIH1cbiAgaWYgKCFoYXNBdHRyaWJ1dGUocHJlcGFyZWRUYWcsICdkYXRhLWxhenktaW1hZ2UnKSkge1xuICAgIHByZXBhcmVkVGFnID0gcHJlcGFyZWRUYWcucmVwbGFjZSgnPGltZycsICc8aW1nIGRhdGEtbGF6eS1pbWFnZT1cInRydWVcIicpXG4gIH1cblxuICByZXR1cm4gYWRkQ2xhc3NOYW1lcyhwcmVwYXJlZFRhZywgWyd2cC1sYXp5LWltYWdlJywgJ2lzLXBlbmRpbmcnXSlcbn1cblxuZnVuY3Rpb24gcHJlcGFyZUhhcmRMYXp5SW1hZ2VzKGNvZGU6IHN0cmluZykge1xuICByZXR1cm4gY29kZS5yZXBsYWNlKC88aW1nXFxiW14+XSo+L2csIHByZXBhcmVIYXJkTGF6eUltYWdlVGFnKVxufVxuXG5mdW5jdGlvbiBlc2NhcGVIdG1sQXR0cmlidXRlKHZhbHVlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHZhbHVlXG4gICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7Jylcbn1cblxuZnVuY3Rpb24gc2x1Z0RvY01vZHVsZUxhYmVsKGxhYmVsOiBzdHJpbmcsIGZhbGxiYWNrOiBzdHJpbmcpIHtcbiAgcmV0dXJuIChcbiAgICBsYWJlbFxuICAgICAgLm5vcm1hbGl6ZSgnTkZLRCcpXG4gICAgICAucmVwbGFjZSgvW15cXHB7TGV0dGVyfVxccHtOdW1iZXJ9XSsvZ3UsICctJylcbiAgICAgIC5yZXBsYWNlKC9eLSt8LSskL2csICcnKVxuICAgICAgLnRvTG93ZXJDYXNlKCkgfHwgZmFsbGJhY2tcbiAgKVxufVxuXG5mdW5jdGlvbiBwYXJzZURvY01vZHVsZU1hcmtlcihsaW5lOiBzdHJpbmcpIHtcbiAgY29uc3QgbWFya2VyTWF0Y2ggPSBsaW5lLnRyaW0oKS5tYXRjaCgvXig6ezMsNH0pKD8hOikoLiopJC91KVxuXG4gIGlmICghbWFya2VyTWF0Y2gpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3QgY29sb25Db3VudCA9IG1hcmtlck1hdGNoWzFdLmxlbmd0aFxuICBjb25zdCBpbmZvID0gKG1hcmtlck1hdGNoWzJdIHx8ICcnKS50cmltKClcblxuICByZXR1cm4ge1xuICAgIGxldmVsOiBjb2xvbkNvdW50IC0gMixcbiAgICBpbmZvLFxuICAgIGlzT3BlbjogaW5mby5sZW5ndGggPiAwXG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VEb2NNb2R1bGVNZXRhKHJhd0luZm86IHN0cmluZywgbGV2ZWw6IG51bWJlcikge1xuICBjb25zdCBsYWJlbCA9IHJhd0luZm8udHJpbSgpIHx8IGBVbnRpdGxlZCBsZXZlbCAke2xldmVsfSBibG9ja2BcbiAgcmV0dXJuIHtcbiAgICBpZDogc2x1Z0RvY01vZHVsZUxhYmVsKGxhYmVsLCBgbGV2ZWwtJHtsZXZlbH1gKSxcbiAgICBsYWJlbFxuICB9XG59XG5cbmZ1bmN0aW9uIGRvY01vZHVsZUJsb2NrUGx1Z2luKG1kOiBhbnkpIHtcbiAgZnVuY3Rpb24gZG9jTW9kdWxlQmxvY2soc3RhdGU6IGFueSwgc3RhcnRMaW5lOiBudW1iZXIsIGVuZExpbmU6IG51bWJlciwgc2lsZW50OiBib29sZWFuKSB7XG4gICAgY29uc3Qgc3RhcnQgPSBzdGF0ZS5iTWFya3Nbc3RhcnRMaW5lXSArIHN0YXRlLnRTaGlmdFtzdGFydExpbmVdXG4gICAgY29uc3QgbWF4ID0gc3RhdGUuZU1hcmtzW3N0YXJ0TGluZV1cbiAgICBjb25zdCBmaXJzdExpbmUgPSBzdGF0ZS5zcmMuc2xpY2Uoc3RhcnQsIG1heClcbiAgICBjb25zdCBvcGVuaW5nTWFya2VyID0gcGFyc2VEb2NNb2R1bGVNYXJrZXIoZmlyc3RMaW5lKVxuXG4gICAgaWYgKCFvcGVuaW5nTWFya2VyPy5pc09wZW4pIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChzaWxlbnQpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgbGV0IG5leHRMaW5lID0gc3RhcnRMaW5lXG4gICAgbGV0IGF1dG9DbG9zZWQgPSBmYWxzZVxuICAgIGxldCBkZXB0aCA9IDFcblxuICAgIHdoaWxlIChuZXh0TGluZSArIDEgPCBlbmRMaW5lKSB7XG4gICAgICBuZXh0TGluZSArPSAxXG4gICAgICBjb25zdCBsaW5lU3RhcnQgPSBzdGF0ZS5iTWFya3NbbmV4dExpbmVdICsgc3RhdGUudFNoaWZ0W25leHRMaW5lXVxuICAgICAgY29uc3QgbGluZU1heCA9IHN0YXRlLmVNYXJrc1tuZXh0TGluZV1cbiAgICAgIGNvbnN0IG1hcmtlciA9IHBhcnNlRG9jTW9kdWxlTWFya2VyKHN0YXRlLnNyYy5zbGljZShsaW5lU3RhcnQsIGxpbmVNYXgpKVxuXG4gICAgICBpZiAoIW1hcmtlciB8fCBtYXJrZXIubGV2ZWwgIT09IG9wZW5pbmdNYXJrZXIubGV2ZWwpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgaWYgKG1hcmtlci5pc09wZW4pIHtcbiAgICAgICAgZGVwdGggKz0gMVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBkZXB0aCAtPSAxXG4gICAgICBpZiAoZGVwdGggPT09IDApIHtcbiAgICAgICAgYXV0b0Nsb3NlZCA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY29udGVudFN0YXJ0TGluZSA9IHN0YXJ0TGluZSArIDFcbiAgICBjb25zdCBvbGRQYXJlbnQgPSBzdGF0ZS5wYXJlbnRUeXBlXG4gICAgY29uc3Qgb2xkTGluZU1heCA9IHN0YXRlLmxpbmVNYXhcbiAgICBjb25zdCBtZXRhID0gcGFyc2VEb2NNb2R1bGVNZXRhKG9wZW5pbmdNYXJrZXIuaW5mbywgb3BlbmluZ01hcmtlci5sZXZlbClcbiAgICBjb25zdCBvcGVuVG9rZW5OYW1lID0gb3BlbmluZ01hcmtlci5sZXZlbCA9PT0gMSA/ICdkb2NfbGV2ZWxfb25lX2Jsb2NrX29wZW4nIDogJ2RvY19sZXZlbF90d29fYmxvY2tfb3BlbidcbiAgICBjb25zdCBjbG9zZVRva2VuTmFtZSA9IG9wZW5pbmdNYXJrZXIubGV2ZWwgPT09IDEgPyAnZG9jX2xldmVsX29uZV9ibG9ja19jbG9zZScgOiAnZG9jX2xldmVsX3R3b19ibG9ja19jbG9zZSdcblxuICAgIHN0YXRlLnBhcmVudFR5cGUgPSAnY29udGFpbmVyJ1xuICAgIHN0YXRlLmxpbmVNYXggPSBuZXh0TGluZVxuXG4gICAgY29uc3Qgb3BlblRva2VuID0gc3RhdGUucHVzaChvcGVuVG9rZW5OYW1lLCAnc2VjdGlvbicsIDEpXG4gICAgb3BlblRva2VuLmJsb2NrID0gdHJ1ZVxuICAgIG9wZW5Ub2tlbi5tYXAgPSBbc3RhcnRMaW5lLCBuZXh0TGluZV1cbiAgICBvcGVuVG9rZW4ubWV0YSA9IG1ldGFcblxuICAgIHN0YXRlLm1kLmJsb2NrLnRva2VuaXplKHN0YXRlLCBjb250ZW50U3RhcnRMaW5lLCBuZXh0TGluZSlcblxuICAgIGNvbnN0IGNsb3NlVG9rZW4gPSBzdGF0ZS5wdXNoKGNsb3NlVG9rZW5OYW1lLCAnc2VjdGlvbicsIC0xKVxuICAgIGNsb3NlVG9rZW4uYmxvY2sgPSB0cnVlXG5cbiAgICBzdGF0ZS5wYXJlbnRUeXBlID0gb2xkUGFyZW50XG4gICAgc3RhdGUubGluZU1heCA9IG9sZExpbmVNYXhcbiAgICBzdGF0ZS5saW5lID0gbmV4dExpbmUgKyAoYXV0b0Nsb3NlZCA/IDEgOiAwKVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIG1kLmJsb2NrLnJ1bGVyLmJlZm9yZSgnZmVuY2UnLCAnZG9jX21vZHVsZV9ibG9jaycsIGRvY01vZHVsZUJsb2NrLCB7XG4gICAgYWx0OiBbJ3BhcmFncmFwaCcsICdyZWZlcmVuY2UnLCAnYmxvY2txdW90ZScsICdsaXN0J11cbiAgfSlcblxuICBtZC5yZW5kZXJlci5ydWxlcy5kb2NfbGV2ZWxfb25lX2Jsb2NrX29wZW4gPSAodG9rZW5zOiBhbnlbXSwgaWR4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBtZXRhID0gdG9rZW5zW2lkeF0ubWV0YSB8fCB7IGlkOiAnJywgbGFiZWw6ICcnIH1cbiAgICByZXR1cm4gYDxzZWN0aW9uIGNsYXNzPVwiZG9jLWxldmVsLW9uZS1ibG9ja1wiIGRhdGEtZG9jLWxldmVsLW9uZS1pZD1cIiR7ZXNjYXBlSHRtbEF0dHJpYnV0ZShtZXRhLmlkKX1cIiBkYXRhLWRvYy1sZXZlbC1vbmUtbGFiZWw9XCIke2VzY2FwZUh0bWxBdHRyaWJ1dGUobWV0YS5sYWJlbCl9XCI+XFxuYFxuICB9XG5cbiAgbWQucmVuZGVyZXIucnVsZXMuZG9jX2xldmVsX3R3b19ibG9ja19vcGVuID0gKHRva2VuczogYW55W10sIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgbWV0YSA9IHRva2Vuc1tpZHhdLm1ldGEgfHwgeyBpZDogJycsIGxhYmVsOiAnJyB9XG4gICAgcmV0dXJuIGA8c2VjdGlvbiBjbGFzcz1cImRvYy1sZXZlbC10d28tYmxvY2tcIiBkYXRhLWRvYy1sZXZlbC10d28taWQ9XCIke2VzY2FwZUh0bWxBdHRyaWJ1dGUobWV0YS5pZCl9XCIgZGF0YS1kb2MtbGV2ZWwtdHdvLWxhYmVsPVwiJHtlc2NhcGVIdG1sQXR0cmlidXRlKG1ldGEubGFiZWwpfVwiPlxcbmBcbiAgfVxuXG4gIG1kLnJlbmRlcmVyLnJ1bGVzLmRvY19sZXZlbF9vbmVfYmxvY2tfY2xvc2UgPSAoKSA9PiAnPC9zZWN0aW9uPlxcbidcbiAgbWQucmVuZGVyZXIucnVsZXMuZG9jX2xldmVsX3R3b19ibG9ja19jbG9zZSA9ICgpID0+ICc8L3NlY3Rpb24+XFxuJ1xufVxuXG4vLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiBkb2NzQmFzZSxcbiAgdGl0bGU6ICdST1NPcmluIERvY3VtZW50YXRpb24nLFxuICBkZXNjcmlwdGlvbjogJ1JPU09yaW4gcm9ib3QgZG9jdW1lbnRhdGlvbicsXG4gIGhlYWQ6IFtbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCBocmVmOiBgJHtkb2NzQmFzZX1mYXZpY29uLmljb2AgfV1dLFxuICBpZ25vcmVEZWFkTGlua3M6IHRydWUsXG4gIHRyYW5zZm9ybUh0bWwoY29kZSkge1xuICAgIHJldHVybiBwcmVwYXJlSGFyZExhenlJbWFnZXMoY29kZSlcbiAgfSxcbiAgdml0ZToge1xuICAgIGFzc2V0c0luY2x1ZGU6IFsnKiovKi5QTkcnLCAnKiovKi5KUEcnLCAnKiovKi5KUEVHJywgJyoqLyouV0VCUCcsICcqKi8qLkJNUCcsICcqKi8qLklDTycsICcqKi8qLlNWRycsICcqKi8qLk1QNCcsICcqKi8qLk1PVicsICcqKi8qLkFWSScsICcqKi8qLldBVicsICcqKi8qLk1QMycsICcqKi8qLmVtZicsICcqKi8qLkVNRicsICcqKi8qLndtZicsICcqKi8qLldNRicsICcqKi8qLkdJRicsICcqKi8qLmRiJ10sXG4gICAgcGx1Z2luczogW1xuICAgICAgbm9ybWFsaXplSW1hZ2VQYXRoU2xhc2hlcygpLFxuICAgICAgbm9ybWFsaXplU3Ryb25nV2hpdGVzcGFjZSgpLFxuICAgICAgbm9ybWFsaXplUHJvYmxlbWF0aWNTdHJvbmdFbXBoYXNpcygpLFxuICAgICAgcHJlc2VydmVCcm9rZW5BYnNvbHV0ZUltYWdlcygpLFxuICAgICAgcmVzZXJ2ZUxvY2FsSW1hZ2VEaW1lbnNpb25zKCksXG4gICAgICBsYXp5TG9hZEh0bWxJbWFnZXMoKSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2lnbm9yZS1taXNzaW5nLWltYWdlcycsXG4gICAgICAgIGVuZm9yY2U6ICdwcmUnIGFzIGNvbnN0LFxuICAgICAgICByZXNvbHZlSWQoc291cmNlOiBzdHJpbmcsIGltcG9ydGVyOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoIWltcG9ydGVyKSByZXR1cm4gbnVsbFxuICAgICAgICAgIGNvbnN0IGltYWdlRXh0ID0gL1xcLihwbmd8anBlP2d8Z2lmfHdlYnB8Ym1wfHN2Z3xpY298bXA0fG1vdnxhdml8d2F2fG1wM3xlbWZ8d21mfGRiKSQvaVxuICAgICAgICAgIGlmICghaW1hZ2VFeHQudGVzdChzb3VyY2UpKSByZXR1cm4gbnVsbFxuICAgICAgICAgIGNvbnN0IHJlc29sdmVkUGF0aCA9IHBhdGgucmVzb2x2ZShwYXRoLmRpcm5hbWUoaW1wb3J0ZXIpLCBzb3VyY2UpXG4gICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocmVzb2x2ZWRQYXRoKSkgcmV0dXJuIG51bGxcbiAgICAgICAgICBjb25zb2xlLndhcm4oYCAgW21pc3NpbmctaW1hZ2VdIFNraXBwaW5nIG1pc3NpbmcgaW1hZ2U6ICR7c291cmNlfWApXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiByZXNvbHZlZFBhdGgsXG4gICAgICAgICAgICBleHRlcm5hbDogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVUeXBlOiAnYXNzZXQnXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsb2FkKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgICBjb25zdCBpbWFnZUV4dCA9IC9cXC4ocG5nfGpwZT9nfGdpZnx3ZWJwfGJtcHxzdmd8aWNvfG1wNHxtb3Z8YXZpfHdhdnxtcDN8ZW1mfHdtZnxkYikkL2lcbiAgICAgICAgICBpZiAoIWltYWdlRXh0LnRlc3QoaWQpKSByZXR1cm4gbnVsbFxuICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGlkKSkgcmV0dXJuIG51bGxcbiAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlclBuZyA9XG4gICAgICAgICAgICAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCwnICtcbiAgICAgICAgICAgIEJ1ZmZlci5mcm9tKFxuICAgICAgICAgICAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxXCIgaGVpZ2h0PVwiMVwiIHZpZXdCb3g9XCIwIDAgMSAxXCI+PHJlY3Qgd2lkdGg9XCIxXCIgaGVpZ2h0PVwiMVwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIvPjwvc3ZnPidcbiAgICAgICAgICAgICkudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gICAgICAgICAgcmV0dXJuIGBleHBvcnQgZGVmYXVsdCBcIiR7cGxhY2Vob2xkZXJQbmd9XCJgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIG1hcmtkb3duOiB7XG4gICAgaW1hZ2U6IHtcbiAgICAgIGxhenlMb2FkaW5nOiB0cnVlXG4gICAgfSxcbiAgICBtYXRoOiB0cnVlLFxuICAgIGNvbmZpZzogKG1kKSA9PiB7XG4gICAgICBtZC51c2UoZG9jTW9kdWxlQmxvY2tQbHVnaW4pXG4gICAgICBtZC51c2UobWF0aGpheDMpXG4gICAgfVxuICB9LFxuICB0aGVtZUNvbmZpZzoge1xuICAgIHNpdGVUaXRsZTogZmFsc2UsXG4gICAgbG9nbzogJy9lLWxvZ28ucG5nJyxcbiAgICBvdXRsaW5lOiBbMiwgM10sXG4gICAgc2VhcmNoOiB7XG4gICAgICBwcm92aWRlcjogJ2xvY2FsJyxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgdHJhbnNsYXRpb25zOiB7XG4gICAgICAgICAgYnV0dG9uOiB7XG4gICAgICAgICAgICBidXR0b25UZXh0OiAnU2VhcmNoJyxcbiAgICAgICAgICAgIGJ1dHRvbkFyaWFMYWJlbDogJ1NlYXJjaCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1vZGFsOiB7XG4gICAgICAgICAgICBzZWFyY2hCb3g6IHtcbiAgICAgICAgICAgICAgcmVzZXRCdXR0b25UaXRsZTogJ0NsZWFyIHNlYXJjaCBxdWVyeScsXG4gICAgICAgICAgICAgIHJlc2V0QnV0dG9uQXJpYUxhYmVsOiAnQ2xlYXIgc2VhcmNoIHF1ZXJ5JyxcbiAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbCcsXG4gICAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkFyaWFMYWJlbDogJ0NhbmNlbCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGFydFNjcmVlbjoge1xuICAgICAgICAgICAgICByZWNlbnRTZWFyY2hUaXRsZTogJ1JlY2VudCBTZWFyY2hlcycsXG4gICAgICAgICAgICAgIG5vUmVjZW50U2VhcmNoVGV4dDogJ05vIHJlY2VudCBzZWFyY2hlcycsXG4gICAgICAgICAgICAgIHN1Z2dlc3RlZFF1ZXJ5VGl0bGU6ICdTdWdnZXN0ZWQgUXVlcmllcydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub1Jlc3VsdHNTY3JlZW46IHtcbiAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogJ05vIHJlc3VsdHMgZm91bmQgZm9yJyxcbiAgICAgICAgICAgICAgc3VnZ2VzdGVkUXVlcnlUZXh0OiAnWW91IGNhbiB0cnkgc2VhcmNoaW5nIGZvcicsXG4gICAgICAgICAgICAgIHJlcG9ydE1pc3NpbmdSZXN1bHRzVGV4dDogJ0hhdmUgYW55IHF1ZXJpZXM/JyxcbiAgICAgICAgICAgICAgcmVwb3J0TWlzc2luZ1Jlc3VsdHNMaW5rVGV4dDogJ1JlcG9ydCBoZXJlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICBzZWxlY3RUZXh0OiAndG8gc2VsZWN0JyxcbiAgICAgICAgICAgICAgbmF2aWdhdGVUZXh0OiAndG8gbmF2aWdhdGUnLFxuICAgICAgICAgICAgICBjbG9zZVRleHQ6ICd0byBjbG9zZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIG5hdjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnVmVyc2lvbicsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnSmV0c29uIE9yaW4gTmFubyBWZXJzaW9uJywgbGluazogJy9wcm9qZWN0cy9ST1NPcmluL2VuL2pldHNvbi1vcmluLW5hbm8tdmVyc2lvbi8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnSmV0c29uIE5hbm8gVmVyc2lvbicsIGxpbms6ICcvcHJvamVjdHMvUk9TT3Jpbi9lbi9qZXRzb24tbmFuby12ZXJzaW9uLycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdSYXNwYmVycnkgUGkgVmVyc2lvbicsIGxpbms6ICcvcHJvamVjdHMvUk9TT3Jpbi9lbi9yYXNwYmVycnktcGktdmVyc2lvbi8nIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHsgdGV4dDogJ0hvbWUnLCBsaW5rOiAnaHR0cHM6Ly93d3cuaGl3b25kZXIubmV0LycsIHRhcmdldDogJ19zZWxmJyB9XG4gICAgXSxcbiAgICBzaWRlYmFyOiBnZXRTaWRlYmFyKClcbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxccGhwc3R1ZHlfcHJvXFxcXFdXV1xcXFxnaXRodXBcXFxcSmV0c29uIFNlcmllc1xcXFxST1NPcmluLXZpdGVcXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxwaHBzdHVkeV9wcm9cXFxcV1dXXFxcXGdpdGh1cFxcXFxKZXRzb24gU2VyaWVzXFxcXFJPU09yaW4tdml0ZVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcYXV0b1NpZGViYXIubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9waHBzdHVkeV9wcm8vV1dXL2dpdGh1cC9KZXRzb24lMjBTZXJpZXMvUk9TT3Jpbi12aXRlL2RvY3MvLnZpdGVwcmVzcy9hdXRvU2lkZWJhci5tdHNcIjtpbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5jb25zdCByQ29udHJvbCA9IC9bXFx1MDAwMC1cXHUwMDFmXS9nXG5jb25zdCByU3BlY2lhbCA9IC9bXFxzfmAhQCMkJV4mKigpXFwtXys9W1xcXXt9fFxcXFw7OlwiJ1x1MjAxQ1x1MjAxRFx1MjAxOFx1MjAxOTw+XHVGRjBDXHUzMDAyXHVGRjAxXHVGRjFGXHUzMDAxXHVGRjFCXHVGRjFBXHVGRjA4XHVGRjA5XHUzMDBBXHUzMDBCXHUzMDEwXHUzMDExLC4/L10rL2dcbmNvbnN0IHJDb21iaW5pbmcgPSAvW1xcdTAzMDAtXFx1MDM2Rl0vZ1xuXG4vLyBcdTk1MUFcdTcwQjlcdTc1MUZcdTYyMTBcdTg5QzRcdTUyMTlcdUZGMUFcdTc2RjRcdTYzQTVcdTVCRjlcdTlGNTAgVml0ZVByZXNzIFx1NTNGM1x1NEZBN1x1NzZFRVx1NUY1NVx1NzY4NCBzbHVnIFx1OTAzQlx1OEY5MVx1MzAwMlxuZnVuY3Rpb24gZ2VuZXJhdGVBbmNob3IodGV4dDogc3RyaW5nKSB7XG4gIHJldHVybiB0ZXh0XG4gICAgLm5vcm1hbGl6ZSgnTkZLRCcpXG4gICAgLnJlcGxhY2UockNvbWJpbmluZywgJycpXG4gICAgLnJlcGxhY2UockNvbnRyb2wsICcnKVxuICAgIC5yZXBsYWNlKHJTcGVjaWFsLCAnLScpXG4gICAgLnJlcGxhY2UoLy17Mix9L2csICctJylcbiAgICAucmVwbGFjZSgvXi0rfC0rJC9nLCAnJylcbiAgICAucmVwbGFjZSgvXihcXGQpLywgJ18kMScpXG4gICAgLnRvTG93ZXJDYXNlKClcbn1cblxuZnVuY3Rpb24gY2xlYW5TaWRlYmFyVGV4dCh0ZXh0OiBzdHJpbmcpIHtcbiAgcmV0dXJuIHRleHRcbiAgICAucmVwbGFjZSgvXFwqXFwqKFteKlxcbl0rPylcXCpcXCovZywgJyQxJylcbiAgICAucmVwbGFjZSgvX18oW15fXFxuXSs/KV9fL2csICckMScpXG4gICAgLnJlcGxhY2UoLzxcXC8/c3Ryb25nPi9naSwgJycpXG4gICAgLnJlcGxhY2UoLzxcXC8/Yj4vZ2ksICcnKVxuICAgIC50cmltKClcbn1cblxuZnVuY3Rpb24gaXNMb2NrZWRQcmV2aWV3UGFnZShjb250ZW50OiBzdHJpbmcpIHtcbiAgcmV0dXJuIC88IS0tXFxzKnByZXZpZXctbG9ja2VkXFxzKi0tPi9pLnRlc3QoY29udGVudClcbn1cblxuZnVuY3Rpb24gYnVpbGRQYWdlTGluayhuYW1lOiBzdHJpbmcsIGFuY2hvcj86IHN0cmluZykge1xuICBjb25zdCBwYWdlUGF0aCA9IGAvZG9jcy8ke25hbWV9Lmh0bWxgXG4gIGNvbnN0IGZ1bGxQYXRoID0gYW5jaG9yID8gYCR7cGFnZVBhdGh9IyR7YW5jaG9yfWAgOiBwYWdlUGF0aFxuICByZXR1cm4gZW5jb2RlVVJJKGZ1bGxQYXRoKVxufVxuXG5mdW5jdGlvbiBnZXRNYXJrZG93blN0ZW0oZmlsZW5hbWU6IHN0cmluZykge1xuICByZXR1cm4gZmlsZW5hbWUucmVwbGFjZSgvXFwubWQkL2ksICcnKVxufVxuXG5mdW5jdGlvbiBpc0FwcGVuZGl4U3RlbShzdGVtOiBzdHJpbmcpIHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHN0ZW0udHJpbSgpLnRvTG93ZXJDYXNlKClcbiAgcmV0dXJuIG5vcm1hbGl6ZWQgPT09ICdhcHBlbmRpeCcgfHwgbm9ybWFsaXplZC5zdGFydHNXaXRoKCdhcHBlbmRpeC4nKVxufVxuXG5mdW5jdGlvbiBidWlsZFNpZGViYXJTb3J0S2V5KGZpbGVuYW1lOiBzdHJpbmcpOiBbbnVtYmVyLCBudW1iZXJbXSwgc3RyaW5nXSB7XG4gIGNvbnN0IHN0ZW0gPSBnZXRNYXJrZG93blN0ZW0oZmlsZW5hbWUpXG4gIGlmIChpc0FwcGVuZGl4U3RlbShzdGVtKSkge1xuICAgIHJldHVybiBbMiwgW10sIHN0ZW0udG9Mb3dlckNhc2UoKV1cbiAgfVxuXG4gIGNvbnN0IG1hdGNoID0gc3RlbS5tYXRjaCgvXihcXGQrKD86XFwuXFxkKykqKS8pXG4gIGlmIChtYXRjaCkge1xuICAgIHJldHVybiBbMCwgbWF0Y2hbMV0uc3BsaXQoJy4nKS5tYXAocGFydCA9PiBwYXJzZUludChwYXJ0LCAxMCkpLCBzdGVtLnRvTG93ZXJDYXNlKCldXG4gIH1cblxuICByZXR1cm4gWzEsIFtdLCBzdGVtLnRvTG93ZXJDYXNlKCldXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaWRlYmFyKCkge1xuICBjb25zdCBwYWdlRGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL2RvY3MnKVxuICBpZiAoIWZzLmV4aXN0c1N5bmMocGFnZURpcikpIHJldHVybiBbXVxuXG4gIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMocGFnZURpcikuZmlsdGVyKGYgPT4ge1xuICAgIHJldHVybiBmLmVuZHNXaXRoKCcubWQnKSAmJiBmLnRvTG93ZXJDYXNlKCkgIT09ICdpbmRleC5tZCdcbiAgfSlcblxuICAvLyBcdTYzOTJcdTVFOEZcdTg5QzRcdTUyMTlcdTU0OENcdTY3ODRcdTVFRkFcdTgxMUFcdTY3MkNcdTRGRERcdTYzMDFcdTRFMDBcdTgxRjRcdUZGMUFcdTY1NzBcdTVCNTdcdTdBRTBcdTgyODJcdTU3MjhcdTUyNERcdUZGMENcdTY2NkVcdTkwMUFcdTY1RTBcdTdGMTZcdTUzRjdcdTk4NzVcdTU3MjhcdTRFMkRcdTk1RjRcdUZGMENcdTk2NDRcdTVGNTVcdTZDMzhcdThGRENcdTU3MjhcdTY3MDBcdTU0MEVcdTMwMDJcbiAgZmlsZXMuc29ydCgoYSwgYikgPT4ge1xuICAgIGNvbnN0IFtncm91cEEsIHBhcnRzQSwgc3RlbUFdID0gYnVpbGRTaWRlYmFyU29ydEtleShhKVxuICAgIGNvbnN0IFtncm91cEIsIHBhcnRzQiwgc3RlbUJdID0gYnVpbGRTaWRlYmFyU29ydEtleShiKVxuXG4gICAgaWYgKGdyb3VwQSAhPT0gZ3JvdXBCKSB7XG4gICAgICByZXR1cm4gZ3JvdXBBIC0gZ3JvdXBCXG4gICAgfVxuXG4gICAgaWYgKGdyb3VwQSA9PT0gMCkge1xuICAgICAgY29uc3QgbWF4TGVuZ3RoID0gTWF0aC5tYXgocGFydHNBLmxlbmd0aCwgcGFydHNCLmxlbmd0aClcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdmFsdWVBID0gcGFydHNBW2ldID8/IC0xXG4gICAgICAgIGNvbnN0IHZhbHVlQiA9IHBhcnRzQltpXSA/PyAtMVxuICAgICAgICBpZiAodmFsdWVBICE9PSB2YWx1ZUIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVBIC0gdmFsdWVCXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RlbUEubG9jYWxlQ29tcGFyZShzdGVtQiwgJ2VuJylcbiAgfSlcblxuICBjb25zdCBzaWRlYmFyOiBhbnlbXSA9IFtdXG5cbiAgLy8gXHU5MDREXHU1Mzg2XHU2QkNGXHU0RTJBIE1hcmtkb3duIFx1NjU4N1x1NEVGNlx1NzUxRlx1NjIxMFx1NEZBN1x1OEZCOVx1NjgwRlx1MzAwMlxuICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICBjb25zdCBuYW1lID0gZmlsZS5yZXBsYWNlKC9cXC5tZCQvLCAnJylcbiAgICBjb25zdCBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihwYWdlRGlyLCBmaWxlKSwgJ3V0Zi04JylcbiAgICBjb25zdCBsb2NrZWRQcmV2aWV3UGFnZSA9IGlzTG9ja2VkUHJldmlld1BhZ2UoY29udGVudClcblxuICAgIC8vIFx1NjMwOVx1ODg0Q1x1ODlFM1x1Njc5MFx1NjgwN1x1OTg5OFx1RkYwQ1x1OERGM1x1OEZDN1x1NEVFM1x1NzgwMVx1NTc1N1x1NTE4NVx1NzY4NFx1NEYyQVx1NjgwN1x1OTg5OFx1MzAwMlxuICAgIGNvbnN0IGxpbmVzID0gY29udGVudC5zcGxpdCgnXFxuJylcbiAgICBjb25zdCBpdGVtczogYW55W10gPSBbXVxuICAgIGxldCBwYWdlVGl0bGUgPSAnJ1xuICAgIGxldCBpbkNvZGVCbG9jayA9IGZhbHNlXG5cbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXMpIHtcbiAgICAgIGNvbnN0IHRyaW1tZWRMaW5lID0gbGluZS50cmltKClcblxuICAgICAgaWYgKHRyaW1tZWRMaW5lLnN0YXJ0c1dpdGgoJ2BgYCcpKSB7XG4gICAgICAgIGluQ29kZUJsb2NrID0gIWluQ29kZUJsb2NrXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGlmICghaW5Db2RlQmxvY2spIHtcbiAgICAgICAgY29uc3QgaDFNYXRjaCA9IHRyaW1tZWRMaW5lLm1hdGNoKC9eI1xccysoLispJC8pXG4gICAgICAgIGlmIChoMU1hdGNoICYmICFwYWdlVGl0bGUpIHtcbiAgICAgICAgICBwYWdlVGl0bGUgPSBjbGVhblNpZGViYXJUZXh0KGgxTWF0Y2hbMV0udHJpbSgpKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXRjaCA9IHRyaW1tZWRMaW5lLm1hdGNoKC9eIyNcXHMrKC4rKSQvKVxuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICBjb25zdCByYXdUaXRsZSA9IG1hdGNoWzFdLnRyaW0oKVxuICAgICAgICAgIGNvbnN0IHRpdGxlID0gY2xlYW5TaWRlYmFyVGV4dChyYXdUaXRsZSlcbiAgICAgICAgICBjb25zdCBhbmNob3IgPSBnZW5lcmF0ZUFuY2hvcihyYXdUaXRsZSlcbiAgICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIHRleHQ6IHRpdGxlLFxuICAgICAgICAgICAgbGluazogYnVpbGRQYWdlTGluayhuYW1lLCBhbmNob3IpLFxuICAgICAgICAgICAgY2xhc3M6IGxvY2tlZFByZXZpZXdQYWdlID8gJ2lzLXByZXZpZXctbG9ja2VkJyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2lkZWJhci5wdXNoKHtcbiAgICAgIHRleHQ6IHBhZ2VUaXRsZSB8fCBuYW1lLFxuICAgICAgbGluazogYnVpbGRQYWdlTGluayhuYW1lKSxcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICBjbGFzczogbG9ja2VkUHJldmlld1BhZ2UgPyAnaXMtcHJldmlldy1sb2NrZWQnIDogdW5kZWZpbmVkLFxuICAgICAgaXRlbXM6IGl0ZW1zLFxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gc2lkZWJhclxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyWSxTQUFTLG9CQUFvQjtBQUN4YSxPQUFPQSxTQUFRO0FBQ2YsT0FBT0MsV0FBVTs7O0FDRm9ZLE9BQU8sUUFBUTtBQUNwYSxPQUFPLFVBQVU7QUFEakIsSUFBTSxtQ0FBbUM7QUFHekMsSUFBTSxXQUFXO0FBQ2pCLElBQU0sV0FBVztBQUNqQixJQUFNLGFBQWE7QUFHbkIsU0FBUyxlQUFlLE1BQWM7QUFDcEMsU0FBTyxLQUNKLFVBQVUsTUFBTSxFQUNoQixRQUFRLFlBQVksRUFBRSxFQUN0QixRQUFRLFVBQVUsRUFBRSxFQUNwQixRQUFRLFVBQVUsR0FBRyxFQUNyQixRQUFRLFVBQVUsR0FBRyxFQUNyQixRQUFRLFlBQVksRUFBRSxFQUN0QixRQUFRLFNBQVMsS0FBSyxFQUN0QixZQUFZO0FBQ2pCO0FBRUEsU0FBUyxpQkFBaUIsTUFBYztBQUN0QyxTQUFPLEtBQ0osUUFBUSx1QkFBdUIsSUFBSSxFQUNuQyxRQUFRLG1CQUFtQixJQUFJLEVBQy9CLFFBQVEsaUJBQWlCLEVBQUUsRUFDM0IsUUFBUSxZQUFZLEVBQUUsRUFDdEIsS0FBSztBQUNWO0FBRUEsU0FBUyxvQkFBb0IsU0FBaUI7QUFDNUMsU0FBTywrQkFBK0IsS0FBSyxPQUFPO0FBQ3BEO0FBRUEsU0FBUyxjQUFjLE1BQWMsUUFBaUI7QUFDcEQsUUFBTSxXQUFXLFNBQVMsSUFBSTtBQUM5QixRQUFNLFdBQVcsU0FBUyxHQUFHLFFBQVEsSUFBSSxNQUFNLEtBQUs7QUFDcEQsU0FBTyxVQUFVLFFBQVE7QUFDM0I7QUFFQSxTQUFTLGdCQUFnQixVQUFrQjtBQUN6QyxTQUFPLFNBQVMsUUFBUSxVQUFVLEVBQUU7QUFDdEM7QUFFQSxTQUFTLGVBQWUsTUFBYztBQUNwQyxRQUFNLGFBQWEsS0FBSyxLQUFLLEVBQUUsWUFBWTtBQUMzQyxTQUFPLGVBQWUsY0FBYyxXQUFXLFdBQVcsV0FBVztBQUN2RTtBQUVBLFNBQVMsb0JBQW9CLFVBQThDO0FBQ3pFLFFBQU0sT0FBTyxnQkFBZ0IsUUFBUTtBQUNyQyxNQUFJLGVBQWUsSUFBSSxHQUFHO0FBQ3hCLFdBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLFlBQVksQ0FBQztBQUFBLEVBQ25DO0FBRUEsUUFBTSxRQUFRLEtBQUssTUFBTSxrQkFBa0I7QUFDM0MsTUFBSSxPQUFPO0FBQ1QsV0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsSUFBSSxVQUFRLFNBQVMsTUFBTSxFQUFFLENBQUMsR0FBRyxLQUFLLFlBQVksQ0FBQztBQUFBLEVBQ3BGO0FBRUEsU0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUFDO0FBQ25DO0FBRU8sU0FBUyxhQUFhO0FBQzNCLFFBQU0sVUFBVSxLQUFLLFFBQVEsa0NBQVcsU0FBUztBQUNqRCxNQUFJLENBQUMsR0FBRyxXQUFXLE9BQU8sRUFBRyxRQUFPLENBQUM7QUFFckMsUUFBTSxRQUFRLEdBQUcsWUFBWSxPQUFPLEVBQUUsT0FBTyxPQUFLO0FBQ2hELFdBQU8sRUFBRSxTQUFTLEtBQUssS0FBSyxFQUFFLFlBQVksTUFBTTtBQUFBLEVBQ2xELENBQUM7QUFHRCxRQUFNLEtBQUssQ0FBQyxHQUFHLE1BQU07QUFDbkIsVUFBTSxDQUFDLFFBQVEsUUFBUSxLQUFLLElBQUksb0JBQW9CLENBQUM7QUFDckQsVUFBTSxDQUFDLFFBQVEsUUFBUSxLQUFLLElBQUksb0JBQW9CLENBQUM7QUFFckQsUUFBSSxXQUFXLFFBQVE7QUFDckIsYUFBTyxTQUFTO0FBQUEsSUFDbEI7QUFFQSxRQUFJLFdBQVcsR0FBRztBQUNoQixZQUFNLFlBQVksS0FBSyxJQUFJLE9BQU8sUUFBUSxPQUFPLE1BQU07QUFDdkQsZUFBUyxJQUFJLEdBQUcsSUFBSSxXQUFXLEtBQUs7QUFDbEMsY0FBTSxTQUFTLE9BQU8sQ0FBQyxLQUFLO0FBQzVCLGNBQU0sU0FBUyxPQUFPLENBQUMsS0FBSztBQUM1QixZQUFJLFdBQVcsUUFBUTtBQUNyQixpQkFBTyxTQUFTO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLFdBQU8sTUFBTSxjQUFjLE9BQU8sSUFBSTtBQUFBLEVBQ3hDLENBQUM7QUFFRCxRQUFNLFVBQWlCLENBQUM7QUFHeEIsYUFBVyxRQUFRLE9BQU87QUFDeEIsVUFBTSxPQUFPLEtBQUssUUFBUSxTQUFTLEVBQUU7QUFDckMsVUFBTSxVQUFVLEdBQUcsYUFBYSxLQUFLLEtBQUssU0FBUyxJQUFJLEdBQUcsT0FBTztBQUNqRSxVQUFNLG9CQUFvQixvQkFBb0IsT0FBTztBQUdyRCxVQUFNLFFBQVEsUUFBUSxNQUFNLElBQUk7QUFDaEMsVUFBTSxRQUFlLENBQUM7QUFDdEIsUUFBSSxZQUFZO0FBQ2hCLFFBQUksY0FBYztBQUVsQixlQUFXLFFBQVEsT0FBTztBQUN4QixZQUFNLGNBQWMsS0FBSyxLQUFLO0FBRTlCLFVBQUksWUFBWSxXQUFXLEtBQUssR0FBRztBQUNqQyxzQkFBYyxDQUFDO0FBQ2Y7QUFBQSxNQUNGO0FBRUEsVUFBSSxDQUFDLGFBQWE7QUFDaEIsY0FBTSxVQUFVLFlBQVksTUFBTSxZQUFZO0FBQzlDLFlBQUksV0FBVyxDQUFDLFdBQVc7QUFDekIsc0JBQVksaUJBQWlCLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQztBQUM5QztBQUFBLFFBQ0Y7QUFFQSxjQUFNLFFBQVEsWUFBWSxNQUFNLGFBQWE7QUFDN0MsWUFBSSxPQUFPO0FBQ1QsZ0JBQU0sV0FBVyxNQUFNLENBQUMsRUFBRSxLQUFLO0FBQy9CLGdCQUFNLFFBQVEsaUJBQWlCLFFBQVE7QUFDdkMsZ0JBQU0sU0FBUyxlQUFlLFFBQVE7QUFDdEMsZ0JBQU0sS0FBSztBQUFBLFlBQ1QsTUFBTTtBQUFBLFlBQ04sTUFBTSxjQUFjLE1BQU0sTUFBTTtBQUFBLFlBQ2hDLE9BQU8sb0JBQW9CLHNCQUFzQjtBQUFBLFVBQ25ELENBQUM7QUFBQSxRQUNIO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxZQUFRLEtBQUs7QUFBQSxNQUNYLE1BQU0sYUFBYTtBQUFBLE1BQ25CLE1BQU0sY0FBYyxJQUFJO0FBQUEsTUFDeEIsV0FBVztBQUFBLE1BQ1gsT0FBTyxvQkFBb0Isc0JBQXNCO0FBQUEsTUFDakQ7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBRUEsU0FBTztBQUNUOzs7QUQ5SUEsT0FBTyxjQUFjO0FBRXJCLElBQU0saUNBQWlDO0FBQ3ZDLElBQU0sa0NBQWtDO0FBQ3hDLElBQU0sMEJBQTBCO0FBQ2hDLElBQU0sb0JBQW9CO0FBQzFCLElBQU0sZUFBZTtBQUNyQixJQUFNLHVCQUNKO0FBQ0YsSUFBTSxzQkFBc0Isb0JBQUksSUFBc0Q7QUFDdEYsSUFBTSxXQUFXLGNBQWMsUUFBUSxJQUFJLGFBQWEsZ0RBQWdEO0FBQ3hHLElBQU0saUJBQWlCLFFBQVEsSUFBSSxnQkFBZ0I7QUFFbkQsU0FBUyxjQUFjLE9BQWU7QUFDcEMsU0FBTyxJQUFJLE1BQU0sUUFBUSxjQUFjLEVBQUUsQ0FBQztBQUM1QztBQUVBLFNBQVMseUJBQXlCLE1BQWMsVUFBdUM7QUFDckYsU0FBTyxLQUNKLE1BQU0saUJBQWlCLEVBQ3ZCLElBQUksQ0FBQyxZQUFhLFFBQVEsV0FBVyxHQUFHLElBQUksVUFBVSxTQUFTLE9BQU8sQ0FBRSxFQUN4RSxLQUFLLEVBQUU7QUFDWjtBQUVBLFNBQVMscUJBQXFCLFNBQWlCO0FBQzdDLE1BQUksYUFBYTtBQUNqQixNQUFJLFNBQVM7QUFFYixTQUFPLFNBQVMsUUFBUSxRQUFRO0FBQzlCLFVBQU0sZ0JBQWdCLFFBQVEsUUFBUSxNQUFNLE1BQU07QUFFbEQsUUFBSSxrQkFBa0IsSUFBSTtBQUN4QixvQkFBYyxRQUFRLE1BQU0sTUFBTTtBQUNsQztBQUFBLElBQ0Y7QUFFQSxVQUFNLGdCQUFnQixRQUFRLFFBQVEsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3RCxRQUFJLGtCQUFrQixJQUFJO0FBQ3hCLG9CQUFjLFFBQVEsTUFBTSxNQUFNO0FBQ2xDO0FBQUEsSUFDRjtBQUVBLFVBQU0sVUFBVSxRQUFRLE1BQU0sZ0JBQWdCLEdBQUcsYUFBYTtBQUM5RCxVQUFNLGVBQWUsZ0JBQWdCLElBQUksUUFBUSxnQkFBZ0IsQ0FBQyxJQUFJO0FBQ3RFLFVBQU0sV0FBVyxnQkFBZ0IsSUFBSSxRQUFRLFNBQVMsUUFBUSxnQkFBZ0IsQ0FBQyxJQUFJO0FBQ25GLFVBQU0sa0JBQ0osUUFBUSxZQUFZLEtBQUssTUFBTSxLQUFLLFlBQVksS0FBSyxnQ0FBZ0MsS0FBSyxPQUFPO0FBQ25HLFVBQU0saUJBQ0osUUFBUSxRQUFRLEtBQUssTUFBTSxLQUFLLFFBQVEsS0FBSywrQkFBK0IsS0FBSyxPQUFPO0FBRTFGLGtCQUFjLFFBQVEsTUFBTSxRQUFRLGFBQWE7QUFDakQsa0JBQWMsbUJBQW1CLGlCQUFpQixXQUFXLE9BQU8sY0FBYyxLQUFLLE9BQU87QUFDOUYsYUFBUyxnQkFBZ0I7QUFBQSxFQUMzQjtBQUVBLFNBQU87QUFDVDtBQUVBLFNBQVMsaUNBQWlDLE1BQWM7QUFDdEQsTUFBSSxVQUFVO0FBQ2QsTUFBSSxvQkFBb0I7QUFFeEIsU0FBTyxLQUNKLE1BQU0sSUFBSSxFQUNWLElBQUksQ0FBQyxTQUFTO0FBQ2IsVUFBTSxVQUFVLEtBQUssVUFBVTtBQUMvQixVQUFNLGFBQWEsUUFBUSxNQUFNLFlBQVk7QUFFN0MsUUFBSSxZQUFZO0FBQ2QsWUFBTSxTQUFTLFdBQVcsQ0FBQztBQUMzQixVQUFJLENBQUMsU0FBUztBQUNaLGtCQUFVO0FBQ1YsNEJBQW9CO0FBQUEsTUFDdEIsV0FBVyxPQUFPLENBQUMsTUFBTSxrQkFBa0IsQ0FBQyxLQUFLLE9BQU8sVUFBVSxrQkFBa0IsUUFBUTtBQUMxRixrQkFBVTtBQUNWLDRCQUFvQjtBQUFBLE1BQ3RCO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLFNBQVM7QUFDWCxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU8seUJBQXlCLE1BQU0sQ0FBQyxZQUFZO0FBQ2pELGFBQU8scUJBQXFCLE9BQU87QUFBQSxJQUNyQyxDQUFDO0FBQUEsRUFDSCxDQUFDLEVBQ0EsS0FBSyxJQUFJO0FBQ2Q7QUFFQSxTQUFTLDJCQUEyQixNQUFjO0FBQ2hELE1BQUksVUFBVTtBQUNkLE1BQUksb0JBQW9CO0FBRXhCLFNBQU8sS0FDSixNQUFNLElBQUksRUFDVixJQUFJLENBQUMsU0FBUztBQUNiLFVBQU0sVUFBVSxLQUFLLFVBQVU7QUFDL0IsVUFBTSxhQUFhLFFBQVEsTUFBTSxZQUFZO0FBRTdDLFFBQUksWUFBWTtBQUNkLFlBQU0sU0FBUyxXQUFXLENBQUM7QUFDM0IsVUFBSSxDQUFDLFNBQVM7QUFDWixrQkFBVTtBQUNWLDRCQUFvQjtBQUFBLE1BQ3RCLFdBQVcsT0FBTyxDQUFDLE1BQU0sa0JBQWtCLENBQUMsS0FBSyxPQUFPLFVBQVUsa0JBQWtCLFFBQVE7QUFDMUYsa0JBQVU7QUFDViw0QkFBb0I7QUFBQSxNQUN0QjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxXQUFXLEtBQUssU0FBUyxHQUFHLEdBQUc7QUFDakMsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPO0FBQUEsTUFBeUI7QUFBQSxNQUFNLENBQUMsWUFDckMsUUFBUSxRQUFRLHlCQUF5QixDQUFDLE9BQU8sWUFBb0I7QUFDbkUsY0FBTSxhQUFhLFFBQVEsS0FBSztBQUNoQyxZQUFJLENBQUMsY0FBYyxlQUFlLFNBQVM7QUFDekMsaUJBQU87QUFBQSxRQUNUO0FBQ0EsZUFBTyxLQUFLLFVBQVU7QUFBQSxNQUN4QixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0YsQ0FBQyxFQUNBLEtBQUssSUFBSTtBQUNkO0FBR0EsU0FBUywrQkFBK0I7QUFDdEMsUUFBTSxrQkFBa0I7QUFFeEIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsVUFBVSxNQUFjLElBQVk7QUFDbEMsVUFBSSxDQUFDLEdBQUcsU0FBUyxLQUFLLEtBQUssQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLEdBQUc7QUFDdEQsZUFBTztBQUFBLE1BQ1Q7QUFFQSxzQkFBZ0IsWUFBWTtBQUM1QixZQUFNLGNBQWMsS0FBSyxRQUFRLGlCQUFpQixDQUFDLFFBQVEsSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBRztBQUNsRixhQUFPLGdCQUFnQixPQUFPLE9BQU87QUFBQSxJQUN2QztBQUFBLEVBQ0Y7QUFDRjtBQUVBLFNBQVMsNEJBQTRCO0FBQ25DLFFBQU0sZ0JBQWdCO0FBQ3RCLFFBQU0sZUFBZTtBQUVyQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxVQUFVLE1BQWMsSUFBWTtBQUNsQyxVQUFJLENBQUMsR0FBRyxTQUFTLEtBQUssS0FBTSxDQUFDLEtBQUssU0FBUyxNQUFNLEtBQUssQ0FBQyxLQUFLLFNBQVMsSUFBSSxHQUFJO0FBQzNFLGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxVQUFVO0FBRWQsWUFBTSxhQUFhLENBQUNDLFVBQWlCO0FBQ25DLFlBQUksQ0FBQ0EsU0FBUUEsTUFBSyxXQUFXLFNBQVMsS0FBS0EsTUFBSyxXQUFXLFVBQVUsS0FBS0EsTUFBSyxXQUFXLE9BQU8sR0FBRztBQUNsRyxpQkFBT0E7QUFBQSxRQUNUO0FBQ0EsY0FBTSxRQUFRQSxNQUFLLFFBQVEsT0FBTyxHQUFHO0FBQ3JDLFlBQUksVUFBVUEsTUFBTSxXQUFVO0FBQzlCLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxjQUFjLEtBQ2pCLFFBQVEsZUFBZSxDQUFDLE9BQU8sUUFBUSxLQUFLLFdBQVcsR0FBRyxNQUFNLEdBQUcsV0FBVyxHQUFHLENBQUMsR0FBRyxNQUFNLEVBQUUsRUFDN0YsUUFBUSxjQUFjLENBQUMsT0FBTyxRQUFRLEtBQUssV0FBVyxHQUFHLE1BQU0sR0FBRyxXQUFXLEdBQUcsQ0FBQyxHQUFHLE1BQU0sRUFBRTtBQUUvRixhQUFPLFVBQVUsY0FBYztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUNGO0FBRUEsU0FBUyw2QkFBNkIsTUFBYztBQUNsRCxRQUFNLGtCQUFrQjtBQUV4QixTQUFPLEtBQUssUUFBUSxpQkFBaUIsQ0FBQyxRQUFRO0FBQzVDLFFBQUksZ0JBQWdCLEtBQUssR0FBRyxHQUFHO0FBQzdCLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTyxJQUFJLFFBQVEsUUFBUSxxQkFBcUI7QUFBQSxFQUNsRCxDQUFDO0FBQ0g7QUFFQSxTQUFTLHFDQUFxQztBQUM1QyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxVQUFVLE1BQWMsSUFBWTtBQUNsQyxVQUFJLENBQUMsR0FBRyxTQUFTLEtBQUssS0FBSyxDQUFDLEtBQUssU0FBUyxJQUFJLEdBQUc7QUFDL0MsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLGNBQWMsaUNBQWlDLElBQUk7QUFDekQsYUFBTyxnQkFBZ0IsT0FBTyxPQUFPO0FBQUEsSUFDdkM7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxTQUFTLDRCQUE0QjtBQUNuQyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxVQUFVLE1BQWMsSUFBWTtBQUNsQyxVQUFJLENBQUMsR0FBRyxTQUFTLEtBQUssS0FBSyxDQUFDLHdCQUF3QixLQUFLLElBQUksR0FBRztBQUM5RCxlQUFPO0FBQUEsTUFDVDtBQUVBLDhCQUF3QixZQUFZO0FBQ3BDLFlBQU0sY0FBYywyQkFBMkIsSUFBSTtBQUNuRCxhQUFPLGdCQUFnQixPQUFPLE9BQU87QUFBQSxJQUN2QztBQUFBLEVBQ0Y7QUFDRjtBQUVBLFNBQVMscUJBQXFCO0FBQzVCLFFBQU0sa0JBQWtCO0FBRXhCLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULFVBQVUsTUFBYyxJQUFZO0FBQ2xDLFVBQUksQ0FBQyxHQUFHLFNBQVMsS0FBSyxLQUFLLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxHQUFHO0FBQ3RELGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxjQUFjLDZCQUE2QixJQUFJO0FBQ3JELGFBQU8sZ0JBQWdCLE9BQU8sT0FBTztBQUFBLElBQ3ZDO0FBQUEsRUFDRjtBQUNGO0FBRUEsU0FBUyxpQkFBaUIsS0FBYSxlQUF1QjtBQUM1RCxRQUFNLG1CQUFtQixJQUFJLE9BQU8sTUFBTSxhQUFhLDJCQUEyQixHQUFHO0FBQ3JGLFFBQU0saUJBQWlCLElBQUksTUFBTSxnQkFBZ0I7QUFDakQsU0FBTyxpQkFBaUIsQ0FBQyxLQUFLO0FBQ2hDO0FBRUEsU0FBUyx3QkFBd0IsS0FBYSxlQUF1QjtBQUNuRSxRQUFNLFdBQVcsaUJBQWlCLEtBQUssYUFBYTtBQUNwRCxNQUFJLENBQUMsa0JBQWtCLEtBQUssUUFBUSxHQUFHO0FBQ3JDLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxRQUFRLE9BQU8sUUFBUTtBQUM3QixTQUFPLE9BQU8sU0FBUyxLQUFLLEtBQUssUUFBUSxJQUFJLFFBQVE7QUFDdkQ7QUFFQSxTQUFTLGtCQUFrQixRQUFnQjtBQUN6QyxNQUNFLE9BQU8sU0FBUyxNQUNoQixPQUFPLFNBQVMsVUFBVSxHQUFHLENBQUMsTUFBTSxvQkFDcEMsT0FBTyxTQUFTLFNBQVMsSUFBSSxFQUFFLE1BQU0sUUFDckM7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFBQSxJQUNMLE9BQU8sT0FBTyxhQUFhLEVBQUU7QUFBQSxJQUM3QixRQUFRLE9BQU8sYUFBYSxFQUFFO0FBQUEsRUFDaEM7QUFDRjtBQUVBLFNBQVMsa0JBQWtCLFFBQWdCO0FBQ3pDLFFBQU0sWUFBWSxPQUFPLFNBQVMsU0FBUyxHQUFHLENBQUM7QUFDL0MsTUFBSSxPQUFPLFNBQVMsTUFBTyxjQUFjLFlBQVksY0FBYyxVQUFXO0FBQzVFLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTztBQUFBLElBQ0wsT0FBTyxPQUFPLGFBQWEsQ0FBQztBQUFBLElBQzVCLFFBQVEsT0FBTyxhQUFhLENBQUM7QUFBQSxFQUMvQjtBQUNGO0FBRUEsU0FBUyxtQkFBbUIsUUFBZ0I7QUFDMUMsTUFBSSxPQUFPLFNBQVMsS0FBSyxPQUFPLENBQUMsTUFBTSxPQUFRLE9BQU8sQ0FBQyxNQUFNLEtBQU07QUFDakUsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLFNBQVM7QUFDYixRQUFNLHNCQUFzQixvQkFBSSxJQUFJLENBQUMsS0FBTSxLQUFNLEtBQU0sS0FBTSxLQUFNLEtBQU0sS0FBTSxLQUFNLEtBQU0sS0FBTSxLQUFNLEtBQU0sR0FBSSxDQUFDO0FBRWxILFNBQU8sU0FBUyxJQUFJLE9BQU8sUUFBUTtBQUNqQyxXQUFPLFNBQVMsT0FBTyxVQUFVLE9BQU8sTUFBTSxNQUFNLEtBQU07QUFDeEQsZ0JBQVU7QUFBQSxJQUNaO0FBQ0EsV0FBTyxTQUFTLE9BQU8sVUFBVSxPQUFPLE1BQU0sTUFBTSxLQUFNO0FBQ3hELGdCQUFVO0FBQUEsSUFDWjtBQUNBLFFBQUksVUFBVSxPQUFPLFFBQVE7QUFDM0IsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLFNBQVMsT0FBTyxNQUFNO0FBQzVCLGNBQVU7QUFDVixRQUFJLFdBQVcsT0FBUSxXQUFXLEtBQU07QUFDdEM7QUFBQSxJQUNGO0FBQ0EsUUFBSSxTQUFTLEtBQUssT0FBTyxRQUFRO0FBQy9CLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxnQkFBZ0IsT0FBTyxhQUFhLE1BQU07QUFDaEQsUUFBSSxnQkFBZ0IsS0FBSyxTQUFTLGdCQUFnQixPQUFPLFFBQVE7QUFDL0QsYUFBTztBQUFBLElBQ1Q7QUFDQSxRQUFJLG9CQUFvQixJQUFJLE1BQU0sR0FBRztBQUNuQyxhQUFPO0FBQUEsUUFDUCxPQUFPLE9BQU8sYUFBYSxTQUFTLENBQUM7QUFBQSxRQUNyQyxRQUFRLE9BQU8sYUFBYSxTQUFTLENBQUM7QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFFQSxjQUFVO0FBQUEsRUFDWjtBQUVBLFNBQU87QUFDVDtBQUVBLFNBQVMsbUJBQW1CLFFBQWdCO0FBQzFDLE1BQUksT0FBTyxTQUFTLE1BQU0sT0FBTyxTQUFTLFNBQVMsR0FBRyxDQUFDLE1BQU0sVUFBVSxPQUFPLFNBQVMsU0FBUyxHQUFHLEVBQUUsTUFBTSxRQUFRO0FBQ2pILFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxZQUFZLE9BQU8sU0FBUyxTQUFTLElBQUksRUFBRTtBQUNqRCxNQUFJLGNBQWMsVUFBVSxPQUFPLFVBQVUsSUFBSTtBQUMvQyxXQUFPO0FBQUEsTUFDTCxPQUFPLElBQUksT0FBTyxXQUFXLElBQUksQ0FBQztBQUFBLE1BQ2xDLFFBQVEsSUFBSSxPQUFPLFdBQVcsSUFBSSxDQUFDO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBQ0EsTUFBSSxjQUFjLFVBQVUsT0FBTyxVQUFVLE1BQU0sT0FBTyxFQUFFLE1BQU0sSUFBTTtBQUN0RSxVQUFNLEtBQUssT0FBTyxFQUFFO0FBQ3BCLFVBQU0sS0FBSyxPQUFPLEVBQUU7QUFDcEIsVUFBTSxLQUFLLE9BQU8sRUFBRTtBQUNwQixVQUFNLEtBQUssT0FBTyxFQUFFO0FBQ3BCLFdBQU87QUFBQSxNQUNMLE9BQU8sTUFBTyxLQUFLLE9BQVMsSUFBSztBQUFBLE1BQ2pDLFFBQVEsTUFBTyxLQUFLLE9BQVMsS0FBTyxNQUFNLEtBQU8sS0FBSyxRQUFTO0FBQUEsSUFDakU7QUFBQSxFQUNGO0FBQ0EsTUFBSSxjQUFjLFVBQVUsT0FBTyxVQUFVLE1BQU0sT0FBTyxFQUFFLE1BQU0sT0FBUSxPQUFPLEVBQUUsTUFBTSxLQUFRLE9BQU8sRUFBRSxNQUFNLElBQU07QUFDcEgsV0FBTztBQUFBLE1BQ0wsT0FBTyxPQUFPLGFBQWEsRUFBRSxJQUFJO0FBQUEsTUFDakMsUUFBUSxPQUFPLGFBQWEsRUFBRSxJQUFJO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBRUEsU0FBUyxvQkFBb0IsV0FBbUI7QUFDOUMsUUFBTSxtQkFBbUIsb0JBQW9CLElBQUksU0FBUztBQUMxRCxNQUFJLG9CQUFvQixJQUFJLFNBQVMsR0FBRztBQUN0QyxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksYUFBdUQ7QUFFM0QsTUFBSTtBQUNGLFVBQU0sU0FBU0MsSUFBRyxhQUFhLFNBQVM7QUFDeEMsVUFBTSxNQUFNRCxNQUFLLFFBQVEsU0FBUyxFQUFFLFlBQVk7QUFDaEQsUUFBSSxRQUFRLFFBQVE7QUFDbEIsbUJBQWEsa0JBQWtCLE1BQU07QUFBQSxJQUN2QyxXQUFXLFFBQVEsVUFBVSxRQUFRLFNBQVM7QUFDNUMsbUJBQWEsbUJBQW1CLE1BQU07QUFBQSxJQUN4QyxXQUFXLFFBQVEsUUFBUTtBQUN6QixtQkFBYSxrQkFBa0IsTUFBTTtBQUFBLElBQ3ZDLFdBQVcsUUFBUSxTQUFTO0FBQzFCLG1CQUFhLG1CQUFtQixNQUFNO0FBQUEsSUFDeEM7QUFBQSxFQUNGLFFBQVE7QUFDTixpQkFBYTtBQUFBLEVBQ2Y7QUFFQSxNQUFJLENBQUMsY0FBYyxXQUFXLFNBQVMsS0FBSyxXQUFXLFVBQVUsR0FBRztBQUNsRSxpQkFBYTtBQUFBLEVBQ2Y7QUFFQSxzQkFBb0IsSUFBSSxXQUFXLFVBQVU7QUFDN0MsU0FBTztBQUNUO0FBRUEsU0FBUyxzQkFBc0IsWUFBb0IsS0FBYTtBQUM5RCxNQUFJLENBQUMsT0FBTywyQkFBMkIsS0FBSyxHQUFHLEtBQUssa0JBQWtCLEtBQUssR0FBRyxHQUFHO0FBQy9FLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxXQUFXO0FBQ2YsTUFBSTtBQUNGLGVBQVcsbUJBQW1CLEdBQUc7QUFBQSxFQUNuQyxRQUFRO0FBQ04sZUFBVztBQUFBLEVBQ2I7QUFFQSxhQUFXLFNBQVMsUUFBUSxPQUFPLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQyxFQUFFLENBQUM7QUFDMUQsU0FBT0EsTUFBSyxRQUFRQSxNQUFLLFFBQVEsVUFBVSxHQUFHLFFBQVE7QUFDeEQ7QUFFQSxTQUFTLHdCQUF3QixLQUFhLFlBQW9CO0FBQ2hFLE1BQUksYUFBYSxLQUFLLE9BQU8sS0FBSyxhQUFhLEtBQUssUUFBUSxHQUFHO0FBQzdELFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxNQUFNLGlCQUFpQixLQUFLLEtBQUssS0FBSyxpQkFBaUIsS0FBSyxlQUFlO0FBQ2pGLFFBQU0sWUFBWSxzQkFBc0IsWUFBWSxHQUFHO0FBQ3ZELE1BQUksQ0FBQyxXQUFXO0FBQ2QsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGFBQWEsb0JBQW9CLFNBQVM7QUFDaEQsTUFBSSxDQUFDLFlBQVk7QUFDZixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sZUFBZSx3QkFBd0IsS0FBSyxPQUFPO0FBQ3pELFFBQU0sZ0JBQWdCLHdCQUF3QixLQUFLLFFBQVE7QUFDM0QsTUFBSSxRQUFRLFdBQVc7QUFDdkIsTUFBSSxTQUFTLFdBQVc7QUFFeEIsTUFBSSxnQkFBZ0IsQ0FBQyxlQUFlO0FBQ2xDLFlBQVE7QUFDUixhQUFTLEtBQUssSUFBSSxHQUFHLEtBQUssTUFBTyxlQUFlLFdBQVcsU0FBVSxXQUFXLEtBQUssQ0FBQztBQUFBLEVBQ3hGLFdBQVcsQ0FBQyxnQkFBZ0IsZUFBZTtBQUN6QyxhQUFTO0FBQ1QsWUFBUSxLQUFLLElBQUksR0FBRyxLQUFLLE1BQU8sZ0JBQWdCLFdBQVcsUUFBUyxXQUFXLE1BQU0sQ0FBQztBQUFBLEVBQ3hGO0FBRUEsTUFBSSxjQUFjO0FBQ2xCLE1BQUksQ0FBQyxhQUFhLGFBQWEsT0FBTyxHQUFHO0FBQ3ZDLGtCQUFjLFlBQVksUUFBUSxRQUFRLGVBQWUsS0FBSyxHQUFHO0FBQUEsRUFDbkU7QUFDQSxNQUFJLENBQUMsYUFBYSxhQUFhLFFBQVEsR0FBRztBQUN4QyxrQkFBYyxZQUFZLFFBQVEsUUFBUSxnQkFBZ0IsTUFBTSxHQUFHO0FBQUEsRUFDckU7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxTQUFTLDhCQUE4QjtBQUNyQyxRQUFNLGtCQUFrQjtBQUV4QixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxVQUFVLE1BQWMsSUFBWTtBQUNsQyxVQUFJLENBQUMsR0FBRyxTQUFTLEtBQUssS0FBSyxDQUFDLGdCQUFnQixLQUFLLElBQUksR0FBRztBQUN0RCxlQUFPO0FBQUEsTUFDVDtBQUVBLHNCQUFnQixZQUFZO0FBQzVCLFlBQU0sY0FBYyxLQUFLLFFBQVEsaUJBQWlCLENBQUMsUUFBUSx3QkFBd0IsS0FBSyxFQUFFLENBQUM7QUFDM0YsYUFBTyxnQkFBZ0IsT0FBTyxPQUFPO0FBQUEsSUFDdkM7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxTQUFTLGFBQWEsS0FBYSxlQUF1QjtBQUN4RCxTQUFPLElBQUksT0FBTyxNQUFNLGFBQWEsbUJBQW1CLEdBQUcsRUFBRSxLQUFLLEdBQUc7QUFDdkU7QUFFQSxTQUFTLGNBQWMsS0FBYSxZQUFzQjtBQUN4RCxRQUFNLGVBQWU7QUFDckIsUUFBTSxhQUFhLElBQUksTUFBTSxZQUFZO0FBRXpDLE1BQUksQ0FBQyxZQUFZO0FBQ2YsV0FBTyxJQUFJLFFBQVEsUUFBUSxlQUFlLFdBQVcsS0FBSyxHQUFHLENBQUMsR0FBRztBQUFBLEVBQ25FO0FBRUEsUUFBTSxxQkFBcUIsV0FBVyxDQUFDLEVBQUUsTUFBTSxLQUFLLEVBQUUsT0FBTyxPQUFPO0FBQ3BFLFFBQU0sbUJBQW1CLE1BQU0sS0FBSyxvQkFBSSxJQUFJLENBQUMsR0FBRyxvQkFBb0IsR0FBRyxVQUFVLENBQUMsQ0FBQztBQUNuRixTQUFPLElBQUksUUFBUSxjQUFjLFVBQVUsV0FBVyxDQUFDLENBQUMsR0FBRyxpQkFBaUIsS0FBSyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFO0FBQ3pHO0FBRUEsU0FBUyxtQkFBbUIsS0FBYSxlQUF1QixhQUFxQjtBQUNuRixRQUFNLG1CQUFtQixJQUFJLE9BQU8sTUFBTSxhQUFhLG1CQUFtQixHQUFHO0FBQzdFLFFBQU0saUJBQWlCLElBQUksTUFBTSxnQkFBZ0I7QUFFakQsTUFBSSxDQUFDLGdCQUFnQjtBQUNuQixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sSUFBSSxRQUFRLGtCQUFrQixJQUFJLFdBQVcsSUFBSSxlQUFlLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsRUFBRTtBQUNySDtBQUVBLFNBQVMsd0JBQXdCLEtBQWE7QUFDNUMsTUFDRSxDQUFDLDBCQUEwQixLQUFLLEdBQUcsS0FDbkMsYUFBYSxLQUFLLGVBQWUsS0FDakMsK0NBQStDLEtBQUssR0FBRyxLQUN2RCwwQkFBMEIsS0FBSyxHQUFHLEdBQ2xDO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGFBQWE7QUFDbkIsUUFBTSxXQUFXLElBQUksTUFBTSxVQUFVO0FBQ3JDLE1BQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUc7QUFDN0IsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLGNBQWM7QUFDbEIsZ0JBQWMsbUJBQW1CLGFBQWEsVUFBVSxrQkFBa0I7QUFDMUUsZ0JBQWMsbUJBQW1CLGFBQWEsU0FBUyxpQkFBaUI7QUFDeEUsZ0JBQWMsWUFBWTtBQUFBLElBQ3hCO0FBQUEsSUFDQSxTQUFTLG9CQUFvQixtQkFBbUIsU0FBUyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0FBQUEsRUFDekY7QUFFQSxNQUFJLENBQUMsYUFBYSxhQUFhLFVBQVUsR0FBRztBQUMxQyxrQkFBYyxZQUFZLFFBQVEsUUFBUSx1QkFBdUI7QUFBQSxFQUNuRTtBQUNBLE1BQUksQ0FBQyxhQUFhLGFBQWEsZUFBZSxHQUFHO0FBQy9DLGtCQUFjLFlBQVksUUFBUSxRQUFRLDBCQUEwQjtBQUFBLEVBQ3RFO0FBQ0EsTUFBSSxDQUFDLGFBQWEsYUFBYSxpQkFBaUIsR0FBRztBQUNqRCxrQkFBYyxZQUFZLFFBQVEsUUFBUSw2QkFBNkI7QUFBQSxFQUN6RTtBQUVBLFNBQU8sY0FBYyxhQUFhLENBQUMsaUJBQWlCLFlBQVksQ0FBQztBQUNuRTtBQUVBLFNBQVMsc0JBQXNCLE1BQWM7QUFDM0MsU0FBTyxLQUFLLFFBQVEsaUJBQWlCLHVCQUF1QjtBQUM5RDtBQUVBLFNBQVMsb0JBQW9CLE9BQWU7QUFDMUMsU0FBTyxNQUNKLFFBQVEsTUFBTSxPQUFPLEVBQ3JCLFFBQVEsTUFBTSxRQUFRLEVBQ3RCLFFBQVEsTUFBTSxNQUFNLEVBQ3BCLFFBQVEsTUFBTSxNQUFNO0FBQ3pCO0FBRUEsU0FBUyxtQkFBbUIsT0FBZSxVQUFrQjtBQUMzRCxTQUNFLE1BQ0csVUFBVSxNQUFNLEVBQ2hCLFFBQVEsOEJBQThCLEdBQUcsRUFDekMsUUFBUSxZQUFZLEVBQUUsRUFDdEIsWUFBWSxLQUFLO0FBRXhCO0FBRUEsU0FBUyxxQkFBcUIsTUFBYztBQUMxQyxRQUFNLGNBQWMsS0FBSyxLQUFLLEVBQUUsTUFBTSxzQkFBc0I7QUFFNUQsTUFBSSxDQUFDLGFBQWE7QUFDaEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGFBQWEsWUFBWSxDQUFDLEVBQUU7QUFDbEMsUUFBTSxRQUFRLFlBQVksQ0FBQyxLQUFLLElBQUksS0FBSztBQUV6QyxTQUFPO0FBQUEsSUFDTCxPQUFPLGFBQWE7QUFBQSxJQUNwQjtBQUFBLElBQ0EsUUFBUSxLQUFLLFNBQVM7QUFBQSxFQUN4QjtBQUNGO0FBRUEsU0FBUyxtQkFBbUIsU0FBaUIsT0FBZTtBQUMxRCxRQUFNLFFBQVEsUUFBUSxLQUFLLEtBQUssa0JBQWtCLEtBQUs7QUFDdkQsU0FBTztBQUFBLElBQ0wsSUFBSSxtQkFBbUIsT0FBTyxTQUFTLEtBQUssRUFBRTtBQUFBLElBQzlDO0FBQUEsRUFDRjtBQUNGO0FBRUEsU0FBUyxxQkFBcUIsSUFBUztBQUNyQyxXQUFTLGVBQWUsT0FBWSxXQUFtQixTQUFpQixRQUFpQjtBQUN2RixVQUFNLFFBQVEsTUFBTSxPQUFPLFNBQVMsSUFBSSxNQUFNLE9BQU8sU0FBUztBQUM5RCxVQUFNLE1BQU0sTUFBTSxPQUFPLFNBQVM7QUFDbEMsVUFBTSxZQUFZLE1BQU0sSUFBSSxNQUFNLE9BQU8sR0FBRztBQUM1QyxVQUFNLGdCQUFnQixxQkFBcUIsU0FBUztBQUVwRCxRQUFJLENBQUMsZUFBZSxRQUFRO0FBQzFCLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxRQUFRO0FBQ1YsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLFdBQVc7QUFDZixRQUFJLGFBQWE7QUFDakIsUUFBSSxRQUFRO0FBRVosV0FBTyxXQUFXLElBQUksU0FBUztBQUM3QixrQkFBWTtBQUNaLFlBQU0sWUFBWSxNQUFNLE9BQU8sUUFBUSxJQUFJLE1BQU0sT0FBTyxRQUFRO0FBQ2hFLFlBQU0sVUFBVSxNQUFNLE9BQU8sUUFBUTtBQUNyQyxZQUFNLFNBQVMscUJBQXFCLE1BQU0sSUFBSSxNQUFNLFdBQVcsT0FBTyxDQUFDO0FBRXZFLFVBQUksQ0FBQyxVQUFVLE9BQU8sVUFBVSxjQUFjLE9BQU87QUFDbkQ7QUFBQSxNQUNGO0FBRUEsVUFBSSxPQUFPLFFBQVE7QUFDakIsaUJBQVM7QUFDVDtBQUFBLE1BQ0Y7QUFFQSxlQUFTO0FBQ1QsVUFBSSxVQUFVLEdBQUc7QUFDZixxQkFBYTtBQUNiO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxRQUFJLG1CQUFtQixZQUFZO0FBQ25DLFVBQU0sWUFBWSxNQUFNO0FBQ3hCLFVBQU0sYUFBYSxNQUFNO0FBQ3pCLFVBQU0sT0FBTyxtQkFBbUIsY0FBYyxNQUFNLGNBQWMsS0FBSztBQUN2RSxVQUFNLGdCQUFnQixjQUFjLFVBQVUsSUFBSSw2QkFBNkI7QUFDL0UsVUFBTSxpQkFBaUIsY0FBYyxVQUFVLElBQUksOEJBQThCO0FBRWpGLFVBQU0sYUFBYTtBQUNuQixVQUFNLFVBQVU7QUFFaEIsVUFBTSxZQUFZLE1BQU0sS0FBSyxlQUFlLFdBQVcsQ0FBQztBQUN4RCxjQUFVLFFBQVE7QUFDbEIsY0FBVSxNQUFNLENBQUMsV0FBVyxRQUFRO0FBQ3BDLGNBQVUsT0FBTztBQUVqQixVQUFNLEdBQUcsTUFBTSxTQUFTLE9BQU8sa0JBQWtCLFFBQVE7QUFFekQsVUFBTSxhQUFhLE1BQU0sS0FBSyxnQkFBZ0IsV0FBVyxFQUFFO0FBQzNELGVBQVcsUUFBUTtBQUVuQixVQUFNLGFBQWE7QUFDbkIsVUFBTSxVQUFVO0FBQ2hCLFVBQU0sT0FBTyxZQUFZLGFBQWEsSUFBSTtBQUUxQyxXQUFPO0FBQUEsRUFDVDtBQUVBLEtBQUcsTUFBTSxNQUFNLE9BQU8sU0FBUyxvQkFBb0IsZ0JBQWdCO0FBQUEsSUFDakUsS0FBSyxDQUFDLGFBQWEsYUFBYSxjQUFjLE1BQU07QUFBQSxFQUN0RCxDQUFDO0FBRUQsS0FBRyxTQUFTLE1BQU0sMkJBQTJCLENBQUMsUUFBZSxRQUFnQjtBQUMzRSxVQUFNLE9BQU8sT0FBTyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksSUFBSSxPQUFPLEdBQUc7QUFDckQsV0FBTywrREFBK0Qsb0JBQW9CLEtBQUssRUFBRSxDQUFDLCtCQUErQixvQkFBb0IsS0FBSyxLQUFLLENBQUM7QUFBQTtBQUFBLEVBQ2xLO0FBRUEsS0FBRyxTQUFTLE1BQU0sMkJBQTJCLENBQUMsUUFBZSxRQUFnQjtBQUMzRSxVQUFNLE9BQU8sT0FBTyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksSUFBSSxPQUFPLEdBQUc7QUFDckQsV0FBTywrREFBK0Qsb0JBQW9CLEtBQUssRUFBRSxDQUFDLCtCQUErQixvQkFBb0IsS0FBSyxLQUFLLENBQUM7QUFBQTtBQUFBLEVBQ2xLO0FBRUEsS0FBRyxTQUFTLE1BQU0sNEJBQTRCLE1BQU07QUFDcEQsS0FBRyxTQUFTLE1BQU0sNEJBQTRCLE1BQU07QUFDdEQ7QUFHQSxJQUFPLGlCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLE1BQU0sR0FBRyxRQUFRLGNBQWMsQ0FBQyxDQUFDO0FBQUEsRUFDaEUsaUJBQWlCO0FBQUEsRUFDakIsY0FBYyxNQUFNO0FBQ2xCLFdBQU8sc0JBQXNCLElBQUk7QUFBQSxFQUNuQztBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osZUFBZSxDQUFDLFlBQVksWUFBWSxhQUFhLGFBQWEsWUFBWSxZQUFZLFlBQVksWUFBWSxZQUFZLFlBQVksWUFBWSxZQUFZLFlBQVksWUFBWSxZQUFZLFlBQVksWUFBWSxTQUFTO0FBQUEsSUFDdk8sU0FBUztBQUFBLE1BQ1AsMEJBQTBCO0FBQUEsTUFDMUIsMEJBQTBCO0FBQUEsTUFDMUIsbUNBQW1DO0FBQUEsTUFDbkMsNkJBQTZCO0FBQUEsTUFDN0IsNEJBQTRCO0FBQUEsTUFDNUIsbUJBQW1CO0FBQUEsTUFDbkI7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFVBQVUsUUFBZ0IsVUFBOEI7QUFDdEQsY0FBSSxDQUFDLFNBQVUsUUFBTztBQUN0QixnQkFBTSxXQUFXO0FBQ2pCLGNBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUFHLFFBQU87QUFDbkMsZ0JBQU0sZUFBZUEsTUFBSyxRQUFRQSxNQUFLLFFBQVEsUUFBUSxHQUFHLE1BQU07QUFDaEUsY0FBSUMsSUFBRyxXQUFXLFlBQVksRUFBRyxRQUFPO0FBQ3hDLGtCQUFRLEtBQUssNkNBQTZDLE1BQU0sRUFBRTtBQUNsRSxpQkFBTztBQUFBLFlBQ0wsSUFBSTtBQUFBLFlBQ0osVUFBVTtBQUFBLFlBQ1YsWUFBWTtBQUFBLFVBQ2Q7QUFBQSxRQUNGO0FBQUEsUUFDQSxLQUFLLElBQVk7QUFDZixnQkFBTSxXQUFXO0FBQ2pCLGNBQUksQ0FBQyxTQUFTLEtBQUssRUFBRSxFQUFHLFFBQU87QUFDL0IsY0FBSUEsSUFBRyxXQUFXLEVBQUUsRUFBRyxRQUFPO0FBQzlCLGdCQUFNLGlCQUNKLCtCQUNBLE9BQU87QUFBQSxZQUNMO0FBQUEsVUFDRixFQUFFLFNBQVMsUUFBUTtBQUNyQixpQkFBTyxtQkFBbUIsY0FBYztBQUFBLFFBQzFDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxVQUFVO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTCxhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ04sUUFBUSxDQUFDLE9BQU87QUFDZCxTQUFHLElBQUksb0JBQW9CO0FBQzNCLFNBQUcsSUFBSSxRQUFRO0FBQUEsSUFDakI7QUFBQSxFQUNGO0FBQUEsRUFDQSxhQUFhO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxNQUFNO0FBQUEsSUFDTixTQUFTLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDZCxRQUFRO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsUUFDUCxjQUFjO0FBQUEsVUFDWixRQUFRO0FBQUEsWUFDTixZQUFZO0FBQUEsWUFDWixpQkFBaUI7QUFBQSxVQUNuQjtBQUFBLFVBQ0EsT0FBTztBQUFBLFlBQ0wsV0FBVztBQUFBLGNBQ1Qsa0JBQWtCO0FBQUEsY0FDbEIsc0JBQXNCO0FBQUEsY0FDdEIsa0JBQWtCO0FBQUEsY0FDbEIsdUJBQXVCO0FBQUEsWUFDekI7QUFBQSxZQUNBLGFBQWE7QUFBQSxjQUNYLG1CQUFtQjtBQUFBLGNBQ25CLG9CQUFvQjtBQUFBLGNBQ3BCLHFCQUFxQjtBQUFBLFlBQ3ZCO0FBQUEsWUFDQSxpQkFBaUI7QUFBQSxjQUNmLGVBQWU7QUFBQSxjQUNmLG9CQUFvQjtBQUFBLGNBQ3BCLDBCQUEwQjtBQUFBLGNBQzFCLDhCQUE4QjtBQUFBLFlBQ2hDO0FBQUEsWUFDQSxRQUFRO0FBQUEsY0FDTixZQUFZO0FBQUEsY0FDWixjQUFjO0FBQUEsY0FDZCxXQUFXO0FBQUEsWUFDYjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNIO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDTCxFQUFFLE1BQU0sNEJBQTRCLE1BQU0saURBQWlEO0FBQUEsVUFDM0YsRUFBRSxNQUFNLHVCQUF1QixNQUFNLDRDQUE0QztBQUFBLFVBQ2pGLEVBQUUsTUFBTSx3QkFBd0IsTUFBTSw2Q0FBNkM7QUFBQSxRQUNyRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLEVBQUUsTUFBTSxRQUFRLE1BQU0sNkJBQTZCLFFBQVEsUUFBUTtBQUFBLElBQ3JFO0FBQUEsSUFDQSxTQUFTLFdBQVc7QUFBQSxFQUN0QjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbImZzIiwgInBhdGgiLCAicGF0aCIsICJmcyJdCn0K
