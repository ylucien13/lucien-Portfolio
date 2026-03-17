
 // Typing Effect
        const textElement = document.getElementById('typing-text');
        const phrases = ["l'Intelligence Artificielle.", "les Réseaux.", "l'Avenir."];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                textElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                textElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } 
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        document.addEventListener('DOMContentLoaded', type);


        // Mobile Menu
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('navLinks').classList.remove('active');
            });
        });


        // ============================================
        // FORMULAIRE DE CONTACT CORRIGÉ
        // ============================================

        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const spinner = submitBtn.querySelector('.spinner');

        contactForm.addEventListener("submit", async function(e) {

            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                showStatus("❌ Veuillez remplir tous les champs.", "error");
                return;
            }

            if (!isValidEmail(email)) {
                showStatus("❌ Email invalide.", "error");
                return;
            }

            setLoading(true);
            hideStatus();

            const formData = new FormData(contactForm);

            try {

                const response = await fetch("https://formsubmit.co/ajax/lucienyaogo009@gmail.com", {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {

                    showStatus("✅ Message envoyé avec succès !", "success");
                    contactForm.reset();
   
                    // Redirection après un court délai
                    setTimeout(() => {
                        window.location.href = "merci.html";
                    }, 1500);
                 
                } else {

                    showStatus("❌ Erreur lors de l'envoi.", "error");
                    setLoading(false);
                }

            } catch (error) {

                showStatus("❌ Impossible d'envoyer le message.", "error");

            }

            setLoading(false);

        });


        // Validation Email
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }


        // Afficher message
        function showStatus(message, type) {

            formStatus.textContent = message;
            formStatus.className = "form-status " + type;
            formStatus.style.display = "block";

        }


        // Cacher message
        function hideStatus() {
            formStatus.style.display = "none";
        }


        // Loading bouton
        function setLoading(loading) {

            if (loading) {

                submitBtn.disabled = true;
                btnText.textContent = "Envoi en cours...";
                if (spinner) spinner.style.display = "inline-block";

            } else {

                submitBtn.disabled = false;
                btnText.textContent = "Envoyer le message";
                if (spinner) spinner.style.display = "none";

            }

        }


        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {

            anchor.addEventListener('click', function(e) {

                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });

            });

        });

        // Animation des barres de langue au défilement
        const observeLanguages = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.progress-bar');
                    bars.forEach(bar => {
                        const percentage = bar.getAttribute('data-target');
                        bar.style.width = percentage;
                    });
                }
            });
        }, { threshold: 0.3 });
    
        const targetSection = document.querySelector('.languages-grid');
        if (targetSection) {
            observeLanguages.observe(targetSection);
        }
