function t(n,e){const r=`/dashboard/${n}`;return e==="Administrador"?`${r}-administrador`:e==="Gerencia"?`${r}-gerencia`:r}function a(n,e){const r=e?.role;return t(n,r)}export{a as g};
