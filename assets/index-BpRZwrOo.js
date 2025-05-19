(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function f(e){if(!e||e.length===0)return console.warn("Array is empty or not loaded yet."),null;const t=Math.floor(Math.random()*e.length);return e[t]}function A(e,t){let n=[];switch(t){case 1:return e.forEach(a=>{var s,i;(s=a.categories)!=null&&s.includes("Health")&&((i=a.categories)!=null&&i.includes("Damage"))&&n.push(a)}),n;case 2:return e.forEach(a=>{var s,i;(s=a.categories)!=null&&s.includes("SpellDamage")&&!((i=a.categories)!=null&&i.includes("ManaRegen"))&&n.push(a)}),n;case 3:return e.forEach(a=>{var s,i,o,l,u;((s=a.categories)!=null&&s.includes("ManaRegen")||a.id==3002||(i=a.categories)!=null&&i.includes("SpellBlock")&&((o=a.categories)!=null&&o.includes("AbilityHaste")))&&!((l=a.categories)!=null&&l.includes("HealthRegen"))&&!((u=a.categories)!=null&&u.includes("Damage"))&&a.id!=2502&&n.push(a)}),n;case 4:return e.forEach(a=>{var s,i,o,l,u,b,v,m;((s=a.categories)!=null&&s.includes("Health")||(i=a.categories)!=null&&i.includes("Armor")||(o=a.categories)!=null&&o.includes("SpellBlock"))&&!((l=a.categories)!=null&&l.includes("Damage"))&&!((u=a.categories)!=null&&u.includes("SpellDamage"))&&!((b=a.categories)!=null&&b.includes("ManaRegen"))&&!((v=a.categories)!=null&&v.includes("Vision"))&&!((m=a.categories)!=null&&m.includes("AttackSpeed"))&&a.id!=3002&&n.push(a)}),n;case 5:return e.forEach(a=>{var s,i,o;((s=a.categories)!=null&&s.includes("CriticalStrike")||(i=a.categories)!=null&&i.includes("AttackSpeed")&&((o=a.categories)!=null&&o.includes("OnHit")))&&n.push(a)}),n;case 6:return e.forEach(a=>{var s,i,o,l,u;((s=a.categories)!=null&&s.includes("ArmorPenetration")&&((i=a.categories)!=null&&i.includes("Damage"))&&!((o=a.categories)!=null&&o.includes("Health"))&&!((l=a.categories)!=null&&l.includes("CriticalStrike"))&&!((u=a.categories)!=null&&u.includes("OnHit"))||a.id==6609||a.id==3026||a.id==3004||a.id==3156||a.id==6676)&&n.push(a)}),n;default:return[{id:1,name:"Placeholder",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-top.png",categories:[]}]}}function Z(e,t){return e.champion.id===-1?`
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
                
                ${ee(e.champion)}
                ${ae(e.lane)}
                ${te(e.class)}
                ${ne(e.items)}
                
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
        `}function ee(e){return`
        <div class="champ-sprout">
            <img src=${e.iconPath} alt=${e.name}>
            <span>${e.name}</span>
        </div>
    `}function te(e){return`
        <div class="class-sprout">
            <img src=${e==null?void 0:e.iconPath} alt=${e==null?void 0:e.name}>
            <span>${e==null?void 0:e.name}</span>
        </div>
    `}function ne(e){return`
        <div class="item-collection">
            ${e.map(t=>`
                <div class="item-sprout">
                    <img src="${t.iconPath}" alt="${t.name}">
                    <span>${se(t.name)}</span>
                </div>
            `).join("")||"<span>No Items</span>"}
        </div>
    `}function ae(e){return`
        <div class="lane-sprout">
            <img src=${e.iconPath} alt=${e.name}>
            <span>${e.name}</span>
        </div>
    `}function se(e){return e.split(" ").length>2&&(e=e.split(" ").map(n=>n.charAt(0)).join(".")),e}const p=[];let U;const ie=10;function oe(e,t){if(p.length>=ie){alert("The maximum number of players is 10.");return}const n=`Player ${t+1}`;if(n){const a={index:t,name:n,champion:{name:"None",id:-1,iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png"},lane:{name:"Fill",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-fill.png"},items:[],difficulty:1};p.push(a),h(),E(e)}}function E(e){e.innerHTML=`
    <div id="player_list_container">
        <ul class="column" id="column1">
            ${[...Array(5)].map((t,n)=>z(n)).join("")}
        </ul>
        <ul class="column" id="column2">
            ${[...Array(5)].map((t,n)=>z(n+5)).join("")}
        </ul>
    </div>
    `,document.querySelectorAll(".rowPC").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));oe(e,n)})}),document.querySelectorAll("#delete-player").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));re(e,n)})}),document.querySelectorAll("#reroll-single").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));le(e,n)})}),document.querySelectorAll("#change-name").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));me(e,n)})}),document.querySelectorAll(".card-slider").forEach(t=>{t.addEventListener("input",()=>{const n=parseInt(t.getAttribute("data-index")),a=parseInt(t.value);de(n,a)})})}function z(e){const t=p.find(n=>n.index===e);return t?`<div class="box-wrapper" > ${Z(t,e)} </div>`:`<div class="box-wrapper">
                <li class="rowPC" data-index="${e}">+</li>
            </div>
        `}function re(e,t){const n=p.findIndex(a=>a.index===t);if(n!==-1){const a=X();let s=[...a[0]],i=[...a[1]];const o=p[n];o.lane.name!="Fill"&&(n<5?s.push(o.lane):i.push(o.lane)),p.splice(n,1),C([...a[2]],s,i),h()}E(e)}function le(e,t){const n=p.find(a=>a.index===t);n?U=n.index:console.warn(`Player with index ${t} not found`),$e(e)}function ce(e){const t=document.querySelector(`.visible-name[data-index="${e}"]`);if(!t)return null;if(t instanceof HTMLInputElement)return t.value}function de(e,t){const n=p.find(a=>a.index===e);n?n.difficulty=t:console.warn(`Player with index ${e} not found`),h()}function ue(e,t,n){const a=p.find(s=>s.index===t);a?a.name=n:console.warn(`Player with index ${t} not found`),h(),E(e)}function me(e,t){const n=document.getElementById("nameChangeModal"),a=document.getElementById("nameInput"),s=document.getElementById("saveName"),i=document.querySelector(".close");n.style.display="block";const o=s.cloneNode(!0);s.replaceWith(o),o.addEventListener("click",()=>{const l=a.value.trim();l!==""&&(ue(e,t,l),console.log("here"),n.style.display="none")}),i.addEventListener("click",()=>{n.style.display="none"}),window.addEventListener("click",l=>{l.target===n&&(n.style.display="none")})}function J(e,t,n,a,s,i){let o=[...t],l=[...n],u=[...a],b,v,m,P=!1;p.forEach(r=>{var B,H,R,D,O,j,F;let N=ce(r.index);if(N&&(r.name=N),o.length<1&&!P?(alert("Not enough champions in pool!"),P=!0):o.length>0&&P&&(P=!1),P)return;if(!i){if(r.index!=U)return;r.lane.name!="Fill"&&(r.index<5?l.push(r.lane):u.push(r.lane))}v=r.difficulty;let q=f(o);if(r.champion=q,o=o.filter(c=>c!==q),r.index<5){let c=f(l);r.lane=c,l=l.filter(d=>d!==c)}else{let c=f(u);r.lane=c,u=u.filter(d=>d!==c)}if(v===0||v===1){console.info("Roles => "+r.champion.roles+" , Champion => "+r.champion.name);let c=s.filter(d=>r.champion.roles.includes(d.name));c.some(d=>d.type===2)&&!c.some(d=>d.type===3)&&c.filter(d=>d.type===2),r.class=f(c.length>0?c:s)}else r.class=f(s);if(b=(B=r.class)==null?void 0:B.type,r.items=[],b!=null){m=[...Pe(b)];let c;switch(v){case 0:(H=r.items)==null||H.push(f(m));break;case 1:case 2:c=f(m),(R=r.items)==null||R.push(c),m=m.filter(d=>d!==c),(D=r.items)==null||D.push(f(m));break;case 3:c=f(m),(O=r.items)==null||O.push(c),m=m.filter(d=>d!==c),c=f(m),(j=r.items)==null||j.push(c),m=m.filter(d=>d!==c),(F=r.items)==null||F.push(f(m));break}}}),C(o,l,u),h(),E(e)}function pe(e){const t=X();let n=[...t[0]],a=[...t[1]],s=[...t[2]];p.forEach(i=>{i.lane.name!="Fill"&&(i.index<5?n.push(i.lane):a.push(i.lane))}),p.length=0,C(s,n,a),h(),E(e)}async function ge(e){const t="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d";try{const n=await fetch(e);if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);return(await n.json()).filter(s=>s.id!==3172).filter(s=>!s.categories.includes("Boots")).filter(s=>s.inStore===!0).filter(s=>s.displayInItemSets===!0).filter(s=>s.priceTotal>1600).map(s=>{var i;return{name:s.name,id:s.id,iconPath:`${t}/${(i=s.iconPath.split("/").pop())==null?void 0:i.toLowerCase()}`,categories:s.categories}})}catch(n){return console.error("Error fetching or transforming items:",n),[]}}async function fe(e){const t="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons";try{const n=await fetch(e);if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);return(await n.json()).filter(s=>s.id!==-1).map(s=>{var i;return{name:s.name,id:s.id,iconPath:`${t}/${(i=s.squarePortraitPath.split("/").pop())==null?void 0:i.toLowerCase()}`,roles:s.roles}})}catch(n){return console.error("Error fetching or transforming champions:",n),[]}}async function he(){return[{name:"toplane",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-top.png"},{name:"jungle",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-jungle.png"},{name:"midlane",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-middle.png"},{name:"botlane",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-bottom.png"},{name:"support",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-utility.png"}]}async function ye(){return[{name:"support",iconPath:"https://wiki.leagueoflegends.com/en-us/images/Controller_icon.png?728f3&20181117143552",type:3},{name:"fighter",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Fighter_icon.png/96px-Fighter_icon.png?e3f07",type:1},{name:"mage",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Mage_icon.png/96px-Mage_icon.png?c4c84",type:2},{name:"marksman",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Marksman_icon.png/96px-Marksman_icon.png?c4c84",type:5},{name:"assassin",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Slayer_icon.png/96px-Slayer_icon.png?dde86",type:6},{name:"tank",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Tank_icon.png/96px-Tank_icon.png?d2561",type:4}]}const ve=document.querySelector("#app");ve.innerHTML=`
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
`;const T=document.querySelector("#player_list"),be=document.querySelector("#all_randomizer"),Ae=document.querySelector("#all_delete"),we=document.querySelector("#clear_champs"),Se=document.querySelector("#reset_champs"),Ee=document.querySelector("#change_name_block"),_e=document.getElementById("champ_list"),$=document.getElementById("champSearch");let M=[],L=[],w=[],k=[],S=[],x=[],g=[],y=[],K=[],V=[],G=[],W=[],Y=[],Q=[];const I="lolRandomizerSession_v1";be.addEventListener("click",()=>{J(T,g,L,k,M,!0),_()});Ae.addEventListener("click",()=>{pe(T)});Se.addEventListener("click",()=>{Le()});we.addEventListener("click",()=>{ke()});$.addEventListener("input",()=>{const e=$.value.toLowerCase();_e.querySelectorAll("li").forEach(n=>{var s,i;const a=((i=(s=n.querySelector("img"))==null?void 0:s.getAttribute("title"))==null?void 0:i.toLowerCase())??"";e&&a.includes(e)?n.classList.add("highlight"):n.classList.remove("highlight")})});Ee.innerHTML=`
    <div id="nameChangeModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Change Player Name</h2>
            <input type="text" id="nameInput" value="New Name">
            <button id="saveName">Save</button>
        </div>
    </div>
`;function Pe(e){switch(e){case 1:return[...K];case 2:return[...V];case 3:return[...G];case 4:return[...W];case 5:return[...Y];case 6:return[...Q];default:return console.warn("Non-existing item array type requested:",e),[...y]}}function C(e,t,n){w=[...t],S=[...n],g=[...e]}function X(){return[w,S,g]}function $e(e){J(e,g,w,S,M,!1),_()}function h(){const e={users:p,champArrayClosed:g,lanesArrayTeam1Closed:w,lanesArrayTeam2Closed:S};try{localStorage.setItem(I,JSON.stringify(e)),console.info("Session saved!")}catch(t){console.error("Error saving session to localStorage:",t)}}function xe(){const e=localStorage.getItem(I);if(e)try{const t=JSON.parse(e);return t.users&&Array.isArray(t.users)&&(p.length=0,t.users.forEach(n=>p.push(n))),t.champArrayClosed&&Array.isArray(t.champArrayClosed)?g=t.champArrayClosed:g=[],t.lanesArrayTeam1Closed&&Array.isArray(t.lanesArrayTeam1Closed)?w=t.lanesArrayTeam1Closed:w=[],t.lanesArrayTeam2Closed&&Array.isArray(t.lanesArrayTeam2Closed)?S=t.lanesArrayTeam2Closed:S=[],console.log("Session loaded!"),!0}catch(t){console.error("Error parsing session data from localStorage:",t),localStorage.removeItem(I)}return!1}async function Ce(){try{const e=xe(),[t,n,a,s]=await Promise.all([ge("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json"),fe("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"),he(),ye()]);y=t,x=n,x.sort((i,o)=>i.name.localeCompare(o.name)),k=a,L=a,M=s,K=A(y,1),V=A(y,2),G=A(y,3),W=A(y,4),Y=A(y,5),Q=A(y,6),e||(C(x,L,k),h()),_()}catch(e){console.error("Error loading data:",e)}}Ce().then(e=>E(T));function _(){const e=document.querySelector("#champ_list");e.innerHTML="";const t=($==null?void 0:$.value.toLowerCase().trim())||"";x.forEach(n=>{const a=document.createElement("li"),s=t!==""&&n.name.toLowerCase().includes(t),i=g.some(l=>l.id===n.id);a.innerHTML=`
            <li class="champ-wrapper ${s?"highlight":""}">
              <img 
                src="${n.iconPath}" 
                alt="${n.name}" 
                title="${n.name}" 
                class="champ-icon ${i?"":"disabled"}" 
                data-id="${n.id}"
              />
            </li>
        `,a.querySelector("img").addEventListener("click",()=>{const l=g.findIndex(u=>u.id===n.id);l>-1?g.splice(l,1):g.push(n),h(),_()}),e.appendChild(a)})}function Le(){g=[...x],h(),_()}function ke(){g=[],h(),_()}
