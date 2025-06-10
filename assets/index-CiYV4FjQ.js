(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function f(e){if(!e||e.length===0)return console.warn("Array is empty or not loaded yet."),null;const t=Math.floor(Math.random()*e.length);return e[t]}function E(e,t){let n=[];switch(t){case 1:return e.forEach(a=>{var s,i;(s=a.categories)!=null&&s.includes("Health")&&((i=a.categories)!=null&&i.includes("Damage"))&&n.push(a)}),n;case 2:return e.forEach(a=>{var s,i;(s=a.categories)!=null&&s.includes("SpellDamage")&&!((i=a.categories)!=null&&i.includes("ManaRegen"))&&n.push(a)}),n;case 3:return e.forEach(a=>{var s,i,o,r,c;((s=a.categories)!=null&&s.includes("ManaRegen")||a.id==3002||(i=a.categories)!=null&&i.includes("SpellBlock")&&((o=a.categories)!=null&&o.includes("AbilityHaste")))&&!((r=a.categories)!=null&&r.includes("HealthRegen"))&&!((c=a.categories)!=null&&c.includes("Damage"))&&a.id!=2502&&n.push(a)}),n;case 4:return e.forEach(a=>{var s,i,o,r,c,v,w,p;((s=a.categories)!=null&&s.includes("Health")||(i=a.categories)!=null&&i.includes("Armor")||(o=a.categories)!=null&&o.includes("SpellBlock"))&&!((r=a.categories)!=null&&r.includes("Damage"))&&!((c=a.categories)!=null&&c.includes("SpellDamage"))&&!((v=a.categories)!=null&&v.includes("ManaRegen"))&&!((w=a.categories)!=null&&w.includes("Vision"))&&!((p=a.categories)!=null&&p.includes("AttackSpeed"))&&a.id!=3002&&n.push(a)}),n;case 5:return e.forEach(a=>{var s,i,o;((s=a.categories)!=null&&s.includes("CriticalStrike")||(i=a.categories)!=null&&i.includes("AttackSpeed")&&((o=a.categories)!=null&&o.includes("OnHit")))&&n.push(a)}),n;case 6:return e.forEach(a=>{var s,i,o,r,c;((s=a.categories)!=null&&s.includes("ArmorPenetration")&&((i=a.categories)!=null&&i.includes("Damage"))&&!((o=a.categories)!=null&&o.includes("Health"))&&!((r=a.categories)!=null&&r.includes("CriticalStrike"))&&!((c=a.categories)!=null&&c.includes("OnHit"))||a.id==6609||a.id==3026||a.id==3004||a.id==3156||a.id==6676)&&n.push(a)}),n;default:return[{id:1,name:"Placeholder",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-top.png",categories:[],price:0}]}}function se(e){return e==="OnHit"?"On-Hit":e==="NonbootsMovement"?"None-boots Movement":e.replace(/([A-Z])/g," $&").trim()}function ie(e,t,n){return e.champion.id===-1?`
            <div class="player_box" id="unrerolled">
                <div id="name_box">
                    <input type="text" class="visible-name" value="${e.name}" data-index="${t}" maxlength="12">   
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
                 ${M(e.lane,e.index)}
                <div id="buttons_pc">
                    <button class="switcher" id="reroll-single" data-index="${t}">Reroll</button>
                    <button class="switcher" id="delete-player" data-index="${t}">Delete</button>
                </div>
            </div>
        `:n===e.index?`
            <div class="player_box">
                <div class="name-string-editing">
                    <input type="text" class="editing-name-input" value="${e.name}" data-index="${t}" maxlength="12" autofocus>
                </div>
                
                ${V(e.champion)}
                ${M(e.lane,e.index)}
                ${K(e.class)}
                ${G(e.items)}
                
                <div id="buttons_pc">
                    <button class="switcher" id="save-name-inline" data-index="${t}">Save</button>
                    <button class="switcher" id="cancel-name-inline" data-index="${t}">Cancel</button>
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
        `:`
            <div class="player_box">
                <span class="name-string">${e.name}</span> 
                
                ${V(e.champion)}
                ${M(e.lane,e.index)}
                ${K(e.class)}
                ${G(e.items)}
                
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
        `}function V(e){const t=`
        <strong>${e.name}:</strong> ${e.title}
        <hr>
        <strong>Roles:</strong> ${e.roles.join(", ")}
    `;return`
        <div class="champ-sprout has-tooltip">
            <img src=${e.iconPath} alt=${e.name}>
            <span>${e.name}</span>
            <div class="tooltip-box">${t}</div>
        </div>
    `}function K(e){return`
        <div class="class-sprout">
            <img src=${e==null?void 0:e.iconPath} alt=${e==null?void 0:e.name}>
            <span>${e==null?void 0:e.name}</span>
        </div>
    `}function G(e){return!e||e.length===0?`
            <div class="item-collection">
                <span>No Items</span>
            </div>
        `:`
        <div class="item-collection">
            ${e.map(n=>{var i;const a=(i=n.categories)==null?void 0:i.map(se).join(", "),s=`
            <strong>${n.name}</strong>
            <hr>
            <strong>Categories:</strong> ${a}
            <hr>
            <strong>Price:</strong> ${n.price} gold
        `;return`
            <div class="item-sprout has-tooltip">
                <img src="${n.iconPath}" alt="${n.name}">
                <span>${oe(n.name)}</span>
                <div class="tooltip-box">${s}</div>
            </div>
        `}).join("")}
        </div>
    `}function M(e,t){const n=q();let a=n[0],s=n[1],i="";return t<5?i=a.map(o=>`
            <div class="lane-option" data-lane-name="${o.name}" data-index="${t}">
                <img src="${o.iconPath}" alt="${o.name}">
                <span>${o.name}</span>
            </div>
        `).join(""):t>=5&&(i=s.map(o=>`
            <div class="lane-option" data-lane-name="${o.name}" data-index="${t}">
                <img src="${o.iconPath}" alt="${o.name}">
                <span>${o.name}</span>
            </div>
        `).join("")),`
        <div class="lane-sprout has-dropdown" data-index="${t}">
            <img src=${e.iconPath} alt=${e.name}>
            <span>${e.name}</span>
            <div class="lane-dropdown-content">
                ${i}
            </div>
        </div>
    `}function oe(e){return e.split(" ").length>2&&(e=e.split(" ").map(n=>n.charAt(0)).join(".")),e}const u=[];let N;const le=10;let k=null;function Z(e,t){if(u.length>=le){alert("The maximum number of players is 10.");return}const n=`Player ${t+1}`;if(n){const a={index:t,name:n,champion:{name:"None",id:-1,iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png"},lane:{name:"Fill",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-fill.png"},items:[],difficulty:1,fixedLane:!1};u.push(a),h(),y(e)}}function y(e){e.innerHTML=`
    <div id="player_list_container">
        <ul class="column" id="column1">
            ${[...Array(5)].map((t,n)=>Y(n)).join("")}
        </ul>
        <ul class="column" id="column2">
            ${[...Array(5)].map((t,n)=>Y(n+5)).join("")}
        </ul>
    </div>
    `,document.querySelectorAll(".rowPC").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));Z(e,n)})}),document.querySelectorAll("#delete-player").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));re(e,n)})}),document.querySelectorAll("#reroll-single").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));ce(e,n)})}),document.querySelectorAll(".card-slider").forEach(t=>{t.addEventListener("input",()=>{const n=parseInt(t.getAttribute("data-index")),a=parseInt(t.value);ue(n,a)})}),document.querySelectorAll(".has-dropdown").forEach(t=>{t.addEventListener("click",n=>{n.stopPropagation();const a=t.querySelector(".lane-dropdown-content");document.querySelectorAll(".lane-dropdown-content.show").forEach(s=>{s!==a&&s.classList.remove("show")}),a==null||a.classList.toggle("show")})}),document.querySelectorAll(".lane-option").forEach(t=>{t.addEventListener("click",n=>{n.stopPropagation();const a=parseInt(t.getAttribute("data-index")),s=t.getAttribute("data-lane-name");me(a,s,e)})}),window.addEventListener("click",t=>{t.target.closest(".has-dropdown")||document.querySelectorAll(".lane-dropdown-content.show").forEach(n=>{n.classList.remove("show")})}),document.querySelectorAll("#change-name").forEach(t=>{t.addEventListener("click",()=>{k=parseInt(t.getAttribute("data-index")),y(e)})}),document.querySelectorAll(".editing-name-input").forEach(t=>{t.addEventListener("input",()=>{t.classList.remove("input-error")})}),document.querySelectorAll("#save-name-inline").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index")),a=document.querySelector(`.editing-name-input[data-index="${n}"]`);de(a,n)&&y(e)})}),document.querySelectorAll("#cancel-name-inline").forEach(t=>{t.addEventListener("click",()=>{k=null,y(e)})})}function Y(e){const t=u.find(n=>n.index===e);return t?`<div class="box-wrapper" > ${ie(t,e,k)} </div>`:`<div class="box-wrapper">
                <li class="rowPC" data-index="${e}">+</li>
            </div>
        `}function re(e,t){const n=u.findIndex(a=>a.index===t);if(console.warn(t+" + "+n),n!==-1){const a=q();let s=[...a[0]],i=[...a[1]];const o=u[n];o.lane.name!=="Fill"&&(t<5?(s.push(o.lane),console.error("tady")):i.push(o.lane)),u.splice(n,1),T([...a[2]],s,i),h(),console.log(s.length+" + "+i.length)}y(e)}function ce(e,t){const n=u.find(a=>a.index===t);n?N=n.index:console.warn(`Player with index ${t} not found`),_e(e)}function R(e){if(!e)return null;e.classList.remove("input-error");const t=e.value,n=t.trim();return n===""||t.length>12||!/^[ \p{L}\p{N}]+$/u.test(n)?(e.classList.add("input-error"),e.focus(),null):n}function de(e,t){const n=R(e);if(n){const a=u.find(s=>s.index===t);return a&&(a.name=n,h()),k=null,!0}return!1}function ue(e,t){const n=u.find(a=>a.index===e);n?n.difficulty=t:console.warn(`Player with index ${e} not found`),h()}function me(e,t,n){const a=q();let s=[...a[0]],i=[...a[1]];const o=u.find(c=>c.index===e);let r;o&&(e<5?(r=s.find(c=>c.name===t),r&&(o.lane.name!=="Fill"&&s.push(o.lane),o.lane=r,r.name!=="Fill"&&(s=s.filter(c=>c!==r)))):e>=5&&(r=i.find(c=>c.name===t),r&&(o.lane.name!=="Fill"&&i.push(o.lane),o.lane=r,r.name!=="Fill"&&(i=i.filter(c=>c!==r)))),o.fixedLane=(r==null?void 0:r.name)!=="Fill",T(a[2],s,i),h(),y(n))}function Q(e,t,n,a,s,i){let o=[...t],r=[...n],c=[...a],v,w,p,_=!1;if(i)u.forEach(l=>{if(l.lane.name!=="Fill"&&l.fixedLane==!1&&(l.index<5?r.push(l.lane):c.push(l.lane)),l.champion.id===-1){const b=document.querySelector(`.visible-name[data-index="${l.index}"]`),$=R(b);if(!$){l.name=`Player ${l.index+1}`;return}l.name=$}});else{const l=u.find(b=>b.index===N);if(l&&l.champion.id===-1){const b=document.querySelector(`.visible-name[data-index="${l.index}"]`),$=R(b);if(!$){l.name=`Player ${l.index+1}`;return}l.name=$}l&&l.lane.name!=="Fill"&&l.fixedLane==!1&&(l.index<5?r.push(l.lane):c.push(l.lane))}u.forEach(l=>{var $,j,B,D,z,U,J;if(o.length<1&&!_?(alert("Not enough champions in pool!"),_=!0):o.length>0&&_&&(_=!1),_||!i&&l.index!=N)return;w=l.difficulty;let b=f(o);if(l.champion=b,o=o.filter(d=>d!==b),l.fixedLane==!1)if(l.index<5){let d=f(r);for(;d.name==="Fill";)d=f(r);l.lane=d,r=r.filter(m=>m!==d)}else{let d=f(c);for(;d.name==="Fill";)d=f(c);l.lane=d,c=c.filter(m=>m!==d)}if(w===0||w===1){let d=s.filter(m=>l.champion.roles.includes(m.name));d.some(m=>m.type===2)&&!d.some(m=>m.type===3)&&(d=d.filter(m=>m.type===2)),l.class=f(d.length>0?d:s)}else l.class=f(s);if(v=($=l.class)==null?void 0:$.type,l.items=[],v!=null){p=[...Pe(v)];let d;switch(w){case 0:(j=l.items)==null||j.push(f(p));break;case 1:case 2:d=f(p),(B=l.items)==null||B.push(d),p=p.filter(m=>m!==d),(D=l.items)==null||D.push(f(p));break;case 3:d=f(p),(z=l.items)==null||z.push(d),p=p.filter(m=>m!==d),d=f(p),(U=l.items)==null||U.push(d),p=p.filter(m=>m!==d),(J=l.items)==null||J.push(f(p));break}}}),T(o,r,c),h(),y(e)}function pe(e){let t=[];u.forEach(n=>{t.push(n.index)});for(let n=0;n<10;n++)t.includes(n)||Z(e,n)}function fe(e){const t=q();let n=[...t[0]],a=[...t[1]],s=[...t[2]];u.forEach(i=>{i.lane.name!="Fill"&&(i.index<5?n.push(i.lane):a.push(i.lane))}),u.length=0,T(s,n,a),h(),y(e)}async function ge(e){const t="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d";try{const n=await fetch(e);if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);return(await n.json()).filter(s=>s.id!==3172).filter(s=>!s.categories.includes("Boots")).filter(s=>s.inStore===!0).filter(s=>s.displayInItemSets===!0).filter(s=>s.priceTotal>1600).map(s=>{var i;return{name:s.name,id:s.id,iconPath:`${t}/${(i=s.iconPath.split("/").pop())==null?void 0:i.toLowerCase()}`,categories:s.categories,price:s.priceTotal}})}catch(n){return console.error("Error fetching or transforming items:",n),[]}}async function he(e){const t="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons";try{const n=await fetch(e);if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);return(await n.json()).filter(s=>s.id!==-1).map(s=>{var i;return{name:s.name,id:s.id,iconPath:`${t}/${(i=s.squarePortraitPath.split("/").pop())==null?void 0:i.toLowerCase()}`,roles:s.roles,title:s.description}})}catch(n){return console.error("Error fetching or transforming champions:",n),[]}}async function ye(){return[{name:"Toplane",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-top.png"},{name:"Jungle",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-jungle.png"},{name:"Midlane",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-middle.png"},{name:"Botlane",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-bottom.png"},{name:"Support",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-utility.png"},{name:"Fill",iconPath:"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-fill.png"}]}async function ve(){return[{name:"support",iconPath:"https://wiki.leagueoflegends.com/en-us/images/Controller_icon.png?728f3&20181117143552",type:3},{name:"fighter",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Fighter_icon.png/96px-Fighter_icon.png?e3f07",type:1},{name:"mage",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Mage_icon.png/96px-Mage_icon.png?c4c84",type:2},{name:"marksman",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Marksman_icon.png/96px-Marksman_icon.png?c4c84",type:5},{name:"assassin",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Slayer_icon.png/96px-Slayer_icon.png?dde86",type:6},{name:"tank",iconPath:"https://wiki.leagueoflegends.com/en-us/images/thumb/Tank_icon.png/96px-Tank_icon.png?d2561",type:4}]}const be=document.querySelector("#app");be.innerHTML=`
  <div>
    <div class="main-cont">
        <div class="all-effect-buttons">
        <button class="button" type="button" id="all_fill">Fill all</button>
            <button class="button" type="button" id="all_randomizer">Reroll all</button>
            <button class="button" type="button" id="all_delete">Delete all</button>
        </div>
        <ul id="player_list"></ul>
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
`;const I=document.querySelector("#player_list"),$e=document.querySelector("#all_fill"),Ae=document.querySelector("#all_randomizer"),we=document.querySelector("#all_delete"),xe=document.querySelector("#clear_champs"),Se=document.querySelector("#reset_champs"),Ee=document.getElementById("champ_list"),L=document.getElementById("champSearch");let O=[],H=[],x=[],S=[],C=[],g=[],A=[],W=[],X=[],ee=[],te=[],ne=[],ae=[];const F="Session_v1";$e.addEventListener("click",()=>{pe(I)});Ae.addEventListener("click",()=>{Q(I,g,x,S,O,!0),P()});we.addEventListener("click",()=>{fe(I)});Se.addEventListener("click",()=>{Te()});xe.addEventListener("click",()=>{ke()});L.addEventListener("input",()=>{const e=L.value.toLowerCase();Ee.querySelectorAll("li").forEach(n=>{var s,i;const a=((i=(s=n.querySelector("img"))==null?void 0:s.getAttribute("title"))==null?void 0:i.toLowerCase())??"";e&&a.includes(e)?n.classList.add("highlight"):n.classList.remove("highlight")})});function Pe(e){switch(e){case 1:return[...W];case 2:return[...X];case 3:return[...ee];case 4:return[...te];case 5:return[...ne];case 6:return[...ae];default:return console.warn("Non-existing item array type requested:",e),[...A]}}function T(e,t,n){x=[...t],S=[...n],g=[...e]}function q(){return[x,S,g]}function _e(e){Q(e,g,x,S,O,!1),P()}function h(){const e={users:u,champArrayClosed:g,lanesArrayTeam1Closed:x,lanesArrayTeam2Closed:S};try{localStorage.setItem(F,JSON.stringify(e)),console.info("Session saved!")}catch(t){console.error("Error saving session to localStorage:",t)}}function Le(){const e=localStorage.getItem(F);if(e)try{const t=JSON.parse(e);return t.users&&Array.isArray(t.users)&&(u.length=0,t.users.forEach(n=>u.push(n))),t.champArrayClosed&&Array.isArray(t.champArrayClosed)?g=t.champArrayClosed:g=[],t.lanesArrayTeam1Closed&&Array.isArray(t.lanesArrayTeam1Closed)?x=t.lanesArrayTeam1Closed:x=[],t.lanesArrayTeam2Closed&&Array.isArray(t.lanesArrayTeam2Closed)?S=t.lanesArrayTeam2Closed:S=[],console.log("Session loaded!"),!0}catch(t){console.error("Error parsing session data from localStorage:",t),localStorage.removeItem(F)}return!1}async function Ce(){try{const e=Le(),[t,n,a,s]=await Promise.all([ge("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json"),he("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"),ye(),ve()]);A=t,C=n,C.sort((i,o)=>i.name.localeCompare(o.name)),H=a,O=s,W=E(A,1),X=E(A,2),ee=E(A,3),te=E(A,4),ne=E(A,5),ae=E(A,6),e||(T(C,H,H),h()),P()}catch(e){console.error("Error loading data:",e)}}Ce().then(e=>y(I));function P(){const e=document.querySelector("#champ_list");e.innerHTML="";const t=(L==null?void 0:L.value.toLowerCase().trim())||"";C.forEach(n=>{const a=document.createElement("li"),s=t!==""&&n.name.toLowerCase().includes(t),i=g.some(c=>c.id===n.id),o=`
        <strong>${n.name}:</strong> ${n.title}
        <hr>
        <strong>Roles:</strong> ${n.roles.join(", ")}
        `;a.innerHTML=`
            <li class="champ-wrapper has-tooltip ${s?"highlight":""}">
              <img 
                src="${n.iconPath}" 
                alt="${n.name}"
                class="champ-icon ${i?"":"disabled"}" 
                data-id="${n.id}"
              />
              <div class="tooltip-box">${o}</div>
            </li>
        `,a.querySelector("img").addEventListener("click",()=>{const c=g.findIndex(v=>v.id===n.id);c>-1?g.splice(c,1):g.push(n),h(),P()}),e.appendChild(a)})}function Te(){g=[...C],h(),P()}function ke(){g=[],h(),P()}
