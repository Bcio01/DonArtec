document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Scroll to top button visibility
        const scrollTopBtn = document.getElementById('scroll-top');
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
        
        // Activate scroll animations
        revealOnScroll();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Agregar event listener a cada enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Obtener la URL completa
            const href = this.getAttribute('href');
            
            // Comprobar si contiene un ancla (#)
            if (href.includes('#')) {
                // Verificar si estamos ya en index.html o si necesitamos navegar primero
                const currentPage = window.location.pathname.split('/').pop();
                const isIndexPage = currentPage === 'https://bcio01.github.io/DonArtec/' || currentPage === '';
                const targetIsIndexPage = href.startsWith('https://bcio01.github.io/DonArtec/') || (isIndexPage && href.startsWith('#'));
                
                // Si estamos en index.html y el enlace también apunta a index.html o a un ancla local
                if (isIndexPage && targetIsIndexPage) {
                    e.preventDefault(); // Prevenir navegación predeterminada
                    
                    // Extraer el ID de la sección objetivo
                    let targetId;
                    if (href.includes('https://bcio01.github.io/DonArtec/#')) {
                        targetId = href.split('#')[1];
                    } else if (href.startsWith('#')) {
                        targetId = href.substring(1);
                    }
                    
                    if (targetId) {
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            // Calcular la posición correcta considerando la altura del navbar
                            const navbarHeight = document.querySelector('.navbar').offsetHeight;
                            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                            
                            // Hacer scroll suave a la sección sin modificar la URL
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                } else {
                    // Si no estamos en index.html y necesitamos navegar a ella
                    // Dejamos que el comportamiento por defecto funcione
                    // No hacemos preventDefault() aquí
                }
            }
            // Si el enlace no tiene ancla, dejamos el comportamiento predeterminado
        });
    });



    // Counter animation for statistics
    function animateCounter() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounter(), 10);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Scroll animation for elements
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal-up, .reveal-stagger');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
                
                // Animate progress bars
                if (reveal.classList.contains('impact-icons')) {
                    document.querySelectorAll('.progress').forEach(progress => {
                        const percent = progress.dataset.percent;
                        progress.style.width = percent + '%';
                    });
                }
                
                // Start counter animation
                if (reveal.querySelector('.counter')) {
                    animateCounter();
                }
            }
        });
    }
    
    // Initialize progress bars
    document.querySelectorAll('.progress').forEach(progress => {
        progress.style.width = '0%';
    });
    
    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Initial call to set up animations
    setTimeout(() => {
        revealOnScroll();
    }, 100);
    
    // Scroll to top button functionality
    document.getElementById('scroll-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Add active class to hamburger menu
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// Thank you message styling
const style = document.createElement('style');
style.textContent = `
    .thank-you-message {
        text-align: center;
        padding: 2rem 0;
    }
    
    .check-icon {
        font-size: 4rem;
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);
