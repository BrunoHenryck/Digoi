/**
 * DIGOI AUTO CENTER - SCRIPT PRINCIPAL
 * Configuração e interatividade
 */

// 1. CONFIGURAÇÕES GERAIS (PLACEHOLDERS CONFIGURÁVEIS)
const CONFIG = {
    // Insira o número do WhatsApp com código do país e DDD (Apenas números)
    WHATSAPP_NUMBER: '+5564999381252', 
    DEFAULT_MESSAGE: 'Olá! Gostaria de mais informações sobre os serviços da Digoi Auto Center.'
};

document.addEventListener('DOMContentLoaded', () => {
    initWhatsAppLinks();
    initMobileMenu();
    initGalleryFilter();
    initLightbox();
    initQuoteForm();
    initSmoothScroll();
});

// Atualiza dinamicamente os links de WhatsApp do site
function initWhatsAppLinks() {
    const waLinks = document.querySelectorAll('.btn-whatsapp-link');
    const encodedMsg = encodeURIComponent(CONFIG.DEFAULT_MESSAGE);
    const waUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMsg}`;

    waLinks.forEach(link => {
        link.href = waUrl;
    });
}

// Menu Hambúrguer Mobile
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            });
        });
    }
}

// Filtro da Galeria
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Lightbox da Galeria
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.setAttribute('aria-hidden', 'false');
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
    }
}

// Formulário de Orçamento (Redirecionamento para WhatsApp)
function initQuoteForm() {
    const form = document.getElementById('form-orcamento');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const veiculo = document.getElementById('veiculo').value;
            const ano = document.getElementById('ano').value;
            const servico = document.getElementById('servico').value;
            const problema = document.getElementById('problema').value || 'Não informado';

            const mensagemFormatada = 
`Olá, gostaria de solicitar um orçamento.

*Nome:* ${nome}
*Telefone:* ${telefone}
*Veículo:* ${veiculo}
*Ano:* ${ano}
*Serviço desejado:* ${servico}
*Descrição do problema:* ${problema}`;

            const encodedMessage = encodeURIComponent(mensagemFormatada);
            const whatsappURL = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');
        });
    }
}

// Efeito de Scroll Suave e Highlight do Menu
function initSmoothScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}