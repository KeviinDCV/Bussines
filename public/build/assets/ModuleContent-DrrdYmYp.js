import{j as t,a as u}from"./app-CfLLNdmq.js";import{S as n}from"./sweetalert2.esm.all-Y6IUEg8t.js";import{P as C}from"./plus-DzJKngM-.js";import{c as g}from"./createLucideIcon-1XNmPS5_.js";import{T as B}from"./trash-2-D8EfHZAQ.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],P=g("ExternalLink",k);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],I=g("FolderOpen",_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],N=g("Pen",T);function H({module:l,submodules:c,displayName:h,icon:f,canManageContent:E=!1}){const d=E,m=c.some(e=>e.content_type==="powerbi"),b=c.length>0,w=async()=>{const e=m?"":'<option value="powerbi">Power BI</option>',p=m?'<p class="text-sm text-amber-600 bg-amber-50 p-2 rounded mb-2">⚠️ Ya existe un Power BI en este módulo. Solo puedes agregar submódulos.</p>':"",{value:a}=await n.fire({title:"Agregar Contenido",html:`
                <div class="space-y-4">
                    ${p}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Contenido *</label>
                        <select id="swal-content-type" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                            <option value="module">Submódulo</option>
                            ${e}
                        </select>
                    </div>
                    
                    <!-- Campos para Submódulo -->
                    <div id="module-fields">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del submódulo *</label>
                            <input type="text" id="swal-display-name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="ej: Nuevo Submódulo">
                            <small class="text-gray-500 text-xs mt-1 block">El nombre interno se generará automáticamente para la URL.</small>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea id="swal-description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="Descripción del submódulo..."></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Ícono</label>
                            <select id="swal-icon" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                                <option value="FolderOpen">Carpeta (FolderOpen)</option>
                                <option value="FileText">Documento (FileText)</option>
                                <option value="Settings">Configuración (Settings)</option>
                                <option value="BarChart3">Gráfico (BarChart3)</option>
                                <option value="Users">Usuarios (Users)</option>
                                <option value="Shield">Escudo (Shield)</option>
                                <option value="Monitor">Monitor (Monitor)</option>
                                <option value="Database">Base de Datos (Database)</option>
                                <option value="Search">Buscar (Search)</option>
                                <option value="TrendingUp">Tendencia (TrendingUp)</option>
                                <option value="Heart">Corazón (Heart)</option>
                                <option value="RefreshCw">Actualizar (RefreshCw)</option>
                                <option value="Headphones">Audífonos (Headphones)</option>
                                <option value="Stethoscope">Estetoscopio (Stethoscope)</option>
                                <option value="Award">Premio (Award)</option>
                                <option value="Wrench">Herramientas (Wrench)</option>
                                <option value="Pill">Pastilla (Pill)</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Campos para Power BI -->
                    <div id="powerbi-fields" style="display: none;">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">URL de Power BI *</label>
                            <input id="swal-powerbi-url" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="https://app.powerbi.com/reportEmbed?reportId=...">
                            <p class="text-xs text-gray-500 mt-1">Pegue la URL de inserción del informe de Power BI</p>
                        </div>
                    </div>
                </div>
            `,showCancelButton:!0,confirmButtonText:"Agregar",cancelButtonText:"Cancelar",width:"600px",didOpen:()=>{const o=document.getElementById("swal-content-type"),r=document.getElementById("module-fields"),s=document.getElementById("powerbi-fields"),i=()=>{o.value==="powerbi"?(r.style.display="none",s.style.display="block"):(r.style.display="block",s.style.display="none")};o.addEventListener("change",i),i()},preConfirm:()=>{const o=document.getElementById("swal-content-type").value,r=document.getElementById("swal-powerbi-url").value;if(o==="powerbi"){if(!r)return n.showValidationMessage("La URL de Power BI es obligatoria"),!1;const i=`powerbi-${Date.now()}`,x=`${l?.route||"/dashboard"}/${i}`;return{name:i,display_name:"Power BI Dashboard",description:"Dashboard de Power BI integrado",content_type:o,powerbi_url:r,icon:"BarChart3",route:x,parent_id:l?.id,role:l?.role}}else{const s=document.getElementById("swal-display-name").value,i=document.getElementById("swal-description").value,x=document.getElementById("swal-icon").value;if(!s)return n.showValidationMessage("El nombre del submódulo es obligatorio"),!1;const j=s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),$=`${l?.route||"/dashboard"}/${j}`;return{name:j,display_name:s,description:i,content_type:o,powerbi_url:"",icon:x,route:$,parent_id:l?.id,role:l?.role}}}});if(a)try{await u.post("/admin/modules",a,{onSuccess:()=>{n.fire({title:"¡Éxito!",text:"Contenido agregado correctamente",icon:"success",timer:2e3,showConfirmButton:!1})},onError:o=>{let r="Error al agregar el contenido";if(typeof o=="object"&&o!==null){const s=Object.keys(o);s.length>0&&(r=o[s[0]])}n.fire({title:"Error",text:r,icon:"error"})}})}catch{n.fire({title:"Error",text:"Error al procesar la solicitud",icon:"error"})}},y=async e=>{const{value:p}=await n.fire({title:"Editar Contenido",html:`
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Contenido</label>
                        <input type="text" value="${e.content_type==="powerbi"?"Power BI":"Submódulo"}" class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" readonly>
                    </div>
                    
                    ${e.content_type==="powerbi"?`
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">URL de Power BI *</label>
                            <input id="swal-powerbi-url" value="${e.powerbi_url||""}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="https://app.powerbi.com/reportEmbed?reportId=...">
                        </div>
                    `:`
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del submódulo *</label>
                            <input type="text" id="swal-display-name" value="${e.display_name}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                            <small class="text-gray-500 text-xs mt-1 block">El nombre interno se generará automáticamente para la URL.</small>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea id="swal-description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">${e.description||""}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Ícono</label>
                            <select id="swal-icon" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
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
            `,showCancelButton:!0,confirmButtonText:"Actualizar",cancelButtonText:"Cancelar",width:"600px",preConfirm:()=>{if(e.content_type==="powerbi"){const a=document.getElementById("swal-powerbi-url").value;return a?{powerbi_url:a}:(n.showValidationMessage("La URL de Power BI es obligatoria"),!1)}else{const a=document.getElementById("swal-display-name").value,o=document.getElementById("swal-description").value,r=document.getElementById("swal-icon").value;if(!a)return n.showValidationMessage("El nombre del submódulo es obligatorio"),!1;const s=a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),i=`${l?.route||"/dashboard"}/${s}`;return{name:s,display_name:a,description:o,icon:r,route:i}}}});if(p)try{await u.put(`/admin/modules/${e.id}`,p,{onSuccess:()=>{n.fire({title:"¡Éxito!",text:"Contenido actualizado correctamente",icon:"success",timer:2e3,showConfirmButton:!1})},onError:a=>{let o="Error al actualizar el contenido";if(typeof a=="object"&&a!==null){const r=Object.keys(a);r.length>0&&(o=a[r[0]])}n.fire({title:"Error",text:o,icon:"error"})}})}catch{n.fire({title:"Error",text:"Error al procesar la solicitud",icon:"error"})}},v=async e=>{(await n.fire({title:"¿Estás seguro?",text:"Esta acción no se puede deshacer",icon:"warning",showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"#3085d6",confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar"})).isConfirmed&&u.delete(`/admin/modules/${e}`,{onSuccess:()=>{n.fire("¡Eliminado!","El contenido ha sido eliminado.","success")}})},S=e=>{u.visit(e.route)};return t.jsx(t.Fragment,{children:t.jsxs("div",{className:"max-w-6xl mx-auto p-4 sm:p-6",children:[!b&&t.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6",children:[t.jsxs("div",{className:"flex items-center space-x-3 mb-4 sm:mb-0",children:[t.jsx(f,{className:"w-8 h-8 text-[#2a3d85]"}),t.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-900",children:h})]}),d&&t.jsxs("button",{onClick:w,className:"flex items-center space-x-2 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white px-4 py-2 rounded-lg transition-colors",children:[t.jsx(C,{className:"w-4 h-4"}),t.jsx("span",{children:"Agregar Contenido"})]})]}),b&&!m&&d&&t.jsx("div",{className:"flex justify-end mb-6",children:t.jsxs("button",{onClick:w,className:"flex items-center space-x-2 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white px-4 py-2 rounded-lg transition-colors",children:[t.jsx(C,{className:"w-4 h-4"}),t.jsx("span",{children:"Agregar Contenido"})]})}),c.length>0?t.jsxs("div",{className:"space-y-6",children:[c.filter(e=>e.content_type==="powerbi").map(e=>t.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg overflow-hidden",children:[d&&t.jsxs("div",{className:"absolute top-2 right-2 z-10 flex space-x-1",children:[t.jsx("button",{onClick:()=>y(e),className:"p-1 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded shadow transition-colors",title:"Editar Power BI",children:t.jsx(N,{className:"w-4 h-4"})}),t.jsx("button",{onClick:()=>v(e.id),className:"p-1 bg-white/80 hover:bg-white text-red-600 hover:text-red-800 rounded shadow transition-colors",title:"Eliminar Power BI",children:t.jsx(B,{className:"w-4 h-4"})})]}),t.jsx("iframe",{src:e.powerbi_url,width:"100%",height:"800",frameBorder:"0",allowFullScreen:!0,className:"border-0",title:"Power BI Report"})]},e.id)),c.filter(e=>e.content_type==="module").length>0&&t.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:c.filter(e=>e.content_type==="module").map(e=>t.jsxs("div",{className:"bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow p-6",children:[t.jsxs("div",{className:"flex items-start justify-between mb-3",children:[t.jsxs("div",{className:"flex items-center space-x-3",children:[t.jsx(I,{className:"w-6 h-6 text-[#2a3d85]"}),t.jsx("h3",{className:"font-semibold text-gray-900",children:e.display_name})]}),d&&t.jsxs("div",{className:"flex space-x-1",children:[t.jsx("button",{onClick:()=>y(e),className:"p-1 hover:bg-gray-100 rounded transition-colors",title:"Editar",children:t.jsx(N,{className:"w-4 h-4 text-gray-600"})}),t.jsx("button",{onClick:()=>v(e.id),className:"p-1 hover:bg-red-50 rounded transition-colors",title:"Eliminar",children:t.jsx(B,{className:"w-4 h-4 text-red-600"})})]})]}),e.description&&t.jsx("p",{className:"text-sm text-gray-600 mb-3",children:e.description}),t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsx("span",{className:"text-xs text-gray-500",children:"Submódulo"}),t.jsxs("button",{onClick:()=>S(e),className:"flex items-center space-x-1 text-[#2a3d85] hover:text-[#1e2d5f] text-sm font-medium",children:[t.jsx("span",{children:"Abrir"}),t.jsx(P,{className:"w-3 h-3"})]})]})]},e.id))})]}):t.jsxs("div",{className:"text-center py-12",children:[t.jsx(f,{className:"w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4"}),t.jsx("p",{className:"text-gray-600 mb-4",children:d?t.jsxs(t.Fragment,{children:["No hay contenido agregado aún. ",t.jsx("br",{}),'Haga clic en "Agregar Contenido" para empezar.']}):t.jsxs(t.Fragment,{children:["El módulo de ",h," está siendo desarrollado.",t.jsx("br",{}),"Pronto estará disponible con todas las funcionalidades."]})})]})]})})}export{H as M};
