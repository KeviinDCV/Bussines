import{j as t,a as h}from"./app-DG6B9Tz2.js";import{S as g}from"./sweetalert2.esm.all-Y6IUEg8t.js";import{c as l}from"./sweetAlert-DJK8XZI4.js";import{P as N}from"./plus-VcS2YFbF.js";import{c as b}from"./createLucideIcon-BPSUbaWl.js";import{T as S}from"./trash-2-D-B3ttQW.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],T=b("ExternalLink",I);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],U=b("FolderOpen",F);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],_=b("Pen",M);function O({module:o,submodules:u,displayName:y,icon:w,canManageContent:$=!1}){const x=$,f=u.some(e=>e.content_type==="powerbi"),v=u.length>0,C=async()=>{const e=o&&o.parent_id!==null&&o.parent_id!==void 0;let c="",a="";e?(c='<option value="powerbi">Power BI</option>',a=""):(c='<option value="module">Submódulo</option>',a="");const m=e&&f?'<p class="text-sm text-amber-600 bg-amber-50 p-2 rounded mb-2">⚠️ Ya existe un Power BI en este submódulo. Solo se permite uno por submódulo.</p>':"",{value:d}=await l.fire({title:"Agregar Contenido",html:`
                <div class="space-y-6 text-left">
                    ${a}
                    ${m}
                    
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-800 mb-2">Tipo de Contenido *</label>
                        ${e?`<select id="swal-content-type" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-[#2a3d85] transition-colors">${c}</select>`:`<input type="text" value="Submódulo" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600" readonly>
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
            `,showCancelButton:!0,confirmButtonText:"Agregar",cancelButtonText:"Cancelar",width:"650px",didOpen:()=>{const n=document.getElementById("swal-content-type"),s=document.getElementById("module-fields"),r=document.getElementById("powerbi-fields"),p=()=>{n.value==="powerbi"?(s.style.display="none",r.style.display="block"):(s.style.display="block",r.style.display="none")};if(n.tagName==="SELECT"){const i=n;i.options.length>1&&i.addEventListener("change",p)}if(p(),e&&f){const i=document.querySelector(".swal2-confirm");i&&(i.disabled=!0,i.style.opacity="0.5",i.style.cursor="not-allowed")}},preConfirm:()=>{const n=document.getElementById("swal-content-type").value,s=document.getElementById("swal-powerbi-url").value;if(n==="powerbi"){if(!s)return g.showValidationMessage("La URL de Power BI es obligatoria"),!1;const p=`powerbi-${Date.now()}`,i=`${o?.route||"/dashboard"}/${p}`;return{name:p,display_name:"Power BI Dashboard",description:"Dashboard de Power BI integrado",content_type:n,powerbi_url:s,icon:"BarChart3",route:i,parent_id:o?.id,role:o?.role}}else{const r=document.getElementById("swal-display-name").value,p=document.getElementById("swal-description").value,i=document.getElementById("swal-icon").value;if(!r)return g.showValidationMessage("El nombre del submódulo es obligatorio"),!1;const E=r.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),P=`${o?.route||"/dashboard"}/${E}`;return{name:E,display_name:r,description:p,content_type:n,powerbi_url:"",icon:i,route:P,parent_id:o?.id,role:o?.role}}}});if(d)try{await h.post("/admin/modules",d,{onSuccess:()=>{g.fire({title:"¡Éxito!",text:"Contenido agregado correctamente",icon:"success",timer:2e3,showConfirmButton:!1})},onError:n=>{let s="Error al agregar el contenido";if(typeof n=="object"&&n!==null){const r=Object.keys(n);r.length>0&&(s=n[r[0]])}g.fire({title:"Error",text:s,icon:"error"})}})}catch{g.fire({title:"Error",text:"Error al procesar la solicitud",icon:"error"})}},B=async e=>{const{value:c}=await l.fire({title:"Editar Contenido",html:`
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
            `,showCancelButton:!0,confirmButtonColor:"#2a3d85",cancelButtonColor:"#6b7280",confirmButtonText:"Actualizar",cancelButtonText:"Cancelar",width:"600px",preConfirm:()=>{if(e.content_type==="powerbi"){const a=document.getElementById("swal-powerbi-url").value;return a?{powerbi_url:a,name:e.name,display_name:e.display_name,description:e.description,icon:e.icon,route:e.route,content_type:"powerbi",role:e.role||o?.role||"direccionamiento",parent_id:e.parent_id}:(l.showValidationMessage("La URL de Power BI es obligatoria"),!1)}else{const a=document.getElementById("swal-display-name").value,m=document.getElementById("swal-description").value,d=document.getElementById("swal-icon").value;if(!a)return l.showValidationMessage("El nombre del submódulo es obligatorio"),!1;const n=a!==e.display_name;let s=e.name,r=e.route;return n&&(s=a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),r=`${o?.route||"/dashboard"}/${s}`),{name:s,display_name:a,description:m,icon:d,route:r,role:e.role||o?.role,parent_id:e.parent_id}}}});if(c)try{await h.put(`/admin/modules/${e.id}`,c,{onSuccess:()=>{l.fire({title:"¡Éxito!",text:"Contenido actualizado correctamente",icon:"success",confirmButtonColor:"#2a3d85",timer:2e3,showConfirmButton:!1})},onError:a=>{let m="Error al actualizar el contenido";if(typeof a=="object"&&a!==null){const d=Object.keys(a);d.length>0&&(m=a[d[0]])}l.fire({title:"Error",text:m,icon:"error",confirmButtonColor:"#2a3d85"})}})}catch{l.fire({title:"Error",text:"Error al procesar la solicitud",icon:"error",confirmButtonColor:"#2a3d85"})}},j=async e=>{(await l.fire({title:"¿Estás seguro?",text:"Esta acción no se puede deshacer",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc2626",cancelButtonColor:"#6b7280",confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar"})).isConfirmed&&h.delete(`/admin/modules/${e}`,{onSuccess:()=>{l.fire({title:"¡Eliminado!",text:"El contenido ha sido eliminado exitosamente",icon:"success",confirmButtonColor:"#2a3d85"})}})},k=e=>{h.visit(e.route)};return t.jsx(t.Fragment,{children:t.jsxs("div",{className:"max-w-6xl mx-auto p-4 sm:p-6",children:[!v&&t.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6",children:[t.jsxs("div",{className:"flex items-center space-x-3 mb-4 sm:mb-0",children:[t.jsx(w,{className:"w-8 h-8 text-[#2a3d85]"}),t.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-900",children:y})]}),x&&(o&&o.parent_id!==null&&o.parent_id!==void 0?!f:!0)&&t.jsxs("button",{onClick:C,className:"flex items-center space-x-2 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white px-4 py-2 rounded-lg transition-colors",children:[t.jsx(N,{className:"w-4 h-4"}),t.jsx("span",{children:"Agregar Contenido"})]})]}),v&&x&&(o&&o.parent_id!==null&&o.parent_id!==void 0?!f:!0)&&t.jsx("div",{className:"flex justify-end mb-6",children:t.jsxs("button",{onClick:C,className:"flex items-center space-x-2 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white px-4 py-2 rounded-lg transition-colors",children:[t.jsx(N,{className:"w-4 h-4"}),t.jsx("span",{children:"Agregar Contenido"})]})}),u.length>0?t.jsxs("div",{className:"space-y-6",children:[u.filter(e=>e.content_type==="powerbi").map(e=>t.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg overflow-hidden",children:[x&&t.jsxs("div",{className:"absolute top-2 right-2 z-10 flex space-x-1",children:[t.jsx("button",{onClick:()=>B(e),className:"p-1 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded shadow transition-colors",title:"Editar Power BI",children:t.jsx(_,{className:"w-4 h-4"})}),t.jsx("button",{onClick:()=>j(e.id),className:"p-1 bg-white/80 hover:bg-white text-red-600 hover:text-red-800 rounded shadow transition-colors",title:"Eliminar Power BI",children:t.jsx(S,{className:"w-4 h-4"})})]}),t.jsx("iframe",{src:e.powerbi_url,width:"100%",height:"800",frameBorder:"0",allowFullScreen:!0,className:"border-0",title:"Power BI Report"})]},e.id)),u.filter(e=>e.content_type==="module").length>0&&t.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:u.filter(e=>e.content_type==="module").map(e=>t.jsxs("div",{className:"bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6",children:[t.jsxs("div",{className:"flex items-start justify-between mb-3",children:[t.jsxs("div",{className:"flex items-center space-x-3",children:[t.jsx(U,{className:"w-6 h-6 text-[#2a3d85]"}),t.jsx("h3",{className:"font-semibold text-gray-900",children:e.display_name})]}),x&&t.jsxs("div",{className:"flex space-x-1",children:[t.jsx("button",{onClick:()=>B(e),className:"p-1 hover:bg-gray-100 rounded transition-colors",title:"Editar",children:t.jsx(_,{className:"w-4 h-4 text-gray-600"})}),t.jsx("button",{onClick:()=>j(e.id),className:"p-1 hover:bg-red-50 rounded transition-colors",title:"Eliminar",children:t.jsx(S,{className:"w-4 h-4 text-red-600"})})]})]}),e.description&&t.jsx("p",{className:"text-sm text-gray-600 mb-3",children:e.description}),t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsx("span",{className:"text-xs text-gray-500",children:"Submódulo"}),t.jsxs("button",{onClick:()=>k(e),className:"flex items-center space-x-1 text-[#2a3d85] hover:text-[#1e2d5f] text-sm font-medium",children:[t.jsx("span",{children:"Abrir"}),t.jsx(T,{className:"w-3 h-3"})]})]})]},e.id))})]}):t.jsxs("div",{className:"text-center py-12",children:[t.jsx(w,{className:"w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4"}),t.jsx("p",{className:"text-gray-600 mb-4",children:x?t.jsxs(t.Fragment,{children:["No hay contenido agregado aún. ",t.jsx("br",{}),'Haga clic en "Agregar Contenido" para empezar.']}):t.jsxs(t.Fragment,{children:["El módulo de ",y," está siendo desarrollado.",t.jsx("br",{}),"Pronto estará disponible con todas las funcionalidades."]})})]})]})})}export{U as F,O as M};
