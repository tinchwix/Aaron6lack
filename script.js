document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. Fade-Up Animations on Scroll
    ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.core-card, .service-item, .portfolio-card, .blog-card, .tech-stack, .timeline-item, .about-content');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        observer.observe(el);
    });

    /* =========================================
       2. Theme Toggle (Dark/Light Mode)
    ========================================= */
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if(themeIcon) themeIcon.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        if(themeIcon) themeIcon.textContent = '🌗';
    }

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                if(themeIcon) themeIcon.textContent = '🌗';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if(themeIcon) themeIcon.textContent = '☀️';
            }
        });
    }

    /* =========================================
       3. Custom Magnetic Cursor
    ========================================= */
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, .portfolio-card.block-link, img[src^="assets/design"], img[src^="assets/DESIGN"]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    /* =========================================
       4. Lightbox Functionality
    ========================================= */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    const graphicImages = document.querySelectorAll('img[src^="assets/design"], img[src^="assets/DESIGN"]');
    graphicImages.forEach(img => {
        img.style.cursor = 'none'; // hide default cursor if custom is active
        img.addEventListener('click', () => {
            if (lightbox) {
                lightbox.style.display = 'flex';
                void lightbox.offsetWidth; // Force reflow
                lightbox.classList.add('show');
                lightboxImg.src = img.src;
            }
        });
    });

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});
