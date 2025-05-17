(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function f(e){if(!e||e.length===0)return console.error("Array is empty or not loaded yet."),null;const t=Math.floor(Math.random()*e.length);return e[t]}function A(e,t){let n=[];switch(t){case 1:return e.forEach(a=>{var s,i;(s=a.categories)!=null&&s.includes("Health")&&((i=a.categories)!=null&&i.includes("Damage"))&&n.push(a)}),n;case 2:return e.forEach(a=>{var s,i;(s=a.categories)!=null&&s.includes("SpellDamage")&&!((i=a.categories)!=null&&i.includes("ManaRegen"))&&n.push(a)}),n;case 3:return e.forEach(a=>{var s,i,o,r,u;((s=a.categories)!=null&&s.includes("ManaRegen")||a.id==3002||(i=a.categories)!=null&&i.includes("SpellBlock")&&((o=a.categories)!=null&&o.includes("AbilityHaste")))&&!((r=a.categories)!=null&&r.includes("HealthRegen"))&&!((u=a.categories)!=null&&u.includes("Damage"))&&a.id!=2502&&n.push(a)}),n;case 4:return e.forEach(a=>{var s,i,o,r,u,b,v,m;((s=a.categories)!=null&&s.includes("Health")||(i=a.categories)!=null&&i.includes("Armor")||(o=a.categories)!=null&&o.includes("SpellBlock"))&&!((r=a.categories)!=null&&r.includes("Damage"))&&!((u=a.categories)!=null&&u.includes("SpellDamage"))&&!((b=a.categories)!=null&&b.includes("ManaRegen"))&&!((v=a.categories)!=null&&v.includes("Vision"))&&!((m=a.categories)!=null&&m.includes("AttackSpeed"))&&a.id!=3002&&n.push(a)}),n;case 5:return e.forEach(a=>{var s,i,o;((s=a.categories)!=null&&s.includes("CriticalStrike")||(i=a.categories)!=null&&i.includes("AttackSpeed")&&((o=a.categories)!=null&&o.includes("OnHit")))&&n.push(a)}),n;case 6:return e.forEach(a=>{var s,i,o,r,u;((s=a.categories)!=null&&s.includes("ArmorPenetration")&&((i=a.categories)!=null&&i.includes("Damage"))&&!((o=a.categories)!=null&&o.includes("Health"))&&!((r=a.categories)!=null&&r.includes("CriticalStrike"))&&!((u=a.categories)!=null&&u.includes("OnHit"))||a.id==6609||a.id==3026||a.id==3004||a.id==3156||a.id==6676)&&n.push(a)}),n;default:return[{id:1,name:"Placeholder",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-top.png",categories:[]}]}}function Q(e,t){return e.champion.id===-1?`
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
                
                ${X(e.champion)}
                ${te(e.lane)}
                ${Z(e.class)}
                ${ee(e.items)}
                
                <div id="buttons_pc">
                    <button class="switcher" id="reroll-single" data-index="${t}">Reroll</button>
                    <button class="switcher" id="change-name" data-index="${t}">Rename</button>
                    <button class="switcher" id="delete-player" data-index="${t}">Delete</button>
                </div>
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
        `}function X(e){return`
        <div class="champ-sprout">
            <img src=${e.iconPath} alt=${e.name}>
            <span>${e.name}</span>
        </div>
    `}function Z(e){return`
        <div class="class-sprout">
            <img src=${e==null?void 0:e.iconPath} alt=${e==null?void 0:e.name}>
            <span>${e==null?void 0:e.name}</span>
        </div>
    `}function ee(e){return`
        <div class="item-collection">
            ${e.map(t=>`
                <div class="item-sprout">
                    <img src="${t.iconPath}" alt="${t.name}">
                    <span>${ne(t.name)}</span>
                </div>
            `).join("")||"<span>No Items</span>"}
        </div>
    `}function te(e){return`
        <div class="lane-sprout">
            <img src=${e.iconPath} alt=${e.name}>
            <span>${e.name}</span>
        </div>
    `}function ne(e){return e.split(" ").length>2&&(e=e.split(" ").map(n=>n.charAt(0)).join(".")),e}const p=[];let z;const ae=10;function se(e,t){if(p.length>=ae){alert("The maximum number of players is 10.");return}const n=`Player ${t+1}`;if(n){const a={index:t,name:n,champion:{name:"None",id:-1,iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png"},lane:{name:"Fill",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-fill.png"},items:[],difficulty:1};p.push(a),h(),w(e)}}function w(e){e.innerHTML=`
    <div id="player_list_container">
        <ul class="column" id="column1">
            ${[...Array(5)].map((t,n)=>j(n)).join("")}
        </ul>
        <ul class="column" id="column2">
            ${[...Array(5)].map((t,n)=>j(n+5)).join("")}
        </ul>
    </div>
    `,document.querySelectorAll(".rowPC").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));se(e,n)})}),document.querySelectorAll("#delete-player").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));ie(e,n)})}),document.querySelectorAll("#reroll-single").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));oe(e,n)})}),document.querySelectorAll("#change-name").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));de(e,n)})}),document.querySelectorAll(".card-slider").forEach(t=>{t.addEventListener("input",()=>{const n=parseInt(t.getAttribute("data-index")),a=parseInt(t.value);le(n,a)})})}function j(e){const t=p.find(n=>n.index===e);return t?`<div class="box-wrapper" > ${Q(t,e)} </div>`:`<div class="box-wrapper">
                <li class="rowPC" data-index="${e}">+</li>
            </div>
        `}function ie(e,t){const n=p.findIndex(a=>a.index===t);n!==-1&&(p.splice(n,1),h()),w(e)}function oe(e,t){const n=p.find(a=>a.index===t);n?z=n.index:console.warn(`Player with index ${t} not found`),_e(e)}function re(e){const t=document.querySelector(`.visible-name[data-index="${e}"]`);if(!t)return null;if(t instanceof HTMLInputElement)return t.value}function le(e,t){const n=p.find(a=>a.index===e);n?n.difficulty=t:console.warn(`Player with index ${e} not found`),h()}function ce(e,t,n){const a=p.find(s=>s.index===t);a?a.name=n:console.warn(`Player with index ${t} not found`),h(),w(e)}function de(e,t){const n=document.getElementById("nameChangeModal"),a=document.getElementById("nameInput"),s=document.getElementById("saveName"),i=document.querySelector(".close");n.style.display="block";const o=s.cloneNode(!0);s.replaceWith(o),o.addEventListener("click",()=>{const r=a.value.trim();r!==""&&(ce(e,t,r),console.log("here"),n.style.display="none")}),i.addEventListener("click",()=>{n.style.display="none"}),window.addEventListener("click",r=>{r.target===n&&(n.style.display="none")})}function F(e,t,n,a,s,i){let o=[...t],r=[...n],u=[...a],b,v,m;p.forEach(l=>{var q,N,B,H,R,D,O;let T=re(l.index);if(T&&(l.name=T),!i){if(l.index!=z)return;o.push(l.champion),l.lane.name!="Fill"&&(l.index<5?r.push(l.lane):u.push(l.lane))}v=l.difficulty;let M=f(o);if(l.champion=M,o=o.filter(c=>c!==M),l.index<5){let c=f(r);l.lane=c,r=r.filter(d=>d!==c),console.log(c)}else{let c=f(u);l.lane=c,u=u.filter(d=>d!==c)}if(v===0||v===1){let c=s.filter(d=>l.champion.roles.includes(d.name));c.some(d=>d.type===2)&&!c.some(d=>d.type===3)&&c.filter(d=>d.type===2),l.class=f(c.length>0?c:s)}else l.class=f(s);if(b=(q=l.class)==null?void 0:q.type,l.items=[],b!=null){m=[...Ee(b)];let c;switch(v){case 0:(N=l.items)==null||N.push(f(m));break;case 1:case 2:c=f(m),(B=l.items)==null||B.push(c),m=m.filter(d=>d!==c),(H=l.items)==null||H.push(f(m));break;case 3:c=f(m),(R=l.items)==null||R.push(c),m=m.filter(d=>d!==c),c=f(m),(D=l.items)==null||D.push(c),m=m.filter(d=>d!==c),(O=l.items)==null||O.push(f(m));break}}}),Y(o,r,u),h(),w(e)}function ue(e){p.length=0,h(),w(e)}async function me(e){const t="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d";try{const n=await fetch(e);if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);return(await n.json()).filter(s=>s.id!==3172).filter(s=>!s.categories.includes("Boots")).filter(s=>s.inStore===!0).filter(s=>s.displayInItemSets===!0).filter(s=>s.priceTotal>1600).map(s=>{var i;return{name:s.name,id:s.id,iconPath:`${t}/${(i=s.iconPath.split("/").pop())==null?void 0:i.toLowerCase()}`,categories:s.categories}})}catch(n){return console.error("Error fetching or transforming items:",n),[]}}async function pe(e){const t="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons";try{const n=await fetch(e);if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);return(await n.json()).filter(s=>s.id!==-1).map(s=>{var i;return{name:s.name,id:s.id,iconPath:`${t}/${(i=s.squarePortraitPath.split("/").pop())==null?void 0:i.toLowerCase()}`,roles:s.roles}})}catch(n){return console.error("Error fetching or transforming champions:",n),[]}}async function ge(){return[{name:"toplane",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-top.png"},{name:"jungle",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-jungle.png"},{name:"midlane",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-middle.png"},{name:"botlane",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-bottom.png"},{name:"support",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-utility.png"}]}async function fe(){return[{name:"support",iconPath:"https://wiki.leagueoflegends.com/en-us/images/Controller_icon.png?728f3&20181117143552",type:3},{name:"fighter",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Fighter_icon.png/96px-Fighter_icon.png?e3f07",type:1},{name:"mage",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Mage_icon.png/96px-Mage_icon.png?c4c84",type:2},{name:"marksman",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Marksman_icon.png/96px-Marksman_icon.png?c4c84",type:5},{name:"assassin",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Slayer_icon.png/96px-Slayer_icon.png?dde86",type:6},{name:"tank",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Tank_icon.png/96px-Tank_icon.png?d2561",type:4}]}const he=document.querySelector("#app");he.innerHTML=`
  <div>
    <div class="main-cont">
        <div class="all-effect-buttons">
            <button class="button" type="button" id="all_randomizer">Randomize all</button>
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
`;const I=document.querySelector("#player_list"),ye=document.querySelector("#all_randomizer"),ve=document.querySelector("#all_delete"),be=document.querySelector("#clear_champs"),Ae=document.querySelector("#reset_champs"),we=document.querySelector("#change_name_block"),Se=document.getElementById("champ_list"),E=document.getElementById("champSearch");let k=[],x=[],P=[],C=[],$=[],_=[],g=[],y=[],U=[],J=[],K=[],V=[],G=[],W=[];const L="lolRandomizerSession_v1";ye.addEventListener("click",()=>{F(I,g,x,C,k,!0),S()});ve.addEventListener("click",()=>{ue(I)});Ae.addEventListener("click",()=>{xe()});be.addEventListener("click",()=>{Ce()});E.addEventListener("input",()=>{const e=E.value.toLowerCase();Se.querySelectorAll("li").forEach(n=>{var s,i;const a=((i=(s=n.querySelector("img"))==null?void 0:s.getAttribute("title"))==null?void 0:i.toLowerCase())??"";e&&a.includes(e)?n.classList.add("highlight"):n.classList.remove("highlight")})});we.innerHTML=`
    <div id="nameChangeModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Change Player Name</h2>
            <input type="text" id="nameInput" value="New Name">
            <button id="saveName">Save</button>
        </div>
    </div>
`;function Ee(e){switch(e){case 1:return[...U];case 2:return[...J];case 3:return[...K];case 4:return[...V];case 5:return[...G];case 6:return[...W];default:return console.warn("Non-existing item array type requested:",e),[...y]}}function Y(e,t,n){P=[...t],$=[...n],g=[...e]}function _e(e){F(e,g,P,$,k,!1),S()}function h(){const e={users:p,champArrayClosed:g,lanesArrayTeam1Closed:P,lanesArrayTeam2Closed:$};try{localStorage.setItem(L,JSON.stringify(e)),console.log("Session saved!")}catch(t){console.error("Error saving session to localStorage:",t)}}function Pe(){const e=localStorage.getItem(L);if(e)try{const t=JSON.parse(e);return t.users&&Array.isArray(t.users)&&(p.length=0,t.users.forEach(n=>p.push(n))),t.champArrayClosed&&Array.isArray(t.champArrayClosed)?g=t.champArrayClosed:g=[],t.lanesArrayTeam1Closed&&Array.isArray(t.lanesArrayTeam1Closed)?P=t.lanesArrayTeam1Closed:P=[],t.lanesArrayTeam2Closed&&Array.isArray(t.lanesArrayTeam2Closed)?$=t.lanesArrayTeam2Closed:$=[],console.log("Session loaded!"),!0}catch(t){console.error("Error parsing session data from localStorage:",t),localStorage.removeItem(L)}return!1}async function $e(){try{const e=Pe(),[t,n,a,s]=await Promise.all([me("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json"),pe("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"),ge(),fe()]);y=t,_=n,_.sort((i,o)=>i.name.localeCompare(o.name)),C=a,x=a,k=s,U=A(y,1),J=A(y,2),K=A(y,3),V=A(y,4),G=A(y,5),W=A(y,6),e||(Y(_,x,C),h()),S()}catch(e){console.error("Error loading data:",e)}}$e().then(e=>w(I));function S(){const e=document.querySelector("#champ_list");e.innerHTML="";const t=(E==null?void 0:E.value.toLowerCase().trim())||"";_.forEach(n=>{const a=document.createElement("li"),s=t!==""&&n.name.toLowerCase().includes(t),i=g.some(r=>r.id===n.id);a.innerHTML=`
            <li class="champ-wrapper ${s?"highlight":""}">
              <img 
                src="${n.iconPath}" 
                alt="${n.name}" 
                title="${n.name}" 
                class="champ-icon ${i?"":"disabled"}" 
                data-id="${n.id}"
              />
            </li>
        `,a.querySelector("img").addEventListener("click",()=>{const r=g.findIndex(u=>u.id===n.id);r>-1?g.splice(r,1):g.push(n),S()}),e.appendChild(a)})}function xe(){g=_,h(),S()}function Ce(){g=[],h(),S()}
