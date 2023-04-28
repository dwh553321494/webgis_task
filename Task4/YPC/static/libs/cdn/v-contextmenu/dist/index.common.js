Object.defineProperty(exports,"__esModule",{value:!0});var vueRuntimeHelpers=require("vue-runtime-helpers"),directive={inserted(e,t,n){const i=n.context.$refs[t.arg]||n.context.$refs[t.value],_="[object Array]"===Object.prototype.toString.call(i)?i[0]:i;_.addRef({el:e,vnode:n}),_.$contextmenuId=e.id||_._uid}},script={name:"VContextmenu",provide(){return{$$contextmenu:this}},props:{eventType:{type:String,default:"contextmenu"},theme:{type:String,default:"default"},autoPlacement:{type:Boolean,default:!0},disabled:Boolean},data:()=>({visible:!1,references:[],style:{top:0,left:0}}),computed:{clickOutsideHandler(){return this.visible?this.hide:()=>{}},isClick(){return"click"===this.eventType},contextmenuCls(){return["v-contextmenu",`v-contextmenu--${this.theme}`]}},watch:{visible(e){e?(this.$emit("show",this),document.body.addEventListener("click",this.handleBodyClick)):(this.$emit("hide",this),document.body.removeEventListener("click",this.handleBodyClick))}},mounted(){document.body.appendChild(this.$el),window.$$VContextmenu?window.$$VContextmenu[this.$contextmenuId]=this:window.$$VContextmenu={[this.$contextmenuId]:this}},beforeDestroy(){document.body.removeChild(this.$el),delete window.$$VContextmenu[this.$contextmenuId],this.references.forEach(e=>{e.el.removeEventListener(this.eventType,this.handleReferenceContextmenu)}),document.body.removeEventListener("click",this.handleBodyClick)},methods:{addRef(e){this.references.push(e),e.el.addEventListener(this.eventType,this.handleReferenceContextmenu)},handleReferenceContextmenu(e){if(e.preventDefault(),this.disabled)return;const t=this.references.find(t=>t.el.contains(e.target));this.$emit("contextmenu",t?t.vnode:null);const n=e.pageX,i=e.pageY;this.show(),this.$nextTick(()=>{const e={top:i,left:n};if(this.autoPlacement){const t=this.$refs.contextmenu.clientWidth,_=this.$refs.contextmenu.clientHeight;_+i>=window.innerHeight&&(e.top-=_),t+n>=window.innerWidth&&(e.left-=t)}this.style={top:`${e.top}px`,left:`${e.left}px`}})},handleBodyClick(e){this.$el.contains(e.target)||this.isClick&&this.references.some(t=>t.el.contains(e.target))||(this.visible=!1)},show(e){Object.keys(window.$$VContextmenu).forEach(e=>{e!==this.$contextmenuId&&window.$$VContextmenu[e].hide()}),e&&(this.style={top:`${e.top}px`,left:`${e.left}px`}),this.visible=!0},hide(){this.visible=!1},hideAll(){Object.keys(window.$$VContextmenu).forEach(e=>{window.$$VContextmenu[e].hide()})}}};const __vue_script__=script;var __vue_render__=function(){var e=this.$createElement;return(this._self._c||e)("ul",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],ref:"contextmenu",class:this.contextmenuCls,style:this.style},[this._t("default")],2)},__vue_staticRenderFns__=[];__vue_render__._withStripped=!0;const __vue_inject_styles__=void 0,__vue_scope_id__=void 0,__vue_module_identifier__=void 0,__vue_is_functional_template__=!1,__vue_component__=vueRuntimeHelpers.normalizeComponent({render:__vue_render__,staticRenderFns:__vue_staticRenderFns__},void 0,__vue_script__,void 0,!1,void 0,!1,void 0,void 0,void 0);var script$1={name:"VContextmenuItem",inject:["$$contextmenu"],props:{divider:Boolean,disabled:Boolean,autoHide:{type:Boolean,default:!0}},data:()=>({hover:!1}),computed:{classname(){return{"v-contextmenu-item":!this.divider,"v-contextmenu-item--hover":this.hover,"v-contextmenu-item--disabled":this.disabled}}},methods:{handleMouseenter(e){this.disabled||(this.hover=!0,this.$emit("mouseenter",this,e))},handleMouseleave(e){this.disabled||(this.hover=!1,this.$emit("mouseleave",this,e))},handleClick(e){this.disabled||(this.$emit("click",this,e),this.autoHide&&this.$$contextmenu.hide())}}};const __vue_script__$1=script$1;var __vue_render__$1=function(){var e=this.$createElement,t=this._self._c||e;return this.divider?t("li",{staticClass:"v-contextmenu-divider"}):t("li",{class:this.classname,on:{click:this.handleClick,mouseenter:this.handleMouseenter,mouseleave:this.handleMouseleave}},[this._t("default")],2)},__vue_staticRenderFns__$1=[];__vue_render__$1._withStripped=!0;const __vue_inject_styles__$1=void 0,__vue_scope_id__$1=void 0,__vue_module_identifier__$1=void 0,__vue_is_functional_template__$1=!1,__vue_component__$1=vueRuntimeHelpers.normalizeComponent({render:__vue_render__$1,staticRenderFns:__vue_staticRenderFns__$1},void 0,__vue_script__$1,void 0,!1,void 0,!1,void 0,void 0,void 0);var script$2={name:"VContextmenuSubmenu",props:{title:String,disabled:Boolean},data:()=>({hover:!1,submenuPlacement:[]}),computed:{classname(){return{"v-contextmenu-item":!0,"v-contextmenu-submenu":!0,"v-contextmenu-item--hover":this.hover,"v-contextmenu-item--disabled":this.disabled}},submenuCls(){return["v-contextmenu",...this.submenuPlacement]}},methods:{handleMouseenter(e){if(this.disabled)return;const{target:t}=e,n=t.getBoundingClientRect();this.hover=!0,this.$emit("mouseenter",this,e),this.$nextTick(()=>{const e=this.$refs.submenu.clientWidth,t=this.$refs.submenu.clientHeight,i=[];n.right+e>=window.innerWidth?i.push("left"):i.push("right"),n.bottom+t>=window.innerHeight?i.push("bottom"):i.push("top"),this.submenuPlacement=i})},handleMouseleave(e){this.disabled||(this.hover=!1,this.$emit("mouseleave",this,e))}}};const __vue_script__$2=script$2;var __vue_render__$2=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{class:e.classname,on:{mouseenter:e.handleMouseenter,mouseleave:e.handleMouseleave}},[n("span",{staticClass:"v-contextmenu-submenu__title"},[e._t("title",[e._v(e._s(e.title))]),e._v(" "),n("span",{staticClass:"v-contextmenu-iconfont v-contextmenu-submenu__icon"})],2),e._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:e.hover,expression:"hover"}],ref:"submenu",class:e.submenuCls},[e._t("default")],2)])},__vue_staticRenderFns__$2=[];__vue_render__$2._withStripped=!0;const __vue_inject_styles__$2=void 0,__vue_scope_id__$2=void 0,__vue_module_identifier__$2=void 0,__vue_is_functional_template__$2=!1,__vue_component__$2=vueRuntimeHelpers.normalizeComponent({render:__vue_render__$2,staticRenderFns:__vue_staticRenderFns__$2},void 0,__vue_script__$2,void 0,!1,void 0,!1,void 0,void 0,void 0);var script$3={name:"VContextmenuGroup",props:{maxWidth:[Number,String]},computed:{menusStyle(){if(!this.maxWidth)return null;return{"max-width":"number"==typeof this.maxWidth?`${this.maxWidth}px`:this.maxWidth,"overflow-x":"auto"}}}};const __vue_script__$3=script$3;var __vue_render__$3=function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"v-contextmenu-group"},[t("ul",{staticClass:"v-contextmenu-group__menus",style:this.menusStyle},[this._t("default")],2)])},__vue_staticRenderFns__$3=[];__vue_render__$3._withStripped=!0;const __vue_inject_styles__$3=void 0,__vue_scope_id__$3=void 0,__vue_module_identifier__$3=void 0,__vue_is_functional_template__$3=!1,__vue_component__$3=vueRuntimeHelpers.normalizeComponent({render:__vue_render__$3,staticRenderFns:__vue_staticRenderFns__$3},void 0,__vue_script__$3,void 0,!1,void 0,!1,void 0,void 0,void 0),install=e=>{e.directive("contextmenu",directive),e.component(__vue_component__.name,__vue_component__),e.component(__vue_component__$1.name,__vue_component__$1),e.component(__vue_component__$2.name,__vue_component__$2),e.component(__vue_component__$3.name,__vue_component__$3)};"undefined"!=typeof window&&window.Vue&&install(window.Vue);var index={install:install};exports.Contextmenu=__vue_component__,exports.ContextmenuGroup=__vue_component__$3,exports.ContextmenuItem=__vue_component__$1,exports.ContextmenuSubmenu=__vue_component__$2,exports.default=index,exports.directive=directive;
