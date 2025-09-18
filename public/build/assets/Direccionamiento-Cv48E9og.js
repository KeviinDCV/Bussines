import{b as j,j as e,a as i}from"./app-Bo4pM-9d.js";import{A as N}from"./AppLayout-BVRq8WGl.js";import{S as s}from"./sweetalert2.esm.all-Y6IUEg8t.js";import{T as x}from"./trending-up-DkINfgLm.js";import{B as I,C as E,D as M,T as D,a as k}from"./target-BqpEWfKb.js";import{A as P}from"./activity-Ccji_cZH.js";import{H as T}from"./heart-BtHILaVM.js";import{S as U}from"./shield-CwGRPK2M.js";import{M as S}from"./map-gzPkiFiY.js";import{C as A}from"./calendar-Cd6lwcuw.js";import{S as L}from"./settings-Dy-JOUU9.js";import{U as F}from"./users-D3pwrjnr.js";import{C as _}from"./chart-column-Db9pCDgT.js";import{F as c}from"./file-text-Dnol2RPa.js";import{P as $}from"./plus-Des-_1fe.js";/* empty css            */import"./auth-CqQg7RL0.js";import"./authHistoryManager-C0uFoHhB.js";import"./user-4gHcTy89.js";import"./createLucideIcon-D-CQ50Fa.js";import"./chevron-down-BISuFi82.js";import"./log-out-BCKErKGr.js";const z={FileText:c,BarChart3:_,PieChart:k,Target:D,TrendingUp:x,Users:F,Settings:L,Database:M,Calendar:A,Clock:E,Map:S,Shield:U,Heart:T,Activity:P,Briefcase:I};function de(){const{props:n}=j(),m=n.auth?.user,u=n.modules||[],p=n.canCreateModules||!1,b=m?.role==="Gerencia",v=m?.role==="Administrador",f="Direccionamiento",y=[{value:"FileText",label:"Documento"},{value:"BarChart3",label:"Gráfico de Barras"},{value:"PieChart",label:"Gráfico Circular"},{value:"TrendingUp",label:"Tendencia"},{value:"Target",label:"Objetivo"},{value:"Users",label:"Usuarios"},{value:"Settings",label:"Configuración"},{value:"Database",label:"Base de Datos"},{value:"Calendar",label:"Calendario"},{value:"Clock",label:"Reloj"},{value:"Map",label:"Mapa"},{value:"Shield",label:"Escudo"},{value:"Heart",label:"Corazón"},{value:"Activity",label:"Actividad"},{value:"Briefcase",label:"Maletín"}],w=a=>{a.route?i.get(a.route):a.name==="plan-desarrollo"&&i.get("/plan-desarrollo")},h=async()=>{const{value:a}=await s.fire({title:"Crear Nuevo Contenido",html:`
                <div class="space-y-4 text-left">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Contenido *</label>
                        <select id="swal-content-type" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                            <option value="module">Módulo</option>
                            <option value="powerbi">Power BI</option>
                        </select>
                    </div>
                    
                    <!-- Campos para Módulo -->
                    <div id="module-fields">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del módulo *</label>
                            <input id="swal-display-name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="ej: Nuevo Módulo">
                            <small class="text-gray-500 text-xs mt-1 block">El nombre interno se generará automáticamente para la URL.</small>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea id="swal-description" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" placeholder="Descripción del módulo..." rows="3"></textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Icono</label>
                                <select id="swal-icon" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent">
                                    ${y.map(o=>`<option value="${o.value}">${o.label}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Orden</label>
                                <input id="swal-order" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a3d85] focus:border-transparent" type="number" value="0" min="0">
                            </div>
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
            `,focusConfirm:!1,showCancelButton:!0,confirmButtonText:"Crear",cancelButtonText:"Cancelar",confirmButtonColor:"#2a3d85",width:"600px",didOpen:()=>{const o=document.getElementById("swal-content-type"),r=document.getElementById("module-fields"),t=document.getElementById("powerbi-fields"),l=()=>{o.value==="powerbi"?(r.style.display="none",t.style.display="block"):(r.style.display="block",t.style.display="none")};o.addEventListener("change",l),l()},preConfirm:()=>{const o=document.getElementById("swal-content-type").value,r=document.getElementById("swal-powerbi-url").value;if(o==="powerbi"){if(!r)return s.showValidationMessage("La URL de Power BI es obligatoria"),!1;const l=`powerbi-${Date.now()}`,d=`/direccionamiento/${l}`;return{name:l,display_name:"Power BI Dashboard",description:"Dashboard de Power BI integrado",content_type:o,powerbi_url:r,icon:"BarChart3",order:0,route:d,role:f}}else{const t=document.getElementById("swal-display-name").value,l=document.getElementById("swal-description").value,d=document.getElementById("swal-icon").value,C=parseInt(document.getElementById("swal-order").value)||0;if(!t)return s.showValidationMessage("El nombre del módulo es obligatorio"),!1;const g=t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),B=`/direccionamiento/${g}`;return{name:g,display_name:t,description:l,content_type:o,powerbi_url:"",icon:d,order:C,route:B,role:f}}}});if(a)try{await i.post("/admin/modules",a,{onSuccess:()=>{s.fire({title:"¡Éxito!",text:"Módulo creado exitosamente",icon:"success",confirmButtonColor:"#2a3d85"}).then(()=>{i.reload({only:["modules"]})})},onError:o=>{const r=Object.values(o).flat().join(`
`);s.fire({title:"Error",text:r,icon:"error",confirmButtonColor:"#2a3d85"})}})}catch{s.fire({title:"Error",text:"Ocurrió un error al crear el módulo",icon:"error",confirmButtonColor:"#2a3d85"})}};return e.jsx(N,{title:"Dashboard Direccionamiento - Tableros de Gestión HUV",pageTitle:"Direccionamiento",pageDescription:"Planeación Estratégica y Direccionamiento",icon:x,showBackButton:b||v,backUrl:b?"/dashboard/gerencia":"/dashboard/administrador",children:e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[u.map(a=>{const o=z[a.icon]||c;return e.jsxs("div",{className:"bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#2a3d85] flex flex-col",children:[e.jsx("div",{className:"flex items-center mb-4",children:e.jsx(o,{className:"w-10 h-10 text-[#2a3d85]"})}),e.jsx("h3",{className:"text-lg font-semibold text-gray-900 mb-2",children:a.display_name}),e.jsx("p",{className:"text-sm text-gray-600 mb-4 flex-grow",children:a.description||"Módulo del sistema de direccionamiento"}),e.jsx("button",{onClick:()=>w(a),className:"w-full bg-[#2a3d85] hover:bg-[#1e2d5f] text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-auto",children:a.route?"Acceder al Módulo":"Próximamente"})]},a.id)}),u.length===0&&e.jsxs("div",{className:"col-span-full text-center py-12",children:[e.jsx(c,{className:"w-16 h-16 text-gray-400 mx-auto mb-4"}),e.jsx("h3",{className:"text-lg font-semibold text-gray-900 mb-2",children:"No hay módulos disponibles"}),e.jsx("p",{className:"text-gray-600 mb-4",children:p?"Comienza creando el primer módulo para este rol.":"Los módulos serán visibles una vez que sean creados por el administrador."})]})]}),p&&e.jsx("button",{onClick:h,className:"fixed bottom-6 right-6 bg-[#2a3d85] hover:bg-[#1e2d5f] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50",title:"Crear nuevo módulo",children:e.jsx($,{className:"w-6 h-6"})})]})})}export{de as default};
