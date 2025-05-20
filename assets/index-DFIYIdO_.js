(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function h(e){if(!e||e.length===0)return console.warn("Array is empty or not loaded yet."),null;const t=Math.floor(Math.random()*e.length);return e[t]}function A(e,t){let n=[];switch(t){case 1:return e.forEach(a=>{var s,i;(s=a.categories)!=null&&s.includes("Health")&&((i=a.categories)!=null&&i.includes("Damage"))&&n.push(a)}),n;case 2:return e.forEach(a=>{var s,i;(s=a.categories)!=null&&s.includes("SpellDamage")&&!((i=a.categories)!=null&&i.includes("ManaRegen"))&&n.push(a)}),n;case 3:return e.forEach(a=>{var s,i,o,c,m;((s=a.categories)!=null&&s.includes("ManaRegen")||a.id==3002||(i=a.categories)!=null&&i.includes("SpellBlock")&&((o=a.categories)!=null&&o.includes("AbilityHaste")))&&!((c=a.categories)!=null&&c.includes("HealthRegen"))&&!((m=a.categories)!=null&&m.includes("Damage"))&&a.id!=2502&&n.push(a)}),n;case 4:return e.forEach(a=>{var s,i,o,c,m,w,b,p;((s=a.categories)!=null&&s.includes("Health")||(i=a.categories)!=null&&i.includes("Armor")||(o=a.categories)!=null&&o.includes("SpellBlock"))&&!((c=a.categories)!=null&&c.includes("Damage"))&&!((m=a.categories)!=null&&m.includes("SpellDamage"))&&!((w=a.categories)!=null&&w.includes("ManaRegen"))&&!((b=a.categories)!=null&&b.includes("Vision"))&&!((p=a.categories)!=null&&p.includes("AttackSpeed"))&&a.id!=3002&&n.push(a)}),n;case 5:return e.forEach(a=>{var s,i,o;((s=a.categories)!=null&&s.includes("CriticalStrike")||(i=a.categories)!=null&&i.includes("AttackSpeed")&&((o=a.categories)!=null&&o.includes("OnHit")))&&n.push(a)}),n;case 6:return e.forEach(a=>{var s,i,o,c,m;((s=a.categories)!=null&&s.includes("ArmorPenetration")&&((i=a.categories)!=null&&i.includes("Damage"))&&!((o=a.categories)!=null&&o.includes("Health"))&&!((c=a.categories)!=null&&c.includes("CriticalStrike"))&&!((m=a.categories)!=null&&m.includes("OnHit"))||a.id==6609||a.id==3026||a.id==3004||a.id==3156||a.id==6676)&&n.push(a)}),n;default:return[{id:1,name:"Placeholder",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-top.png",categories:[]}]}}function se(e,t){return e.champion.id===-1?`
            <div class="player_box" id="unrerolled">
                <div id="name_box">
                    <input type="text" class="visible-name" value="${e.name}" data-index="${t}">   
                    <div class="slider-container">
                      <input type="range" class="card-slider" min="0" max="3" step="1" value="${e.difficulty}" data-index="${t}">
                      <div class="labels">
                        <span id="dif_easy">Easy</span>
                        <span id="dif_med">Medium</span>
                        <span id="dif_gard">Hard</span>
                        <span id="dif_ins">Insane</span>
                      </div>
                    </div>
                </div>
                <div id="buttons_pc">
                    <button class="switcher" id="reroll-single" data-index="${t}">Reroll</button>
                    <button class="switcher" id="delete-player" data-index="${t}">Delete</button>
                </div>
            </div>
        `:`
            <div class="player_box">
                <span class="name-string">${e.name}</span> 
                
                ${ie(e.champion)}
                ${re(e.lane)}
                ${oe(e.class)}
                ${le(e.items)}
                
                <div id="buttons_pc">
                    <button class="switcher" id="reroll-single" data-index="${t}">Reroll</button>
                    <button class="switcher" id="change-name" data-index="${t}">Rename</button>
                    <button class="switcher" id="delete-player" data-index="${t}">Delete</button>
                </div>
                <div class="slider-container">
                  <input type="range" class="card-slider" min="0" max="3" step="1" value="${e.difficulty}" data-index="${t}">
                  <div class="labels">
                    <span id="dif_easy" title="One item and correct classes">Easy</span>
                    <span id="dif_med" title="Two items and correct classes">Medium</span>
                    <span id="dif_gard" title="Two items and all classes">Hard</span>
                    <span id="dif_ins" title="Three items and all classes">Insane</span>
                  </div>
                </div>
            </div>
        `}function ie(e){return`
        <div class="champ-sprout">
            <img src=${e.iconPath} alt=${e.name}>
            <span>${e.name}</span>
        </div>
    `}function oe(e){return`
        <div class="class-sprout">
            <img src=${e==null?void 0:e.iconPath} alt=${e==null?void 0:e.name}>
            <span>${e==null?void 0:e.name}</span>
        </div>
    `}function le(e){return`
        <div class="item-collection">
            ${e.map(t=>`
                <div class="item-sprout">
                    <img src="${t.iconPath}" alt="${t.name}">
                    <span>${ce(t.name)}</span>
                </div>
            `).join("")||"<span>No Items</span>"}
        </div>
    `}function re(e){return`
        <div class="lane-sprout">
            <img src=${e.iconPath} alt=${e.name}>
            <span>${e.name}</span>
        </div>
    `}function ce(e){return e.split(" ").length>2&&(e=e.split(" ").map(n=>n.charAt(0)).join(".")),e}const J=document.querySelector("#change_name_block");J?J.innerHTML=`
    <div id="nameChangeModal" class="modal" style="display: none;">
        <div class="modal-content">
            <span class="close-modal">×</span>
            <h2>Change Player Name</h2>
            <input type="text" id="nameInput" placeholder="New Name (max 12 char.)">
            <div class="modal-buttons">
                <button id="saveName">Save</button>
                <button id="cancel-modal">Cancel</button>
            </div>
        </div>
    </div>
`:console.error("#change_name_block container not found in your HTML! Make sure it exists.");const S=document.getElementById("nameChangeModal"),f=document.getElementById("nameInput"),I=document.getElementById("saveName"),de=document.querySelector(".close-modal"),ue=document.getElementById("cancel-modal");f.addEventListener("input",()=>{f.classList.remove("input-error")});de.addEventListener("click",()=>{f.classList.remove("input-error"),S.style.display="none"});ue.addEventListener("click",()=>{f.classList.remove("input-error"),S.style.display="none"});window.addEventListener("click",e=>{e.target===S&&(f.classList.remove("input-error"),S.style.display="none")});function me(e,t,n){f.value=n,f.classList.remove("input-error"),S.style.display="block",f.focus();const a=I.cloneNode(!0);I.parentNode.replaceChild(a,I),window.saveButton=a,a.addEventListener("click",()=>{f.classList.remove("input-error");const s=f.value,i=s.trim();if(i===""){f.classList.add("input-error"),f.focus();return}if(s.length>12){f.classList.add("input-error"),f.focus();return}if(!/^[ \p{L}\p{N}]+$/u.test(i)){f.classList.add("input-error"),f.focus();return}pe(e,t,i),S.style.display="none"})}function pe(e,t,n){const a=u.find(s=>s.index===t);a?a.name=n:console.warn(`Player with index ${t} not found`),y(),_(e)}const u=[];let G;const fe=10;function Y(e,t){if(u.length>=fe){alert("The maximum number of players is 10.");return}const n=`Player ${t+1}`;if(n){const a={index:t,name:n,champion:{name:"None",id:-1,iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png"},lane:{name:"Fill",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-fill.png"},items:[],difficulty:1};u.push(a),y(),_(e)}}function _(e){e.innerHTML=`
    <div id="player_list_container">
        <ul class="column" id="column1">
            ${[...Array(5)].map((t,n)=>K(n)).join("")}
        </ul>
        <ul class="column" id="column2">
            ${[...Array(5)].map((t,n)=>K(n+5)).join("")}
        </ul>
    </div>
    `,document.querySelectorAll(".rowPC").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));Y(e,n)})}),document.querySelectorAll("#delete-player").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));ge(e,n)})}),document.querySelectorAll("#reroll-single").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));he(e,n)})}),document.querySelectorAll("#change-name").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index")),a=u.find(s=>s.index===n);a&&me(e,n,a.name)})}),document.querySelectorAll(".card-slider").forEach(t=>{t.addEventListener("input",()=>{const n=parseInt(t.getAttribute("data-index")),a=parseInt(t.value);ve(n,a)})})}function K(e){const t=u.find(n=>n.index===e);return t?`<div class="box-wrapper" > ${se(t,e)} </div>`:`<div class="box-wrapper">
                <li class="rowPC" data-index="${e}">+</li>
            </div>
        `}function ge(e,t){const n=u.findIndex(a=>a.index===t);if(n!==-1){const a=ae();let s=[...a[0]],i=[...a[1]];const o=u[n];o.lane.name!="Fill"&&(n<5?s.push(o.lane):i.push(o.lane)),u.splice(n,1),T([...a[2]],s,i),y()}_(e)}function he(e,t){const n=u.find(a=>a.index===t);n?G=n.index:console.warn(`Player with index ${t} not found`),Me(e)}function ye(e){const t=document.querySelector(`.visible-name[data-index="${e}"]`);if(!t)return null;if(t instanceof HTMLInputElement)return t.value}function ve(e,t){const n=u.find(a=>a.index===e);n?n.difficulty=t:console.warn(`Player with index ${e} not found`),y()}function Q(e,t,n,a,s,i){let o=[...t],c=[...n],m=[...a],w,b,p,P=!1;u.forEach(l=>{var D,O,j,F,z,U,V;let H=ye(l.index);if(H&&(l.name=H),o.length<1&&!P?(alert("Not enough champions in pool!"),P=!0):o.length>0&&P&&(P=!1),P)return;if(!i){if(l.index!=G)return;l.lane.name!="Fill"&&(l.index<5?c.push(l.lane):m.push(l.lane))}b=l.difficulty;let R=h(o);if(l.champion=R,o=o.filter(r=>r!==R),l.index<5){let r=h(c);l.lane=r,c=c.filter(d=>d!==r)}else{let r=h(m);l.lane=r,m=m.filter(d=>d!==r)}if(b===0||b===1){console.info("Roles => "+l.champion.roles+" , Champion => "+l.champion.name);let r=s.filter(d=>l.champion.roles.includes(d.name));r.some(d=>d.type===2)&&!r.some(d=>d.type===3)&&r.filter(d=>d.type===2),l.class=h(r.length>0?r:s)}else l.class=h(s);if(w=(D=l.class)==null?void 0:D.type,l.items=[],w!=null){p=[...Ie(w)];let r;switch(b){case 0:(O=l.items)==null||O.push(h(p));break;case 1:case 2:r=h(p),(j=l.items)==null||j.push(r),p=p.filter(d=>d!==r),(F=l.items)==null||F.push(h(p));break;case 3:r=h(p),(z=l.items)==null||z.push(r),p=p.filter(d=>d!==r),r=h(p),(U=l.items)==null||U.push(r),p=p.filter(d=>d!==r),(V=l.items)==null||V.push(h(p));break}}}),T(o,c,m),y(),_(e)}function be(e){let t=[];u.forEach(n=>{t.push(n.index)});for(let n=0;n<10;n++)t.includes(n)||Y(e,n)}function we(e){const t=ae();let n=[...t[0]],a=[...t[1]],s=[...t[2]];u.forEach(i=>{i.lane.name!="Fill"&&(i.index<5?n.push(i.lane):a.push(i.lane))}),u.length=0,T(s,n,a),y(),_(e)}async function Ae(e){const t="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d";try{const n=await fetch(e);if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);return(await n.json()).filter(s=>s.id!==3172).filter(s=>!s.categories.includes("Boots")).filter(s=>s.inStore===!0).filter(s=>s.displayInItemSets===!0).filter(s=>s.priceTotal>1600).map(s=>{var i;return{name:s.name,id:s.id,iconPath:`${t}/${(i=s.iconPath.split("/").pop())==null?void 0:i.toLowerCase()}`,categories:s.categories}})}catch(n){return console.error("Error fetching or transforming items:",n),[]}}async function Se(e){const t="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons";try{const n=await fetch(e);if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);return(await n.json()).filter(s=>s.id!==-1).map(s=>{var i;return{name:s.name,id:s.id,iconPath:`${t}/${(i=s.squarePortraitPath.split("/").pop())==null?void 0:i.toLowerCase()}`,roles:s.roles}})}catch(n){return console.error("Error fetching or transforming champions:",n),[]}}async function Ee(){return[{name:"toplane",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-top.png"},{name:"jungle",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-jungle.png"},{name:"midlane",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-middle.png"},{name:"botlane",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-bottom.png"},{name:"support",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-utility.png"}]}async function xe(){return[{name:"support",iconPath:"https://wiki.leagueoflegends.com/en-us/images/Controller_icon.png?728f3&20181117143552",type:3},{name:"fighter",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Fighter_icon.png/96px-Fighter_icon.png?e3f07",type:1},{name:"mage",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Mage_icon.png/96px-Mage_icon.png?c4c84",type:2},{name:"marksman",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Marksman_icon.png/96px-Marksman_icon.png?c4c84",type:5},{name:"assassin",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Slayer_icon.png/96px-Slayer_icon.png?dde86",type:6},{name:"tank",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Tank_icon.png/96px-Tank_icon.png?d2561",type:4}]}const _e=document.querySelector("#app");_e.innerHTML=`
  <div>
    <div class="main-cont">
        <div class="all-effect-buttons">
        <button class="button" type="button" id="all_fill">Fill all</button>
            <button class="button" type="button" id="all_randomizer">Reroll all</button>
            <button class="button" type="button" id="all_delete">Delete all</button>
        </div>
        <ul id="player_list"></ul>
        <div class="test">Row 100</div>
        <div id="showcase">
            <div class="champ_display_settings">
                <button class="button" type="button" id="clear_champs">Clear All</button>
                <input type="text" id="champSearch" placeholder="Search champion..." />
                <button class="button" type="button" id="reset_champs">Reset All</button>    
            </div>
            <ul id="champ_list"></ul>
        </div>
    </div>
  </div>
`;const k=document.querySelector("#player_list"),Le=document.querySelector("#all_fill"),Pe=document.querySelector("#all_randomizer"),$e=document.querySelector("#all_delete"),Ce=document.querySelector("#clear_champs"),ke=document.querySelector("#reset_champs"),Te=document.getElementById("champ_list"),$=document.getElementById("champSearch");let B=[],M=[],E=[],N=[],x=[],C=[],g=[],v=[],W=[],X=[],Z=[],ee=[],te=[],ne=[];const q="Session_v1";Le.addEventListener("click",()=>{be(k)});Pe.addEventListener("click",()=>{Q(k,g,M,N,B,!0),L()});$e.addEventListener("click",()=>{we(k)});ke.addEventListener("click",()=>{Be()});Ce.addEventListener("click",()=>{He()});$.addEventListener("input",()=>{const e=$.value.toLowerCase();Te.querySelectorAll("li").forEach(n=>{var s,i;const a=((i=(s=n.querySelector("img"))==null?void 0:s.getAttribute("title"))==null?void 0:i.toLowerCase())??"";e&&a.includes(e)?n.classList.add("highlight"):n.classList.remove("highlight")})});function Ie(e){switch(e){case 1:return[...W];case 2:return[...X];case 3:return[...Z];case 4:return[...ee];case 5:return[...te];case 6:return[...ne];default:return console.warn("Non-existing item array type requested:",e),[...v]}}function T(e,t,n){E=[...t],x=[...n],g=[...e]}function ae(){return[E,x,g]}function Me(e){Q(e,g,E,x,B,!1),L()}function y(){const e={users:u,champArrayClosed:g,lanesArrayTeam1Closed:E,lanesArrayTeam2Closed:x};try{localStorage.setItem(q,JSON.stringify(e)),console.info("Session saved!")}catch(t){console.error("Error saving session to localStorage:",t)}}function Ne(){const e=localStorage.getItem(q);if(e)try{const t=JSON.parse(e);return t.users&&Array.isArray(t.users)&&(u.length=0,t.users.forEach(n=>u.push(n))),t.champArrayClosed&&Array.isArray(t.champArrayClosed)?g=t.champArrayClosed:g=[],t.lanesArrayTeam1Closed&&Array.isArray(t.lanesArrayTeam1Closed)?E=t.lanesArrayTeam1Closed:E=[],t.lanesArrayTeam2Closed&&Array.isArray(t.lanesArrayTeam2Closed)?x=t.lanesArrayTeam2Closed:x=[],console.log("Session loaded!"),!0}catch(t){console.error("Error parsing session data from localStorage:",t),localStorage.removeItem(q)}return!1}async function qe(){try{const e=Ne(),[t,n,a,s]=await Promise.all([Ae("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json"),Se("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"),Ee(),xe()]);v=t,C=n,C.sort((i,o)=>i.name.localeCompare(o.name)),N=a,M=a,B=s,W=A(v,1),X=A(v,2),Z=A(v,3),ee=A(v,4),te=A(v,5),ne=A(v,6),e||(T(C,M,N),y()),L()}catch(e){console.error("Error loading data:",e)}}qe().then(e=>_(k));function L(){const e=document.querySelector("#champ_list");e.innerHTML="";const t=($==null?void 0:$.value.toLowerCase().trim())||"";C.forEach(n=>{const a=document.createElement("li"),s=t!==""&&n.name.toLowerCase().includes(t),i=g.some(c=>c.id===n.id);a.innerHTML=`
            <li class="champ-wrapper ${s?"highlight":""}">
              <img 
                src="${n.iconPath}" 
                alt="${n.name}" 
                title="${n.name}" 
                class="champ-icon ${i?"":"disabled"}" 
                data-id="${n.id}"
              />
            </li>
        `,a.querySelector("img").addEventListener("click",()=>{const c=g.findIndex(m=>m.id===n.id);c>-1?g.splice(c,1):g.push(n),y(),L()}),e.appendChild(a)})}function Be(){g=[...C],y(),L()}function He(){g=[],y(),L()}
