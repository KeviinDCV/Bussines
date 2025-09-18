import{j as e,a as l}from"./app-JW1WnQAC.js";import{S as i}from"./sweetalert2.esm.all-Y6IUEg8t.js";import{P as B}from"./plus-CtbLGix8.js";import{c as x}from"./createLucideIcon-DUXvfTrF.js";import{T as C}from"./trash-2-B3ZBB6gM.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],S=x("ExternalLink",_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],k=x("FolderOpen",$);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],j=x("Pen",L);function F({module:d,submodules:c,displayName:g,icon:b,canManageContent:N=!1}){const p=N,h=async()=>{const t=f?"":'<option value="powerbi">Power BI</option>',m=f?'<p class="text-sm text-amber-600 bg-amber-50 p-2 rounded mb-2">⚠️ Ya existe un Power BI en este módulo. Solo puedes agregar submódulos.</p>':"",{value:a}=await i.fire({title:"Agregar Contenido",html:`
                <div class="space-y-4">
                    ${m}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Contenido *</label>
                        <select id="swal-content-type" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                            <option value="module">Submódulo</option>
                            ${t}
                        </select>
                    </div>
                    
                    <!-- Campos para Submódulo -->
                    <div id="module-fields">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                                <input id="swal-input1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="ej: nuevo-contenido">
                                <p class="text-xs text-gray-500 mt-1">Solo letras, números y guiones. Se usará para generar la URL.</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre a Mostrar *</label>
                                <input id="swal-input2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="ej: Nuevo Contenido">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea id="swal-input3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="Descripción del contenido..." rows="3"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Icono</label>
                            <select id="swal-input4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                                <option value="FileText">Documento</option>
                                <option value="BarChart3">Gráfico de Barras</option>
                                <option value="PieChart">Gráfico Circular</option>
                                <option value="Database">Base de Datos</option>
                                <option value="Settings">Configuración</option>
                                <option value="Users">Usuarios</option>
                                <option value="Shield">Escudo</option>
                                <option value="Heart">Corazón</option>
                                <option value="Activity">Actividad</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Campo para Power BI (solo URL) -->
                    <div id="powerbi-fields" class="hidden">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">URL de Power BI *</label>
                            <input id="swal-powerbi-url" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="https://app.powerbi.com/view?r=...">
                            <p class="text-xs text-gray-500 mt-1">Pega aquí el enlace de implementación desde Power BI (Archivo → Insertar informe → Sitio web)</p>
                        </div>
                    </div>
                </div>
            `,didOpen:()=>{const o=document.getElementById("swal-content-type"),n=document.getElementById("module-fields"),r=document.getElementById("powerbi-fields");o&&n&&r&&o.addEventListener("change",function(){this.value==="powerbi"?(n.classList.add("hidden"),r.classList.remove("hidden")):(n.classList.remove("hidden"),r.classList.add("hidden"))})},focusConfirm:!1,showCancelButton:!0,confirmButtonText:"Crear Contenido",cancelButtonText:"Cancelar",confirmButtonColor:"#2a3d85",width:"600px",preConfirm:()=>{const o=document.getElementById("swal-content-type").value,n=document.getElementById("swal-powerbi-url").value;if(o==="powerbi"){if(!n)return i.showValidationMessage("La URL de Power BI es obligatoria"),!1;const s=`powerbi-${Date.now()}`,u=`${d?.route||"/dashboard"}/${s}`;return{name:s,display_name:"Power BI Dashboard",description:"Dashboard de Power BI integrado",content_type:o,powerbi_url:n,icon:"BarChart3",route:u,parent_id:d?.id,role:d?.role}}else{const r=document.getElementById("swal-input1").value,s=document.getElementById("swal-input2").value,u=document.getElementById("swal-input3").value,I=document.getElementById("swal-input4").value;if(!r||!s)return i.showValidationMessage("El nombre y el nombre a mostrar son obligatorios para submódulos"),!1;if(!/^[a-z0-9-]+$/.test(r))return i.showValidationMessage("El nombre solo puede contener letras minúsculas, números y guiones"),!1;const P=`${d?.route||"/dashboard"}/${r}`;return{name:r,display_name:s,description:u,content_type:o,powerbi_url:"",icon:I,route:P,parent_id:d?.id,role:d?.role}}}});if(a)try{await l.post("/admin/modules",a,{onSuccess:()=>{i.fire({title:"¡Éxito!",text:"Contenido creado exitosamente",icon:"success",confirmButtonColor:"#2a3d85"}).then(()=>{l.reload({only:["submodules"]})})},onError:o=>{let n="Ocurrió un error al crear el contenido";if(o.name&&o.name.includes("validation.unique"))n="Ya existe contenido con ese nombre. Por favor, elige un nombre diferente.";else if(o.route&&o.route.includes("validation.unique"))n="Ya existe contenido con esa ruta. Por favor, elige un nombre diferente.";else{const r=Object.values(o).flat();r.length>0&&(n=r.join(`
`))}i.fire({title:"Error al crear contenido",text:n,icon:"error",confirmButtonColor:"#2a3d85"})}})}catch{i.fire({title:"Error",text:"Ocurrió un error al crear el contenido",icon:"error",confirmButtonColor:"#2a3d85"})}},w=async t=>{const{value:m}=await i.fire({title:"Editar Contenido",html:`
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Contenido *</label>
                        <select id="swal-content-type" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                            <option value="module" ${t.content_type==="module"?"selected":""}>Submódulo</option>
                            <option value="powerbi" ${t.content_type==="powerbi"?"selected":""}>Power BI</option>
                        </select>
                    </div>
                    
                    <!-- Campos para Submódulo -->
                    <div id="module-fields" class="${t.content_type==="powerbi"?"hidden":""}">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                                <input id="swal-input1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" value="${t.name}" placeholder="ej: nuevo-contenido">
                                <p class="text-xs text-gray-500 mt-1">Solo letras, números y guiones. Se usará para generar la URL.</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre a Mostrar *</label>
                                <input id="swal-input2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" value="${t.display_name}" placeholder="ej: Nuevo Contenido">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea id="swal-input3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="Descripción del contenido..." rows="3">${t.description||""}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Icono</label>
                            <select id="swal-input4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                                <option value="FileText" ${t.icon==="FileText"?"selected":""}>Documento</option>
                                <option value="BarChart3" ${t.icon==="BarChart3"?"selected":""}>Gráfico de Barras</option>
                                <option value="PieChart" ${t.icon==="PieChart"?"selected":""}>Gráfico Circular</option>
                                <option value="Database" ${t.icon==="Database"?"selected":""}>Base de Datos</option>
                                <option value="Settings" ${t.icon==="Settings"?"selected":""}>Configuración</option>
                                <option value="Users" ${t.icon==="Users"?"selected":""}>Usuarios</option>
                                <option value="Shield" ${t.icon==="Shield"?"selected":""}>Escudo</option>
                                <option value="Heart" ${t.icon==="Heart"?"selected":""}>Corazón</option>
                                <option value="Activity" ${t.icon==="Activity"?"selected":""}>Actividad</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Campo para Power BI (solo URL) -->
                    <div id="powerbi-fields" class="${t.content_type==="powerbi"?"":"hidden"}">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">URL de Power BI *</label>
                            <input id="swal-powerbi-url" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" value="${t.powerbi_url||""}" placeholder="https://app.powerbi.com/view?r=...">
                            <p class="text-xs text-gray-500 mt-1">Pega aquí el enlace de implementación desde Power BI (Archivo → Insertar informe → Sitio web)</p>
                        </div>
                    </div>
                </div>
            `,didOpen:()=>{const a=document.getElementById("swal-content-type"),o=document.getElementById("module-fields"),n=document.getElementById("powerbi-fields");a&&o&&n&&a.addEventListener("change",function(){this.value==="powerbi"?(o.classList.add("hidden"),n.classList.remove("hidden")):(o.classList.remove("hidden"),n.classList.add("hidden"))})},focusConfirm:!1,showCancelButton:!0,confirmButtonText:"Actualizar Contenido",cancelButtonText:"Cancelar",confirmButtonColor:"#2a3d85",width:"600px",preConfirm:()=>{const a=document.getElementById("swal-content-type").value,o=document.getElementById("swal-input1").value,n=document.getElementById("swal-input2").value,r=document.getElementById("swal-input3").value,s=document.getElementById("swal-input4").value,u=document.getElementById("swal-powerbi-url").value;return!o||!n?(i.showValidationMessage("El nombre y el nombre a mostrar son obligatorios"),!1):a==="powerbi"&&!u?(i.showValidationMessage("La URL de Power BI es obligatoria para contenido de tipo Power BI"),!1):{name:o,display_name:n,description:r,content_type:a,powerbi_url:a==="powerbi"?u:"",icon:a==="module"?s:"BarChart3",route:t.route,parent_id:t.parent_id,role:t.role}}});if(m)try{await l.put(`/admin/modules/${t.id}`,m,{onSuccess:()=>{i.fire({title:"¡Éxito!",text:"Contenido actualizado exitosamente",icon:"success",confirmButtonColor:"#2a3d85"}).then(()=>{l.reload({only:["submodules"]})})},onError:a=>{let o="Ocurrió un error al actualizar el contenido";if(a.name&&a.name.includes("validation.unique"))o="Ya existe contenido con ese nombre. Por favor, elige un nombre diferente.";else if(a.route&&a.route.includes("validation.unique"))o="Ya existe contenido con esa ruta. Por favor, elige un nombre diferente.";else{const n=Object.values(a).flat();n.length>0&&(o=n.join(`
`))}i.fire({title:"Error al actualizar contenido",text:o,icon:"error",confirmButtonColor:"#2a3d85"})}})}catch{i.fire({title:"Error",text:"Ocurrió un error al actualizar el contenido",icon:"error",confirmButtonColor:"#2a3d85"})}},v=async t=>{(await i.fire({title:"¿Estás seguro?",text:"Esta acción no se puede deshacer",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar"})).isConfirmed&&l.delete(`/admin/modules/${t}`,{onSuccess:()=>{l.reload({only:["submodules"]})}})},E=t=>{l.visit(t.route)},f=c.some(t=>t.content_type==="powerbi"),y=c.length>0;return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"max-w-6xl mx-auto p-4 sm:p-6",children:[!y&&e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6",children:[e.jsxs("div",{className:"flex items-center space-x-3 mb-4 sm:mb-0",children:[e.jsx(b,{className:"w-8 h-8 text-[#2a3d85]"}),e.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-900",children:g})]}),p&&e.jsxs("button",{onClick:h,className:"flex items-center space-x-2 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white px-4 py-2 rounded-lg transition-colors",children:[e.jsx(B,{className:"w-4 h-4"}),e.jsx("span",{children:"Agregar Contenido"})]})]}),y&&!f&&p&&e.jsx("div",{className:"flex justify-end mb-6",children:e.jsxs("button",{onClick:h,className:"flex items-center space-x-2 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white px-4 py-2 rounded-lg transition-colors",children:[e.jsx(B,{className:"w-4 h-4"}),e.jsx("span",{children:"Agregar Contenido"})]})}),c.length>0?e.jsxs("div",{className:"space-y-6",children:[c.filter(t=>t.content_type==="powerbi").map(t=>e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-4 sm:p-6",children:[p&&e.jsxs("div",{className:"flex justify-end space-x-2 mb-4",children:[e.jsx("button",{onClick:()=>w(t),className:"p-2 hover:bg-gray-100 rounded transition-colors",title:"Editar Power BI",children:e.jsx(j,{className:"w-4 h-4 text-gray-600"})}),e.jsx("button",{onClick:()=>v(t.id),className:"p-2 hover:bg-red-50 rounded transition-colors",title:"Eliminar Power BI",children:e.jsx(C,{className:"w-4 h-4 text-red-600"})})]}),e.jsx("div",{className:"w-full h-full",children:e.jsx("iframe",{title:"Power BI Dashboard",width:"100%",height:"800",src:t.powerbi_url,frameBorder:"0",allowFullScreen:!0,className:"rounded-lg"})})]},t.id)),c.filter(t=>t.content_type==="module").length>0&&e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:c.filter(t=>t.content_type==="module").map(t=>e.jsxs("div",{className:"bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow p-6",children:[e.jsxs("div",{className:"flex items-start justify-between mb-3",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(k,{className:"w-6 h-6 text-[#2a3d85]"}),e.jsx("h3",{className:"font-semibold text-gray-900",children:t.display_name})]}),p&&e.jsxs("div",{className:"flex space-x-1",children:[e.jsx("button",{onClick:()=>w(t),className:"p-1 hover:bg-gray-100 rounded transition-colors",title:"Editar",children:e.jsx(j,{className:"w-4 h-4 text-gray-600"})}),e.jsx("button",{onClick:()=>v(t.id),className:"p-1 hover:bg-red-50 rounded transition-colors",title:"Eliminar",children:e.jsx(C,{className:"w-4 h-4 text-red-600"})})]})]}),t.description&&e.jsx("p",{className:"text-sm text-gray-600 mb-3",children:t.description}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-xs text-gray-500",children:"Submódulo"}),e.jsxs("button",{onClick:()=>E(t),className:"flex items-center space-x-1 text-[#2a3d85] hover:text-[#1e2d5f] text-sm font-medium",children:[e.jsx("span",{children:"Abrir"}),e.jsx(S,{className:"w-3 h-3"})]})]})]},t.id))})]}):e.jsxs("div",{className:"text-center py-12",children:[e.jsx(b,{className:"w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4"}),e.jsx("p",{className:"text-gray-600 mb-4",children:p?e.jsxs(e.Fragment,{children:["No hay contenido agregado aún. ",e.jsx("br",{}),'Haga clic en "Agregar Contenido" para empezar.']}):e.jsxs(e.Fragment,{children:["El módulo de ",g," está siendo desarrollado.",e.jsx("br",{}),"Pronto estará disponible con todas las funcionalidades."]})})]})]})})}export{F as M};
