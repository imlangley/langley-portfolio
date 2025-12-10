module.exports = [
"[project]/Documents/GitHub/langley-portfolio/node_modules/get-it/dist/_chunks-es/defaultOptionsValidator.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "p",
    ()=>r,
    "v",
    ()=>s
]);
const e = !(typeof navigator > "u") && "ReactNative" === navigator.product, t = {
    timeout: e ? 6e4 : 12e4
}, r = function(r) {
    const a = {
        ...t,
        ..."string" == typeof r ? {
            url: r
        } : r
    };
    if (a.timeout = o(a.timeout), a.query) {
        const { url: t, searchParams: r } = function(t) {
            const r = t.indexOf("?");
            if (-1 === r) return {
                url: t,
                searchParams: new URLSearchParams
            };
            const o = t.slice(0, r), a = t.slice(r + 1);
            if (!e) return {
                url: o,
                searchParams: new URLSearchParams(a)
            };
            if ("function" != typeof decodeURIComponent) throw new Error("Broken `URLSearchParams` implementation, and `decodeURIComponent` is not defined");
            const s = new URLSearchParams;
            for (const e of a.split("&")){
                const [t, r] = e.split("=");
                t && s.append(n(t), n(r || ""));
            }
            return {
                url: o,
                searchParams: s
            };
        }(a.url);
        for (const [e, n] of Object.entries(a.query)){
            if (void 0 !== n) if (Array.isArray(n)) for (const t of n)r.append(e, t);
            else r.append(e, n);
            const o = r.toString();
            o && (a.url = `${t}?${o}`);
        }
    }
    return a.method = a.body && !a.method ? "POST" : (a.method || "GET").toUpperCase(), a;
};
function n(e) {
    return decodeURIComponent(e.replace(/\+/g, " "));
}
function o(e) {
    if (!1 === e || 0 === e) return !1;
    if (e.connect || e.socket) return e;
    const r = Number(e);
    return isNaN(r) ? o(t.timeout) : {
        connect: r,
        socket: r
    };
}
const a = /^https?:\/\//i, s = function(e) {
    if (!a.test(e.url)) throw new Error(`"${e.url}" is not a valid URL`);
};
;
 //# sourceMappingURL=defaultOptionsValidator.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/get-it/dist/_chunks-es/createRequester.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "c",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$_chunks$2d$es$2f$defaultOptionsValidator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/get-it/dist/_chunks-es/defaultOptionsValidator.js [app-rsc] (ecmascript)");
;
const r = [
    "request",
    "response",
    "progress",
    "error",
    "abort"
], o = [
    "processOptions",
    "validateOptions",
    "interceptRequest",
    "finalizeOptions",
    "onRequest",
    "onResponse",
    "onError",
    "onReturn",
    "onHeaders"
];
function n(s, i) {
    const u = [], a = o.reduce((e, t)=>(e[t] = e[t] || [], e), {
        processOptions: [
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$_chunks$2d$es$2f$defaultOptionsValidator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["p"]
        ],
        validateOptions: [
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$_chunks$2d$es$2f$defaultOptionsValidator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"]
        ]
    });
    function c(e) {
        const t = r.reduce((e, t)=>(e[t] = function() {
                const e = /* @__PURE__ */ Object.create(null);
                let t = 0;
                return {
                    publish: function(t) {
                        for(const r in e)e[r](t);
                    },
                    subscribe: function(r) {
                        const o = t++;
                        return e[o] = r, function() {
                            delete e[o];
                        };
                    }
                };
            }(), e), {}), o = ((e)=>function(t, r, ...o) {
                const n = "onError" === t;
                let s = r;
                for(let r = 0; r < e[t].length && (s = (0, e[t][r])(s, ...o), !n || s); r++);
                return s;
            })(a), n = o("processOptions", e);
        o("validateOptions", n);
        const s = {
            options: n,
            channels: t,
            applyMiddleware: o
        };
        let u;
        const c = t.request.subscribe((e)=>{
            u = i(e, (r, n)=>((e, r, n)=>{
                    let s = e, i = r;
                    if (!s) try {
                        i = o("onResponse", r, n);
                    } catch (e) {
                        i = null, s = e;
                    }
                    s = s && o("onError", s, n), s ? t.error.publish(s) : i && t.response.publish(i);
                })(r, n, e));
        });
        t.abort.subscribe(()=>{
            c(), u && u.abort();
        });
        const l = o("onReturn", t, s);
        return l === t && t.request.publish(s), l;
    }
    return c.use = function(e) {
        if (!e) throw new Error("Tried to add middleware that resolved to falsey value");
        if ("function" == typeof e) throw new Error("Tried to add middleware that was a function. It probably expects you to pass options to it.");
        if (e.onReturn && a.onReturn.length > 0) throw new Error("Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event");
        return o.forEach((t)=>{
            e[t] && a[t].push(e[t]);
        }), u.push(e), c;
    }, c.clone = ()=>n(u, i), s.forEach(c.use), c;
}
;
 //# sourceMappingURL=createRequester.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/get-it/dist/_chunks-es/_commonjsHelpers.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "g",
    ()=>c,
    "p",
    ()=>r,
    "v",
    ()=>s
]);
const e = !(typeof navigator > "u") && "ReactNative" === navigator.product, t = {
    timeout: e ? 6e4 : 12e4
}, r = function(r) {
    const a = {
        ...t,
        ..."string" == typeof r ? {
            url: r
        } : r
    };
    if (a.timeout = n(a.timeout), a.query) {
        const { url: t, searchParams: r } = function(t) {
            const r = t.indexOf("?");
            if (-1 === r) return {
                url: t,
                searchParams: new URLSearchParams
            };
            const n = t.slice(0, r), a = t.slice(r + 1);
            if (!e) return {
                url: n,
                searchParams: new URLSearchParams(a)
            };
            if ("function" != typeof decodeURIComponent) throw new Error("Broken `URLSearchParams` implementation, and `decodeURIComponent` is not defined");
            const s = new URLSearchParams;
            for (const e of a.split("&")){
                const [t, r] = e.split("=");
                t && s.append(o(t), o(r || ""));
            }
            return {
                url: n,
                searchParams: s
            };
        }(a.url);
        for (const [e, o] of Object.entries(a.query)){
            if (void 0 !== o) if (Array.isArray(o)) for (const t of o)r.append(e, t);
            else r.append(e, o);
            const n = r.toString();
            n && (a.url = `${t}?${n}`);
        }
    }
    return a.method = a.body && !a.method ? "POST" : (a.method || "GET").toUpperCase(), a;
};
function o(e) {
    return decodeURIComponent(e.replace(/\+/g, " "));
}
function n(e) {
    if (!1 === e || 0 === e) return !1;
    if (e.connect || e.socket) return e;
    const r = Number(e);
    return isNaN(r) ? n(t.timeout) : {
        connect: r,
        socket: r
    };
}
const a = /^https?:\/\//i, s = function(e) {
    if (!a.test(e.url)) throw new Error(`"${e.url}" is not a valid URL`);
};
function c(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
;
 //# sourceMappingURL=_commonjsHelpers.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/get-it/dist/index.react-server.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adapter",
    ()=>a,
    "environment",
    ()=>c,
    "getIt",
    ()=>l
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$_chunks$2d$es$2f$createRequester$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/get-it/dist/_chunks-es/createRequester.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$_chunks$2d$es$2f$_commonjsHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/get-it/dist/_chunks-es/_commonjsHelpers.js [app-rsc] (ecmascript)");
;
;
var r, o, s = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$_chunks$2d$es$2f$_commonjsHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["g"])(function() {
    if (o) return r;
    o = 1;
    var e = function(e) {
        return e.replace(/^\s+|\s+$/g, "");
    }, t = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    };
    return r = function(r) {
        if (!r) return {};
        for(var o = /* @__PURE__ */ Object.create(null), s = e(r).split("\n"), n = 0; n < s.length; n++){
            var a = s[n], i = a.indexOf(":"), u = e(a.slice(0, i)).toLowerCase(), l = e(a.slice(i + 1));
            typeof o[u] > "u" ? o[u] = l : t(o[u]) ? o[u].push(l) : o[u] = [
                o[u],
                l
            ];
        }
        return o;
    };
}());
class n {
    onabort;
    onerror;
    onreadystatechange;
    ontimeout;
    readyState = 0;
    response;
    responseText = "";
    responseType = "";
    status;
    statusText;
    withCredentials;
    #e;
    #t;
    #r;
    #o = {};
    #s;
    #n = {};
    #a;
    open(e, t, r) {
        this.#e = e, this.#t = t, this.#r = "", this.readyState = 1, this.onreadystatechange?.(), this.#s = void 0;
    }
    abort() {
        this.#s && this.#s.abort();
    }
    getAllResponseHeaders() {
        return this.#r;
    }
    setRequestHeader(e, t) {
        this.#o[e] = t;
    }
    setInit(e, t = !0) {
        this.#n = e, this.#a = t;
    }
    send(e) {
        const t = "arraybuffer" !== this.responseType, r = {
            ...this.#n,
            method: this.#e,
            headers: this.#o,
            body: e
        };
        "function" == typeof AbortController && this.#a && (this.#s = new AbortController, typeof EventTarget < "u" && this.#s.signal instanceof EventTarget && (r.signal = this.#s.signal)), typeof document < "u" && (r.credentials = this.withCredentials ? "include" : "omit"), fetch(this.#t, r).then((e)=>(e.headers.forEach((e, t)=>{
                this.#r += `${t}: ${e}\r\n`;
            }), this.status = e.status, this.statusText = e.statusText, this.readyState = 3, this.onreadystatechange?.(), t ? e.text() : e.arrayBuffer())).then((e)=>{
            "string" == typeof e ? this.responseText = e : this.response = e, this.readyState = 4, this.onreadystatechange?.();
        }).catch((e)=>{
            "AbortError" !== e.name ? this.onerror?.(e) : this.onabort?.();
        });
    }
}
const a = "function" == typeof XMLHttpRequest ? "xhr" : "fetch", i = "xhr" === a ? XMLHttpRequest : n, u = (e, t)=>{
    const r = e.options, o = e.applyMiddleware("finalizeOptions", r), u = {}, l = e.applyMiddleware("interceptRequest", void 0, {
        adapter: a,
        context: e
    });
    if (l) {
        const e = setTimeout(t, 0, null, l);
        return {
            abort: ()=>clearTimeout(e)
        };
    }
    let c = new i;
    c instanceof n && "object" == typeof o.fetch && c.setInit(o.fetch, o.useAbortSignal ?? !0);
    const h = o.headers, d = o.timeout;
    let p = !1, f = !1, y = !1;
    if (c.onerror = (e)=>{
        g(c instanceof n ? e instanceof Error ? e : new Error(`Request error while attempting to reach is ${o.url}`, {
            cause: e
        }) : new Error(`Request error while attempting to reach is ${o.url}${e.lengthComputable ? `(${e.loaded} of ${e.total} bytes transferred)` : ""}`));
    }, c.ontimeout = (e)=>{
        g(new Error(`Request timeout while attempting to reach ${o.url}${e.lengthComputable ? `(${e.loaded} of ${e.total} bytes transferred)` : ""}`));
    }, c.onabort = ()=>{
        b(!0), p = !0;
    }, c.onreadystatechange = function() {
        d && (b(), u.socket = setTimeout(()=>m("ESOCKETTIMEDOUT"), d.socket)), !p && c && 4 === c.readyState && 0 !== c.status && function() {
            if (!(p || f || y)) {
                if (0 === c.status) return void g(new Error("Unknown XHR error"));
                b(), f = !0, t(null, {
                    body: c.response || ("" === c.responseType || "text" === c.responseType ? c.responseText : ""),
                    url: o.url,
                    method: o.method,
                    headers: s(c.getAllResponseHeaders()),
                    statusCode: c.status,
                    statusMessage: c.statusText
                });
            }
        }();
    }, c.open(o.method, o.url, !0), c.withCredentials = !!o.withCredentials, h && c.setRequestHeader) for(const e in h)h.hasOwnProperty(e) && c.setRequestHeader(e, h[e]);
    return o.rawBody && (c.responseType = "arraybuffer"), e.applyMiddleware("onRequest", {
        options: o,
        adapter: a,
        request: c,
        context: e
    }), c.send(o.body || null), d && (u.connect = setTimeout(()=>m("ETIMEDOUT"), d.connect)), {
        abort: function() {
            p = !0, c && c.abort();
        }
    };
    //TURBOPACK unreachable
    ;
    function m(t) {
        y = !0, c.abort();
        const r = new Error("ESOCKETTIMEDOUT" === t ? `Socket timed out on request to ${o.url}` : `Connection timed out on request to ${o.url}`);
        r.code = t, e.channels.error.publish(r);
    }
    function b(e) {
        (e || p || c && c.readyState >= 2 && u.connect) && clearTimeout(u.connect), u.socket && clearTimeout(u.socket);
    }
    function g(e) {
        if (f) return;
        b(!0), f = !0, c = null;
        const r = e || new Error(`Network error while attempting to reach ${o.url}`);
        r.isNetworkError = !0, r.request = o, t(r);
    }
}, l = (t = [], r = u)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$_chunks$2d$es$2f$createRequester$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["c"])(t, r), c = "react-server";
;
 //# sourceMappingURL=index.react-server.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/get-it/dist/middleware.browser.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Cancel",
    ()=>I,
    "CancelToken",
    ()=>T,
    "agent",
    ()=>n,
    "base",
    ()=>i,
    "debug",
    ()=>h,
    "headers",
    ()=>g,
    "httpErrors",
    ()=>y,
    "injectResponse",
    ()=>w,
    "jsonRequest",
    ()=>x,
    "jsonResponse",
    ()=>E,
    "keepAlive",
    ()=>B,
    "mtls",
    ()=>k,
    "observable",
    ()=>A,
    "progress",
    ()=>S,
    "promise",
    ()=>N,
    "proxy",
    ()=>M,
    "retry",
    ()=>P,
    "urlEncoded",
    ()=>L
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$_chunks$2d$es$2f$_commonjsHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/get-it/dist/_chunks-es/_commonjsHelpers.js [app-rsc] (ecmascript)");
;
;
function n(e) {
    return {};
}
const r = /^\//, o = /\/$/;
function i(e) {
    const t = e.replace(o, "");
    return {
        processOptions: (e)=>{
            if (/^https?:\/\//i.test(e.url)) return e;
            const s = [
                t,
                e.url.replace(r, "")
            ].join("/");
            return Object.assign({}, e, {
                url: s
            });
        }
    };
}
var a, c, u, l, p, d = {
    exports: {}
}, f = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$_chunks$2d$es$2f$_commonjsHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["g"])((p || (p = 1, function(e, t) {
    t.formatArgs = function(t) {
        if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors) return;
        const s = "color: " + this.color;
        t.splice(1, 0, s, "color: inherit");
        let n = 0, r = 0;
        t[0].replace(/%[a-zA-Z%]/g, (e)=>{
            "%%" !== e && (n++, "%c" === e && (r = n));
        }), t.splice(r, 0, s);
    }, t.save = function(e) {
        try {
            e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug");
        } catch  {}
    }, t.load = function() {
        let e;
        try {
            e = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
        } catch  {}
        return !e && typeof process < "u" && "env" in process && (e = process.env.DEBUG), e;
    }, t.useColors = function() {
        if (("TURBOPACK compile-time value", "undefined") < "u" && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
        if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
        let e;
        return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || ("TURBOPACK compile-time value", "undefined") < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && (e = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(e[1], 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }, t.storage = function() {
        try {
            return localStorage;
        } catch  {}
    }(), t.destroy = /* @__PURE__ */ (()=>{
        let e = !1;
        return ()=>{
            e || (e = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
        };
    })(), t.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
    ], t.log = console.debug || console.log || (()=>{}), e.exports = (l ? u : (l = 1, u = function(e) {
        function t(e) {
            let n, r, o, i = null;
            function a(...e) {
                if (!a.enabled) return;
                const s = a, r = Number(/* @__PURE__ */ new Date), o = r - (n || r);
                s.diff = o, s.prev = n, s.curr = r, n = r, e[0] = t.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
                let i = 0;
                e[0] = e[0].replace(/%([a-zA-Z%])/g, (n, r)=>{
                    if ("%%" === n) return "%";
                    i++;
                    const o = t.formatters[r];
                    if ("function" == typeof o) {
                        const t = e[i];
                        n = o.call(s, t), e.splice(i, 1), i--;
                    }
                    return n;
                }), t.formatArgs.call(s, e), (s.log || t.log).apply(s, e);
            }
            return a.namespace = e, a.useColors = t.useColors(), a.color = t.selectColor(e), a.extend = s, a.destroy = t.destroy, Object.defineProperty(a, "enabled", {
                enumerable: !0,
                configurable: !1,
                get: ()=>null !== i ? i : (r !== t.namespaces && (r = t.namespaces, o = t.enabled(e)), o),
                set: (e)=>{
                    i = e;
                }
            }), "function" == typeof t.init && t.init(a), a;
        }
        function s(e, s) {
            const n = t(this.namespace + (typeof s > "u" ? ":" : s) + e);
            return n.log = this.log, n;
        }
        function n(e, t) {
            let s = 0, n = 0, r = -1, o = 0;
            for(; s < e.length;)if (n < t.length && (t[n] === e[s] || "*" === t[n])) "*" === t[n] ? (r = n, o = s, n++) : (s++, n++);
            else {
                if (-1 === r) return !1;
                n = r + 1, o++, s = o;
            }
            for(; n < t.length && "*" === t[n];)n++;
            return n === t.length;
        }
        return t.debug = t, t.default = t, t.coerce = function(e) {
            return e instanceof Error ? e.stack || e.message : e;
        }, t.disable = function() {
            const e = [
                ...t.names,
                ...t.skips.map((e)=>"-" + e)
            ].join(",");
            return t.enable(""), e;
        }, t.enable = function(e) {
            t.save(e), t.namespaces = e, t.names = [], t.skips = [];
            const s = ("string" == typeof e ? e : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
            for (const e of s)"-" === e[0] ? t.skips.push(e.slice(1)) : t.names.push(e);
        }, t.enabled = function(e) {
            for (const s of t.skips)if (n(e, s)) return !1;
            for (const s of t.names)if (n(e, s)) return !0;
            return !1;
        }, t.humanize = function() {
            if (c) return a;
            c = 1;
            var e = 1e3, t = 60 * e, s = 60 * t, n = 24 * s, r = 7 * n;
            function o(e, t, s, n) {
                var r = t >= 1.5 * s;
                return Math.round(e / s) + " " + n + (r ? "s" : "");
            }
            return a = function(i, a) {
                a = a || {};
                var c, u, l = typeof i;
                if ("string" === l && i.length > 0) return function(o) {
                    if (!((o = String(o)).length > 100)) {
                        var i = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(o);
                        if (i) {
                            var a = parseFloat(i[1]);
                            switch((i[2] || "ms").toLowerCase()){
                                case "years":
                                case "year":
                                case "yrs":
                                case "yr":
                                case "y":
                                    return 315576e5 * a;
                                case "weeks":
                                case "week":
                                case "w":
                                    return a * r;
                                case "days":
                                case "day":
                                case "d":
                                    return a * n;
                                case "hours":
                                case "hour":
                                case "hrs":
                                case "hr":
                                case "h":
                                    return a * s;
                                case "minutes":
                                case "minute":
                                case "mins":
                                case "min":
                                case "m":
                                    return a * t;
                                case "seconds":
                                case "second":
                                case "secs":
                                case "sec":
                                case "s":
                                    return a * e;
                                case "milliseconds":
                                case "millisecond":
                                case "msecs":
                                case "msec":
                                case "ms":
                                    return a;
                                default:
                                    return;
                            }
                        }
                    }
                }(i);
                if ("number" === l && isFinite(i)) return a.long ? (c = i, (u = Math.abs(c)) >= n ? o(c, u, n, "day") : u >= s ? o(c, u, s, "hour") : u >= t ? o(c, u, t, "minute") : u >= e ? o(c, u, e, "second") : c + " ms") : function(r) {
                    var o = Math.abs(r);
                    return o >= n ? Math.round(r / n) + "d" : o >= s ? Math.round(r / s) + "h" : o >= t ? Math.round(r / t) + "m" : o >= e ? Math.round(r / e) + "s" : r + "ms";
                }(i);
                throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(i));
            };
        }(), t.destroy = function() {
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }, Object.keys(e).forEach((s)=>{
            t[s] = e[s];
        }), t.names = [], t.skips = [], t.formatters = {}, t.selectColor = function(e) {
            let s = 0;
            for(let t = 0; t < e.length; t++)s = (s << 5) - s + e.charCodeAt(t), s |= 0;
            return t.colors[Math.abs(s) % t.colors.length];
        }, t.enable(t.load()), t;
    }))(t);
    const { formatters: s } = e.exports;
    s.j = function(e) {
        try {
            return JSON.stringify(e);
        } catch (e) {
            return "[UnexpectedJSONParseError]: " + e.message;
        }
    };
}(d, d.exports)), d.exports));
const m = [
    "cookie",
    "authorization"
], C = Object.prototype.hasOwnProperty;
function h(e = {}) {
    const t = e.verbose, s = e.namespace || "get-it", n = f(s), r = e.log || n, o = r === n && !f.enabled(s);
    let i = 0;
    return {
        processOptions: (e)=>(e.debug = r, e.requestId = e.requestId || ++i, e),
        onRequest: (s)=>{
            if (o || !s) return s;
            const n = s.options;
            if (r("[%s] HTTP %s %s", n.requestId, n.method, n.url), t && n.body && "string" == typeof n.body && r("[%s] Request body: %s", n.requestId, n.body), t && n.headers) {
                const t = !1 === e.redactSensitiveHeaders ? n.headers : ((e, t)=>{
                    const s = {};
                    for(const n in e)C.call(e, n) && (s[n] = t.indexOf(n.toLowerCase()) > -1 ? "<redacted>" : e[n]);
                    return s;
                })(n.headers, m);
                r("[%s] Request headers: %s", n.requestId, JSON.stringify(t, null, 2));
            }
            return s;
        },
        onResponse: (e, s)=>{
            if (o || !e) return e;
            const n = s.options.requestId;
            return r("[%s] Response code: %s %s", n, e.statusCode, e.statusMessage), t && e.body && r("[%s] Response body: %s", n, function(e) {
                return -1 !== (e.headers["content-type"] || "").toLowerCase().indexOf("application/json") ? function(e) {
                    try {
                        const t = "string" == typeof e ? JSON.parse(e) : e;
                        return JSON.stringify(t, null, 2);
                    } catch  {
                        return e;
                    }
                }(e.body) : e.body;
            }(e)), e;
        },
        onError: (e, t)=>{
            const s = t.options.requestId;
            return e ? (r("[%s] ERROR: %s", s, e.message), e) : (r("[%s] Error encountered, but handled by an earlier middleware", s), e);
        }
    };
}
function g(e, t = {}) {
    return {
        processOptions: (s)=>{
            const n = s.headers || {};
            return s.headers = t.override ? Object.assign({}, n, e) : Object.assign({}, e, n), s;
        }
    };
}
class b extends Error {
    response;
    request;
    constructor(e, t){
        super();
        const s = e.url.length > 400 ? `${e.url.slice(0, 399)}…` : e.url;
        let n = `${e.method}-request to ${s} resulted in `;
        n += `HTTP ${e.statusCode} ${e.statusMessage}`, this.message = n.trim(), this.response = e, this.request = t.options;
    }
}
function y() {
    return {
        onResponse: (e, t)=>{
            if (!(e.statusCode >= 400)) return e;
            throw new b(e, t);
        }
    };
}
function w(e = {}) {
    if ("function" != typeof e.inject) throw new Error("`injectResponse` middleware requires a `inject` function");
    return {
        interceptRequest: function(t, s) {
            const n = e.inject(s, t);
            if (!n) return t;
            const r = s.context.options;
            return {
                body: "",
                url: r.url,
                method: r.method,
                headers: {},
                statusCode: 200,
                statusMessage: "OK",
                ...n
            };
        }
    };
}
const F = typeof Buffer > "u" ? ()=>!1 : (e)=>Buffer.isBuffer(e);
function O(e) {
    return "[object Object]" === Object.prototype.toString.call(e);
}
function j(e) {
    if (!1 === O(e)) return !1;
    const t = e.constructor;
    if (void 0 === t) return !0;
    const s = t.prototype;
    return !(!1 === O(s) || !1 === s.hasOwnProperty("isPrototypeOf"));
}
const v = [
    "boolean",
    "string",
    "number"
];
function x() {
    return {
        processOptions: (e)=>{
            const t = e.body;
            return !t || "function" == typeof t.pipe || F(t) || -1 === v.indexOf(typeof t) && !Array.isArray(t) && !j(t) ? e : Object.assign({}, e, {
                body: JSON.stringify(e.body),
                headers: Object.assign({}, e.headers, {
                    "Content-Type": "application/json"
                })
            });
        }
    };
}
function E(e) {
    return {
        onResponse: (s)=>{
            const n = s.headers["content-type"] || "", r = e && e.force || -1 !== n.indexOf("application/json");
            return s.body && n && r ? Object.assign({}, s, {
                body: t(s.body)
            }) : s;
        },
        processOptions: (e)=>Object.assign({}, e, {
                headers: Object.assign({
                    Accept: "application/json"
                }, e.headers)
            })
    };
    //TURBOPACK unreachable
    ;
    function t(e) {
        try {
            return JSON.parse(e);
        } catch (e) {
            throw e.message = `Failed to parsed response body as JSON: ${e.message}`, e;
        }
    }
}
function k(e = {}) {
    if (!e.ca) throw new Error('Required mtls option "ca" is missing');
    if (!e.cert) throw new Error('Required mtls option "cert" is missing');
    if (!e.key) throw new Error('Required mtls option "key" is missing');
    return {
        finalizeOptions: (t)=>{
            if (function(e) {
                return "object" == typeof e && null !== e && !("protocol" in e);
            }(t)) return t;
            const s = {
                cert: e.cert,
                key: e.key,
                ca: e.ca
            };
            return Object.assign({}, t, s);
        }
    };
}
let R = {};
typeof globalThis < "u" ? R = globalThis : ("TURBOPACK compile-time value", "undefined") < "u" ? R = window : ("TURBOPACK compile-time value", "object") < "u" ? R = /*TURBOPACK member replacement*/ __turbopack_context__.g : typeof self < "u" && (R = self);
var q = R;
function A(e = {}) {
    const t = e.implementation || q.Observable;
    if (!t) throw new Error("`Observable` is not available in global scope, and no implementation was passed");
    return {
        onReturn: (e, s)=>new t((t)=>(e.error.subscribe((e)=>t.error(e)), e.progress.subscribe((e)=>t.next(Object.assign({
                        type: "progress"
                    }, e))), e.response.subscribe((e)=>{
                    t.next(Object.assign({
                        type: "response"
                    }, e)), t.complete();
                }), e.request.publish(s), ()=>e.abort.publish()))
    };
}
function S() {
    return {
        onRequest: (e)=>{
            if ("xhr" !== e.adapter) return;
            const t = e.request, s = e.context;
            function n(e) {
                return (t)=>{
                    const n = t.lengthComputable ? t.loaded / t.total * 100 : -1;
                    s.channels.progress.publish({
                        stage: e,
                        percent: n,
                        total: t.total,
                        loaded: t.loaded,
                        lengthComputable: t.lengthComputable
                    });
                };
            }
            "upload" in t && "onprogress" in t.upload && (t.upload.onprogress = n("upload")), "onprogress" in t && (t.onprogress = n("download"));
        }
    };
}
const N = (e = {})=>{
    const t = e.implementation || Promise;
    if (!t) throw new Error("`Promise` is not available in global scope, and no implementation was passed");
    return {
        onReturn: (s, n)=>new t((t, r)=>{
                const o = n.options.cancelToken;
                o && o.promise.then((e)=>{
                    s.abort.publish(e), r(e);
                }), s.error.subscribe(r), s.response.subscribe((s)=>{
                    t(e.onlyBody ? s.body : s);
                }), setTimeout(()=>{
                    try {
                        s.request.publish(n);
                    } catch (e) {
                        r(e);
                    }
                }, 0);
            })
    };
};
class I {
    __CANCEL__ = !0;
    message;
    constructor(e){
        this.message = e;
    }
    toString() {
        return "Cancel" + (this.message ? `: ${this.message}` : "");
    }
}
class T {
    promise;
    reason;
    constructor(e){
        if ("function" != typeof e) throw new TypeError("executor must be a function.");
        let t = null;
        this.promise = new Promise((e)=>{
            t = e;
        }), e((e)=>{
            this.reason || (this.reason = new I(e), t(this.reason));
        });
    }
    static source = ()=>{
        let e;
        return {
            token: new T((t)=>{
                e = t;
            }),
            cancel: e
        };
    };
}
function M(e) {
    if (!(!1 === e || e && e.host)) throw new Error("Proxy middleware takes an object of host, port and auth properties");
    return {
        processOptions: (t)=>Object.assign({
                proxy: e
            }, t)
    };
}
N.Cancel = I, N.CancelToken = T, N.isCancel = (e)=>!(!e || !e?.__CANCEL__);
var $ = (e, t, s)=>("GET" === s.method || "HEAD" === s.method) && (e.isNetworkError || !1);
function _(e) {
    return 100 * Math.pow(2, e) + 100 * Math.random();
}
const P = (e = {})=>((e)=>{
        const t = e.maxRetries || 5, s = e.retryDelay || _, n = e.shouldRetry;
        return {
            onError: (e, r)=>{
                const o = r.options, i = o.maxRetries || t, a = o.retryDelay || s, c = o.shouldRetry || n, u = o.attemptNumber || 0;
                if (null !== (l = o.body) && "object" == typeof l && "function" == typeof l.pipe || !c(e, u, o) || u >= i) return e;
                var l;
                const p = Object.assign({}, r, {
                    options: Object.assign({}, o, {
                        attemptNumber: u + 1
                    })
                });
                return setTimeout(()=>r.channels.request.publish(p), a(u)), null;
            }
        };
    })({
        shouldRetry: $,
        ...e
    });
function J(e) {
    const t = new URLSearchParams, s = (e, n)=>{
        const r = n instanceof Set ? Array.from(n) : n;
        if (Array.isArray(r)) if (r.length) for(const t in r)s(`${e}[${t}]`, r[t]);
        else t.append(`${e}[]`, "");
        else if ("object" == typeof r && null !== r) for (const [t, n] of Object.entries(r))s(`${e}[${t}]`, n);
        else t.append(e, r);
    };
    for (const [t, n] of Object.entries(e))s(t, n);
    return t.toString();
}
function L() {
    return {
        processOptions: (e)=>{
            const t = e.body;
            return t && "function" != typeof t.pipe && !F(t) && j(t) ? {
                ...e,
                body: J(e.body),
                headers: {
                    ...e.headers,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            } : e;
        }
    };
}
P.shouldRetry = $;
class z extends Error {
    request;
    code;
    constructor(e, t){
        super(e.message), this.request = t, this.code = e.code;
    }
}
const B = (D = n, function(e = {}) {
    const { maxRetries: t = 3, ms: s = 1e3, maxFree: n = 256 } = e, { finalizeOptions: r } = D({
        keepAlive: !0,
        keepAliveMsecs: s,
        maxFreeSockets: n
    });
    return {
        finalizeOptions: r,
        onError: (e, s)=>{
            if (("GET" === s.options.method || "POST" === s.options.method) && e instanceof z && "ECONNRESET" === e.code && e.request.reusedSocket) {
                const e = s.options.attemptNumber || 0;
                if (e < t) {
                    const t = Object.assign({}, s, {
                        options: Object.assign({}, s.options, {
                            attemptNumber: e + 1
                        })
                    });
                    return setImmediate(()=>s.channels.request.publish(t)), null;
                }
            }
            return e;
        }
    };
});
var D;
;
 //# sourceMappingURL=middleware.browser.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/client/dist/_chunks-es/stegaClean.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "C",
    ()=>C,
    "stegaClean",
    ()=>stegaClean,
    "vercelStegaCleanAll",
    ()=>vercelStegaCleanAll
]);
var s = {
    0: 8203,
    1: 8204,
    2: 8205,
    3: 8290,
    4: 8291,
    5: 8288,
    6: 65279,
    7: 8289,
    8: 119155,
    9: 119156,
    a: 119157,
    b: 119158,
    c: 119159,
    d: 119160,
    e: 119161,
    f: 119162
}, c = {
    0: 8203,
    1: 8204,
    2: 8205,
    3: 65279
}, u = new Array(4).fill(String.fromCodePoint(c[0])).join("");
function E(t) {
    let e = JSON.stringify(t);
    return `${u}${Array.from(e).map((r)=>{
        let n = r.charCodeAt(0);
        if (n > 255) throw new Error(`Only ASCII edit info can be encoded. Error attempting to encode ${e} on character ${r} (${n})`);
        return Array.from(n.toString(4).padStart(4, "0")).map((o)=>String.fromCodePoint(c[o])).join("");
    }).join("")}`;
}
function I(t) {
    return !Number.isNaN(Number(t)) || /[a-z]/i.test(t) && !/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(t) ? !1 : !!Date.parse(t);
}
function T(t) {
    try {
        new URL(t, t.startsWith("/") ? "https://acme.com" : void 0);
    } catch  {
        return !1;
    }
    return !0;
}
function C(t, e, r = "auto") {
    return r === !0 || r === "auto" && (I(t) || T(t)) ? t : `${t}${E(e)}`;
}
Object.fromEntries(Object.entries(c).map((t)=>t.reverse()));
Object.fromEntries(Object.entries(s).map((t)=>t.reverse()));
var S = `${Object.values(s).map((t)=>`\\u{${t.toString(16)}}`).join("")}`, f = new RegExp(`[${S}]{4,}`, "gu");
function _(t) {
    var e;
    return {
        cleaned: t.replace(f, ""),
        encoded: ((e = t.match(f)) == null ? void 0 : e[0]) || ""
    };
}
function O(t) {
    return t && JSON.parse(_(JSON.stringify(t)).cleaned);
}
function stegaClean(result) {
    return O(result);
}
const vercelStegaCleanAll = stegaClean;
;
 //# sourceMappingURL=stegaClean.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/client/dist/index.browser.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BasePatch",
    ()=>BasePatch,
    "BaseTransaction",
    ()=>BaseTransaction,
    "ChannelError",
    ()=>ChannelError,
    "ClientError",
    ()=>ClientError,
    "ConnectionFailedError",
    ()=>ConnectionFailedError,
    "CorsOriginError",
    ()=>CorsOriginError,
    "DisconnectError",
    ()=>DisconnectError,
    "MessageError",
    ()=>MessageError,
    "MessageParseError",
    ()=>MessageParseError,
    "ObservablePatch",
    ()=>ObservablePatch,
    "ObservableSanityClient",
    ()=>ObservableSanityClient,
    "ObservableTransaction",
    ()=>ObservableTransaction,
    "Patch",
    ()=>Patch,
    "SanityClient",
    ()=>SanityClient,
    "ServerError",
    ()=>ServerError,
    "Transaction",
    ()=>Transaction,
    "connectEventSource",
    ()=>connectEventSource,
    "createClient",
    ()=>createClient,
    "default",
    ()=>deprecatedCreateClient,
    "requester",
    ()=>requester,
    "validateApiPerspective",
    ()=>validateApiPerspective
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$index$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/get-it/dist/index.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$middleware$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/get-it/dist/middleware.browser.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/rxjs/dist/cjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$_chunks$2d$es$2f$stegaClean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/client/dist/_chunks-es/stegaClean.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/rxjs/dist/cjs/operators/index.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
class ClientError extends Error {
    response;
    statusCode = 400;
    responseBody;
    details;
    constructor(res){
        const props = extractErrorProps(res);
        super(props.message), Object.assign(this, props);
    }
}
class ServerError extends Error {
    response;
    statusCode = 500;
    responseBody;
    details;
    constructor(res){
        const props = extractErrorProps(res);
        super(props.message), Object.assign(this, props);
    }
}
function extractErrorProps(res) {
    const body = res.body, props = {
        response: res,
        statusCode: res.statusCode,
        responseBody: stringifyBody(body, res),
        message: "",
        details: void 0
    };
    if (body.error && body.message) return props.message = `${body.error} - ${body.message}`, props;
    if (isMutationError(body) || isActionError(body)) {
        const allItems = body.error.items || [], items = allItems.slice(0, 5).map((item)=>item.error?.description).filter(Boolean);
        let itemsStr = items.length ? `:
- ${items.join(`
- `)}` : "";
        return allItems.length > 5 && (itemsStr += `
...and ${allItems.length - 5} more`), props.message = `${body.error.description}${itemsStr}`, props.details = body.error, props;
    }
    return body.error && body.error.description ? (props.message = body.error.description, props.details = body.error, props) : (props.message = body.error || body.message || httpErrorMessage(res), props);
}
function isMutationError(body) {
    return isPlainObject(body) && isPlainObject(body.error) && body.error.type === "mutationError" && typeof body.error.description == "string";
}
function isActionError(body) {
    return isPlainObject(body) && isPlainObject(body.error) && body.error.type === "actionError" && typeof body.error.description == "string";
}
function isPlainObject(obj) {
    return typeof obj == "object" && obj !== null && !Array.isArray(obj);
}
function httpErrorMessage(res) {
    const statusMessage = res.statusMessage ? ` ${res.statusMessage}` : "";
    return `${res.method}-request to ${res.url} resulted in HTTP ${res.statusCode}${statusMessage}`;
}
function stringifyBody(body, res) {
    return (res.headers["content-type"] || "").toLowerCase().indexOf("application/json") !== -1 ? JSON.stringify(body, null, 2) : body;
}
class CorsOriginError extends Error {
    projectId;
    addOriginUrl;
    constructor({ projectId: projectId2 }){
        super("CorsOriginError"), this.name = "CorsOriginError", this.projectId = projectId2;
        const url = new URL(`https://sanity.io/manage/project/${projectId2}/api`);
        if (typeof location < "u") {
            const { origin } = location;
            url.searchParams.set("cors", "add"), url.searchParams.set("origin", origin), this.addOriginUrl = url, this.message = `The current origin is not allowed to connect to the Live Content API. Add it here: ${url}`;
        } else this.message = `The current origin is not allowed to connect to the Live Content API. Change your configuration here: ${url}`;
    }
}
const httpError = {
    onResponse: (res)=>{
        if (res.statusCode >= 500) throw new ServerError(res);
        if (res.statusCode >= 400) throw new ClientError(res);
        return res;
    }
};
function printWarnings() {
    const seen = {};
    return {
        onResponse: (res)=>{
            const warn = res.headers["x-sanity-warning"], warnings = Array.isArray(warn) ? warn : [
                warn
            ];
            for (const msg of warnings)!msg || seen[msg] || (seen[msg] = !0, console.warn(msg));
            return res;
        }
    };
}
function defineHttpRequest(envMiddleware2) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$index$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getIt"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$middleware$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["retry"])({
            shouldRetry
        }),
        ...envMiddleware2,
        printWarnings(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$middleware$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsonRequest"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$middleware$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsonResponse"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$middleware$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["progress"])(),
        httpError,
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$middleware$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["observable"])({
            implementation: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Observable"]
        })
    ]);
}
function shouldRetry(err, attempt, options) {
    if (options.maxRetries === 0) return !1;
    const isSafe = options.method === "GET" || options.method === "HEAD", isQuery2 = (options.uri || options.url).startsWith("/data/query"), isRetriableResponse = err.response && (err.response.statusCode === 429 || err.response.statusCode === 502 || err.response.statusCode === 503);
    return (isSafe || isQuery2) && isRetriableResponse ? !0 : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$get$2d$it$2f$dist$2f$middleware$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["retry"].shouldRetry(err, attempt, options);
}
const BASE_URL = "https://www.sanity.io/help/";
function generateHelpUrl(slug) {
    return BASE_URL + slug;
}
const VALID_ASSET_TYPES = [
    "image",
    "file"
], VALID_INSERT_LOCATIONS = [
    "before",
    "after",
    "replace"
], dataset = (name)=>{
    if (!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(name)) throw new Error("Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters");
}, projectId = (id)=>{
    if (!/^[-a-z0-9]+$/i.test(id)) throw new Error("`projectId` can only contain only a-z, 0-9 and dashes");
}, validateAssetType = (type)=>{
    if (VALID_ASSET_TYPES.indexOf(type) === -1) throw new Error(`Invalid asset type: ${type}. Must be one of ${VALID_ASSET_TYPES.join(", ")}`);
}, validateObject = (op, val)=>{
    if (val === null || typeof val != "object" || Array.isArray(val)) throw new Error(`${op}() takes an object of properties`);
}, validateDocumentId = (op, id)=>{
    if (typeof id != "string" || !/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(id) || id.includes("..")) throw new Error(`${op}(): "${id}" is not a valid document ID`);
}, requireDocumentId = (op, doc)=>{
    if (!doc._id) throw new Error(`${op}() requires that the document contains an ID ("_id" property)`);
    validateDocumentId(op, doc._id);
}, validateInsert = (at, selector, items)=>{
    const signature = "insert(at, selector, items)";
    if (VALID_INSERT_LOCATIONS.indexOf(at) === -1) {
        const valid = VALID_INSERT_LOCATIONS.map((loc)=>`"${loc}"`).join(", ");
        throw new Error(`${signature} takes an "at"-argument which is one of: ${valid}`);
    }
    if (typeof selector != "string") throw new Error(`${signature} takes a "selector"-argument which must be a string`);
    if (!Array.isArray(items)) throw new Error(`${signature} takes an "items"-argument which must be an array`);
}, hasDataset = (config)=>{
    if (!config.dataset) throw new Error("`dataset` must be provided to perform queries");
    return config.dataset || "";
}, requestTag = (tag)=>{
    if (typeof tag != "string" || !/^[a-z0-9._-]{1,75}$/i.test(tag)) throw new Error("Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long.");
    return tag;
}, resourceConfig = (config)=>{
    if (!config["~experimental_resource"]) throw new Error("`resource` must be provided to perform resource queries");
    const { type, id } = config["~experimental_resource"];
    switch(type){
        case "dataset":
            {
                if (id.split(".").length !== 2) throw new Error('Dataset resource ID must be in the format "project.dataset"');
                return;
            }
        case "dashboard":
        case "media-library":
        case "canvas":
            return;
        default:
            throw new Error(`Unsupported resource type: ${type.toString()}`);
    }
}, resourceGuard = (service, config)=>{
    if (config["~experimental_resource"]) throw new Error(`\`${service}\` does not support resource-based operations`);
};
function once(fn) {
    let didCall = !1, returnValue;
    return (...args)=>(didCall || (returnValue = fn(...args), didCall = !0), returnValue);
}
const createWarningPrinter = (message)=>// eslint-disable-next-line no-console
    once((...args)=>console.warn(message.join(" "), ...args)), printCdnAndWithCredentialsWarning = createWarningPrinter([
    "Because you set `withCredentials` to true, we will override your `useCdn`",
    "setting to be false since (cookie-based) credentials are never set on the CDN"
]), printCdnWarning = createWarningPrinter([
    "Since you haven't set a value for `useCdn`, we will deliver content using our",
    "global, edge-cached API-CDN. If you wish to have content delivered faster, set",
    "`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."
]), printCdnPreviewDraftsWarning = createWarningPrinter([
    "The Sanity client is configured with the `perspective` set to `drafts` or `previewDrafts`, which doesn't support the API-CDN.",
    "The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."
]), printPreviewDraftsDeprecationWarning = createWarningPrinter([
    "The `previewDrafts` perspective has been renamed to  `drafts` and will be removed in a future API version"
]), printBrowserTokenWarning = createWarningPrinter([
    "You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.",
    `See ${generateHelpUrl("js-client-browser-token")} for more information and how to hide this warning.`
]), printCredentialedTokenWarning = createWarningPrinter([
    "You have configured Sanity client to use a token, but also provided `withCredentials: true`.",
    "This is no longer supported - only token will be used - remove `withCredentials: true`."
]), printNoApiVersionSpecifiedWarning = createWarningPrinter([
    "Using the Sanity client without specifying an API version is deprecated.",
    `See ${generateHelpUrl("js-client-api-version")}`
]), printNoDefaultExport = createWarningPrinter([
    "The default export of @sanity/client has been deprecated. Use the named export `createClient` instead."
]), defaultCdnHost = "apicdn.sanity.io", defaultConfig = {
    apiHost: "https://api.sanity.io",
    apiVersion: "1",
    useProjectHostname: !0,
    stega: {
        enabled: !1
    }
}, LOCALHOSTS = [
    "localhost",
    "127.0.0.1",
    "0.0.0.0"
], isLocal = (host)=>LOCALHOSTS.indexOf(host) !== -1;
function validateApiVersion(apiVersion) {
    if (apiVersion === "1" || apiVersion === "X") return;
    const apiDate = new Date(apiVersion);
    if (!(/^\d{4}-\d{2}-\d{2}$/.test(apiVersion) && apiDate instanceof Date && apiDate.getTime() > 0)) throw new Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`");
}
function validateApiPerspective(perspective) {
    if (Array.isArray(perspective) && perspective.length > 1 && perspective.includes("raw")) throw new TypeError('Invalid API perspective value: "raw". The raw-perspective can not be combined with other perspectives');
}
const initConfig = (config, prevConfig)=>{
    const specifiedConfig = {
        ...prevConfig,
        ...config,
        stega: {
            ...typeof prevConfig.stega == "boolean" ? {
                enabled: prevConfig.stega
            } : prevConfig.stega || defaultConfig.stega,
            ...typeof config.stega == "boolean" ? {
                enabled: config.stega
            } : config.stega || {}
        }
    };
    specifiedConfig.apiVersion || printNoApiVersionSpecifiedWarning();
    const newConfig = {
        ...defaultConfig,
        ...specifiedConfig
    }, projectBased = newConfig.useProjectHostname && !newConfig["~experimental_resource"];
    if (typeof Promise > "u") {
        const helpUrl = generateHelpUrl("js-client-promise-polyfill");
        throw new Error(`No native Promise-implementation found, polyfill needed - see ${helpUrl}`);
    }
    if (projectBased && !newConfig.projectId) throw new Error("Configuration must contain `projectId`");
    if (newConfig["~experimental_resource"] && resourceConfig(newConfig), typeof newConfig.perspective < "u" && validateApiPerspective(newConfig.perspective), "encodeSourceMap" in newConfig) throw new Error("It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMap' is not supported in '@sanity/client'. Did you mean 'stega.enabled'?");
    if ("encodeSourceMapAtPath" in newConfig) throw new Error("It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMapAtPath' is not supported in '@sanity/client'. Did you mean 'stega.filter'?");
    if (typeof newConfig.stega.enabled != "boolean") throw new Error(`stega.enabled must be a boolean, received ${newConfig.stega.enabled}`);
    if (newConfig.stega.enabled && newConfig.stega.studioUrl === void 0) throw new Error("stega.studioUrl must be defined when stega.enabled is true");
    if (newConfig.stega.enabled && typeof newConfig.stega.studioUrl != "string" && typeof newConfig.stega.studioUrl != "function") throw new Error(`stega.studioUrl must be a string or a function, received ${newConfig.stega.studioUrl}`);
    const isBrowser = ("TURBOPACK compile-time value", "undefined") < "u" && window.location && window.location.hostname, isLocalhost = isBrowser && isLocal(window.location.hostname), hasToken = !!newConfig.token;
    newConfig.withCredentials && hasToken && (printCredentialedTokenWarning(), newConfig.withCredentials = !1), isBrowser && isLocalhost && hasToken && newConfig.ignoreBrowserTokenWarning !== !0 ? printBrowserTokenWarning() : typeof newConfig.useCdn > "u" && printCdnWarning(), projectBased && projectId(newConfig.projectId), newConfig.dataset && dataset(newConfig.dataset), "requestTagPrefix" in newConfig && (newConfig.requestTagPrefix = newConfig.requestTagPrefix ? requestTag(newConfig.requestTagPrefix).replace(/\.+$/, "") : void 0), newConfig.apiVersion = `${newConfig.apiVersion}`.replace(/^v/, ""), newConfig.isDefaultApi = newConfig.apiHost === defaultConfig.apiHost, newConfig.useCdn === !0 && newConfig.withCredentials && printCdnAndWithCredentialsWarning(), newConfig.useCdn = newConfig.useCdn !== !1 && !newConfig.withCredentials, validateApiVersion(newConfig.apiVersion);
    const hostParts = newConfig.apiHost.split("://", 2), protocol = hostParts[0], host = hostParts[1], cdnHost = newConfig.isDefaultApi ? defaultCdnHost : host;
    return projectBased ? (newConfig.url = `${protocol}://${newConfig.projectId}.${host}/v${newConfig.apiVersion}`, newConfig.cdnUrl = `${protocol}://${newConfig.projectId}.${cdnHost}/v${newConfig.apiVersion}`) : (newConfig.url = `${newConfig.apiHost}/v${newConfig.apiVersion}`, newConfig.cdnUrl = newConfig.url), newConfig;
};
class ConnectionFailedError extends Error {
    name = "ConnectionFailedError";
}
class DisconnectError extends Error {
    name = "DisconnectError";
    reason;
    constructor(message, reason, options = {}){
        super(message, options), this.reason = reason;
    }
}
class ChannelError extends Error {
    name = "ChannelError";
    data;
    constructor(message, data){
        super(message), this.data = data;
    }
}
class MessageError extends Error {
    name = "MessageError";
    data;
    constructor(message, data, options = {}){
        super(message, options), this.data = data;
    }
}
class MessageParseError extends Error {
    name = "MessageParseError";
}
const REQUIRED_EVENTS = [
    "channelError",
    "disconnect"
];
function connectEventSource(initEventSource, events) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defer"])(()=>{
        const es = initEventSource();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isObservable"])(es) ? es : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["of"])(es);
    }).pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mergeMap"])((es)=>connectWithESInstance(es, events)));
}
function connectWithESInstance(es, events) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Observable"]((observer)=>{
        const emitOpen = events.includes("open"), emitReconnect = events.includes("reconnect");
        function onError(evt) {
            if ("data" in evt) {
                const [parseError, event] = parseEvent(evt);
                observer.error(parseError ? new MessageParseError("Unable to parse EventSource error message", {
                    cause: event
                }) : new MessageError((event?.data).message, event));
                return;
            }
            es.readyState === es.CLOSED ? observer.error(new ConnectionFailedError("EventSource connection failed")) : emitReconnect && observer.next({
                type: "reconnect"
            });
        }
        function onOpen() {
            observer.next({
                type: "open"
            });
        }
        function onMessage(message) {
            const [parseError, event] = parseEvent(message);
            if (parseError) {
                observer.error(new MessageParseError("Unable to parse EventSource message", {
                    cause: parseError
                }));
                return;
            }
            if (message.type === "channelError") {
                observer.error(new ChannelError(extractErrorMessage(event?.data), event.data));
                return;
            }
            if (message.type === "disconnect") {
                observer.error(new DisconnectError(`Server disconnected client: ${event.data?.reason || "unknown error"}`));
                return;
            }
            observer.next({
                type: message.type,
                id: message.lastEventId,
                ...event.data ? {
                    data: event.data
                } : {}
            });
        }
        es.addEventListener("error", onError), emitOpen && es.addEventListener("open", onOpen);
        const cleanedEvents = [
            .../* @__PURE__ */ new Set([
                ...REQUIRED_EVENTS,
                ...events
            ])
        ].filter((type)=>type !== "error" && type !== "open" && type !== "reconnect");
        return cleanedEvents.forEach((type)=>es.addEventListener(type, onMessage)), ()=>{
            es.removeEventListener("error", onError), emitOpen && es.removeEventListener("open", onOpen), cleanedEvents.forEach((type)=>es.removeEventListener(type, onMessage)), es.close();
        };
    });
}
function parseEvent(message) {
    try {
        const data = typeof message.data == "string" && JSON.parse(message.data);
        return [
            null,
            {
                type: message.type,
                id: message.lastEventId,
                ...isEmptyObject(data) ? {} : {
                    data
                }
            }
        ];
    } catch (err) {
        return [
            err,
            null
        ];
    }
}
function extractErrorMessage(err) {
    return err.error ? err.error.description ? err.error.description : typeof err.error == "string" ? err.error : JSON.stringify(err.error, null, 2) : err.message || "Unknown listener error";
}
function isEmptyObject(data) {
    for(const _ in data)return !1;
    return !0;
}
function getSelection(sel) {
    if (typeof sel == "string") return {
        id: sel
    };
    if (Array.isArray(sel)) return {
        query: "*[_id in $ids]",
        params: {
            ids: sel
        }
    };
    if (typeof sel == "object" && sel !== null && "query" in sel && typeof sel.query == "string") return "params" in sel && typeof sel.params == "object" && sel.params !== null ? {
        query: sel.query,
        params: sel.params
    } : {
        query: sel.query
    };
    const selectionOpts = [
        "* Document ID (<docId>)",
        "* Array of document IDs",
        "* Object containing `query`"
    ].join(`
`);
    throw new Error(`Unknown selection - must be one of:

${selectionOpts}`);
}
class BasePatch {
    selection;
    operations;
    constructor(selection, operations = {}){
        this.selection = selection, this.operations = operations;
    }
    /**
   * Sets the given attributes to the document. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */ set(attrs) {
        return this._assign("set", attrs);
    }
    /**
   * Sets the given attributes to the document if they are not currently set. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */ setIfMissing(attrs) {
        return this._assign("setIfMissing", attrs);
    }
    /**
   * Performs a "diff-match-patch" operation on the string attributes provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to perform operation on. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "dmp"\}
   */ diffMatchPatch(attrs) {
        return validateObject("diffMatchPatch", attrs), this._assign("diffMatchPatch", attrs);
    }
    /**
   * Unsets the attribute paths provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attribute paths to unset.
   */ unset(attrs) {
        if (!Array.isArray(attrs)) throw new Error("unset(attrs) takes an array of attributes to unset, non-array given");
        return this.operations = Object.assign({}, this.operations, {
            unset: attrs
        }), this;
    }
    /**
   * Increment a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to increment, values representing the number to increment by.
   */ inc(attrs) {
        return this._assign("inc", attrs);
    }
    /**
   * Decrement a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to decrement, values representing the number to decrement by.
   */ dec(attrs) {
        return this._assign("dec", attrs);
    }
    /**
   * Provides methods for modifying arrays, by inserting, appending and replacing elements via a JSONPath expression.
   *
   * @param at - Location to insert at, relative to the given selector, or 'replace' the matched path
   * @param selector - JSONPath expression, eg `comments[-1]` or `blocks[_key=="abc123"]`
   * @param items - Array of items to insert/replace
   */ insert(at, selector, items) {
        return validateInsert(at, selector, items), this._assign("insert", {
            [at]: selector,
            items
        });
    }
    /**
   * Append the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to append to, eg `comments` or `person.hobbies`
   * @param items - Array of items to append to the array
   */ append(selector, items) {
        return this.insert("after", `${selector}[-1]`, items);
    }
    /**
   * Prepend the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to prepend to, eg `comments` or `person.hobbies`
   * @param items - Array of items to prepend to the array
   */ prepend(selector, items) {
        return this.insert("before", `${selector}[0]`, items);
    }
    /**
   * Change the contents of an array by removing existing elements and/or adding new elements.
   *
   * @param selector - Attribute or JSONPath expression for array
   * @param start - Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end of the array (with origin -1) and will be set to 0 if absolute value is greater than the length of the array.x
   * @param deleteCount - An integer indicating the number of old array elements to remove.
   * @param items - The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   */ splice(selector, start, deleteCount, items) {
        const delAll = typeof deleteCount > "u" || deleteCount === -1, startIndex = start < 0 ? start - 1 : start, delCount = delAll ? -1 : Math.max(0, start + deleteCount), delRange = startIndex < 0 && delCount >= 0 ? "" : delCount, rangeSelector = `${selector}[${startIndex}:${delRange}]`;
        return this.insert("replace", rangeSelector, items || []);
    }
    /**
   * Adds a revision clause, preventing the document from being patched if the `_rev` property does not match the given value
   *
   * @param rev - Revision to lock the patch to
   */ ifRevisionId(rev) {
        return this.operations.ifRevisionID = rev, this;
    }
    /**
   * Return a plain JSON representation of the patch
   */ serialize() {
        return {
            ...getSelection(this.selection),
            ...this.operations
        };
    }
    /**
   * Return a plain JSON representation of the patch
   */ toJSON() {
        return this.serialize();
    }
    /**
   * Clears the patch of all operations
   */ reset() {
        return this.operations = {}, this;
    }
    _assign(op, props, merge2 = !0) {
        return validateObject(op, props), this.operations = Object.assign({}, this.operations, {
            [op]: Object.assign({}, merge2 && this.operations[op] || {}, props)
        }), this;
    }
    _set(op, props) {
        return this._assign(op, props, !1);
    }
}
class ObservablePatch extends BasePatch {
    #client;
    constructor(selection, operations, client){
        super(selection, operations), this.#client = client;
    }
    /**
   * Clones the patch
   */ clone() {
        return new ObservablePatch(this.selection, {
            ...this.operations
        }, this.#client);
    }
    commit(options) {
        if (!this.#client) throw new Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");
        const returnFirst = typeof this.selection == "string", opts = Object.assign({
            returnFirst,
            returnDocuments: !0
        }, options);
        return this.#client.mutate({
            patch: this.serialize()
        }, opts);
    }
}
class Patch extends BasePatch {
    #client;
    constructor(selection, operations, client){
        super(selection, operations), this.#client = client;
    }
    /**
   * Clones the patch
   */ clone() {
        return new Patch(this.selection, {
            ...this.operations
        }, this.#client);
    }
    commit(options) {
        if (!this.#client) throw new Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");
        const returnFirst = typeof this.selection == "string", opts = Object.assign({
            returnFirst,
            returnDocuments: !0
        }, options);
        return this.#client.mutate({
            patch: this.serialize()
        }, opts);
    }
}
const defaultMutateOptions = {
    returnDocuments: !1
};
class BaseTransaction {
    operations;
    trxId;
    constructor(operations = [], transactionId){
        this.operations = operations, this.trxId = transactionId;
    }
    /**
   * Creates a new Sanity document. If `_id` is provided and already exists, the mutation will fail. If no `_id` is given, one will automatically be generated by the database.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create. Requires a `_type` property.
   */ create(doc) {
        return validateObject("create", doc), this._add({
            create: doc
        });
    }
    /**
   * Creates a new Sanity document. If a document with the same `_id` already exists, the create operation will be ignored.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create if it does not already exist. Requires `_id` and `_type` properties.
   */ createIfNotExists(doc) {
        const op = "createIfNotExists";
        return validateObject(op, doc), requireDocumentId(op, doc), this._add({
            [op]: doc
        });
    }
    /**
   * Creates a new Sanity document, or replaces an existing one if the same `_id` is already used.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create or replace. Requires `_id` and `_type` properties.
   */ createOrReplace(doc) {
        const op = "createOrReplace";
        return validateObject(op, doc), requireDocumentId(op, doc), this._add({
            [op]: doc
        });
    }
    /**
   * Deletes the document with the given document ID
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param documentId - Document ID to delete
   */ delete(documentId) {
        return validateDocumentId("delete", documentId), this._add({
            delete: {
                id: documentId
            }
        });
    }
    transactionId(id) {
        return id ? (this.trxId = id, this) : this.trxId;
    }
    /**
   * Return a plain JSON representation of the transaction
   */ serialize() {
        return [
            ...this.operations
        ];
    }
    /**
   * Return a plain JSON representation of the transaction
   */ toJSON() {
        return this.serialize();
    }
    /**
   * Clears the transaction of all operations
   */ reset() {
        return this.operations = [], this;
    }
    _add(mut) {
        return this.operations.push(mut), this;
    }
}
class Transaction extends BaseTransaction {
    #client;
    constructor(operations, client, transactionId){
        super(operations, transactionId), this.#client = client;
    }
    /**
   * Clones the transaction
   */ clone() {
        return new Transaction([
            ...this.operations
        ], this.#client, this.trxId);
    }
    commit(options) {
        if (!this.#client) throw new Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");
        return this.#client.mutate(this.serialize(), Object.assign({
            transactionId: this.trxId
        }, defaultMutateOptions, options || {}));
    }
    patch(patchOrDocumentId, patchOps) {
        const isBuilder = typeof patchOps == "function", isPatch = typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof Patch, isMutationSelection = typeof patchOrDocumentId == "object" && ("query" in patchOrDocumentId || "id" in patchOrDocumentId);
        if (isPatch) return this._add({
            patch: patchOrDocumentId.serialize()
        });
        if (isBuilder) {
            const patch = patchOps(new Patch(patchOrDocumentId, {}, this.#client));
            if (!(patch instanceof Patch)) throw new Error("function passed to `patch()` must return the patch");
            return this._add({
                patch: patch.serialize()
            });
        }
        if (isMutationSelection) {
            const patch = new Patch(patchOrDocumentId, patchOps || {}, this.#client);
            return this._add({
                patch: patch.serialize()
            });
        }
        return this._add({
            patch: {
                id: patchOrDocumentId,
                ...patchOps
            }
        });
    }
}
class ObservableTransaction extends BaseTransaction {
    #client;
    constructor(operations, client, transactionId){
        super(operations, transactionId), this.#client = client;
    }
    /**
   * Clones the transaction
   */ clone() {
        return new ObservableTransaction([
            ...this.operations
        ], this.#client, this.trxId);
    }
    commit(options) {
        if (!this.#client) throw new Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");
        return this.#client.mutate(this.serialize(), Object.assign({
            transactionId: this.trxId
        }, defaultMutateOptions, options || {}));
    }
    patch(patchOrDocumentId, patchOps) {
        const isBuilder = typeof patchOps == "function";
        if (typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof ObservablePatch) return this._add({
            patch: patchOrDocumentId.serialize()
        });
        if (isBuilder) {
            const patch = patchOps(new ObservablePatch(patchOrDocumentId, {}, this.#client));
            if (!(patch instanceof ObservablePatch)) throw new Error("function passed to `patch()` must return the patch");
            return this._add({
                patch: patch.serialize()
            });
        }
        return this._add({
            patch: {
                id: patchOrDocumentId,
                ...patchOps
            }
        });
    }
}
const projectHeader = "X-Sanity-Project-ID";
function requestOptions(config, overrides = {}) {
    const headers = {}, token = overrides.token || config.token;
    token && (headers.Authorization = `Bearer ${token}`), !overrides.useGlobalApi && !config.useProjectHostname && config.projectId && (headers[projectHeader] = config.projectId);
    const withCredentials = !!(typeof overrides.withCredentials > "u" ? config.withCredentials : overrides.withCredentials), timeout = typeof overrides.timeout > "u" ? config.timeout : overrides.timeout;
    return Object.assign({}, overrides, {
        headers: Object.assign({}, headers, overrides.headers || {}),
        timeout: typeof timeout > "u" ? 5 * 60 * 1e3 : timeout,
        proxy: overrides.proxy || config.proxy,
        json: !0,
        withCredentials,
        fetch: typeof overrides.fetch == "object" && typeof config.fetch == "object" ? {
            ...config.fetch,
            ...overrides.fetch
        } : overrides.fetch || config.fetch
    });
}
const encodeQueryString = ({ query, params = {}, options = {} })=>{
    const searchParams = new URLSearchParams(), { tag, includeMutations, returnQuery, ...opts } = options;
    tag && searchParams.append("tag", tag), searchParams.append("query", query);
    for (const [key, value] of Object.entries(params))searchParams.append(`$${key}`, JSON.stringify(value));
    for (const [key, value] of Object.entries(opts))value && searchParams.append(key, `${value}`);
    return returnQuery === !1 && searchParams.append("returnQuery", "false"), includeMutations === !1 && searchParams.append("includeMutations", "false"), `?${searchParams}`;
}, excludeFalsey = (param, defValue)=>param === !1 ? void 0 : typeof param > "u" ? defValue : param, getMutationQuery = (options = {})=>({
        dryRun: options.dryRun,
        returnIds: !0,
        returnDocuments: excludeFalsey(options.returnDocuments, !0),
        visibility: options.visibility || "sync",
        autoGenerateArrayKeys: options.autoGenerateArrayKeys,
        skipCrossDatasetReferenceValidation: options.skipCrossDatasetReferenceValidation
    }), isResponse = (event)=>event.type === "response", getBody = (event)=>event.body, indexBy = (docs, attr)=>docs.reduce((indexed, doc)=>(indexed[attr(doc)] = doc, indexed), /* @__PURE__ */ Object.create(null)), getQuerySizeLimit = 11264;
function _fetch(client, httpRequest, _stega, query, _params = {}, options = {}) {
    const stega = "stega" in options ? {
        ..._stega || {},
        ...typeof options.stega == "boolean" ? {
            enabled: options.stega
        } : options.stega || {}
    } : _stega, params = stega.enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$_chunks$2d$es$2f$stegaClean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stegaClean"])(_params) : _params, mapResponse = options.filterResponse === !1 ? (res)=>res : (res)=>res.result, { cache, next, ...opts } = {
        // Opt out of setting a `signal` on an internal `fetch` if one isn't provided.
        // This is necessary in React Server Components to avoid opting out of Request Memoization.
        useAbortSignal: typeof options.signal < "u",
        // Set `resultSourceMap' when stega is enabled, as it's required for encoding.
        resultSourceMap: stega.enabled ? "withKeyArraySelector" : options.resultSourceMap,
        ...options,
        // Default to not returning the query, unless `filterResponse` is `false`,
        // or `returnQuery` is explicitly set. `true` is the default in Content Lake, so skip if truthy
        returnQuery: options.filterResponse === !1 && options.returnQuery !== !1
    }, reqOpts = typeof cache < "u" || typeof next < "u" ? {
        ...opts,
        fetch: {
            cache,
            next
        }
    } : opts, $request = _dataRequest(client, httpRequest, "query", {
        query,
        params
    }, reqOpts);
    return stega.enabled ? $request.pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["combineLatestWith"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["from"])(__turbopack_context__.A("[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/client/dist/_chunks-es/stegaEncodeSourceMap.js [app-rsc] (ecmascript, async loader)").then(function(n) {
        return n.stegaEncodeSourceMap$1;
    }).then(({ stegaEncodeSourceMap })=>stegaEncodeSourceMap))), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["map"])(([res, stegaEncodeSourceMap])=>{
        const result = stegaEncodeSourceMap(res.result, res.resultSourceMap, stega);
        return mapResponse({
            ...res,
            result
        });
    })) : $request.pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["map"])(mapResponse));
}
function _getDocument(client, httpRequest, id, opts = {}) {
    const options = {
        uri: _getDataUrl(client, "doc", id),
        json: !0,
        tag: opts.tag,
        signal: opts.signal
    };
    return _requestObservable(client, httpRequest, options).pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["filter"])(isResponse), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["map"])((event)=>event.body.documents && event.body.documents[0]));
}
function _getDocuments(client, httpRequest, ids, opts = {}) {
    const options = {
        uri: _getDataUrl(client, "doc", ids.join(",")),
        json: !0,
        tag: opts.tag,
        signal: opts.signal
    };
    return _requestObservable(client, httpRequest, options).pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["filter"])(isResponse), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["map"])((event)=>{
        const indexed = indexBy(event.body.documents || [], (doc)=>doc._id);
        return ids.map((id)=>indexed[id] || null);
    }));
}
function _createIfNotExists(client, httpRequest, doc, options) {
    return requireDocumentId("createIfNotExists", doc), _create(client, httpRequest, doc, "createIfNotExists", options);
}
function _createOrReplace(client, httpRequest, doc, options) {
    return requireDocumentId("createOrReplace", doc), _create(client, httpRequest, doc, "createOrReplace", options);
}
function _delete(client, httpRequest, selection, options) {
    return _dataRequest(client, httpRequest, "mutate", {
        mutations: [
            {
                delete: getSelection(selection)
            }
        ]
    }, options);
}
function _mutate(client, httpRequest, mutations, options) {
    let mut;
    mutations instanceof Patch || mutations instanceof ObservablePatch ? mut = {
        patch: mutations.serialize()
    } : mutations instanceof Transaction || mutations instanceof ObservableTransaction ? mut = mutations.serialize() : mut = mutations;
    const muts = Array.isArray(mut) ? mut : [
        mut
    ], transactionId = options && options.transactionId || void 0;
    return _dataRequest(client, httpRequest, "mutate", {
        mutations: muts,
        transactionId
    }, options);
}
function _action(client, httpRequest, actions, options) {
    const acts = Array.isArray(actions) ? actions : [
        actions
    ], transactionId = options && options.transactionId || void 0, skipCrossDatasetReferenceValidation = options && options.skipCrossDatasetReferenceValidation || void 0, dryRun = options && options.dryRun || void 0;
    return _dataRequest(client, httpRequest, "actions", {
        actions: acts,
        transactionId,
        skipCrossDatasetReferenceValidation,
        dryRun
    }, options);
}
function _dataRequest(client, httpRequest, endpoint, body, options = {}) {
    const isMutation = endpoint === "mutate", isAction = endpoint === "actions", isQuery2 = endpoint === "query", strQuery = isMutation || isAction ? "" : encodeQueryString(body), useGet = !isMutation && !isAction && strQuery.length < getQuerySizeLimit, stringQuery = useGet ? strQuery : "", returnFirst = options.returnFirst, { timeout, token, tag, headers, returnQuery, lastLiveEventId, cacheMode } = options, uri = _getDataUrl(client, endpoint, stringQuery), reqOptions = {
        method: useGet ? "GET" : "POST",
        uri,
        json: !0,
        body: useGet ? void 0 : body,
        query: isMutation && getMutationQuery(options),
        timeout,
        headers,
        token,
        tag,
        returnQuery,
        perspective: options.perspective,
        resultSourceMap: options.resultSourceMap,
        lastLiveEventId: Array.isArray(lastLiveEventId) ? lastLiveEventId[0] : lastLiveEventId,
        cacheMode,
        canUseCdn: isQuery2,
        signal: options.signal,
        fetch: options.fetch,
        useAbortSignal: options.useAbortSignal,
        useCdn: options.useCdn
    };
    return _requestObservable(client, httpRequest, reqOptions).pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["filter"])(isResponse), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["map"])(getBody), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["map"])((res)=>{
        if (!isMutation) return res;
        const results = res.results || [];
        if (options.returnDocuments) return returnFirst ? results[0] && results[0].document : results.map((mut)=>mut.document);
        const key = returnFirst ? "documentId" : "documentIds", ids = returnFirst ? results[0] && results[0].id : results.map((mut)=>mut.id);
        return {
            transactionId: res.transactionId,
            results,
            [key]: ids
        };
    }));
}
function _create(client, httpRequest, doc, op, options = {}) {
    const mutation = {
        [op]: doc
    }, opts = Object.assign({
        returnFirst: !0,
        returnDocuments: !0
    }, options);
    return _dataRequest(client, httpRequest, "mutate", {
        mutations: [
            mutation
        ]
    }, opts);
}
const hasDataConfig = (client)=>client.config().dataset !== void 0 && client.config().projectId !== void 0 || client.config()["~experimental_resource"] !== void 0, isQuery = (client, uri)=>hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "query")), isMutate = (client, uri)=>hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "mutate")), isDoc = (client, uri)=>hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "doc", "")), isListener = (client, uri)=>hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "listen")), isHistory = (client, uri)=>hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "history", "")), isData = (client, uri)=>uri.startsWith("/data/") || isQuery(client, uri) || isMutate(client, uri) || isDoc(client, uri) || isListener(client, uri) || isHistory(client, uri);
function _requestObservable(client, httpRequest, options) {
    const uri = options.url || options.uri, config = client.config(), canUseCdn = typeof options.canUseCdn > "u" ? [
        "GET",
        "HEAD"
    ].indexOf(options.method || "GET") >= 0 && isData(client, uri) : options.canUseCdn;
    let useCdn = (options.useCdn ?? config.useCdn) && canUseCdn;
    const tag = options.tag && config.requestTagPrefix ? [
        config.requestTagPrefix,
        options.tag
    ].join(".") : options.tag || config.requestTagPrefix;
    if (tag && options.tag !== null && (options.query = {
        tag: requestTag(tag),
        ...options.query
    }), [
        "GET",
        "HEAD",
        "POST"
    ].indexOf(options.method || "GET") >= 0 && isQuery(client, uri)) {
        const resultSourceMap = options.resultSourceMap ?? config.resultSourceMap;
        resultSourceMap !== void 0 && resultSourceMap !== !1 && (options.query = {
            resultSourceMap,
            ...options.query
        });
        const perspectiveOption = options.perspective || config.perspective;
        typeof perspectiveOption < "u" && (perspectiveOption === "previewDrafts" && printPreviewDraftsDeprecationWarning(), validateApiPerspective(perspectiveOption), options.query = {
            perspective: Array.isArray(perspectiveOption) ? perspectiveOption.join(",") : perspectiveOption,
            ...options.query
        }, (Array.isArray(perspectiveOption) && perspectiveOption.length > 0 || // previewDrafts was renamed to drafts, but keep for backwards compat
        perspectiveOption === "previewDrafts" || perspectiveOption === "drafts") && useCdn && (useCdn = !1, printCdnPreviewDraftsWarning())), options.lastLiveEventId && (options.query = {
            ...options.query,
            lastLiveEventId: options.lastLiveEventId
        }), options.returnQuery === !1 && (options.query = {
            returnQuery: "false",
            ...options.query
        }), useCdn && options.cacheMode == "noStale" && (options.query = {
            cacheMode: "noStale",
            ...options.query
        });
    }
    const reqOptions = requestOptions(config, Object.assign({}, options, {
        url: _getUrl(client, uri, useCdn)
    })), request = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Observable"]((subscriber)=>httpRequest(reqOptions, config.requester).subscribe(subscriber));
    return options.signal ? request.pipe(_withAbortSignal(options.signal)) : request;
}
function _request(client, httpRequest, options) {
    return _requestObservable(client, httpRequest, options).pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["filter"])((event)=>event.type === "response"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["map"])((event)=>event.body));
}
function _getDataUrl(client, operation, path) {
    const config = client.config();
    if (config["~experimental_resource"]) {
        resourceConfig(config);
        const resourceBase = resourceDataBase(config), uri2 = path !== void 0 ? `${operation}/${path}` : operation;
        return `${resourceBase}/${uri2}`.replace(/\/($|\?)/, "$1");
    }
    const catalog = hasDataset(config), baseUri = `/${operation}/${catalog}`;
    return `/data${path !== void 0 ? `${baseUri}/${path}` : baseUri}`.replace(/\/($|\?)/, "$1");
}
function _getUrl(client, uri, canUseCdn = !1) {
    const { url, cdnUrl } = client.config();
    return `${canUseCdn ? cdnUrl : url}/${uri.replace(/^\//, "")}`;
}
function _withAbortSignal(signal) {
    return (input)=>new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Observable"]((observer)=>{
            const abort = ()=>observer.error(_createAbortError(signal));
            if (signal && signal.aborted) {
                abort();
                return;
            }
            const subscription = input.subscribe(observer);
            return signal.addEventListener("abort", abort), ()=>{
                signal.removeEventListener("abort", abort), subscription.unsubscribe();
            };
        });
}
const isDomExceptionSupported = !!globalThis.DOMException;
function _createAbortError(signal) {
    if (isDomExceptionSupported) return new DOMException(signal?.reason ?? "The operation was aborted.", "AbortError");
    const error = new Error(signal?.reason ?? "The operation was aborted.");
    return error.name = "AbortError", error;
}
const resourceDataBase = (config)=>{
    if (!config["~experimental_resource"]) throw new Error("`resource` must be provided to perform resource queries");
    const { type, id } = config["~experimental_resource"];
    switch(type){
        case "dataset":
            {
                const segments = id.split(".");
                if (segments.length !== 2) throw new Error('Dataset ID must be in the format "project.dataset"');
                return `/projects/${segments[0]}/datasets/${segments[1]}`;
            }
        case "canvas":
            return `/canvases/${id}`;
        case "media-library":
            return `/media-libraries/${id}`;
        case "dashboard":
            return `/dashboards/${id}`;
        default:
            throw new Error(`Unsupported resource type: ${type.toString()}`);
    }
};
class ObservableAssetsClient {
    #client;
    #httpRequest;
    constructor(client, httpRequest){
        this.#client = client, this.#httpRequest = httpRequest;
    }
    upload(assetType, body, options) {
        return _upload(this.#client, this.#httpRequest, assetType, body, options);
    }
}
class AssetsClient {
    #client;
    #httpRequest;
    constructor(client, httpRequest){
        this.#client = client, this.#httpRequest = httpRequest;
    }
    upload(assetType, body, options) {
        const observable2 = _upload(this.#client, this.#httpRequest, assetType, body, options);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(observable2.pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["filter"])((event)=>event.type === "response"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["map"])((event)=>event.body.document)));
    }
}
function _upload(client, httpRequest, assetType, body, opts = {}) {
    validateAssetType(assetType);
    let meta = opts.extract || void 0;
    meta && !meta.length && (meta = [
        "none"
    ]);
    const config = client.config(), options = optionsFromFile(opts, body), { tag, label, title, description, creditLine, filename, source } = options, query = {
        label,
        title,
        description,
        filename,
        meta,
        creditLine
    };
    return source && (query.sourceId = source.id, query.sourceName = source.name, query.sourceUrl = source.url), _requestObservable(client, httpRequest, {
        tag,
        method: "POST",
        timeout: options.timeout || 0,
        uri: buildAssetUploadUrl(config, assetType),
        headers: options.contentType ? {
            "Content-Type": options.contentType
        } : {},
        query,
        body
    });
}
function buildAssetUploadUrl(config, assetType) {
    const assetTypeEndpoint = assetType === "image" ? "images" : "files";
    if (config["~experimental_resource"]) {
        const { type, id } = config["~experimental_resource"];
        switch(type){
            case "dataset":
                throw new Error("Assets are not supported for dataset resources, yet. Configure the client with `{projectId: <projectId>, dataset: <datasetId>}` instead.");
            case "canvas":
                return `/canvases/${id}/assets/${assetTypeEndpoint}`;
            case "media-library":
                return `/media-libraries/${id}/upload`;
            case "dashboard":
                return `/dashboards/${id}/assets/${assetTypeEndpoint}`;
            default:
                throw new Error(`Unsupported resource type: ${type.toString()}`);
        }
    }
    const dataset2 = hasDataset(config);
    return `assets/${assetTypeEndpoint}/${dataset2}`;
}
function optionsFromFile(opts, file) {
    return typeof File > "u" || !(file instanceof File) ? opts : Object.assign({
        filename: opts.preserveFilename === !1 ? void 0 : file.name,
        contentType: file.type
    }, opts);
}
var defaults = (obj, defaults2)=>Object.keys(defaults2).concat(Object.keys(obj)).reduce((target, prop)=>(target[prop] = typeof obj[prop] > "u" ? defaults2[prop] : obj[prop], target), {});
const pick = (obj, props)=>props.reduce((selection, prop)=>(typeof obj[prop] > "u" || (selection[prop] = obj[prop]), selection), {}), eventSourcePolyfill = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defer"])(()=>__turbopack_context__.A("[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/eventsource/node.js [app-rsc] (ecmascript, async loader)")).pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["map"])(({ default: EventSource2 })=>EventSource2), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["shareReplay"])(1));
function reconnectOnConnectionFailure() {
    return function(source) {
        return source.pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["catchError"])((err, caught)=>err instanceof ConnectionFailedError ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["concat"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["of"])({
                type: "reconnect"
            }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timer"])(1e3).pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mergeMap"])(()=>caught))) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["throwError"])(()=>err)));
    };
}
const MAX_URL_LENGTH = 14800, possibleOptions = [
    "includePreviousRevision",
    "includeResult",
    "includeMutations",
    "includeAllVersions",
    "visibility",
    "effectFormat",
    "tag"
], defaultOptions = {
    includeResult: !0
};
function _listen(query, params, opts = {}) {
    const { url, token, withCredentials, requestTagPrefix } = this.config(), tag = opts.tag && requestTagPrefix ? [
        requestTagPrefix,
        opts.tag
    ].join(".") : opts.tag, options = {
        ...defaults(opts, defaultOptions),
        tag
    }, listenOpts = pick(options, possibleOptions), qs = encodeQueryString({
        query,
        params,
        options: {
            tag,
            ...listenOpts
        }
    }), uri = `${url}${_getDataUrl(this, "listen", qs)}`;
    if (uri.length > MAX_URL_LENGTH) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["throwError"])(()=>new Error("Query too large for listener"));
    const listenFor = options.events ? options.events : [
        "mutation"
    ], esOptions = {};
    return withCredentials && (esOptions.withCredentials = !0), token && (esOptions.headers = {
        Authorization: `Bearer ${token}`
    }), connectEventSource(()=>// use polyfill if there is no global EventSource or if we need to set headers
        (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["of"])(EventSource)).pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["map"])((EventSource2)=>new EventSource2(uri, esOptions))), listenFor).pipe(reconnectOnConnectionFailure(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["filter"])((event)=>listenFor.includes(event.type)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["map"])((event)=>({
            type: event.type,
            ..."data" in event ? event.data : {}
        })));
}
function shareReplayLatest(configOrPredicate, config) {
    return _shareReplayLatest(typeof configOrPredicate == "function" ? {
        predicate: configOrPredicate,
        ...config
    } : configOrPredicate);
}
function _shareReplayLatest(config) {
    return (source)=>{
        let latest, emitted = !1;
        const { predicate, ...shareConfig } = config, wrapped = source.pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tap"])((value)=>{
            config.predicate(value) && (emitted = !0, latest = value);
        }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["finalize"])(()=>{
            emitted = !1, latest = void 0;
        }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["share"])(shareConfig)), emitLatest = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Observable"]((subscriber)=>{
            emitted && subscriber.next(// this cast is safe because of the emitted check which asserts that we got T from the source
            latest), subscriber.complete();
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["merge"])(wrapped, emitLatest);
    };
}
const requiredApiVersion = "2021-03-25";
class LiveClient {
    #client;
    constructor(client){
        this.#client = client;
    }
    /**
   * Requires `apiVersion` to be `2021-03-25` or later.
   */ events({ includeDrafts = !1, tag: _tag } = {}) {
        resourceGuard("live", this.#client.config());
        const { projectId: projectId2, apiVersion: _apiVersion, token, withCredentials, requestTagPrefix } = this.#client.config(), apiVersion = _apiVersion.replace(/^v/, "");
        if (apiVersion !== "X" && apiVersion < requiredApiVersion) throw new Error(`The live events API requires API version ${requiredApiVersion} or later. The current API version is ${apiVersion}. Please update your API version to use this feature.`);
        if (includeDrafts && !token && !withCredentials) throw new Error("The live events API requires a token or withCredentials when 'includeDrafts: true'. Please update your client configuration. The token should have the lowest possible access role.");
        const path = _getDataUrl(this.#client, "live/events"), url = new URL(this.#client.getUrl(path, !1)), tag = _tag && requestTagPrefix ? [
            requestTagPrefix,
            _tag
        ].join(".") : _tag;
        tag && url.searchParams.set("tag", tag), includeDrafts && url.searchParams.set("includeDrafts", "true");
        const esOptions = {};
        includeDrafts && token && (esOptions.headers = {
            Authorization: `Bearer ${token}`
        }), includeDrafts && withCredentials && (esOptions.withCredentials = !0);
        const key = `${url.href}::${JSON.stringify(esOptions)}`, existing = eventsCache.get(key);
        if (existing) return existing;
        const events = connectEventSource(()=>// use polyfill if there is no global EventSource or if we need to set headers
            (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["of"])(EventSource)).pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["map"])((EventSource2)=>new EventSource2(url.href, esOptions))), [
            "message",
            "restart",
            "welcome",
            "reconnect",
            "goaway"
        ]).pipe(reconnectOnConnectionFailure(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["map"])((event)=>{
            if (event.type === "message") {
                const { data, ...rest } = event;
                return {
                    ...rest,
                    tags: data.tags
                };
            }
            return event;
        })), checkCors = fetchObservable(url, {
            method: "OPTIONS",
            mode: "cors",
            credentials: esOptions.withCredentials ? "include" : "omit",
            headers: esOptions.headers
        }).pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mergeMap"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EMPTY"]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["catchError"])(()=>{
            throw new CorsOriginError({
                projectId: projectId2
            });
        })), observable2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["concat"])(checkCors, events).pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$operators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["finalize"])(()=>eventsCache.delete(key)), shareReplayLatest({
            predicate: (event)=>event.type === "welcome"
        }));
        return eventsCache.set(key, observable2), observable2;
    }
}
function fetchObservable(url, init) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Observable"]((observer)=>{
        const controller = new AbortController(), signal = controller.signal;
        return fetch(url, {
            ...init,
            signal: controller.signal
        }).then((response)=>{
            observer.next(response), observer.complete();
        }, (err)=>{
            signal.aborted || observer.error(err);
        }), ()=>controller.abort();
    });
}
const eventsCache = /* @__PURE__ */ new Map();
class ObservableDatasetsClient {
    #client;
    #httpRequest;
    constructor(client, httpRequest){
        this.#client = client, this.#httpRequest = httpRequest;
    }
    /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */ create(name, options) {
        return _modify(this.#client, this.#httpRequest, "PUT", name, options);
    }
    /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */ edit(name, options) {
        return _modify(this.#client, this.#httpRequest, "PATCH", name, options);
    }
    /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */ delete(name) {
        return _modify(this.#client, this.#httpRequest, "DELETE", name);
    }
    /**
   * Fetch a list of datasets for the configured project
   */ list() {
        return _request(this.#client, this.#httpRequest, {
            uri: "/datasets",
            tag: null
        });
    }
}
class DatasetsClient {
    #client;
    #httpRequest;
    constructor(client, httpRequest){
        this.#client = client, this.#httpRequest = httpRequest;
    }
    /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */ create(name, options) {
        return resourceGuard("dataset", this.#client.config()), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_modify(this.#client, this.#httpRequest, "PUT", name, options));
    }
    /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */ edit(name, options) {
        return resourceGuard("dataset", this.#client.config()), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_modify(this.#client, this.#httpRequest, "PATCH", name, options));
    }
    /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */ delete(name) {
        return resourceGuard("dataset", this.#client.config()), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_modify(this.#client, this.#httpRequest, "DELETE", name));
    }
    /**
   * Fetch a list of datasets for the configured project
   */ list() {
        return resourceGuard("dataset", this.#client.config()), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_request(this.#client, this.#httpRequest, {
            uri: "/datasets",
            tag: null
        }));
    }
}
function _modify(client, httpRequest, method, name, options) {
    return resourceGuard("dataset", client.config()), dataset(name), _request(client, httpRequest, {
        method,
        uri: `/datasets/${name}`,
        body: options,
        tag: null
    });
}
class ObservableProjectsClient {
    #client;
    #httpRequest;
    constructor(client, httpRequest){
        this.#client = client, this.#httpRequest = httpRequest;
    }
    list(options) {
        resourceGuard("projects", this.#client.config());
        const uri = options?.includeMembers === !1 ? "/projects?includeMembers=false" : "/projects";
        return _request(this.#client, this.#httpRequest, {
            uri
        });
    }
    /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */ getById(projectId2) {
        return resourceGuard("projects", this.#client.config()), _request(this.#client, this.#httpRequest, {
            uri: `/projects/${projectId2}`
        });
    }
}
class ProjectsClient {
    #client;
    #httpRequest;
    constructor(client, httpRequest){
        this.#client = client, this.#httpRequest = httpRequest;
    }
    list(options) {
        resourceGuard("projects", this.#client.config());
        const uri = options?.includeMembers === !1 ? "/projects?includeMembers=false" : "/projects";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_request(this.#client, this.#httpRequest, {
            uri
        }));
    }
    /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */ getById(projectId2) {
        return resourceGuard("projects", this.#client.config()), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_request(this.#client, this.#httpRequest, {
            uri: `/projects/${projectId2}`
        }));
    }
}
class ObservableUsersClient {
    #client;
    #httpRequest;
    constructor(client, httpRequest){
        this.#client = client, this.#httpRequest = httpRequest;
    }
    /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */ getById(id) {
        return _request(this.#client, this.#httpRequest, {
            uri: `/users/${id}`
        });
    }
}
class UsersClient {
    #client;
    #httpRequest;
    constructor(client, httpRequest){
        this.#client = client, this.#httpRequest = httpRequest;
    }
    /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */ getById(id) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_request(this.#client, this.#httpRequest, {
            uri: `/users/${id}`
        }));
    }
}
class ObservableSanityClient {
    assets;
    datasets;
    live;
    projects;
    users;
    /**
   * Private properties
   */ #clientConfig;
    #httpRequest;
    /**
   * Instance properties
   */ listen = _listen;
    constructor(httpRequest, config = defaultConfig){
        this.config(config), this.#httpRequest = httpRequest, this.assets = new ObservableAssetsClient(this, this.#httpRequest), this.datasets = new ObservableDatasetsClient(this, this.#httpRequest), this.live = new LiveClient(this), this.projects = new ObservableProjectsClient(this, this.#httpRequest), this.users = new ObservableUsersClient(this, this.#httpRequest);
    }
    /**
   * Clone the client - returns a new instance
   */ clone() {
        return new ObservableSanityClient(this.#httpRequest, this.config());
    }
    config(newConfig) {
        if (newConfig === void 0) return {
            ...this.#clientConfig
        };
        if (this.#clientConfig && this.#clientConfig.allowReconfigure === !1) throw new Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");
        return this.#clientConfig = initConfig(newConfig, this.#clientConfig || {}), this;
    }
    /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */ withConfig(newConfig) {
        const thisConfig = this.config();
        return new ObservableSanityClient(this.#httpRequest, {
            ...thisConfig,
            ...newConfig,
            stega: {
                ...thisConfig.stega || {},
                ...typeof newConfig?.stega == "boolean" ? {
                    enabled: newConfig.stega
                } : newConfig?.stega || {}
            }
        });
    }
    fetch(query, params, options) {
        return _fetch(this, this.#httpRequest, this.#clientConfig.stega, query, params, options);
    }
    /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */ getDocument(id, options) {
        return _getDocument(this, this.#httpRequest, id, options);
    }
    /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */ getDocuments(ids, options) {
        return _getDocuments(this, this.#httpRequest, ids, options);
    }
    create(document, options) {
        return _create(this, this.#httpRequest, document, "create", options);
    }
    createIfNotExists(document, options) {
        return _createIfNotExists(this, this.#httpRequest, document, options);
    }
    createOrReplace(document, options) {
        return _createOrReplace(this, this.#httpRequest, document, options);
    }
    delete(selection, options) {
        return _delete(this, this.#httpRequest, selection, options);
    }
    mutate(operations, options) {
        return _mutate(this, this.#httpRequest, operations, options);
    }
    /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */ patch(selection, operations) {
        return new ObservablePatch(selection, operations, this);
    }
    /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */ transaction(operations) {
        return new ObservableTransaction(operations, this);
    }
    /**
   * Perform action operations against the configured dataset
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */ action(operations, options) {
        return _action(this, this.#httpRequest, operations, options);
    }
    /**
   * Perform an HTTP request against the Sanity API
   *
   * @param options - Request options
   */ request(options) {
        return _request(this, this.#httpRequest, options);
    }
    /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */ getUrl(uri, canUseCdn) {
        return _getUrl(this, uri, canUseCdn);
    }
    /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */ getDataUrl(operation, path) {
        return _getDataUrl(this, operation, path);
    }
}
class SanityClient {
    assets;
    datasets;
    live;
    projects;
    users;
    /**
   * Observable version of the Sanity client, with the same configuration as the promise-based one
   */ observable;
    /**
   * Private properties
   */ #clientConfig;
    #httpRequest;
    /**
   * Instance properties
   */ listen = _listen;
    constructor(httpRequest, config = defaultConfig){
        this.config(config), this.#httpRequest = httpRequest, this.assets = new AssetsClient(this, this.#httpRequest), this.datasets = new DatasetsClient(this, this.#httpRequest), this.live = new LiveClient(this), this.projects = new ProjectsClient(this, this.#httpRequest), this.users = new UsersClient(this, this.#httpRequest), this.observable = new ObservableSanityClient(httpRequest, config);
    }
    /**
   * Clone the client - returns a new instance
   */ clone() {
        return new SanityClient(this.#httpRequest, this.config());
    }
    config(newConfig) {
        if (newConfig === void 0) return {
            ...this.#clientConfig
        };
        if (this.#clientConfig && this.#clientConfig.allowReconfigure === !1) throw new Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");
        return this.observable && this.observable.config(newConfig), this.#clientConfig = initConfig(newConfig, this.#clientConfig || {}), this;
    }
    /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */ withConfig(newConfig) {
        const thisConfig = this.config();
        return new SanityClient(this.#httpRequest, {
            ...thisConfig,
            ...newConfig,
            stega: {
                ...thisConfig.stega || {},
                ...typeof newConfig?.stega == "boolean" ? {
                    enabled: newConfig.stega
                } : newConfig?.stega || {}
            }
        });
    }
    fetch(query, params, options) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_fetch(this, this.#httpRequest, this.#clientConfig.stega, query, params, options));
    }
    /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */ getDocument(id, options) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_getDocument(this, this.#httpRequest, id, options));
    }
    /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */ getDocuments(ids, options) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_getDocuments(this, this.#httpRequest, ids, options));
    }
    create(document, options) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_create(this, this.#httpRequest, document, "create", options));
    }
    createIfNotExists(document, options) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_createIfNotExists(this, this.#httpRequest, document, options));
    }
    createOrReplace(document, options) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_createOrReplace(this, this.#httpRequest, document, options));
    }
    delete(selection, options) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_delete(this, this.#httpRequest, selection, options));
    }
    mutate(operations, options) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_mutate(this, this.#httpRequest, operations, options));
    }
    /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */ patch(documentId, operations) {
        return new Patch(documentId, operations, this);
    }
    /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */ transaction(operations) {
        return new Transaction(operations, this);
    }
    /**
   * Perform action operations against the configured dataset
   * Returns a promise that resolves to the transaction result
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */ action(operations, options) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_action(this, this.#httpRequest, operations, options));
    }
    /**
   * Perform a request against the Sanity API
   * NOTE: Only use this for Sanity API endpoints, not for your own APIs!
   *
   * @param options - Request options
   * @returns Promise resolving to the response body
   */ request(options) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_request(this, this.#httpRequest, options));
    }
    /**
   * Perform an HTTP request a `/data` sub-endpoint
   * NOTE: Considered internal, thus marked as deprecated. Use `request` instead.
   *
   * @deprecated - Use `request()` or your own HTTP library instead
   * @param endpoint - Endpoint to hit (mutate, query etc)
   * @param body - Request body
   * @param options - Request options
   * @internal
   */ dataRequest(endpoint, body, options) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lastValueFrom"])(_dataRequest(this, this.#httpRequest, endpoint, body, options));
    }
    /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */ getUrl(uri, canUseCdn) {
        return _getUrl(this, uri, canUseCdn);
    }
    /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */ getDataUrl(operation, path) {
        return _getDataUrl(this, operation, path);
    }
}
function defineCreateClientExports(envMiddleware2, ClassConstructor) {
    return {
        requester: defineHttpRequest(envMiddleware2),
        createClient: (config)=>{
            const clientRequester = defineHttpRequest(envMiddleware2);
            return new ClassConstructor((options, requester2)=>(requester2 || clientRequester)({
                    maxRedirects: 0,
                    maxRetries: config.maxRetries,
                    retryDelay: config.retryDelay,
                    ...options
                }), config);
        }
    };
}
function defineDeprecatedCreateClient(createClient2) {
    return function(config) {
        return printNoDefaultExport(), createClient2(config);
    };
}
var envMiddleware = [];
const exp = defineCreateClientExports(envMiddleware, SanityClient), requester = exp.requester, createClient = exp.createClient, deprecatedCreateClient = defineDeprecatedCreateClient(createClient);
;
 //# sourceMappingURL=index.browser.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/image-url/lib/node/parseAssetId.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var example = 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg';
function parseAssetId(ref) {
    var _a = ref.split('-'), id = _a[1], dimensionString = _a[2], format = _a[3];
    if (!id || !dimensionString || !format) {
        throw new Error("Malformed asset _ref '".concat(ref, "'. Expected an id like \"").concat(example, "\"."));
    }
    var _b = dimensionString.split('x'), imgWidthStr = _b[0], imgHeightStr = _b[1];
    var width = +imgWidthStr;
    var height = +imgHeightStr;
    var isValidAssetId = isFinite(width) && isFinite(height);
    if (!isValidAssetId) {
        throw new Error("Malformed asset _ref '".concat(ref, "'. Expected an id like \"").concat(example, "\"."));
    }
    return {
        id: id,
        width: width,
        height: height,
        format: format
    };
}
exports.default = parseAssetId; //# sourceMappingURL=parseAssetId.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/image-url/lib/node/parseSource.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __assign = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__assign || function() {
    __assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isInProgressUpload = void 0;
var isRef = function(src) {
    var source = src;
    return source ? typeof source._ref === 'string' : false;
};
var isAsset = function(src) {
    var source = src;
    return source ? typeof source._id === 'string' : false;
};
var isAssetStub = function(src) {
    var source = src;
    return source && source.asset ? typeof source.asset.url === 'string' : false;
};
// Detect in-progress uploads (has upload key but no complete asset reference)
var isInProgressUpload = function(src) {
    if (typeof src === 'object' && src !== null) {
        var obj = src;
        // Check if it has an upload key (indicating in-progress upload)
        return obj._upload && (!obj.asset || !obj.asset._ref);
    }
    return false;
};
exports.isInProgressUpload = isInProgressUpload;
// Convert an asset-id, asset or image to an image record suitable for processing
// eslint-disable-next-line complexity
function parseSource(source) {
    if (!source) {
        return null;
    }
    var image;
    if (typeof source === 'string' && isUrl(source)) {
        // Someone passed an existing image url?
        image = {
            asset: {
                _ref: urlToId(source)
            }
        };
    } else if (typeof source === 'string') {
        // Just an asset id
        image = {
            asset: {
                _ref: source
            }
        };
    } else if (isRef(source)) {
        // We just got passed an asset directly
        image = {
            asset: source
        };
    } else if (isAsset(source)) {
        // If we were passed an image asset document
        image = {
            asset: {
                _ref: source._id || ''
            }
        };
    } else if (isAssetStub(source)) {
        // If we were passed a partial asset (`url`, but no `_id`)
        image = {
            asset: {
                _ref: urlToId(source.asset.url)
            }
        };
    } else if (typeof source.asset === 'object') {
        // Probably an actual image with materialized asset
        image = __assign({}, source);
    } else {
        // We got something that does not look like an image, or it is an image
        // that currently isn't sporting an asset.
        return null;
    }
    var img = source;
    if (img.crop) {
        image.crop = img.crop;
    }
    if (img.hotspot) {
        image.hotspot = img.hotspot;
    }
    return applyDefaults(image);
}
exports.default = parseSource;
function isUrl(url) {
    return /^https?:\/\//.test("".concat(url));
}
function urlToId(url) {
    var parts = url.split('/').slice(-1);
    return "image-".concat(parts[0]).replace(/\.([a-z]+)$/, '-$1');
}
// Mock crop and hotspot if image lacks it
function applyDefaults(image) {
    if (image.crop && image.hotspot) {
        return image;
    }
    // We need to pad in default values for crop or hotspot
    var result = __assign({}, image);
    if (!result.crop) {
        result.crop = {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0
        };
    }
    if (!result.hotspot) {
        result.hotspot = {
            x: 0.5,
            y: 0.5,
            height: 1.0,
            width: 1.0
        };
    }
    return result;
} //# sourceMappingURL=parseSource.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/image-url/lib/node/urlForImage.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __assign = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__assign || function() {
    __assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseSource = exports.SPEC_NAME_TO_URL_NAME_MAPPINGS = void 0;
var parseAssetId_1 = __importDefault(__turbopack_context__.r("[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/image-url/lib/node/parseAssetId.js [app-rsc] (ecmascript)"));
var parseSource_1 = __importStar(__turbopack_context__.r("[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/image-url/lib/node/parseSource.js [app-rsc] (ecmascript)"));
exports.parseSource = parseSource_1.default;
exports.SPEC_NAME_TO_URL_NAME_MAPPINGS = [
    [
        'width',
        'w'
    ],
    [
        'height',
        'h'
    ],
    [
        'format',
        'fm'
    ],
    [
        'download',
        'dl'
    ],
    [
        'blur',
        'blur'
    ],
    [
        'sharpen',
        'sharp'
    ],
    [
        'invert',
        'invert'
    ],
    [
        'orientation',
        'or'
    ],
    [
        'minHeight',
        'min-h'
    ],
    [
        'maxHeight',
        'max-h'
    ],
    [
        'minWidth',
        'min-w'
    ],
    [
        'maxWidth',
        'max-w'
    ],
    [
        'quality',
        'q'
    ],
    [
        'fit',
        'fit'
    ],
    [
        'crop',
        'crop'
    ],
    [
        'saturation',
        'sat'
    ],
    [
        'auto',
        'auto'
    ],
    [
        'dpr',
        'dpr'
    ],
    [
        'pad',
        'pad'
    ],
    [
        'frame',
        'frame'
    ]
];
function urlForImage(options) {
    var spec = __assign({}, options || {});
    var source = spec.source;
    delete spec.source;
    var image = (0, parseSource_1.default)(source);
    if (!image) {
        if (source && (0, parseSource_1.isInProgressUpload)(source)) {
            // This is a placeholder image that will be replaced with the actual image when the upload is complete
            // This is a 0x0 transparent PNG image
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACfsD/QNViZkAAAAASUVORK5CYII=';
        }
        throw new Error("Unable to resolve image URL from source (".concat(JSON.stringify(source), ")"));
    }
    var id = image.asset._ref || image.asset._id || '';
    var asset = (0, parseAssetId_1.default)(id);
    // Compute crop rect in terms of pixel coordinates in the raw source image
    var cropLeft = Math.round(image.crop.left * asset.width);
    var cropTop = Math.round(image.crop.top * asset.height);
    var crop = {
        left: cropLeft,
        top: cropTop,
        width: Math.round(asset.width - image.crop.right * asset.width - cropLeft),
        height: Math.round(asset.height - image.crop.bottom * asset.height - cropTop)
    };
    // Compute hot spot rect in terms of pixel coordinates
    var hotSpotVerticalRadius = image.hotspot.height * asset.height / 2;
    var hotSpotHorizontalRadius = image.hotspot.width * asset.width / 2;
    var hotSpotCenterX = image.hotspot.x * asset.width;
    var hotSpotCenterY = image.hotspot.y * asset.height;
    var hotspot = {
        left: hotSpotCenterX - hotSpotHorizontalRadius,
        top: hotSpotCenterY - hotSpotVerticalRadius,
        right: hotSpotCenterX + hotSpotHorizontalRadius,
        bottom: hotSpotCenterY + hotSpotVerticalRadius
    };
    // If irrelevant, or if we are requested to: don't perform crop/fit based on
    // the crop/hotspot.
    if (!(spec.rect || spec.focalPoint || spec.ignoreImageParams || spec.crop)) {
        spec = __assign(__assign({}, spec), fit({
            crop: crop,
            hotspot: hotspot
        }, spec));
    }
    return specToImageUrl(__assign(__assign({}, spec), {
        asset: asset
    }));
}
exports.default = urlForImage;
// eslint-disable-next-line complexity
function specToImageUrl(spec) {
    var cdnUrl = (spec.baseUrl || 'https://cdn.sanity.io').replace(/\/+$/, '');
    var vanityStub = spec.vanityName ? "/".concat(spec.vanityName) : '';
    var filename = "".concat(spec.asset.id, "-").concat(spec.asset.width, "x").concat(spec.asset.height, ".").concat(spec.asset.format).concat(vanityStub);
    var baseUrl = "".concat(cdnUrl, "/images/").concat(spec.projectId, "/").concat(spec.dataset, "/").concat(filename);
    var params = [];
    if (spec.rect) {
        // Only bother url with a crop if it actually crops anything
        var _a = spec.rect, left = _a.left, top_1 = _a.top, width = _a.width, height = _a.height;
        var isEffectiveCrop = left !== 0 || top_1 !== 0 || height !== spec.asset.height || width !== spec.asset.width;
        if (isEffectiveCrop) {
            params.push("rect=".concat(left, ",").concat(top_1, ",").concat(width, ",").concat(height));
        }
    }
    if (spec.bg) {
        params.push("bg=".concat(spec.bg));
    }
    if (spec.focalPoint) {
        params.push("fp-x=".concat(spec.focalPoint.x));
        params.push("fp-y=".concat(spec.focalPoint.y));
    }
    var flip = [
        spec.flipHorizontal && 'h',
        spec.flipVertical && 'v'
    ].filter(Boolean).join('');
    if (flip) {
        params.push("flip=".concat(flip));
    }
    // Map from spec name to url param name, and allow using the actual param name as an alternative
    exports.SPEC_NAME_TO_URL_NAME_MAPPINGS.forEach(function(mapping) {
        var specName = mapping[0], param = mapping[1];
        if (typeof spec[specName] !== 'undefined') {
            params.push("".concat(param, "=").concat(encodeURIComponent(spec[specName])));
        } else if (typeof spec[param] !== 'undefined') {
            params.push("".concat(param, "=").concat(encodeURIComponent(spec[param])));
        }
    });
    if (params.length === 0) {
        return baseUrl;
    }
    return "".concat(baseUrl, "?").concat(params.join('&'));
}
function fit(source, spec) {
    var cropRect;
    var imgWidth = spec.width;
    var imgHeight = spec.height;
    // If we are not constraining the aspect ratio, we'll just use the whole crop
    if (!(imgWidth && imgHeight)) {
        return {
            width: imgWidth,
            height: imgHeight,
            rect: source.crop
        };
    }
    var crop = source.crop;
    var hotspot = source.hotspot;
    // If we are here, that means aspect ratio is locked and fitting will be a bit harder
    var desiredAspectRatio = imgWidth / imgHeight;
    var cropAspectRatio = crop.width / crop.height;
    if (cropAspectRatio > desiredAspectRatio) {
        // The crop is wider than the desired aspect ratio. That means we are cutting from the sides
        var height = Math.round(crop.height);
        var width = Math.round(height * desiredAspectRatio);
        var top_2 = Math.max(0, Math.round(crop.top));
        // Center output horizontally over hotspot
        var hotspotXCenter = Math.round((hotspot.right - hotspot.left) / 2 + hotspot.left);
        var left = Math.max(0, Math.round(hotspotXCenter - width / 2));
        // Keep output within crop
        if (left < crop.left) {
            left = crop.left;
        } else if (left + width > crop.left + crop.width) {
            left = crop.left + crop.width - width;
        }
        cropRect = {
            left: left,
            top: top_2,
            width: width,
            height: height
        };
    } else {
        // The crop is taller than the desired ratio, we are cutting from top and bottom
        var width = crop.width;
        var height = Math.round(width / desiredAspectRatio);
        var left = Math.max(0, Math.round(crop.left));
        // Center output vertically over hotspot
        var hotspotYCenter = Math.round((hotspot.bottom - hotspot.top) / 2 + hotspot.top);
        var top_3 = Math.max(0, Math.round(hotspotYCenter - height / 2));
        // Keep output rect within crop
        if (top_3 < crop.top) {
            top_3 = crop.top;
        } else if (top_3 + height > crop.top + crop.height) {
            top_3 = crop.top + crop.height - height;
        }
        cropRect = {
            left: left,
            top: top_3,
            width: width,
            height: height
        };
    }
    return {
        width: imgWidth,
        height: imgHeight,
        rect: cropRect
    };
} //# sourceMappingURL=urlForImage.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/image-url/lib/node/builder.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __assign = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__assign || function() {
    __assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageUrlBuilder = void 0;
var urlForImage_1 = __importStar(__turbopack_context__.r("[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/image-url/lib/node/urlForImage.js [app-rsc] (ecmascript)"));
var validFits = [
    'clip',
    'crop',
    'fill',
    'fillmax',
    'max',
    'scale',
    'min'
];
var validCrops = [
    'top',
    'bottom',
    'left',
    'right',
    'center',
    'focalpoint',
    'entropy'
];
var validAutoModes = [
    'format'
];
function isSanityModernClientLike(client) {
    return client && 'config' in client ? typeof client.config === 'function' : false;
}
function isSanityClientLike(client) {
    return client && 'clientConfig' in client ? typeof client.clientConfig === 'object' : false;
}
function rewriteSpecName(key) {
    var specs = urlForImage_1.SPEC_NAME_TO_URL_NAME_MAPPINGS;
    for(var _i = 0, specs_1 = specs; _i < specs_1.length; _i++){
        var entry = specs_1[_i];
        var specName = entry[0], param = entry[1];
        if (key === specName || key === param) {
            return specName;
        }
    }
    return key;
}
function urlBuilder(options) {
    // Did we get a modernish client?
    if (isSanityModernClientLike(options)) {
        // Inherit config from client
        var _a = options.config(), apiUrl = _a.apiHost, projectId = _a.projectId, dataset = _a.dataset;
        var apiHost = apiUrl || 'https://api.sanity.io';
        return new ImageUrlBuilder(null, {
            baseUrl: apiHost.replace(/^https:\/\/api\./, 'https://cdn.'),
            projectId: projectId,
            dataset: dataset
        });
    }
    // Did we get a SanityClient?
    if (isSanityClientLike(options)) {
        // Inherit config from client
        var _b = options.clientConfig, apiUrl = _b.apiHost, projectId = _b.projectId, dataset = _b.dataset;
        var apiHost = apiUrl || 'https://api.sanity.io';
        return new ImageUrlBuilder(null, {
            baseUrl: apiHost.replace(/^https:\/\/api\./, 'https://cdn.'),
            projectId: projectId,
            dataset: dataset
        });
    }
    // Or just accept the options as given
    return new ImageUrlBuilder(null, options || {});
}
exports.default = urlBuilder;
var ImageUrlBuilder = function() {
    function ImageUrlBuilder(parent, options) {
        this.options = parent ? __assign(__assign({}, parent.options || {}), options || {}) : __assign({}, options || {}); // Copy options
    }
    ImageUrlBuilder.prototype.withOptions = function(options) {
        var baseUrl = options.baseUrl || this.options.baseUrl;
        var newOptions = {
            baseUrl: baseUrl
        };
        for(var key in options){
            if (options.hasOwnProperty(key)) {
                var specKey = rewriteSpecName(key);
                newOptions[specKey] = options[key];
            }
        }
        return new ImageUrlBuilder(this, __assign({
            baseUrl: baseUrl
        }, newOptions));
    };
    // The image to be represented. Accepts a Sanity 'image'-document, 'asset'-document or
    // _id of asset. To get the benefit of automatic hot-spot/crop integration with the content
    // studio, the 'image'-document must be provided.
    ImageUrlBuilder.prototype.image = function(source) {
        return this.withOptions({
            source: source
        });
    };
    // Specify the dataset
    ImageUrlBuilder.prototype.dataset = function(dataset) {
        return this.withOptions({
            dataset: dataset
        });
    };
    // Specify the projectId
    ImageUrlBuilder.prototype.projectId = function(projectId) {
        return this.withOptions({
            projectId: projectId
        });
    };
    // Specify background color
    ImageUrlBuilder.prototype.bg = function(bg) {
        return this.withOptions({
            bg: bg
        });
    };
    // Set DPR scaling factor
    ImageUrlBuilder.prototype.dpr = function(dpr) {
        // A DPR of 1 is the default - so only include it if we have a different value
        return this.withOptions(dpr && dpr !== 1 ? {
            dpr: dpr
        } : {});
    };
    // Specify the width of the image in pixels
    ImageUrlBuilder.prototype.width = function(width) {
        return this.withOptions({
            width: width
        });
    };
    // Specify the height of the image in pixels
    ImageUrlBuilder.prototype.height = function(height) {
        return this.withOptions({
            height: height
        });
    };
    // Specify focal point in fraction of image dimensions. Each component 0.0-1.0
    ImageUrlBuilder.prototype.focalPoint = function(x, y) {
        return this.withOptions({
            focalPoint: {
                x: x,
                y: y
            }
        });
    };
    ImageUrlBuilder.prototype.maxWidth = function(maxWidth) {
        return this.withOptions({
            maxWidth: maxWidth
        });
    };
    ImageUrlBuilder.prototype.minWidth = function(minWidth) {
        return this.withOptions({
            minWidth: minWidth
        });
    };
    ImageUrlBuilder.prototype.maxHeight = function(maxHeight) {
        return this.withOptions({
            maxHeight: maxHeight
        });
    };
    ImageUrlBuilder.prototype.minHeight = function(minHeight) {
        return this.withOptions({
            minHeight: minHeight
        });
    };
    // Specify width and height in pixels
    ImageUrlBuilder.prototype.size = function(width, height) {
        return this.withOptions({
            width: width,
            height: height
        });
    };
    // Specify blur between 0 and 100
    ImageUrlBuilder.prototype.blur = function(blur) {
        return this.withOptions({
            blur: blur
        });
    };
    ImageUrlBuilder.prototype.sharpen = function(sharpen) {
        return this.withOptions({
            sharpen: sharpen
        });
    };
    // Specify the desired rectangle of the image
    ImageUrlBuilder.prototype.rect = function(left, top, width, height) {
        return this.withOptions({
            rect: {
                left: left,
                top: top,
                width: width,
                height: height
            }
        });
    };
    // Specify the image format of the image. 'jpg', 'pjpg', 'png', 'webp'
    ImageUrlBuilder.prototype.format = function(format) {
        return this.withOptions({
            format: format
        });
    };
    ImageUrlBuilder.prototype.invert = function(invert) {
        return this.withOptions({
            invert: invert
        });
    };
    // Rotation in degrees 0, 90, 180, 270
    ImageUrlBuilder.prototype.orientation = function(orientation) {
        return this.withOptions({
            orientation: orientation
        });
    };
    // Compression quality 0-100
    ImageUrlBuilder.prototype.quality = function(quality) {
        return this.withOptions({
            quality: quality
        });
    };
    // Make it a download link. Parameter is default filename.
    ImageUrlBuilder.prototype.forceDownload = function(download) {
        return this.withOptions({
            download: download
        });
    };
    // Flip image horizontally
    ImageUrlBuilder.prototype.flipHorizontal = function() {
        return this.withOptions({
            flipHorizontal: true
        });
    };
    // Flip image vertically
    ImageUrlBuilder.prototype.flipVertical = function() {
        return this.withOptions({
            flipVertical: true
        });
    };
    // Ignore crop/hotspot from image record, even when present
    ImageUrlBuilder.prototype.ignoreImageParams = function() {
        return this.withOptions({
            ignoreImageParams: true
        });
    };
    ImageUrlBuilder.prototype.fit = function(value) {
        if (validFits.indexOf(value) === -1) {
            throw new Error("Invalid fit mode \"".concat(value, "\""));
        }
        return this.withOptions({
            fit: value
        });
    };
    ImageUrlBuilder.prototype.crop = function(value) {
        if (validCrops.indexOf(value) === -1) {
            throw new Error("Invalid crop mode \"".concat(value, "\""));
        }
        return this.withOptions({
            crop: value
        });
    };
    // Saturation
    ImageUrlBuilder.prototype.saturation = function(saturation) {
        return this.withOptions({
            saturation: saturation
        });
    };
    ImageUrlBuilder.prototype.auto = function(value) {
        if (validAutoModes.indexOf(value) === -1) {
            throw new Error("Invalid auto mode \"".concat(value, "\""));
        }
        return this.withOptions({
            auto: value
        });
    };
    // Specify the number of pixels to pad the image
    ImageUrlBuilder.prototype.pad = function(pad) {
        return this.withOptions({
            pad: pad
        });
    };
    // Vanity URL for more SEO friendly URLs
    ImageUrlBuilder.prototype.vanityName = function(value) {
        return this.withOptions({
            vanityName: value
        });
    };
    ImageUrlBuilder.prototype.frame = function(frame) {
        if (frame !== 1) {
            throw new Error("Invalid frame value \"".concat(frame, "\""));
        }
        return this.withOptions({
            frame: frame
        });
    };
    // Gets the url based on the submitted parameters
    ImageUrlBuilder.prototype.url = function() {
        return (0, urlForImage_1.default)(this.options);
    };
    // Alias for url()
    ImageUrlBuilder.prototype.toString = function() {
        return this.url();
    };
    return ImageUrlBuilder;
}();
exports.ImageUrlBuilder = ImageUrlBuilder; //# sourceMappingURL=builder.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/image-url/lib/node/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
var builder_1 = __importDefault(__turbopack_context__.r("[project]/Documents/GitHub/langley-portfolio/node_modules/@sanity/image-url/lib/node/builder.js [app-rsc] (ecmascript)"));
module.exports = builder_1.default; //# sourceMappingURL=index.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/@portabletext/toolkit/dist/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LIST_NEST_MODE_DIRECT",
    ()=>LIST_NEST_MODE_DIRECT,
    "LIST_NEST_MODE_HTML",
    ()=>LIST_NEST_MODE_HTML,
    "buildMarksTree",
    ()=>buildMarksTree,
    "isPortableTextBlock",
    ()=>isPortableTextBlock,
    "isPortableTextListItemBlock",
    ()=>isPortableTextListItemBlock,
    "isPortableTextSpan",
    ()=>isPortableTextSpan,
    "isPortableTextToolkitList",
    ()=>isPortableTextToolkitList,
    "isPortableTextToolkitSpan",
    ()=>isPortableTextToolkitSpan,
    "isPortableTextToolkitTextNode",
    ()=>isPortableTextToolkitTextNode,
    "nestLists",
    ()=>nestLists,
    "sortMarksByOccurences",
    ()=>sortMarksByOccurences,
    "spanToPlainText",
    ()=>spanToPlainText,
    "toPlainText",
    ()=>toPlainText
]);
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function isPortableTextSpan(node) {
    return node._type === "span" && "text" in node && typeof node.text == "string" && (typeof node.marks > "u" || Array.isArray(node.marks) && node.marks.every((mark)=>typeof mark == "string"));
}
function isPortableTextBlock(node) {
    return(// A block doesn't _have_ to be named 'block' - to differentiate between
    // allowed child types and marks, one might name them differently
    typeof node._type == "string" && // Toolkit-types like nested spans are @-prefixed
    node._type[0] !== "@" && (// `markDefs` isn't _required_ per say, but if it's there, it needs to be an array
    !("markDefs" in node) || !node.markDefs || Array.isArray(node.markDefs) && // Every mark definition needs to have an `_key` to be mappable in child spans
    node.markDefs.every((def)=>typeof def._key == "string")) && // `children` is required and needs to be an array
    "children" in node && Array.isArray(node.children) && // All children are objects with `_type` (usually spans, but can contain other stuff)
    node.children.every((child)=>typeof child == "object" && "_type" in child));
}
function isPortableTextListItemBlock(block) {
    return isPortableTextBlock(block) && "listItem" in block && typeof block.listItem == "string" && (typeof block.level > "u" || typeof block.level == "number");
}
function isPortableTextToolkitList(block) {
    return block._type === "@list";
}
function isPortableTextToolkitSpan(span) {
    return span._type === "@span";
}
function isPortableTextToolkitTextNode(node) {
    return node._type === "@text";
}
const knownDecorators = [
    "strong",
    "em",
    "code",
    "underline",
    "strike-through"
];
function sortMarksByOccurences(span, index, blockChildren) {
    if (!isPortableTextSpan(span) || !span.marks) return [];
    if (!span.marks.length) return [];
    const marks = span.marks.slice(), occurences = {};
    return marks.forEach((mark)=>{
        occurences[mark] = 1;
        for(let siblingIndex = index + 1; siblingIndex < blockChildren.length; siblingIndex++){
            const sibling = blockChildren[siblingIndex];
            if (sibling && isPortableTextSpan(sibling) && Array.isArray(sibling.marks) && sibling.marks.indexOf(mark) !== -1) occurences[mark]++;
            else break;
        }
    }), marks.sort((markA, markB)=>sortMarks(occurences, markA, markB));
}
function sortMarks(occurences, markA, markB) {
    const aOccurences = occurences[markA], bOccurences = occurences[markB];
    if (aOccurences !== bOccurences) return bOccurences - aOccurences;
    const aKnownPos = knownDecorators.indexOf(markA), bKnownPos = knownDecorators.indexOf(markB);
    return aKnownPos !== bKnownPos ? aKnownPos - bKnownPos : markA.localeCompare(markB);
}
function buildMarksTree(block) {
    var _a, _b;
    const { children } = block, markDefs = (_a = block.markDefs) != null ? _a : [];
    if (!children || !children.length) return [];
    const sortedMarks = children.map(sortMarksByOccurences), rootNode = {
        _type: "@span",
        children: [],
        markType: "<unknown>"
    };
    let nodeStack = [
        rootNode
    ];
    for(let i = 0; i < children.length; i++){
        const span = children[i];
        if (!span) continue;
        const marksNeeded = sortedMarks[i] || [];
        let pos = 1;
        if (nodeStack.length > 1) for(pos; pos < nodeStack.length; pos++){
            const mark = ((_b = nodeStack[pos]) == null ? void 0 : _b.markKey) || "", index = marksNeeded.indexOf(mark);
            if (index === -1) break;
            marksNeeded.splice(index, 1);
        }
        nodeStack = nodeStack.slice(0, pos);
        let currentNode = nodeStack[nodeStack.length - 1];
        if (currentNode) {
            for (const markKey of marksNeeded){
                const markDef = markDefs == null ? void 0 : markDefs.find((def)=>def._key === markKey), markType = markDef ? markDef._type : markKey, node = {
                    _type: "@span",
                    _key: span._key,
                    children: [],
                    markDef,
                    markType,
                    markKey
                };
                currentNode.children.push(node), nodeStack.push(node), currentNode = node;
            }
            if (isPortableTextSpan(span)) {
                const lines = span.text.split(`
`);
                for(let line = lines.length; line-- > 1;)lines.splice(line, 0, `
`);
                currentNode.children = currentNode.children.concat(lines.map((text)=>({
                        _type: "@text",
                        text
                    })));
            } else currentNode.children = currentNode.children.concat(span);
        }
    }
    return rootNode.children;
}
function nestLists(blocks, mode) {
    const tree = [];
    let currentList;
    for(let i = 0; i < blocks.length; i++){
        const block = blocks[i];
        if (block) {
            if (!isPortableTextListItemBlock(block)) {
                tree.push(block), currentList = void 0;
                continue;
            }
            if (!currentList) {
                currentList = listFromBlock(block, i, mode), tree.push(currentList);
                continue;
            }
            if (blockMatchesList(block, currentList)) {
                currentList.children.push(block);
                continue;
            }
            if ((block.level || 1) > currentList.level) {
                const newList = listFromBlock(block, i, mode);
                if (mode === "html") {
                    const lastListItem = currentList.children[currentList.children.length - 1], newLastChild = _objectSpread(_objectSpread({}, lastListItem), {}, {
                        children: [
                            ...lastListItem.children,
                            newList
                        ]
                    });
                    currentList.children[currentList.children.length - 1] = newLastChild;
                } else currentList.children.push(newList);
                currentList = newList;
                continue;
            }
            if ((block.level || 1) < currentList.level) {
                const matchingBranch = tree[tree.length - 1], match = matchingBranch && findListMatching(matchingBranch, block);
                if (match) {
                    currentList = match, currentList.children.push(block);
                    continue;
                }
                currentList = listFromBlock(block, i, mode), tree.push(currentList);
                continue;
            }
            if (block.listItem !== currentList.listItem) {
                const matchingBranch = tree[tree.length - 1], match = matchingBranch && findListMatching(matchingBranch, {
                    level: block.level || 1
                });
                if (match && match.listItem === block.listItem) {
                    currentList = match, currentList.children.push(block);
                    continue;
                } else {
                    currentList = listFromBlock(block, i, mode), tree.push(currentList);
                    continue;
                }
            }
            console.warn("Unknown state encountered for block", block), tree.push(block);
        }
    }
    return tree;
}
function blockMatchesList(block, list) {
    return (block.level || 1) === list.level && block.listItem === list.listItem;
}
function listFromBlock(block, index, mode) {
    return {
        _type: "@list",
        _key: `${block._key || `${index}`}-parent`,
        mode,
        level: block.level || 1,
        listItem: block.listItem,
        children: [
            block
        ]
    };
}
function findListMatching(rootNode, matching) {
    const level = matching.level || 1, style = matching.listItem || "normal", filterOnType = typeof matching.listItem == "string";
    if (isPortableTextToolkitList(rootNode) && (rootNode.level || 1) === level && filterOnType && (rootNode.listItem || "normal") === style) return rootNode;
    if (!("children" in rootNode)) return;
    const node = rootNode.children[rootNode.children.length - 1];
    return node && !isPortableTextSpan(node) ? findListMatching(node, matching) : void 0;
}
function spanToPlainText(span) {
    let text = "";
    return span.children.forEach((current)=>{
        isPortableTextToolkitTextNode(current) ? text += current.text : isPortableTextToolkitSpan(current) && (text += spanToPlainText(current));
    }), text;
}
const leadingSpace = /^\s/, trailingSpace = /\s$/;
function toPlainText(block) {
    const blocks = Array.isArray(block) ? block : [
        block
    ];
    let text = "";
    return blocks.forEach((current, index)=>{
        if (!isPortableTextBlock(current)) return;
        let pad = !1;
        current.children.forEach((span)=>{
            isPortableTextSpan(span) ? (text += pad && text && !trailingSpace.test(text) && !leadingSpace.test(span.text) ? " " : "", text += span.text, pad = !1) : pad = !0;
        }), index !== blocks.length - 1 && (text += `

`);
    }), text;
}
const LIST_NEST_MODE_HTML = "html", LIST_NEST_MODE_DIRECT = "direct";
;
 //# sourceMappingURL=index.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/@portabletext/react/dist/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PortableText",
    ()=>PortableText,
    "defaultComponents",
    ()=>defaultComponents,
    "mergeComponents",
    ()=>mergeComponents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$portabletext$2f$toolkit$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/@portabletext/toolkit/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
const _excluded = [
    "block",
    "list",
    "listItem",
    "marks",
    "types"
], _excluded2 = [
    "listItem"
], _excluded3 = [
    "_key"
];
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
;
;
;
;
const defaultLists = {
    number: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("ol", {
            children
        }),
    bullet: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("ul", {
            children
        })
}, DefaultListItem = ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("li", {
        children
    }), link = ({ children, value })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("a", {
        href: value == null ? void 0 : value.href,
        children
    }), underlineStyle = {
    textDecoration: "underline"
}, defaultMarks = {
    em: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("em", {
            children
        }),
    strong: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("strong", {
            children
        }),
    code: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("code", {
            children
        }),
    underline: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("span", {
            style: underlineStyle,
            children
        }),
    "strike-through": ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("del", {
            children
        }),
    link
}, getTemplate = (type, prop)=>`[@portabletext/react] Unknown ${type}, specify a component for it in the \`components.${prop}\` prop`, unknownTypeWarning = (typeName)=>getTemplate(`block type "${typeName}"`, "types"), unknownMarkWarning = (markType)=>getTemplate(`mark type "${markType}"`, "marks"), unknownBlockStyleWarning = (blockStyle)=>getTemplate(`block style "${blockStyle}"`, "block"), unknownListStyleWarning = (listStyle)=>getTemplate(`list style "${listStyle}"`, "list"), unknownListItemStyleWarning = (listStyle)=>getTemplate(`list item style "${listStyle}"`, "listItem");
function printWarning(message) {
    console.warn(message);
}
const hidden = {
    display: "none"
}, DefaultUnknownType = ({ value, isInline })=>{
    const warning = unknownTypeWarning(value._type);
    return isInline ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("span", {
        style: hidden,
        children: warning
    }) : /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("div", {
        style: hidden,
        children: warning
    });
}, DefaultUnknownMark = ({ markType, children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("span", {
        className: `unknown__pt__mark__${markType}`,
        children
    }), DefaultUnknownBlockStyle = ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("p", {
        children
    }), DefaultUnknownList = ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("ul", {
        children
    }), DefaultUnknownListItem = ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("li", {
        children
    }), DefaultHardBreak = ()=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("br", {}), defaultBlockStyles = {
    normal: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("p", {
            children
        }),
    blockquote: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("blockquote", {
            children
        }),
    h1: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h1", {
            children
        }),
    h2: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h2", {
            children
        }),
    h3: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h3", {
            children
        }),
    h4: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h4", {
            children
        }),
    h5: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h5", {
            children
        }),
    h6: ({ children })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h6", {
            children
        })
}, defaultComponents = {
    types: {},
    block: defaultBlockStyles,
    marks: defaultMarks,
    list: defaultLists,
    listItem: DefaultListItem,
    hardBreak: DefaultHardBreak,
    unknownType: DefaultUnknownType,
    unknownMark: DefaultUnknownMark,
    unknownList: DefaultUnknownList,
    unknownListItem: DefaultUnknownListItem,
    unknownBlockStyle: DefaultUnknownBlockStyle
};
function mergeComponents(parent, overrides) {
    const { block, list, listItem, marks, types } = overrides, rest = _objectWithoutProperties(overrides, _excluded);
    return _objectSpread(_objectSpread({}, parent), {}, {
        block: mergeDeeply(parent, overrides, "block"),
        list: mergeDeeply(parent, overrides, "list"),
        listItem: mergeDeeply(parent, overrides, "listItem"),
        marks: mergeDeeply(parent, overrides, "marks"),
        types: mergeDeeply(parent, overrides, "types")
    }, rest);
}
function mergeDeeply(parent, overrides, key) {
    const override = overrides[key], parentVal = parent[key];
    return typeof override == "function" || override && typeof parentVal == "function" ? override : override ? _objectSpread(_objectSpread({}, parentVal), override) : parentVal;
}
function PortableText({ value: input, components: componentOverrides, listNestingMode, onMissingComponent: missingComponentHandler = printWarning }) {
    const handleMissingComponent = missingComponentHandler || noop, blocks = Array.isArray(input) ? input : [
        input
    ], nested = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$portabletext$2f$toolkit$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nestLists"])(blocks, listNestingMode || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$portabletext$2f$toolkit$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LIST_NEST_MODE_HTML"]), components = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(()=>componentOverrides ? mergeComponents(defaultComponents, componentOverrides) : defaultComponents, [
        componentOverrides
    ]), renderNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(()=>getNodeRenderer(components, handleMissingComponent), [
        components,
        handleMissingComponent
    ]), rendered = nested.map((node, index)=>renderNode({
            node,
            index,
            isInline: !1,
            renderNode
        }));
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: rendered
    });
}
const getNodeRenderer = (components, handleMissingComponent)=>{
    function renderNode(options) {
        const { node, index, isInline } = options, key = node._key || `node-${index}`;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$portabletext$2f$toolkit$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPortableTextToolkitList"])(node) ? renderList(node, index, key) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$portabletext$2f$toolkit$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPortableTextListItemBlock"])(node) ? renderListItem(node, index, key) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$portabletext$2f$toolkit$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPortableTextToolkitSpan"])(node) ? renderSpan(node, index, key) : hasCustomComponentForNode(node) ? renderCustomBlock(node, index, key, isInline) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$portabletext$2f$toolkit$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPortableTextBlock"])(node) ? renderBlock(node, index, key, isInline) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$portabletext$2f$toolkit$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPortableTextToolkitTextNode"])(node) ? renderText(node, key) : renderUnknownType(node, index, key, isInline);
    }
    function hasCustomComponentForNode(node) {
        return node._type in components.types;
    }
    function renderListItem(node, index, key) {
        const tree = serializeBlock({
            node,
            index,
            isInline: !1,
            renderNode
        }), renderer = components.listItem, Li = (typeof renderer == "function" ? renderer : renderer[node.listItem]) || components.unknownListItem;
        if (Li === components.unknownListItem) {
            const style = node.listItem || "bullet";
            handleMissingComponent(unknownListItemStyleWarning(style), {
                type: style,
                nodeType: "listItemStyle"
            });
        }
        let children = tree.children;
        if (node.style && node.style !== "normal") {
            const { listItem } = node, blockNode = _objectWithoutProperties(node, _excluded2);
            children = renderNode({
                node: blockNode,
                index,
                isInline: !1
            });
        }
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(Li, {
            value: node,
            index,
            isInline: !1,
            renderNode,
            children
        }, key);
    }
    function renderList(node, index, key) {
        const children = node.children.map((child, childIndex)=>renderNode({
                node: child._key ? child : _objectSpread(_objectSpread({}, child), {}, {
                    _key: `li-${index}-${childIndex}`
                }),
                index: childIndex,
                isInline: !1
            })), component = components.list, List = (typeof component == "function" ? component : component[node.listItem]) || components.unknownList;
        if (List === components.unknownList) {
            const style = node.listItem || "bullet";
            handleMissingComponent(unknownListStyleWarning(style), {
                nodeType: "listStyle",
                type: style
            });
        }
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(List, {
            value: node,
            index,
            isInline: !1,
            renderNode,
            children
        }, key);
    }
    function renderSpan(node, _index, key) {
        const { markDef, markType, markKey } = node, Span = components.marks[markType] || components.unknownMark, children = node.children.map((child, childIndex)=>renderNode({
                node: child,
                index: childIndex,
                isInline: !0
            }));
        return Span === components.unknownMark && handleMissingComponent(unknownMarkWarning(markType), {
            nodeType: "mark",
            type: markType
        }), /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(Span, {
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$portabletext$2f$toolkit$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["spanToPlainText"])(node),
            value: markDef,
            markType,
            markKey,
            renderNode,
            children
        }, key);
    }
    function renderBlock(node, index, key, isInline) {
        const _serializeBlock = serializeBlock({
            node,
            index,
            isInline,
            renderNode
        }), { _key } = _serializeBlock, props = _objectWithoutProperties(_serializeBlock, _excluded3), style = props.node.style || "normal", Block = (typeof components.block == "function" ? components.block : components.block[style]) || components.unknownBlockStyle;
        return Block === components.unknownBlockStyle && handleMissingComponent(unknownBlockStyleWarning(style), {
            nodeType: "blockStyle",
            type: style
        }), /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(Block, _objectSpread(_objectSpread({}, props), {}, {
            value: props.node,
            renderNode
        }), key);
    }
    function renderText(node, key) {
        if (node.text === `
`) {
            const HardBreak = components.hardBreak;
            return HardBreak ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(HardBreak, {}, key) : `
`;
        }
        return node.text;
    }
    function renderUnknownType(node, index, key, isInline) {
        const nodeOptions = {
            value: node,
            isInline,
            index,
            renderNode
        };
        handleMissingComponent(unknownTypeWarning(node._type), {
            nodeType: "block",
            type: node._type
        });
        const UnknownType = components.unknownType;
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(UnknownType, _objectSpread({}, nodeOptions), key);
    }
    function renderCustomBlock(node, index, key, isInline) {
        const nodeOptions = {
            value: node,
            isInline,
            index,
            renderNode
        }, Node = components.types[node._type];
        return Node ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(Node, _objectSpread({}, nodeOptions), key) : null;
    }
    return renderNode;
};
function serializeBlock(options) {
    const { node, index, isInline, renderNode } = options, children = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f40$portabletext$2f$toolkit$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildMarksTree"])(node).map((child, i)=>renderNode({
            node: child,
            isInline: !0,
            index: i,
            renderNode
        }));
    return {
        _key: node._key || `block-${index}`,
        children,
        index,
        isInline,
        node
    };
}
function noop() {}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "mergeClasses",
    ()=>mergeClasses,
    "toKebabCase",
    ()=>toKebabCase
]);
const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && array.indexOf(className) === index;
    }).join(" ");
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>defaultAttributes
]);
var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/Icon.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Icon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-rsc] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]);
});
;
 //# sourceMappingURL=Icon.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>createLucideIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/Icon.js [app-rsc] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toKebabCase"])(iconName)}`, className),
            ...props
        }));
    Component.displayName = `${iconName}`;
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>ChevronDown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)");
;
const ChevronDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("ChevronDown", [
    [
        "path",
        {
            d: "m6 9 6 6 6-6",
            key: "qrunsl"
        }
    ]
]);
;
 //# sourceMappingURL=chevron-down.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-rsc] (ecmascript) <export default as ChevronDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-rsc] (ecmascript)");
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/github.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Github
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)");
;
const Github = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("Github", [
    [
        "path",
        {
            d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
            key: "tonef"
        }
    ],
    [
        "path",
        {
            d: "M9 18c-4.51 2-5-2-7-2",
            key: "9comsn"
        }
    ]
]);
;
 //# sourceMappingURL=github.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/github.js [app-rsc] (ecmascript) <export default as Github>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Github",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/github.js [app-rsc] (ecmascript)");
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Linkedin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)");
;
const Linkedin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("Linkedin", [
    [
        "path",
        {
            d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
            key: "c2jq9f"
        }
    ],
    [
        "rect",
        {
            width: "4",
            height: "12",
            x: "2",
            y: "9",
            key: "mk3on5"
        }
    ],
    [
        "circle",
        {
            cx: "4",
            cy: "4",
            r: "2",
            key: "bt5ra8"
        }
    ]
]);
;
 //# sourceMappingURL=linkedin.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-rsc] (ecmascript) <export default as Linkedin>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Linkedin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-rsc] (ecmascript)");
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/mail.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Mail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)");
;
const Mail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("Mail", [
    [
        "rect",
        {
            width: "20",
            height: "16",
            x: "2",
            y: "4",
            rx: "2",
            key: "18n3k1"
        }
    ],
    [
        "path",
        {
            d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
            key: "1ocrg3"
        }
    ]
]);
;
 //# sourceMappingURL=mail.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/mail.js [app-rsc] (ecmascript) <export default as Mail>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Mail",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/mail.js [app-rsc] (ecmascript)");
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/twitter.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Twitter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)");
;
const Twitter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("Twitter", [
    [
        "path",
        {
            d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
            key: "pff0z6"
        }
    ]
]);
;
 //# sourceMappingURL=twitter.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/twitter.js [app-rsc] (ecmascript) <export default as Twitter>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Twitter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/twitter.js [app-rsc] (ecmascript)");
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/instagram.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Instagram
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)");
;
const Instagram = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("Instagram", [
    [
        "rect",
        {
            width: "20",
            height: "20",
            x: "2",
            y: "2",
            rx: "5",
            ry: "5",
            key: "2e1cvw"
        }
    ],
    [
        "path",
        {
            d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
            key: "9exkf1"
        }
    ],
    [
        "line",
        {
            x1: "17.5",
            x2: "17.51",
            y1: "6.5",
            y2: "6.5",
            key: "r4j83e"
        }
    ]
]);
;
 //# sourceMappingURL=instagram.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/instagram.js [app-rsc] (ecmascript) <export default as Instagram>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Instagram",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/instagram.js [app-rsc] (ecmascript)");
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/youtube.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Youtube
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)");
;
const Youtube = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("Youtube", [
    [
        "path",
        {
            d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
            key: "1q2vi4"
        }
    ],
    [
        "path",
        {
            d: "m10 15 5-3-5-3z",
            key: "1jp15x"
        }
    ]
]);
;
 //# sourceMappingURL=youtube.js.map
}),
"[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/youtube.js [app-rsc] (ecmascript) <export default as Youtube>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Youtube",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$langley$2d$portfolio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/langley-portfolio/node_modules/lucide-react/dist/esm/icons/youtube.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=569ca_ed394724._.js.map