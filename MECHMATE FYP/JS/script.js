// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animate on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < window.innerHeight - elementVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        window.addEventListener('scroll', animateOnScroll);

        // Header background on scroll
        // window.addEventListener('scroll', () => {
        //     const header = document.querySelector('.header');
        //     if (window.scrollY > 100) {
        //         header.style.background = 'rgba(255, 255, 255, 0.98)';
        //         header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        //     } else {
        //         header.style.background = 'rgba(255, 255, 255, 0.95)';
        //         header.style.boxShadow = 'none';
        //     }
        // });

        // Start customization function
        function startCustomization() {
             window.location.href = '../HTML/Page2.html';
            // Or if using React Router: navigate('/car-selection');
        }

        // Initialize animations on load
        document.addEventListener('DOMContentLoaded', () => {
            animateOnScroll();
            
            // Add some initial delay to animations
            const cards = document.querySelectorAll('.animate-on-scroll');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        });