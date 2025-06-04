document.addEventListener("DOMContentLoaded", function () {
  // Configuração do calendário dinâmico
  setupCalendar();

  // Configuração do gráfico
  setupChart();

  // Animação dos cards
  setupAnimations();
});

function setupCalendar() {
  const calendarEl = document.getElementById("calendar");
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Dias da semana
  const weekdays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

  // Cria cabeçalhos dos dias da semana
  weekdays.forEach((day) => {
    const header = document.createElement("div");
    header.className = "calendar-header";
    header.textContent = day;
    calendarEl.appendChild(header);
  });

  // Cria os dias do mês (exemplo para junho 2025)
  const daysInMonth = 30;
  const firstDay = new Date(2025, 5, 1).getDay(); // 0 = Domingo, 1 = Segunda, etc.

  // Preenche dias vazios no início do mês
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "calendar-day";
    calendarEl.appendChild(emptyDay);
  }

  // Cria os dias do mês
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement("div");
    dayEl.className = "calendar-day";

    // Determina a fase (verde, azul, vermelha)
    if (day >= 2 && day <= 10) {
      dayEl.classList.add("verde");
    } else if (day >= 11 && day <= 20) {
      dayEl.classList.add("azul");
    } else if (day >= 21 && day <= 30) {
      dayEl.classList.add("vermelha");
    }

    // Marca o dia atual
    if (day === currentDay && currentMonth === 5 && currentYear === 2025) {
      dayEl.classList.add("hoje");
    }

    const dayNumber = document.createElement("div");
    dayNumber.className = "day-number";
    dayNumber.textContent = day;

    const dayMeta = document.createElement("div");
    dayMeta.className = "day-meta";

    if (day === currentDay && currentMonth === 5 && currentYear === 2025) {
      dayMeta.textContent = "HOJE";
    } else if (day >= 2 && day <= 10) {
      dayMeta.textContent = "VERDE";
    } else if (day >= 11 && day <= 20) {
      dayMeta.textContent = "AZUL";
    } else if (day >= 21 && day <= 30) {
      dayMeta.textContent = "VERMELHA";
    }

    dayEl.appendChild(dayNumber);
    if (dayMeta.textContent) {
      dayEl.appendChild(dayMeta);
    }

    calendarEl.appendChild(dayEl);
  }
}

function setupAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".card, .meta-card, .estrategia-card")
    .forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });
}

// Melhorar experiência em mobile
function setupMobile() {
    // Prevenir zoom duplo toque
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Ajustar altura do viewport em mobile
    function setVh() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVh();
    window.addEventListener('resize', setVh);
}

// Chame a função no carregamento
document.addEventListener('DOMContentLoaded', function() {
    setupMobile();
    // Outras funções de inicialização...
});
