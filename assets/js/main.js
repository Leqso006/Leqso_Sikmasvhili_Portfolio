document.addEventListener('DOMContentLoaded', () => {
    // 1. Mouse Glow Logic
    const glow = document.getElementById('mouse-glow');
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // 2. Preloader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1000);
    });

    // 3. Scroll Progress & Active Nav
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // Progress bar
        const scrollPos = window.scrollY;
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        scrollProgress.style.width = `${(scrollPos / totalHeight) * 100}%`;

        // Active Link
        let current = "";
        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach(a => {
            a.classList.remove("active");
            if (a.getAttribute("href").includes(current)) a.classList.add("active");
        });
    });

    // 4. Typewriter
    const typeElement = document.getElementById('typewriter');
    const texts = ['Production Code.', 'Data Narratives.', 'Economic Logic.'];
    let count = 0, index = 0, isDeleting = false;

    (function type() {
        const current = texts[count];
        typeElement.textContent = isDeleting ? current.substring(0, index--) : current.substring(0, index++);
        let speed = isDeleting ? 50 : 150;
        if (!isDeleting && index === current.length + 1) { speed = 2000; isDeleting = true; }
        else if (isDeleting && index === 0) { isDeleting = false; count = (count + 1) % texts.length; speed = 500; }
        setTimeout(type, speed);
    }());

    // 5. Reveal Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});