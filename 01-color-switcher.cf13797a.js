const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let a;t.addEventListener("click",(()=>{t.disabled=!0,a=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.addEventListener("click",(()=>{clearInterval(a),t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.cf13797a.js.map
