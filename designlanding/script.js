document.addEventListener('DOMContentLoaded', () => {

    // ─── Lucide Icons ────────────────────────────────────────
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // ─── Navbar: transparent → glass on scroll ───────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ─── Hero video: play/pause toggle ───────────────────────
    const video      = document.getElementById('hero-video');
    const playToggle = document.getElementById('play-toggle');
    const playIcon   = document.getElementById('play-icon');
    const playLabel  = document.getElementById('play-label');

    if (playToggle && video) {
        playToggle.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playIcon.setAttribute('data-lucide', 'pause');
                playLabel.textContent = 'Pause';
            } else {
                video.pause();
                playIcon.setAttribute('data-lucide', 'play');
                playLabel.textContent = 'Play';
            }
            lucide.createIcons();
        });
    }

    // ─── Scroll Reveal ───────────────────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                // stagger siblings
                const siblings = entry.target.parentElement.querySelectorAll('.reveal-card');
                siblings.forEach((el, i) => {
                    setTimeout(() => el.classList.add('revealed'), i * 120);
                });
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal-card').forEach(el => revealObserver.observe(el));

    // ─── Testimonial Slider ───────────────────────────────────
    const cards    = Array.from(document.querySelectorAll('.testimonial-card'));
    const progress = document.getElementById('tprogress');
    let current    = 0;

    function showTestimonial(n) {
        cards.forEach(c => c.classList.remove('active'));
        current = (n + cards.length) % cards.length;
        cards[current].classList.add('active');
        if (progress) {
            progress.style.width = `${((current + 1) / cards.length) * 100}%`;
        }
    }

    document.querySelector('.tnext')?.addEventListener('click', () => showTestimonial(current + 1));
    document.querySelector('.tprev')?.addEventListener('click', () => showTestimonial(current - 1));

    // Auto-advance every 6 s
    setInterval(() => showTestimonial(current + 1), 6000);

    // ─── Smooth anchor scroll ────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ─── Mobile hamburger ────────────────────────────────────
    const ham    = document.getElementById('hamburger');
    const navInner = document.querySelector('.nav-inner');
    ham?.addEventListener('click', () => {
        ham.classList.toggle('open');
        navInner.classList.toggle('mobile-open');
    });

    // Ensure initial progress state
    showTestimonial(0);

    // ─── Video Modal Logic (80/20 split) ─────────────────────
    const videoContainer = document.querySelector('.video-container');
    const videoModal = document.getElementById('video-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalVideoEl = document.getElementById('modal-video-el');

    if (videoContainer && videoModal) {
        videoContainer.style.cursor = 'zoom-in';
        
        videoContainer.addEventListener('click', () => {
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            if (modalVideoEl) {
                modalVideoEl.currentTime = 0;
                modalVideoEl.play();
            }
        });

        const closeModal = () => {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
            if (modalVideoEl) modalVideoEl.pause();
        };

        modalCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
