document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // --- Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // Set initial theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        if(themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-theme')) {
                body.classList.replace('dark-theme', 'light-theme');
                if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.replace('light-theme', 'dark-theme');
                if(themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- Typing Effect (only on index.html) ---
    const typingEffect = document.getElementById('typing-effect');
    if (typingEffect) {
        const words = ['Designer', 'Content Creator', 'Blogger', 'Gamer', 'Traveler'];
        let wordIndex = 0;
        let letterIndex = 0;
        let currentWord = '';
        let isDeleting = false;

        function type() {
            currentWord = words[wordIndex];
            if (isDeleting) {
                letterIndex--;
            } else {
                letterIndex++;
            }

            typingEffect.textContent = currentWord.substring(0, letterIndex);
            let typeSpeed = isDeleting ? 75 : 150;

            if (!isDeleting && letterIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- Portfolio Filter (only on portofolio.html) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGridItems = document.querySelectorAll('.portfolio-grid .portfolio-item');

    if (filterButtons.length > 0 && portfolioGridItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                portfolioGridItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    const shouldShow = filter === 'all' || category === filter;

                    if (shouldShow) {
                        item.classList.remove('hidden');
                        // Make it visible for the animation
                        item.style.display = 'block'; 
                    } else {
                        item.classList.add('hidden');
                        // Hide it from layout after animation
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500); // Match timeout with CSS transition duration
                    }
                });
            });
        });
    }

    // --- Portfolio Modal (only on portofolio.html) ---
    const portfolioModal = document.getElementById('portfolio-modal');
    if (portfolioModal) {
        const modalClose = document.getElementById('modal-close');
        const modalBody = document.getElementById('modal-body');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        const projectDetails = {
            "Proyek Web 1": {
                img: "assets/images/project1.jpg",
                title: "Website E-commerce Modern",
                desc: "Sebuah platform e-commerce yang dibangun dengan teknologi web terbaru, fokus pada pengalaman pengguna yang cepat dan intuitif.",
                tech: "HTML, CSS, JavaScript, React"
            },
            "Aplikasi Mobile": {
                img: "assets/images/project2.jpg",
                title: "Aplikasi Produktivitas",
                desc: "Aplikasi mobile cross-platform untuk membantu pengguna mengatur tugas harian mereka secara efisien.",
                tech: "Flutter, Firebase"
            },
            "Proyek Web 2": {
                img: "assets/images/project3.jpg",
                title: "Landing Page Interaktif",
                desc: "Landing page untuk produk startup dengan animasi dan interaksi yang menarik perhatian pengunjung.",
                tech: "HTML, CSS, GSAP"
            }
        };

        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const projectName = item.querySelector('h3').textContent;
                const details = projectDetails[projectName];

                if (details) {
                    modalBody.innerHTML = `
                        <img src="${details.img}" alt="${details.title}">
                        <h2>${details.title}</h2>
                        <p>${details.desc}</p>
                        <p><strong>Teknologi:</strong> ${details.tech}</p>
                        <a href="#" class="btn" target="_blank">Lihat Live Demo</a>
                    `;
                    portfolioModal.classList.add('active');
                }
            });
        });

        modalClose.addEventListener('click', () => {
            portfolioModal.classList.remove('active');
        });

        portfolioModal.addEventListener('click', (e) => {
            if (e.target === portfolioModal) {
                portfolioModal.classList.remove('active');
            }
        });
    }
});
