module.exports = {

"[project]/components/starfield.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
const Starfield = ({ className, starCount = 300, repulsionRadius = 100, repulsionStrength = 0.05, returnSpeed = 0.05, height = "100vh", topHalfOnly = true, isMobile = false })=>{
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const starsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const shootingStarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mousePosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: -100,
        y: -100
    });
    const animationFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const isVisibleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const generateStars = (width, height)=>{
        const newStars = [];
        for(let i = 0; i < starCount; i++){
            const clusterCenterX = Math.random() * width;
            const clusterCenterY = topHalfOnly ? Math.random() * (height * 0.5) : Math.random() * height;
            const clusterOffsetX = (Math.random() - 0.5) * 50;
            const clusterOffsetY = topHalfOnly ? Math.min((Math.random() - 0.5) * 50, height * 0.5 - clusterCenterY) : (Math.random() - 0.5) * 50;
            const x = clusterCenterX + clusterOffsetX;
            const y = clusterCenterY + clusterOffsetY;
            const size = Math.random() * 0.8 * 2;
            const brightness = Math.random() * 0.5 + 0.5;
            newStars.push({
                id: i,
                x,
                y,
                size,
                originalX: x,
                originalY: y,
                brightness
            });
        }
        return newStars;
    };
    const handleMouseMove = (e)=>{
        if (!canvasRef.current || !isVisibleRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0) {
            mousePosRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        } else {
            mousePosRef.current = {
                x: -1000,
                y: -1000
            };
        }
    };
    const checkVisibility = ()=>{
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        isVisibleRef.current = rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0;
    };
    const handleResize = ()=>{
        if (!canvasRef.current || !containerRef.current) return;
        const canvas = canvasRef.current;
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
        starsRef.current = generateStars(canvas.width, canvas.height);
        checkVisibility();
    };
    const animate = ()=>{
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const star of starsRef.current){
            if (!isMobile) {
                const dx = mousePosRef.current.x - star.x;
                const dy = mousePosRef.current.y - star.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < repulsionRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (repulsionRadius - distance) * repulsionStrength;
                    star.x -= Math.cos(angle) * force;
                    star.y -= Math.sin(angle) * force;
                    if (topHalfOnly && star.y > canvas.height * 0.5) {
                        star.y = canvas.height * 0.5;
                    }
                }
            }
            star.x += (star.originalX - star.x) * returnSpeed;
            star.y += (star.originalY - star.y) * returnSpeed;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            ctx.fill();
        }
        if (!shootingStarRef.current && Math.random() < 0.005 && canvas.width > 0 && canvas.height > 0) {
            const startX = Math.random() * canvas.width;
            const startY = Math.random() * (canvas.height * 0.3);
            const angle = Math.PI / 4 + (Math.random() - 0.5) * Math.PI / 6; // 45° ± 15°
            const speed = 5 + Math.random() * 3;
            const size = 1.5 + Math.random() * 1.5;
            shootingStarRef.current = {
                x: startX,
                y: startY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                trail: [
                    {
                        x: startX,
                        y: startY
                    }
                ],
                life: 40,
                size
            };
        }
        if (shootingStarRef.current) {
            const ss = shootingStarRef.current;
            ss.x += ss.vx;
            ss.y += ss.vy;
            ss.trail.push({
                x: ss.x,
                y: ss.y
            });
            if (ss.trail.length > 20) {
                ss.trail.shift();
            }
            ctx.beginPath();
            ss.trail.forEach((point, i)=>{
                const opacity = i / ss.trail.length * 0.8;
                const width = i / ss.trail.length * ss.size;
                ctx.beginPath();
                ctx.arc(point.x, point.y, width, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.fill();
            });
            ctx.beginPath();
            ctx.arc(ss.x, ss.y, ss.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 1)";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "white";
            ctx.fill();
            ctx.shadowBlur = 0;
            ss.life -= 1;
            if (ss.life <= 0 || ss.x > canvas.width || ss.y > canvas.height || ss.x < 0 || ss.y < 0) {
                shootingStarRef.current = null;
            }
        }
        animationFrameRef.current = requestAnimationFrame(animate);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!canvasRef.current || !containerRef.current) return;
        handleResize();
        checkVisibility();
        if (!isMobile) {
            window.addEventListener("mousemove", handleMouseMove);
        }
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", checkVisibility);
        animationFrameRef.current = requestAnimationFrame(animate);
        return ()=>{
            if (!isMobile) {
                window.removeEventListener("mousemove", handleMouseMove);
            }
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", checkVisibility);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [
        isMobile
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])("relative w-full", className),
        style: {
            height
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            className: "absolute top-0 left-0 w-full h-full pointer-events-none z-[0]"
        }, void 0, false, {
            fileName: "[project]/components/starfield.tsx",
            lineNumber: 257,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/starfield.tsx",
        lineNumber: 252,
        columnNumber: 7
    }, this);
};
const __TURBOPACK__default__export__ = Starfield;
}}),
"[project]/components/ui/search-modal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>SearchModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function SearchModal() {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (window.location.hash === "#search") {
            setIsOpen(true);
        }
        const handleHashChange = ()=>{
            setIsOpen(window.location.hash === "#search");
        };
        window.addEventListener("hashchange", handleHashChange);
        return ()=>{
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);
    const closeModal = ()=>{
        setIsOpen(false);
        window.history.pushState("", document.title, window.location.pathname);
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-purple-500/75 p-6 rounded-lg shadow-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "Search Modal"
                }, void 0, false, {
                    fileName: "[project]/components/ui/search-modal.tsx",
                    lineNumber: 35,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "default",
                    size: "lg",
                    onClick: closeModal,
                    children: "Close"
                }, void 0, false, {
                    fileName: "[project]/components/ui/search-modal.tsx",
                    lineNumber: 36,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/search-modal.tsx",
            lineNumber: 34,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/search-modal.tsx",
        lineNumber: 33,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=_3c6c0b._.js.map