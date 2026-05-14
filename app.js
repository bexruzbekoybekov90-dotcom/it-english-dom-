// Swiper-ni ishga tushirish
const swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: { delay: 3000 },
    pagination: { el: ".swiper-pagination", clickable: true },
});

// Tarjimalar
const translations = {
    uz: {
        resH: "IT-DOM NATIJALARI", resP: "O'quvchilarimiz erishgan natijalar bilan tanishing.", resB: "Natijalarni ko'rish",
        desH: "GRAFIK DIZAYN", desP: "Kreativ g'oyalaringizni professional darajaga olib chiqing.",
        frontH: "FRONTEND DEVELOPER", frontP: "9 oyda professional veb-dasturchiga aylaning!",
        formH: "<span>IT NI</span>ni <br> o'rganmoqchimisiz?", courseL: "Yo'nalishni tanlang:", subB: "YUBORISH"
    },
    ru: {
        resH: "РЕЗУЛЬТАТЫ IT-DOM", resP: "Ознакомьтесь с успехами наших учеников.", resB: "Посмотреть результаты",
        desH: "ГРАФИЧЕСКИЙ ДИЗАЙН", desP: "Выведите свои креативные идеи на новый уровень.",
        frontH: "FRONTEND РАЗРАБОТКА", frontP: "Станьте профессионалом за 9 месяцев!",
        formH: "Хотите изучать <br> <span>IT СФЕРУ</span>?", courseL: "Выберите направление:", subB: "ОТПРАВИТЬ"
    }
};

function changeLang(lang) {
    document.getElementById('uzb-btn').classList.toggle('active', lang === 'uz');
    document.getElementById('rus-btn').classList.toggle('active', lang === 'ru');

    const t = translations[lang];
    const update = (cls, txt, isHTML = false) => {
        document.querySelectorAll(cls).forEach(el => isHTML ? el.innerHTML = txt : el.innerText = txt);
    };

    update('.lang-res-h', t.resH); update('.lang-res-p', t.resP); update('.lang-res-b', t.resB);
    update('.lang-des-h', t.desH); update('.lang-des-p', t.desP);
    update('.lang-front-h', t.frontH); update('.lang-front-p', t.frontP);
    update('.lang-form-h', t.formH, true); update('.lang-course-l', t.courseL); update('.lang-sub-b', t.subB);

    swiper.update();
}

// Telegramga yuborish qismi (Yangi ma'lumotlar bilan)
document.getElementById('leadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value;
    const phone = "+998 " + this.querySelector('input[type="tel"]').value;
    const selectedCourses = [];
    this.querySelectorAll('input[name="course"]:checked').forEach(cb => {
        selectedCourses.push(cb.parentElement.innerText.trim());
    });

    if (selectedCourses.length === 0) {
        alert("Iltimos, yo'nalishni tanlang!");
        return;
    }

    // YANGI MA'LUMOTLAR SHU YERDA:
    const botToken = "8841064586:AAGbFw4Ya4NrTU1o7pSnzyD2P-GfVX1K3eI";
    const chatId = "8101060085";

    const message = `🚀 YANGI ARIZA!\n👤 Ism: ${name}\n📞 Tel: ${phone}\n📚 Yo'nalishlar: ${selectedCourses.join(", ")}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
    }).then(res => {
        if (res.ok) {
            alert("Yuborildi!");
            this.reset();
        } else {
            alert("Xatolik yuz berdi. Bot ma'lumotlarini tekshiring.");
        }
    });
});