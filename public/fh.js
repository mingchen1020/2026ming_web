// Hero 視差效果
window.addEventListener("scroll", () => {
  const bg = document.querySelector(".hero-bg");
  if (!bg) return;

  const scrolled = window.scrollY;
  bg.style.transform = `translateY(${scrolled * 0.3}px)`;
});

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

  const bg = document.querySelector(".hero-bg");
  const content = document.querySelector(".hero-content");

  if (!bg || !content) return;

  // 背景視差
  bg.style.transform = `translateY(${scrolled * 0.3}px)`;

  // 文字往下 + 消失
  const moveDown = scrolled * 0.4;
  const fadeOut = Math.max(0, 1 - scrolled / 300);

  content.style.transform = `translateY(${moveDown}px)`;
  content.style.opacity = fadeOut;
});

// Typed.js 動態打字效果
document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            // 設定文字內容
            strings: [
                "-分享日常、記錄生活-", 
                "-熱愛遊戲、精彩瞬間-", 
                "-歡迎來到我的個人網站-",
                "-Ming與Kira的故事-"
            ],
            typeSpeed: 60,   // 打字速度 (毫秒)
            backSpeed: 40,   // 刪除速度 (毫秒)
            backDelay: 2000, // 文字打完後停留多久才刪除 (2秒)
            loop: true,      // 循環播放
            showCursor: true, // 顯示閃爍的光標
            cursorChar: '|'   // 光標的形狀
        });
    }
});

const imgBox = document.querySelector('.image-box');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.3 });

observer.observe(imgBox);



document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".card-slide-wrap");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(t => observer.observe(t));
});
