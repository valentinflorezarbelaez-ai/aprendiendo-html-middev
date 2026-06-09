document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SCROLL Y HEADER DE NAVEGACIÓN
    // ==========================================
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Efecto sticky/blured en header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Resaltar sección activa en menú
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 2. MENÚ RESPONSIVO MÓVIL
    // ==========================================
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            mobileNavToggle.classList.toggle('open');
            mobileNavToggle.setAttribute('aria-expanded', isOpen);
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileNavToggle.classList.remove('open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==========================================
    // 3. FILTRO DEL PORTAFOLIO
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Activar botón
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                }
            });
        });
    });

    // ==========================================
    // 4. ESTIMADOR DE PRESUPUESTO INTERACTIVO
    // ==========================================
    const calculateBtn = document.getElementById('calculate-btn');
    const estimatorResults = document.getElementById('estimator-results');
    const priceRangeSpan = document.getElementById('price-range');
    const sendEstimateBtn = document.getElementById('send-estimate-btn');
    
    // Parámetros de costos estimados por m²
    const basePrices = {
        cocina: 450,       // USD/m²
        bano: 550,         // USD/m²
        sala: 300,         // USD/m²
        integral: 380      // USD/m²
    };

    const multipliers = {
        signature: 1.0,    // Signature
        deluxe: 1.5,       // Deluxe (+50%)
        royal: 2.2         // Royal Custom (+120%)
    };

    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const espacio = document.getElementById('est-espacio').value;
            const acabado = document.getElementById('est-acabados').value;
            const area = parseFloat(document.getElementById('est-area').value) || 0;

            if (area <= 0) {
                alert('Por favor, ingrese un área válida mayor a 0 m²');
                return;
            }

            const basePrice = basePrices[espacio];
            const multiplier = multipliers[acabado];
            
            // Inversión calculada
            const estimatedValue = area * basePrice * multiplier;
            const minEstimate = estimatedValue * 0.9;
            const maxEstimate = estimatedValue * 1.15;

            // Formatear precios
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            });

            const resultText = `${formatter.format(minEstimate)} - ${formatter.format(maxEstimate)}`;
            
            // Efecto count-up o aparición suave del precio
            priceRangeSpan.textContent = resultText;
            estimatorResults.style.display = 'block';
            estimatorResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    if (sendEstimateBtn) {
        sendEstimateBtn.addEventListener('click', () => {
            const espacioSelect = document.getElementById('est-espacio');
            const acabadoSelect = document.getElementById('est-acabados');
            const areaInput = document.getElementById('est-area');
            const estimatedPrice = priceRangeSpan.textContent;

            const espacioName = espacioSelect.options[espacioSelect.selectedIndex].text;
            const acabadoName = acabadoSelect.options[acabadoSelect.selectedIndex].text;
            const areaVal = areaInput.value;

            // Rellenar el formulario de contacto con los detalles de la estimación
            const mensajeTextarea = document.getElementById('mensaje');
            if (mensajeTextarea) {
                mensajeTextarea.value = `Hola, me interesa agendar una consultoría de diseño para una remodelación de tipo "${espacioName}" con acabados "${acabadoName}" para un área estimada de ${areaVal} m². El presupuesto estimado que obtuve fue de: ${estimatedPrice}.`;
                
                // Activar la etiqueta flotante del textarea simulando entrada del usuario
                mensajeTextarea.dispatchEvent(new Event('input', { bubbles: true }));
            }

            // Hacer scroll suave hasta el formulario de contacto
            const contactSection = document.getElementById('contacto');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                // Hacer focus en el primer input
                const nombreInput = document.getElementById('nombre');
                if (nombreInput) {
                    setTimeout(() => nombreInput.focus(), 800);
                }
            }
        });
    }

    // ==========================================
    // 5. ENVÍO DE FORMULARIO DE CONTACTO (SIMULACIÓN)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulación de envío
            contactForm.style.opacity = '0.5';
            setTimeout(() => {
                contactForm.style.display = 'none';
                if (successMsg) {
                    successMsg.style.display = 'block';
                }
            }, 1200);
        });
    }

    // ==========================================
    // 6. ANIMACIONES AL HACER SCROLL (REVEAL EFFECTS)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Ejecutar una vez al inicio por si ya hay elementos en viewport
    revealOnScroll();
});
