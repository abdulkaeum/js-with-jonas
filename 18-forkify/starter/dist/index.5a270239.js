function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},s=r.parcelRequire3a11;null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){i[e]=t},r.parcelRequire3a11=s),s.register("27Lyk",function(t,r){"use strict";e(t.exports,"register",()=>n,e=>n=e),e(t.exports,"resolve",()=>i,e=>i=e);var n,i,s={};n=function(e){for(var t=Object.keys(e),r=0;r<t.length;r++)s[t[r]]=e[t[r]]},i=function(e){var t=s[e];if(null==t)throw Error("Could not resolve bundle with id "+e);return t}}),s("27Lyk").register(JSON.parse('{"f9fpV":"index.5a270239.js","eyyUD":"icons.c14567a0.svg"}'));const a="https://forkify-api.herokuapp.com/api/v2/recipes/",o="b9709f71-c57a-4a96-9c67-2c3e84585f16",c=async function(e,t){try{let r=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),n=await Promise.race([r,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 second"))},1e4)})]),i=await n.json();if(!n.ok)throw Error(`${i.message} (${n.status})`);return i}catch(e){throw e}},d={recipe:{},search:{query:"",results:[],page:1,resultsPerPage:10},bookmarks:[]},l=function(e){let{recipe:t}=e.data;return{id:t.id,title:t.title,publisher:t.publisher,sourceUrl:t.source_url,image:t.image_url,servings:t.servings,cookingTime:t.cooking_time,ingredients:t.ingredients,...t.key&&{key:t.key}}},u=async function(e){try{let t=await c(`${a}${e}?key=${o}`);d.recipe=l(t),d.bookmarks.some(t=>t.id===e)?d.recipe.bookmarked=!0:d.recipe.bookmarked=!1}catch(e){throw e}},p=async function(e){d.search.query=e;try{let t=await c(`${a}?search=${e}&key=${o}`);d.search.results=t.data.recipes.map(e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image_url,...e.key&&{key:e.key}})),d.search.page=1}catch(e){throw e}},_=function(e=d.search.page){d.search.page=e;let t=(e-1)*d.search.resultsPerPage,r=e*d.search.resultsPerPage;return d.search.results.slice(t,r)},g=function(e){d.recipe.ingredients.forEach(t=>{t.quantity=t.quantity*e/d.recipe.servings}),d.recipe.servings=e},h=function(){localStorage.setItem("bookmarks",JSON.stringify(d.bookmarks))},f=function(e){d.bookmarks.push(e),e.id===d.recipe.id&&(d.recipe.bookmarked=!0),h()},v=function(e){let t=d.bookmarks.findIndex(t=>t.id===e);d.bookmarks.splice(t,1),e===d.recipe.id&&(d.recipe.bookmarked=!1),h()};!function(){let e=localStorage.getItem("bookmarks");e&&(d.bookmarks=JSON.parse(e))}();const m=async function(e){try{let t=Object.entries(e).filter(e=>e[0].startsWith("ingredient")&&""!==e[1]).map(e=>{let t=e[1].split(",").map(e=>e.trim());if(3!==t.length)throw Error("ingredient format incorrect");let[r,n,i]=t;return{quantity:r?+r:null,unit:n,description:i}}),r={title:e.title,source_url:e.sourceUrl,image_url:e.image,publisher:e.publisher,cooking_time:+e.cookingTime,servings:+e.servings,ingredients:t},n=await c(`${a}?key=${o}`,r);d.recipe=l(n),f(d.recipe)}catch(e){throw e}};var b={};b=new URL(s("27Lyk").resolve("eyyUD"),import.meta.url).toString();class k{_data;render(e,t=!0){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;let r=this._generateMarkup();if(!t)return r;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}update(e){this._data=e;let t=this._generateMarkup(),r=document.createRange().createContextualFragment(t),n=Array.from(r.querySelectorAll("*")),i=Array.from(this._parentElement.querySelectorAll("*"));n.forEach((e,t)=>{let r=i[t];e.isEqualNode(r)||""===e.firstChild?.nodeValue.trim()||(r.textContent=e.textContent),e.isEqualNode(r)||Array.from(e.attributes).forEach(e=>r.setAttribute(e.name,e.value))})}_clear(){this._parentElement.innerHTML=""}renderSpinner(){let e=`
    <div class="spinner">
      <svg>
        <use href="${t(b)}#icon-loader"></use>
      </svg>
    </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",e)}renderError(e=this._errorMsg){let r=`
        <div class="error">
            <div>
            <svg>
                <use href="${t(b)}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${e}</p>
        </div>
        `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}renderMsg(e=this._msg){let r=`
        <div class="message">
            <div>
            <svg>
                <use href="${t(b)}#icon-alert-smile"></use>
            </svg>
            </div>
            <p>${e}</p>
        </div>
        `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}}class y extends k{_parentElement=document.querySelector(".recipe");_errorMsg="Could not find recipe, please try again";_msg="";addHandlerRender(e){["hashchange","load"].forEach(t=>window.addEventListener(t,e))}addHandlerUpdateServings(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--update-servings");if(!r)return;let{updateTo:n}=r.dataset;+n>0&&e(+n)})}addHandlerBookmark(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--bookmark");r&&e()})}_generateMarkup(){return`
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${t(b)}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${t(b)}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings-1}">
              <svg>
                <use href="${t(b)}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings+1}">
              <svg>
                <use href="${t(b)}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key?"":" hidden"}">
          <svg>
            <use href="${t(b)}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${t(b)}#icon-bookmark${this._data.bookmarked?"-fill":""}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
            ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${t(b)}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `}_generateMarkupIngredient(e){return`
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${t(b)}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${e.quantity?e.quantity:""}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${e.unit}</span>
              ${e.description}
            </div>
          </li>
          `}}var w=new y;class ${_parentElement=document.querySelector(".search");getQuery(){let e=this._parentElement.querySelector(".search__field").value;return this._clearInput(),e}_clearInput(){return this._parentElement.querySelector(".search__field").value=""}addHandlerSearch(e){this._parentElement.addEventListener("submit",function(t){t.preventDefault(),e()})}}var E=new $,S=new class extends k{_parentElement="";_generateMarkup(e){let r=window.location.hash.slice(1);return`
    <li class="preview">
        <a class="preview__link" ${this._data.id===r?"preview__link--active":""} href="#${this._data.id}">
        <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${this._data.key?"":" hidden"}">
              <svg>
                <use href="${t(b)}#icon-user"></use>
              </svg>
            </div>
        </div>
        </a>
    </li>
    `}};class H extends k{_parentElement=document.querySelector(".results");_errorMsg="No recipes found";_msg="";_generateMarkup(){return this._data.map(e=>S.render(e,!1)).join("")}}var q=new H;class M extends k{_parentElement=document.querySelector(".pagination");addHandlerClick(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--inline");if(!r)return;let n=+r.dataset.goto;e(n)})}_generateMarkup(){let e=this._data.page,r=Math.ceil(this._data.results.length/this._data.resultsPerPage);return 1===e&&r>1?`
        <button data-goto="${e+1}" class="btn--inline pagination__btn--next">
            <span>Page ${e+1}</span>
            <svg class="search__icon">
                <use href="${t(b)}#icon-arrow-right"></use>
            </svg>
        </button>
        `:e===r&&r>1?`
        <button data-goto="${e-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${t(b)}#icon-arrow-left"></use>
            </svg>
            <span>Page ${e-1}</span>
        </button>
        `:e<r?`
        <button data-goto="${e-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${t(b)}#icon-arrow-left"></use>
            </svg>
            <span>Page ${e-1}</span>
        </button>
        <button data-goto="${e+1}" class="btn--inline pagination__btn--next">
            <span>Page ${e+1}</span>
            <svg class="search__icon">
                <use href="${t(b)}#icon-arrow-right"></use>
            </svg>
        </button>
        `:""}}var x=new M;class L extends k{_parentElement=document.querySelector(".bookmarks__list");_errorMsg="No bookmarks yet";_msg="";addHandlerRender(e){window.addEventListener("load",e)}_generateMarkup(){return this._data.map(e=>S.render(e,!1)).join("")}}var T=new L;class P extends k{_parentElement=document.querySelector(".upload");_msg="Recipe added";_window=document.querySelector(".add-recipe-window");_overlay=document.querySelector(".overlay");_btnOpen=document.querySelector(".nav__btn--add-recipe");_btnClose=document.querySelector(".btn--close-modal");constructor(){super(),this._addHandlerShowWindow(),this._addHandlerHideWindow()}toggleWindow(){this._overlay.classList.toggle("hidden"),this._window.classList.toggle("hidden")}_addHandlerShowWindow(){this._btnOpen.addEventListener("click",this.toggleWindow.bind(this))}_addHandlerHideWindow(){this._btnClose.addEventListener("click",this.toggleWindow.bind(this)),this._overlay.addEventListener("click",this.toggleWindow.bind(this))}addHandlerUpload(e){this._parentElement.addEventListener("submit",function(t){t.preventDefault();let r=[...new FormData(this)],n=Object.fromEntries(r);e(n)})}_generateMarkup(){}}var j=new P;const A=async function(){try{let e=window.location.hash.slice(1);if(!e)return;w.renderSpinner(),q.update(_()),T.update(d.bookmarks),await u(e),w.render(d.recipe)}catch(e){w.renderError()}},O=async function(){try{q.renderSpinner();let e=E.getQuery();if(!e)return;await p(e),q.render(_()),x.render(d.search)}catch(e){console.log(e)}},R=async function(e){try{j.renderSpinner(),await m(e),console.log(d.recipe),w.render(d.recipe),j.renderMsg(),T.render(d.bookmarks),window.history.pushState(null,"",`#${d.recipe.id}`),setTimeout(function(){j.toggleWindow()},2500)}catch(e){j.renderError(e.message)}};T.addHandlerRender(function(){T.render(d.bookmarks)}),w.addHandlerRender(A),w.addHandlerUpdateServings(function(e){g(e),w.update(d.recipe)}),w.addHandlerBookmark(function(){d.recipe.bookmarked?v(d.recipe.id):f(d.recipe),w.update(d.recipe),T.render(d.bookmarks)}),E.addHandlerSearch(O),x.addHandlerClick(function(e){q.render(_(e)),x.render(d.search)}),j.addHandlerUpload(R);
//# sourceMappingURL=index.5a270239.js.map
