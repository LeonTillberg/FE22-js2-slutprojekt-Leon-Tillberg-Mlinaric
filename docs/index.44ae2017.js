const e=(e,o,t)=>{document.cookie=`${e}=${o};expires=${t.toUTCString()}`},o=document.querySelector(".username-login"),t=document.querySelector(".password-login"),n=document.querySelector(".login-btn");document.querySelector(".create-btn").addEventListener("click",(e=>{e.preventDefault(),window.location.assign("./createprofile.html")})),n.addEventListener("click",(e=>{e.preventDefault();const n=o.value.trim(),a=t.value.trim();s(n,a)}));const s=async(o,t)=>{const n=`https://js2-slutprojekt-fdba7-default-rtdb.europe-west1.firebasedatabase.app/Profiles/${o}/info.json`,s=await fetch(n);console.log(s);const a=await s.json();if(console.log(a),s.ok&&a.password===t){const t=new Date(Date.now()+36e5);e("loginCookie",o,t),window.location.assign("./main.html")}else alert("Wrong username or password!")};
//# sourceMappingURL=index.44ae2017.js.map