import{j as o,a as u}from"./app-lJrDuGRQ.js";import{S as s}from"./sweetalert2.esm.all-Y6IUEg8t.js";import{c as k}from"./sweetAlert-DJK8XZI4.js";import{P as C}from"./plus-R04HgH5A.js";import{c as g}from"./createLucideIcon-BpYCDGdD.js";import{T as B}from"./trash-2-BCpuKAPa.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],_=g("ExternalLink",P);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],T=g("FolderOpen",I);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],N=g("Pen",F);function z({module:l,submodules:c,displayName:h,icon:f,canManageContent:E=!1}){const d=E,m=c.some(e=>e.content_type==="powerbi"),b=c.length>0,w=async()=>{const e=m?"":'<option value="powerbi">Power BI</option>',p=m?'<p class="text-sm text-amber-600 bg-amber-50 p-2 rounded mb-2">⚠️ Ya existe un Power BI en este módulo. Solo puedes agregar submódulos.</p>':"",{value:a}=await k.fire({title:"Agregar Contenido",html:`
                <div class="space-y-6 text-left">
                    ${p}
                    
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-800 mb-2">Tipo de Contenido *</label>
                        <select id="swal-content-type" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-[#2a3d85] transition-colors">
                            <option value="module">Submódulo</option>
                            ${e}
                        </select>
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
            `,showCancelButton:!0,confirmButtonText:"Agregar",cancelButtonText:"Cancelar",width:"650px",didOpen:()=>{const t=document.getElementById("swal-content-type"),n=document.getElementById("module-fields"),r=document.getElementById("powerbi-fields"),i=()=>{t.value==="powerbi"?(n.style.display="none",r.style.display="block"):(n.style.display="block",r.style.display="none")};t.addEventListener("change",i),i()},preConfirm:()=>{const t=document.getElementById("swal-content-type").value,n=document.getElementById("swal-powerbi-url").value;if(t==="powerbi"){if(!n)return s.showValidationMessage("La URL de Power BI es obligatoria"),!1;const i=`powerbi-${Date.now()}`,x=`${l?.route||"/dashboard"}/${i}`;return{name:i,display_name:"Power BI Dashboard",description:"Dashboard de Power BI integrado",content_type:t,powerbi_url:n,icon:"BarChart3",route:x,parent_id:l?.id,role:l?.role}}else{const r=document.getElementById("swal-display-name").value,i=document.getElementById("swal-description").value,x=document.getElementById("swal-icon").value;if(!r)return s.showValidationMessage("El nombre del submódulo es obligatorio"),!1;const j=r.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),$=`${l?.route||"/dashboard"}/${j}`;return{name:j,display_name:r,description:i,content_type:t,powerbi_url:"",icon:x,route:$,parent_id:l?.id,role:l?.role}}}});if(a)try{await u.post("/admin/modules",a,{onSuccess:()=>{s.fire({title:"¡Éxito!",text:"Contenido agregado correctamente",icon:"success",timer:2e3,showConfirmButton:!1})},onError:t=>{let n="Error al agregar el contenido";if(typeof t=="object"&&t!==null){const r=Object.keys(t);r.length>0&&(n=t[r[0]])}s.fire({title:"Error",text:n,icon:"error"})}})}catch{s.fire({title:"Error",text:"Error al procesar la solicitud",icon:"error"})}},y=async e=>{const{value:p}=await s.fire({title:"Editar Contenido",html:`
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
            `,showCancelButton:!0,confirmButtonText:"Actualizar",cancelButtonText:"Cancelar",width:"600px",preConfirm:()=>{if(e.content_type==="powerbi"){const a=document.getElementById("swal-powerbi-url").value;return a?{powerbi_url:a}:(s.showValidationMessage("La URL de Power BI es obligatoria"),!1)}else{const a=document.getElementById("swal-display-name").value,t=document.getElementById("swal-description").value,n=document.getElementById("swal-icon").value;if(!a)return s.showValidationMessage("El nombre del submódulo es obligatorio"),!1;const r=a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),i=`${l?.route||"/dashboard"}/${r}`;return{name:r,display_name:a,description:t,icon:n,route:i}}}});if(p)try{await u.put(`/admin/modules/${e.id}`,p,{onSuccess:()=>{s.fire({title:"¡Éxito!",text:"Contenido actualizado correctamente",icon:"success",timer:2e3,showConfirmButton:!1})},onError:a=>{let t="Error al actualizar el contenido";if(typeof a=="object"&&a!==null){const n=Object.keys(a);n.length>0&&(t=a[n[0]])}s.fire({title:"Error",text:t,icon:"error"})}})}catch{s.fire({title:"Error",text:"Error al procesar la solicitud",icon:"error"})}},v=async e=>{(await s.fire({title:"¿Estás seguro?",text:"Esta acción no se puede deshacer",icon:"warning",showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"#3085d6",confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar"})).isConfirmed&&u.delete(`/admin/modules/${e}`,{onSuccess:()=>{s.fire("¡Eliminado!","El contenido ha sido eliminado.","success")}})},S=e=>{u.visit(e.route)};return o.jsx(o.Fragment,{children:o.jsxs("div",{className:"max-w-6xl mx-auto p-4 sm:p-6",children:[!b&&o.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6",children:[o.jsxs("div",{className:"flex items-center space-x-3 mb-4 sm:mb-0",children:[o.jsx(f,{className:"w-8 h-8 text-[#2a3d85]"}),o.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-900",children:h})]}),d&&o.jsxs("button",{onClick:w,className:"flex items-center space-x-2 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white px-4 py-2 rounded-lg transition-colors",children:[o.jsx(C,{className:"w-4 h-4"}),o.jsx("span",{children:"Agregar Contenido"})]})]}),b&&!m&&d&&o.jsx("div",{className:"flex justify-end mb-6",children:o.jsxs("button",{onClick:w,className:"flex items-center space-x-2 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white px-4 py-2 rounded-lg transition-colors",children:[o.jsx(C,{className:"w-4 h-4"}),o.jsx("span",{children:"Agregar Contenido"})]})}),c.length>0?o.jsxs("div",{className:"space-y-6",children:[c.filter(e=>e.content_type==="powerbi").map(e=>o.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg overflow-hidden",children:[d&&o.jsxs("div",{className:"absolute top-2 right-2 z-10 flex space-x-1",children:[o.jsx("button",{onClick:()=>y(e),className:"p-1 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded shadow transition-colors",title:"Editar Power BI",children:o.jsx(N,{className:"w-4 h-4"})}),o.jsx("button",{onClick:()=>v(e.id),className:"p-1 bg-white/80 hover:bg-white text-red-600 hover:text-red-800 rounded shadow transition-colors",title:"Eliminar Power BI",children:o.jsx(B,{className:"w-4 h-4"})})]}),o.jsx("iframe",{src:e.powerbi_url,width:"100%",height:"800",frameBorder:"0",allowFullScreen:!0,className:"border-0",title:"Power BI Report"})]},e.id)),c.filter(e=>e.content_type==="module").length>0&&o.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:c.filter(e=>e.content_type==="module").map(e=>o.jsxs("div",{className:"bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow p-6",children:[o.jsxs("div",{className:"flex items-start justify-between mb-3",children:[o.jsxs("div",{className:"flex items-center space-x-3",children:[o.jsx(T,{className:"w-6 h-6 text-[#2a3d85]"}),o.jsx("h3",{className:"font-semibold text-gray-900",children:e.display_name})]}),d&&o.jsxs("div",{className:"flex space-x-1",children:[o.jsx("button",{onClick:()=>y(e),className:"p-1 hover:bg-gray-100 rounded transition-colors",title:"Editar",children:o.jsx(N,{className:"w-4 h-4 text-gray-600"})}),o.jsx("button",{onClick:()=>v(e.id),className:"p-1 hover:bg-red-50 rounded transition-colors",title:"Eliminar",children:o.jsx(B,{className:"w-4 h-4 text-red-600"})})]})]}),e.description&&o.jsx("p",{className:"text-sm text-gray-600 mb-3",children:e.description}),o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsx("span",{className:"text-xs text-gray-500",children:"Submódulo"}),o.jsxs("button",{onClick:()=>S(e),className:"flex items-center space-x-1 text-[#2a3d85] hover:text-[#1e2d5f] text-sm font-medium",children:[o.jsx("span",{children:"Abrir"}),o.jsx(_,{className:"w-3 h-3"})]})]})]},e.id))})]}):o.jsxs("div",{className:"text-center py-12",children:[o.jsx(f,{className:"w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4"}),o.jsx("p",{className:"text-gray-600 mb-4",children:d?o.jsxs(o.Fragment,{children:["No hay contenido agregado aún. ",o.jsx("br",{}),'Haga clic en "Agregar Contenido" para empezar.']}):o.jsxs(o.Fragment,{children:["El módulo de ",h," está siendo desarrollado.",o.jsx("br",{}),"Pronto estará disponible con todas las funcionalidades."]})})]})]})})}export{z as M};
