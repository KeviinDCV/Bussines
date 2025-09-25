import{j as o,a as h}from"./app-Bz4Jl_qD.js";import{S as g}from"./sweetalert2.esm.all-Y6IUEg8t.js";import{c}from"./sweetAlert-DJK8XZI4.js";import{P as E}from"./plus-DALoCAsr.js";import{c as b}from"./createLucideIcon-Cz9XKqAq.js";import{T as N}from"./trash-2-ASQ672-o.js";import{S as F}from"./stethoscope-BkxmyBqw.js";import{B as M,M as U,T as A,D}from"./target-CIj07H3A.js";import{A as H}from"./activity-2O0KP_iU.js";import{P as L}from"./pill-DDkUC_xf.js";import{W as z}from"./wrench-lytNJbI2.js";import{A as R}from"./award-CQsE20UE.js";import{H as O}from"./headphones-CtDMyimv.js";import{R as V}from"./refresh-cw-BY_MO0ZM.js";import{H as W}from"./heart-Dq2hhrqO.js";import{T as q}from"./trending-up-DKRswe71.js";import{S as G}from"./search-RX5TonRa.js";import{M as K}from"./monitor-DmTdg64M.js";import{S as Y}from"./shield-CjMQtDIE.js";import{U as J}from"./users-BduFRSDn.js";import{C as Q}from"./chart-column-CpOunT3j.js";import{S as X}from"./settings-DVpu2bSy.js";import{F as Z}from"./file-text-DC6kArQt.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],oe=b("ExternalLink",ee);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],_=b("FolderOpen",te);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],$=b("Pen",ae);function Ne({module:t,submodules:m,displayName:y,icon:w,canManageContent:k=!1}){const f=k,x=m.some(e=>e.content_type==="powerbi"),v=m.length>0,P={FolderOpen:_,FileText:Z,Settings:X,BarChart3:Q,Users:J,Shield:Y,Monitor:K,Database:D,Search:G,TrendingUp:q,Heart:W,RefreshCw:V,Headphones:O,Award:R,Wrench:z,Pill:L,Activity:H,Target:A,Map:U,Briefcase:M,Stethoscope:F},C=async()=>{const e=t&&t.parent_id!==null&&t.parent_id!==void 0;let l="",a="";e?(l='<option value="powerbi">Power BI</option>',a=""):(l='<option value="module">Submódulo</option>',a="");const u=e&&x?'<p class="text-sm text-amber-600 bg-amber-50 p-2 rounded mb-2">⚠️ Ya existe un Power BI en este submódulo. Solo se permite uno por submódulo.</p>':"",{value:d}=await c.fire({title:"Agregar Contenido",html:`
                <div class="space-y-6 text-left">
                    ${a}
                    ${u}
                    
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-800 mb-2">Tipo de Contenido *</label>
                        ${e?`<select id="swal-content-type" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-[#2a3d85] transition-colors">${l}</select>`:`<input type="text" value="Submódulo" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600" readonly>
                            <input type="hidden" id="swal-content-type" value="module">`}
                    </div>
                    
                    <!-- Campos para Submódulo -->
                    <div id="module-fields" class="space-y-4">
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-800">Nombre del submódulo *</label>
                            <input type="text" id="swal-display-name" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-[#2a3d85] transition-colors" placeholder="ej: Nuevo Submódulo">
                            <small class="text-gray-600 text-xs block mt-1 italic">El nombre interno se generará automáticamente para la URL.</small>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-800">Descripción</label>
                            <textarea id="swal-description" rows="3" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-[#2a3d85] transition-colors resize-none" placeholder="Descripción del submódulo..."></textarea>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-800">Ícono</label>
                            <select id="swal-icon" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-[#2a3d85] transition-colors">
                                <option value="FolderOpen" selected>📁 Carpeta (FolderOpen)</option>
                                <option value="FileText">📄 Documento (FileText)</option>
                                <option value="Settings">⚙️ Configuración (Settings)</option>
                                <option value="BarChart3">📊 Gráfico (BarChart3)</option>
                                <option value="Users">👥 Usuarios (Users)</option>
                                <option value="Shield">🛡️ Escudo (Shield)</option>
                                <option value="Monitor">💻 Monitor (Monitor)</option>
                                <option value="Database">🗄️ Base de Datos (Database)</option>
                                <option value="Search">🔍 Buscar (Search)</option>
                                <option value="TrendingUp">📈 Tendencia (TrendingUp)</option>
                                <option value="Heart">❤️ Corazón (Heart)</option>
                                <option value="RefreshCw">🔄 Actualizar (RefreshCw)</option>
                                <option value="Headphones">🎧 Audífonos (Headphones)</option>
                                <option value="Stethoscope">🩺 Estetoscopio (Stethoscope)</option>
                                <option value="Award">🏆 Premio (Award)</option>
                                <option value="Wrench">🔧 Herramientas (Wrench)</option>
                                <option value="Pill">💊 Pastilla (Pill)</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Campos para Power BI -->
                    <div id="powerbi-fields" class="space-y-4" style="display: none;">
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-800">URL de Power BI *</label>
                            <input id="swal-powerbi-url" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-[#2a3d85] transition-colors" placeholder="https://app.powerbi.com/reportEmbed?reportId=...">
                            <small class="text-gray-600 text-xs block mt-1 italic">Pegue la URL de inserción del informe de Power BI</small>
                        </div>
                    </div>
                </div>
            `,showCancelButton:!0,confirmButtonText:"Agregar",cancelButtonText:"Cancelar",width:"650px",didOpen:()=>{const r=document.getElementById("swal-content-type"),s=document.getElementById("module-fields"),n=document.getElementById("powerbi-fields"),p=()=>{r.value==="powerbi"?(s.style.display="none",n.style.display="block"):(s.style.display="block",n.style.display="none")};if(r.tagName==="SELECT"){const i=r;i.options.length>1&&i.addEventListener("change",p)}if(p(),e&&x){const i=document.querySelector(".swal2-confirm");i&&(i.disabled=!0,i.style.opacity="0.5",i.style.cursor="not-allowed")}},preConfirm:()=>{const r=document.getElementById("swal-content-type").value,s=document.getElementById("swal-powerbi-url").value;if(r==="powerbi"){if(!s)return g.showValidationMessage("La URL de Power BI es obligatoria"),!1;const p=`powerbi-${Date.now()}`,i=`${t?.route||"/dashboard"}/${p}`;return{name:p,display_name:"Power BI Dashboard",description:"Dashboard de Power BI integrado",content_type:r,powerbi_url:s,icon:"BarChart3",route:i,parent_id:t?.id,role:t?.role}}else{const n=document.getElementById("swal-display-name").value,p=document.getElementById("swal-description").value,i=document.getElementById("swal-icon").value;if(!n)return g.showValidationMessage("El nombre del submódulo es obligatorio"),!1;const S=n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),I=`${t?.route||"/dashboard"}/${S}`;return{name:S,display_name:n,description:p,content_type:r,powerbi_url:"",icon:i,route:I,parent_id:t?.id,role:t?.role}}}});if(d)try{await h.post("/admin/modules",d,{onSuccess:()=>{g.fire({title:"¡Éxito!",text:"Contenido agregado correctamente",icon:"success",timer:2e3,showConfirmButton:!1})},onError:r=>{let s="Error al agregar el contenido";if(typeof r=="object"&&r!==null){const n=Object.keys(r);n.length>0&&(s=r[n[0]])}g.fire({title:"Error",text:s,icon:"error"})}})}catch{g.fire({title:"Error",text:"Error al procesar la solicitud",icon:"error"})}},B=async e=>{const{value:l}=await c.fire({title:"Editar Contenido",html:`
                <div class="space-y-6 text-left">
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-800 mb-2">Tipo de Contenido</label>
                        <input type="text" value="${e.content_type==="powerbi"?"Power BI":"Submódulo"}" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600" readonly>
                    </div>
                    
                    ${e.content_type==="powerbi"?`
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-800">URL de Power BI *</label>
                            <input id="swal-powerbi-url" value="${e.powerbi_url||""}" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-[#2a3d85] transition-colors" placeholder="https://app.powerbi.com/reportEmbed?reportId=...">
                        </div>
                    `:`
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-800">Nombre del submódulo *</label>
                            <input type="text" id="swal-display-name" value="${e.display_name}" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-[#2a3d85] transition-colors" placeholder="ej: Nuevo Submódulo">
                            <small class="text-gray-600 text-xs block mt-1 italic">El nombre interno se generará automáticamente para la URL.</small>
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-800">Descripción</label>
                            <textarea id="swal-description" rows="3" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-[#2a3d85] transition-colors resize-none" placeholder="Descripción del submódulo...">${e.description||""}</textarea>
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-800">Ícono</label>
                            <select id="swal-icon" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-[#2a3d85] transition-colors">
                                <option value="FolderOpen" ${e.icon==="FolderOpen"?"selected":""}>Carpeta (FolderOpen)</option>
                                <option value="FileText" ${e.icon==="FileText"?"selected":""}>Documento (FileText)</option>
                                <option value="Settings" ${e.icon==="Settings"?"selected":""}>Configuración (Settings)</option>
                                <option value="BarChart3" ${e.icon==="BarChart3"?"selected":""}>Gráfico (BarChart3)</option>
                                <option value="Users" ${e.icon==="Users"?"selected":""}>Usuarios (Users)</option>
                                <option value="Shield" ${e.icon==="Shield"?"selected":""}>Escudo (Shield)</option>
                                <option value="Monitor" ${e.icon==="Monitor"?"selected":""}>Monitor (Monitor)</option>
                                <option value="Database" ${e.icon==="Database"?"selected":""}>Base de Datos (Database)</option>
                                <option value="Search" ${e.icon==="Search"?"selected":""}>Buscar (Search)</option>
                                <option value="TrendingUp" ${e.icon==="TrendingUp"?"selected":""}>Tendencia (TrendingUp)</option>
                                <option value="Heart" ${e.icon==="Heart"?"selected":""}>Corazón (Heart)</option>
                                <option value="RefreshCw" ${e.icon==="RefreshCw"?"selected":""}>Actualizar (RefreshCw)</option>
                                <option value="Headphones" ${e.icon==="Headphones"?"selected":""}>Audífonos (Headphones)</option>
                                <option value="Stethoscope" ${e.icon==="Stethoscope"?"selected":""}>Estetoscopio (Stethoscope)</option>
                                <option value="Award" ${e.icon==="Award"?"selected":""}>Premio (Award)</option>
                                <option value="Wrench" ${e.icon==="Wrench"?"selected":""}>Herramientas (Wrench)</option>
                                <option value="Pill" ${e.icon==="Pill"?"selected":""}>Pastilla (Pill)</option>
                            </select>
                        </div>
                    `}
                </div>
            `,showCancelButton:!0,confirmButtonColor:"#2a3d85",cancelButtonColor:"#6b7280",confirmButtonText:"Actualizar",cancelButtonText:"Cancelar",width:"600px",preConfirm:()=>{if(e.content_type==="powerbi"){const a=document.getElementById("swal-powerbi-url").value;return a?{powerbi_url:a,name:e.name,display_name:e.display_name,description:e.description,icon:e.icon,route:e.route,content_type:"powerbi",role:e.role||t?.role||"direccionamiento",parent_id:e.parent_id}:(c.showValidationMessage("La URL de Power BI es obligatoria"),!1)}else{const a=document.getElementById("swal-display-name").value,u=document.getElementById("swal-description").value,d=document.getElementById("swal-icon").value;if(!a)return c.showValidationMessage("El nombre del submódulo es obligatorio"),!1;const r=a!==e.display_name;let s=e.name,n=e.route;return r&&(s=a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),n=`${t?.route||"/dashboard"}/${s}`),{name:s,display_name:a,description:u,icon:d,route:n,role:e.role||t?.role,parent_id:e.parent_id}}}});if(l)try{await h.put(`/admin/modules/${e.id}`,l,{onSuccess:()=>{c.fire({title:"¡Éxito!",text:"Contenido actualizado correctamente",icon:"success",confirmButtonColor:"#2a3d85",timer:2e3,showConfirmButton:!1})},onError:a=>{let u="Error al actualizar el contenido";if(typeof a=="object"&&a!==null){const d=Object.keys(a);d.length>0&&(u=a[d[0]])}c.fire({title:"Error",text:u,icon:"error",confirmButtonColor:"#2a3d85"})}})}catch{c.fire({title:"Error",text:"Error al procesar la solicitud",icon:"error",confirmButtonColor:"#2a3d85"})}},j=async e=>{(await c.fire({title:"¿Estás seguro?",text:"Esta acción no se puede deshacer",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc2626",cancelButtonColor:"#6b7280",confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar"})).isConfirmed&&h.delete(`/admin/modules/${e}`,{onSuccess:()=>{c.fire({title:"¡Eliminado!",text:"El contenido ha sido eliminado exitosamente",icon:"success",confirmButtonColor:"#2a3d85"})}})},T=e=>{h.visit(e.route)};return o.jsx(o.Fragment,{children:o.jsxs("div",{className:"max-w-6xl mx-auto p-4 sm:p-6",children:[!v&&o.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6",children:[o.jsxs("div",{className:"flex items-center space-x-3 mb-4 sm:mb-0",children:[o.jsx(w,{className:"w-8 h-8 text-[#2a3d85]"}),o.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-900",children:y})]}),f&&(t&&t.parent_id!==null&&t.parent_id!==void 0?!x:!0)&&o.jsxs("button",{onClick:C,className:"flex items-center space-x-2 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white px-4 py-2 rounded-lg transition-colors",children:[o.jsx(E,{className:"w-4 h-4"}),o.jsx("span",{children:"Agregar Contenido"})]})]}),v&&f&&(t&&t.parent_id!==null&&t.parent_id!==void 0?!x:!0)&&o.jsx("div",{className:"flex justify-end mb-6",children:o.jsxs("button",{onClick:C,className:"flex items-center space-x-2 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white px-4 py-2 rounded-lg transition-colors",children:[o.jsx(E,{className:"w-4 h-4"}),o.jsx("span",{children:"Agregar Contenido"})]})}),m.length>0?o.jsxs("div",{className:"space-y-6",children:[m.filter(e=>e.content_type==="powerbi").map(e=>o.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg overflow-hidden",children:[f&&o.jsxs("div",{className:"absolute top-2 right-2 z-10 flex space-x-1",children:[o.jsx("button",{onClick:()=>B(e),className:"p-1 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded shadow transition-colors",title:"Editar Power BI",children:o.jsx($,{className:"w-4 h-4"})}),o.jsx("button",{onClick:()=>j(e.id),className:"p-1 bg-white/80 hover:bg-white text-red-600 hover:text-red-800 rounded shadow transition-colors",title:"Eliminar Power BI",children:o.jsx(N,{className:"w-4 h-4"})})]}),o.jsx("iframe",{src:e.powerbi_url,width:"100%",height:"800",frameBorder:"0",allowFullScreen:!0,className:"border-0",title:"Power BI Report"})]},e.id)),m.filter(e=>e.content_type==="module").length>0&&o.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:m.filter(e=>e.content_type==="module").map(e=>o.jsxs("div",{className:"bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6",children:[o.jsxs("div",{className:"flex items-start justify-between mb-3",children:[o.jsxs("div",{className:"flex items-center space-x-3",children:[(()=>{const l=P[e.icon||"FolderOpen"]||_;return o.jsx(l,{className:"w-6 h-6 text-[#2a3d85]"})})(),o.jsx("h3",{className:"font-semibold text-gray-900",children:e.display_name})]}),f&&o.jsxs("div",{className:"flex space-x-1",children:[o.jsx("button",{onClick:()=>B(e),className:"p-1 hover:bg-gray-100 rounded transition-colors",title:"Editar",children:o.jsx($,{className:"w-4 h-4 text-gray-600"})}),o.jsx("button",{onClick:()=>j(e.id),className:"p-1 hover:bg-red-50 rounded transition-colors",title:"Eliminar",children:o.jsx(N,{className:"w-4 h-4 text-red-600"})})]})]}),e.description&&o.jsx("p",{className:"text-sm text-gray-600 mb-3",children:e.description}),o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsx("span",{className:"text-xs text-gray-500",children:"Submódulo"}),o.jsxs("button",{onClick:()=>T(e),className:"flex items-center space-x-1 text-[#2a3d85] hover:text-[#1e2d5f] text-sm font-medium",children:[o.jsx("span",{children:"Abrir"}),o.jsx(oe,{className:"w-3 h-3"})]})]})]},e.id))})]}):o.jsxs("div",{className:"text-center py-12",children:[o.jsx(w,{className:"w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4"}),o.jsx("p",{className:"text-gray-600 mb-4",children:f?o.jsxs(o.Fragment,{children:["No hay contenido agregado aún. ",o.jsx("br",{}),'Haga clic en "Agregar Contenido" para empezar.']}):o.jsxs(o.Fragment,{children:["El módulo de ",y," está siendo desarrollado.",o.jsx("br",{}),"Pronto estará disponible con todas las funcionalidades."]})})]})]})})}export{_ as F,Ne as M};
