document.addEventListener('DOMContentLoaded', () => {

    // Typewriter Effect Removed for CSS Animation
    /* 
    const textElement = document.getElementById('hero-text');
    const textToType = "I build ecosystems, not just resumes.";
    let index = 0;

    function typeWriter() {
        if (index < textToType.length) {
            textElement.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, 50); // Typing speed
        } else {
            // Add cursor after typing is done
            textElement.innerHTML += '<span class="cursor">&nbsp;</span>';
        }
    }

    // Start typing after a small delay
    setTimeout(typeWriter, 500);
    */

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });

        // Timeline Active State
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Scroll to Top Visibility
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) { // Ensure the button exists before trying to modify it
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // Scroll to Top Click
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) { // Ensure the button exists before adding an event listener
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Navigation Toggle (Simple implementation)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = '#fff';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            }
        });
    }
});

// Interactive Timeline Highlight
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineContainer = document.querySelector('.timeline-container');

const highlightTimeline = () => {
    const triggerBottom = window.innerHeight * 0.8;

    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if (itemTop < triggerBottom) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', highlightTimeline);
