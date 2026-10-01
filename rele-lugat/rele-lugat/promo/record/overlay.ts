/**
 * Sahifaga vaqtincha qo'shiladigan "barmoq" qatlami.
 *
 * Yozuvda sichqoncha ko'rinmaydi, shuning uchun har teginish joyida yumshoq
 * doira (ripple) va sudrash paytida barmoq nuqtasi chiziladi — foydalanuvchi
 * telefonni barmoq bilan boshqarayotgandek tuyuladi.
 *
 * Qatlam pointer hodisalarini O'ZI tinglaydi (capture fazasida), shuning uchun
 * Node tomondan har qadamda CDP chaqiruvi kerak emas — sudrash sezilarli
 * darajada tez va silliq bo'ladi.
 *
 * Bu faqat YOZUV uchun; ilovaning o'z kodiga hech narsa qo'shilmaydi.
 * Skript `document-start` da ishga tushadi, shuning uchun DOM birinchi
 * hodisada yaratiladi.
 */

export const OVERLAY_SCRIPT = `
(() => {
  if (window.__fxInstalled) return;
  window.__fxInstalled = true;

  var CSS = \`
    #__fx { position: fixed; inset: 0; pointer-events: none; z-index: 2147483647; }
    #__fx .r {
      position: absolute; width: 92px; height: 92px; margin: -46px 0 0 -46px;
      border-radius: 50%; border: 2px solid rgba(53,182,255,0.95);
      background: radial-gradient(circle, rgba(53,182,255,0.30), rgba(53,182,255,0) 70%);
      animation: __fxR 520ms cubic-bezier(.22,.7,.3,1) forwards;
    }
    @keyframes __fxR {
      0%   { transform: scale(.35); opacity: 0;   }
      18%  { transform: scale(.75); opacity: 1;   }
      100% { transform: scale(1.75); opacity: 0;  }
    }
    #__fx .f {
      position: absolute; width: 64px; height: 64px; margin: -32px 0 0 -32px;
      border-radius: 50%; opacity: 0;
      background: radial-gradient(circle at 38% 34%, rgba(255,255,255,.55), rgba(53,182,255,.42) 48%, rgba(53,182,255,0) 72%);
      box-shadow: 0 0 26px rgba(53,182,255,.55);
      transition: opacity 110ms linear;
      will-change: left, top;
    }
    #__fx .f.on { opacity: 1; }
  \`;

  var layer = null;
  var finger = null;
  var down = false;

  function ensure() {
    if (layer && layer.isConnected) return true;
    var root = document.documentElement;
    if (!root) return false;
    var style = document.createElement('style');
    style.textContent = CSS;
    (document.head || root).appendChild(style);
    layer = document.createElement('div');
    layer.id = '__fx';
    finger = document.createElement('div');
    finger.className = 'f';
    layer.appendChild(finger);
    root.appendChild(layer);
    return true;
  }

  function place(el, x, y) { el.style.left = x + 'px'; el.style.top = y + 'px'; }

  function ripple(x, y) {
    if (!ensure()) return;
    var r = document.createElement('div');
    r.className = 'r';
    place(r, x, y);
    layer.appendChild(r);
    setTimeout(function () { r.remove(); }, 600);
  }

  /* Capture fazasi — ilova preventDefault qilsa ham biz ko'ramiz. */
  var opts = { capture: true, passive: true };

  window.addEventListener('pointerdown', function (e) {
    if (!ensure()) return;
    down = true;
    place(finger, e.clientX, e.clientY);
    finger.classList.add('on');
    ripple(e.clientX, e.clientY);
  }, opts);

  window.addEventListener('pointermove', function (e) {
    if (!down || !ensure()) return;
    place(finger, e.clientX, e.clientY);
  }, opts);

  function up() {
    down = false;
    if (finger) finger.classList.remove('on');
  }
  window.addEventListener('pointerup', up, opts);
  window.addEventListener('pointercancel', up, opts);

  /* Qo'lda chaqirish ham mumkin (masalan, scroll paytida ko'rsatish uchun). */
  window.__fxTap = ripple;
})();
`;
