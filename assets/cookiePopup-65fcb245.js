const t="cookieConsent",s=()=>{if(localStorage.getItem(t))return;const e=document.createElement("div");e.className="cookie-popup",e.innerHTML=`
    <div class="cookie-popup__content">
      <div class="cookie-popup__text-container">
        <h2 class="cookie-popup__title">Cookies Policy</h2>
        <p class="cookie-popup__description">
          We use cookies to improve your experience on our website. By browsing this website, you agree to our use of cookies.
        </p>
      </div>
      <div class="cookie-popup__buttons">
        <button class="cookie-popup__button cookie-popup__button--decline" tabindex="0" aria-label="Decline cookies">DECLINE COOKIES</button>
        <button class="cookie-popup__button cookie-popup__button--accept" tabindex="0" aria-label="Accept cookies">ACCEPT COOKIES</button>
      </div>
    </div>
  `,document.body.appendChild(e);const c=e.querySelector(".cookie-popup__button--accept"),i=e.querySelector(".cookie-popup__button--decline"),n=()=>{localStorage.setItem(t,"accepted"),e.classList.add("cookie-popup--hidden"),setTimeout(()=>{e.remove()},500)},p=()=>{localStorage.setItem(t,"declined"),e.classList.add("cookie-popup--hidden"),setTimeout(()=>{e.remove()},500)};c.addEventListener("click",n),i.addEventListener("click",p),c.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),n())}),i.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),p())})};document.addEventListener("DOMContentLoaded",s);export{s as default};
//# sourceMappingURL=cookiePopup-65fcb245.js.map
