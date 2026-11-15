// ===== Coverflow Slider =====

// داده‌ی کاورها (رنگ + برچسب). می‌توانید به‌جای رنگ، عکس بگذارید.
const covers = [
  { label: "Azure",   color: "linear-gradient(135deg,#4facfe,#00f2fe)", icon: "A" },
  { label: "Sunset",  color: "linear-gradient(135deg,#fa709a,#fee140)", icon: "S" },
  { label: "Forest",  color: "linear-gradient(135deg,#43e97b,#38f9d7)", icon: "F" },
  { label: "Grape",   color: "linear-gradient(135deg,#667eea,#764ba2)", icon: "G" },
  { label: "Ember",   color: "linear-gradient(135deg,#f093fb,#f5576c)", icon: "E" },
  { label: "Ocean",   color: "linear-gradient(135deg,#30cfd0,#330867)", icon: "O" },
  { label: "Peach",   color: "linear-gradient(135deg,#ff9a9e,#fecfef)", icon: "P" },
];

const stage = document.querySelector("#coverflow");
const label = document.querySelector("#label");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

let active = Math.floor(covers.length / 2); // کارت وسط در ابتدا فعال است

// ساخت عناصر کارت یک‌بار
const cards = covers.map((c, i) => {
  const el = document.createElement("div");
  el.className = "cover";
  el.style.background = c.color;
  el.textContent = c.icon;
  el.addEventListener("click", () => setActive(i)); // کلیک = فعال‌شدن
  stage.appendChild(el);
  return el;
});

// به‌روزرسانی موقعیت سه‌بعدی همه‌ی کارت‌ها نسبت به کارت فعال
function render() {
  cards.forEach((el, i) => {
    const offset = i - active;              // فاصله از کارت فعال
    const abs = Math.abs(offset);
    const sign = Math.sign(offset);

    // کارت‌های دور کم‌رنگ و پنهان می‌شوند
    const translateX = offset * 60;         // جابه‌جایی افقی (درصد عرض)
    const rotateY = sign * -45;             // چرخش سه‌بعدی کارت‌های کناری
    const translateZ = -abs * 120;          // کارت‌های دورتر عقب‌تر
    const scale = abs === 0 ? 1 : 0.85;

    el.style.transform =
      `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${offset === 0 ? 0 : rotateY}deg) scale(${scale})`;
    el.style.zIndex = covers.length - abs;  // کارت فعال جلوتر
    el.style.opacity = abs > 3 ? 0 : 1;     // کارت‌های خیلی دور مخفی
  });

  label.textContent = covers[active].label;
}

// تغییر کارت فعال (با محدودکردن در بازه‌ی مجاز)
function setActive(i) {
  active = Math.max(0, Math.min(covers.length - 1, i));
  render();
}

// دکمه‌ها
prevBtn.addEventListener("click", () => setActive(active - 1));
nextBtn.addEventListener("click", () => setActive(active + 1));

// کیبورد (فلش چپ/راست)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") setActive(active - 1);
  if (e.key === "ArrowRight") setActive(active + 1);
});

render(); // نمایش اولیه
