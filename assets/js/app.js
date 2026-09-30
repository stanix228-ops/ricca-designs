document.addEventListener("DOMContentLoaded", function () {
  /* ==========================================================================
     1. Scroll Header Effect
     ========================================================================== */
  const header = document.getElementById("header");
  const searchWindow = document.querySelector(".header-search");
  const targetScroll = 80;

  function handleScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    if (scrollY >= targetScroll) {
      header?.classList.add("scroll-change");
      searchWindow?.classList.add("scroll-change");
    } else {
      header?.classList.remove("scroll-change");
      searchWindow?.classList.remove("scroll-change");
    }
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ==========================================================================
     2. Burger Window
     ========================================================================== */
  const burgerButton = document.querySelector(".header__burger-button");
  const burgerWindow = document.querySelector(".burger-window");
  const burgerButtonClose = document.querySelector(".burger-window__close-button");
  const burgerLinks = document.querySelectorAll(".burger-window__nav-link");

  function openBurger() {
    burgerWindow?.classList.add("open");
    document.body.classList.add("no-scroll");
  }

  function closeBurger() {
    burgerWindow?.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  burgerButton?.addEventListener("click", openBurger);
  burgerButtonClose?.addEventListener("click", closeBurger);
  burgerLinks.forEach((link) => link.addEventListener("click", closeBurger));

  /* ==========================================================================
     3. Search Window
     ========================================================================== */
  const searchOpenBtn = document.querySelector(".header-search-open");
  const searchCloseBtn = document.querySelector(".header-search__close");
  const searchInput = document.getElementById("dgwt-wcas-search-input-1");

  searchOpenBtn?.addEventListener("click", function () {
    searchWindow?.classList.toggle("open");
    if (searchWindow?.classList.contains("open")) {
      setTimeout(() => searchInput?.focus(), 200);
    }
  });

  searchCloseBtn?.addEventListener("click", function () {
    searchWindow?.classList.remove("open");
  });

  // Simple live search filter for catalog cards
  searchInput?.addEventListener("input", function (e) {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".products-swiper .card");
    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });

  /* ==========================================================================
     4. Splide Main Slider (Hero)
     ========================================================================== */
  if (document.querySelector(".main-slider") && typeof Splide !== "undefined") {
    const mainSplide = new Splide(".main-slider", {
      type: "fade",
      rewind: true,
      autoplay: true,
      interval: 6000,
      speed: 1000,
      pauseOnHover: false,
      arrows: false,
      pagination: true,
    });

    mainSplide.on("mounted move", function () {
      const slides = document.querySelectorAll(".splide__slide");
      slides.forEach((s) => {
        const content = s.querySelector(".slide__content");
        if (content) content.classList.remove("active");
      });
      setTimeout(() => {
        const activeSlide = document.querySelector(".splide__slide.is-active");
        const activeContent = activeSlide?.querySelector(".slide__content");
        if (activeContent) activeContent.classList.add("active");
      }, 100);
    });

    mainSplide.mount();

    const moreArrow = document.querySelector(".slide__more-arrow");
    moreArrow?.addEventListener("click", function () {
      document.getElementById("scroll-anchor")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ==========================================================================
     5. Swipers: Collections & Bestsellers & Reviews
     ========================================================================== */
  if (typeof Swiper !== "undefined") {
    // Collections Swiper
    if (document.querySelector(".collections-swiper")) {
      new Swiper(".collections-swiper", {
        slidesPerView: 1.15,
        spaceBetween: 20,
        speed: 600,
        navigation: {
          nextEl: ".collections-swiper-next",
          prevEl: ".collections-swiper-prev",
        },
        breakpoints: {
          561: { slidesPerView: 1.6, spaceBetween: 24 },
          769: { slidesPerView: 2.3, spaceBetween: 28 },
          1025: { slidesPerView: 3.2, spaceBetween: 32 },
          1401: { slidesPerView: 4, spaceBetween: 32 },
        },
      });
    }

    // Products Swiper
    if (document.querySelector(".products-swiper")) {
      new Swiper(".products-swiper", {
        slidesPerView: 1.15,
        spaceBetween: 20,
        speed: 600,
        navigation: {
          nextEl: ".products-swiper-next",
          prevEl: ".products-swiper-prev",
        },
        breakpoints: {
          561: { slidesPerView: 1.6, spaceBetween: 24 },
          769: { slidesPerView: 2.3, spaceBetween: 28 },
          1025: { slidesPerView: 3.2, spaceBetween: 32 },
          1401: { slidesPerView: 4, spaceBetween: 32 },
        },
      });
    }

    // Reviews Swiper
    if (document.querySelector(".reviews-swiper")) {
      new Swiper(".reviews-swiper", {
        slidesPerView: 1.1,
        spaceBetween: 20,
        speed: 800,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        grabCursor: true,
        navigation: {
          nextEl: ".reviews-swiper-next",
          prevEl: ".reviews-swiper-prev",
        },
        breakpoints: {
          641: { slidesPerView: 1.6, spaceBetween: 24 },
          1025: { slidesPerView: 2.4, spaceBetween: 28 },
          1401: { slidesPerView: 3, spaceBetween: 32 },
        },
      });
    }

    // Product Card Internal Swipers (Hover Pagination)
    const productSliders = document.querySelectorAll(".product-slider");
    productSliders.forEach((sliderEl) => {
      const swiperInstance = new Swiper(sliderEl, {
        effect: "fade",
        fadeEffect: { crossFade: true },
        speed: 300,
        pagination: {
          el: sliderEl.querySelector(".product-slider-pagination"),
          clickable: true,
        },
      });

      const bullets = sliderEl.querySelectorAll(".swiper-pagination-bullet");
      bullets.forEach((bullet, index) => {
        bullet.addEventListener("mouseenter", function () {
          swiperInstance.slideTo(index, 300);
          bullet.classList.add("active");
        });
        bullet.addEventListener("mouseleave", function () {
          bullets.forEach((b) => b.classList.remove("active"));
        });
      });

      sliderEl.addEventListener("mouseleave", function () {
        swiperInstance.slideTo(0, 300);
      });
    });
  }

  /* ==========================================================================
     6. Scroll Animations (IntersectionObserver)
     ========================================================================== */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const animClasses = [
      ".to-top-animation",
      ".to-top-animation-50",
      ".to-top-animation-100",
      ".to-top-animation-150",
      ".to-top-animation-200",
      ".to-top-animation-250",
      ".to-top-animation-300",
      ".to-top-animation-400",
      ".to-left-animation",
      ".to-right-animation",
      ".opacity-animation",
    ];

    animClasses.forEach((cls) => {
      document.querySelectorAll(cls).forEach((el) => observer.observe(el));
    });
  } else {
    // Fallback: make everything visible immediately
    document.querySelectorAll('[class*="animation"]').forEach((el) => el.classList.add("is-visible"));
  }

  /* ==========================================================================
     7. Interactive Cart Drawer & LocalStorage
     ========================================================================== */
  let cart = JSON.parse(localStorage.getItem("ricca_cart") || "[]");
  const cartCounterHeader = document.getElementById("header-count-cart");
  const cartCounterBurger = document.getElementById("burger-count-cart");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartDrawerOverlay = document.getElementById("cart-drawer-overlay");
  const cartDrawerClose = document.getElementById("cart-drawer-close");
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartTotalPriceEl = document.getElementById("cart-total-price");
  const cartEmptyMsg = document.getElementById("cart-empty-message");
  const cartCheckoutBtn = document.getElementById("cart-checkout-btn");
  const toastEl = document.getElementById("toast-notice");

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.querySelector(".toast-text").textContent = msg;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 3200);
  }

  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCounterHeader) {
      cartCounterHeader.textContent = totalCount;
      cartCounterHeader.classList.toggle("visually-hidden", totalCount === 0);
    }
    if (cartCounterBurger) {
      cartCounterBurger.textContent = totalCount;
      cartCounterBurger.classList.toggle("visually-hidden", totalCount === 0);
    }

    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = "";
      if (cart.length === 0) {
        if (cartEmptyMsg) cartEmptyMsg.style.display = "block";
        if (cartTotalPriceEl) cartTotalPriceEl.textContent = "0 ₸";
        if (cartCheckoutBtn) cartCheckoutBtn.style.display = "none";
      } else {
        if (cartEmptyMsg) cartEmptyMsg.style.display = "none";
        if (cartCheckoutBtn) cartCheckoutBtn.style.display = "flex";

        let totalSum = 0;
        cart.forEach((item, idx) => {
          totalSum += item.price * item.quantity;
          const itemEl = document.createElement("div");
          itemEl.className = "cart-item";
          itemEl.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="cart-item__img">
            <div class="cart-item__info">
              <h5 class="cart-item__title">${item.title}</h5>
              <div class="cart-item__price">${item.price.toLocaleString("ru-RU")} ₸ × ${item.quantity}</div>
              <button type="button" class="cart-item__remove" data-cart-remove="${idx}">Удалить</button>
            </div>
          `;
          cartItemsContainer.appendChild(itemEl);
        });

        if (cartTotalPriceEl) {
          cartTotalPriceEl.textContent = totalSum.toLocaleString("ru-RU") + " ₸";
        }
      }
    }

    localStorage.setItem("ricca_cart", JSON.stringify(cart));
  }

  function openCartDrawer() {
    cartDrawer?.classList.add("active");
    cartDrawerOverlay?.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  function closeCartDrawer() {
    cartDrawer?.classList.remove("active");
    cartDrawerOverlay?.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  document.querySelectorAll('a[href*="/cart/"]').forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openCartDrawer();
    });
  });

  cartDrawerClose?.addEventListener("click", closeCartDrawer);
  cartDrawerOverlay?.addEventListener("click", closeCartDrawer);

  // Remove item from cart
  cartItemsContainer?.addEventListener("click", function (e) {
    if (e.target.matches("[data-cart-remove]")) {
      const idx = parseInt(e.target.getAttribute("data-cart-remove"), 10);
      cart.splice(idx, 1);
      updateCartUI();
    }
  });

  // Add to cart buttons
  document.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const card = btn.closest(".card");
      if (!card) return;
      const title = card.querySelector(".card__title h4")?.textContent.trim() || "Дизайнерская мебель Ricca";
      const priceText = card.querySelector(".card__price ins .amount, .card__price .amount")?.textContent.replace(/\D/g, "") || "0";
      const price = parseInt(priceText, 10) || 500000;
      const img = card.querySelector(".product-slider .swiper-slide img")?.getAttribute("src") || "";

      const existing = cart.find((i) => i.title === title);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ title, price, img, quantity: 1 });
      }

      updateCartUI();
      showToast(`«${title}» добавлен в корзину`);
      openCartDrawer();
    });
  });

  // WhatsApp checkout
  cartCheckoutBtn?.addEventListener("click", function () {
    if (cart.length === 0) return;
    let message = "Здравствуйте, хочу оформить заказ в мебельном ателье RICCA DESIGNS:%0A%0A";
    let total = 0;
    cart.forEach((i, idx) => {
      total += i.price * i.quantity;
      message += `${idx + 1}. ${i.title} (${i.quantity} шт.) — ${(i.price * i.quantity).toLocaleString("ru-RU")} ₸%0A`;
    });
    message += `%0AИтоговая сумма: ${total.toLocaleString("ru-RU")} ₸%0A%0AПожалуйста, свяжитесь со мной для уточнения деталей ткани и доставки.`;
    const waUrl = `https://wa.me/77084802047?text=${message}`;
    window.open(waUrl, "_blank");
  });

  updateCartUI();

  /* ==========================================================================
     8. Favorites Toggle & LocalStorage
     ========================================================================== */
  let favorites = JSON.parse(localStorage.getItem("ricca_favorites") || "[]");
  function updateFavoritesUI() {
    document.querySelectorAll(".card__favorite-btn").forEach((btn) => {
      const card = btn.closest(".card");
      const title = card?.querySelector(".card__title h4")?.textContent.trim();
      if (title && favorites.includes(title)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  document.querySelectorAll(".card__favorite-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const card = btn.closest(".card");
      const title = card?.querySelector(".card__title h4")?.textContent.trim();
      if (!title) return;
      if (favorites.includes(title)) {
        favorites = favorites.filter((t) => t !== title);
        btn.classList.remove("active");
        showToast("Удалено из избранного");
      } else {
        favorites.push(title);
        btn.classList.add("active");
        showToast("Добавлено в избранное");
      }
      localStorage.setItem("ricca_favorites", JSON.stringify(favorites));
    });
  });
  updateFavoritesUI();

  /* ==========================================================================
     9. Consultation Modal
     ========================================================================== */
  const consultationModal = document.querySelector("[data-consultation-modal]");
  const consultationOpenBtns = document.querySelectorAll("[data-consultation-button]");
  const consultationCloseBtns = document.querySelectorAll("[data-consultation-close]");
  const consultationForm = document.getElementById("consultation-form");
  const consultationSuccess = document.getElementById("consultation-success-answer");

  function openConsultation() {
    consultationModal?.classList.add("--open");
    document.body.classList.add("no-scroll");
  }

  function closeConsultation() {
    consultationModal?.classList.remove("--open");
    document.body.classList.remove("no-scroll");
  }

  consultationOpenBtns.forEach((btn) => btn.addEventListener("click", openConsultation));
  consultationCloseBtns.forEach((btn) => btn.addEventListener("click", closeConsultation));
  consultationModal?.addEventListener("click", function (e) {
    if (e.target === consultationModal) closeConsultation();
  });

  consultationForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameInput = document.getElementById("consultation-name");
    const phoneInput = document.getElementById("consultation-phone");
    if (!nameInput.value.trim() || !phoneInput.value.trim()) {
      alert("Пожалуйста, заполните имя и номер телефона");
      return;
    }

    consultationForm.classList.add("visually-hidden");
    consultationSuccess?.classList.remove("visually-hidden");
    document.querySelector(".consultation-modal__answer")?.classList.add("open");

    // Optional direct WhatsApp ping
    const waText = encodeURIComponent(`Новая заявка с сайта RICCA DESIGNS!\nИмя: ${nameInput.value.trim()}\nТелефон: ${phoneInput.value.trim()}`);
    console.log("Consultation submitted for:", nameInput.value, phoneInput.value);
  });

  document.querySelector("[data-consultation-update]")?.addEventListener("click", function () {
    consultationForm?.classList.remove("visually-hidden");
    consultationSuccess?.classList.add("visually-hidden");
    document.querySelector(".consultation-modal__answer")?.classList.remove("open");
  });

  /* ==========================================================================
     10. Question Modal
     ========================================================================== */
  const questionModal = document.querySelector("[data-question-modal]");
  const questionOpenBtns = document.querySelectorAll("[data-question-button]");
  const questionCloseBtns = document.querySelectorAll("[data-question-close]");
  const questionForm = document.getElementById("question-form");
  const questionSuccess = document.getElementById("question-success-answer");

  function openQuestion() {
    questionModal?.classList.add("--open");
    document.body.classList.add("no-scroll");
  }

  function closeQuestion() {
    questionModal?.classList.remove("--open");
    document.body.classList.remove("no-scroll");
  }

  questionOpenBtns.forEach((btn) => btn.addEventListener("click", openQuestion));
  questionCloseBtns.forEach((btn) => btn.addEventListener("click", closeQuestion));
  questionModal?.addEventListener("click", function (e) {
    if (e.target === questionModal) closeQuestion();
  });

  questionForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameInput = document.getElementById("question-name");
    const phoneInput = document.getElementById("question-phone");
    if (!nameInput.value.trim() || !phoneInput.value.trim()) {
      alert("Пожалуйста, заполните поля формы");
      return;
    }
    questionForm.classList.add("visually-hidden");
    questionSuccess?.classList.remove("visually-hidden");
    document.querySelector(".question-modal__answer")?.classList.add("open");
  });

  /* ==========================================================================
     11. Keyboard Esc Listener
     ========================================================================== */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeBurger();
      searchWindow?.classList.remove("open");
      closeCartDrawer();
      closeConsultation();
      closeQuestion();
    }
  });
});
