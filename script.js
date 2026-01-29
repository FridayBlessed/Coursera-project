
        // ===== MOBILE MENU =====
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
            });
        });

        // ===== SMOOTH SCROLL =====
        document.querySelectorAll('[data-scroll]').forEach(button => {
            button.addEventListener('click', (e) => {
                const targetId = button.getAttribute('data-scroll');
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // ===== FORM VALIDATION & INTERACTIVITY =====
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const formStatus = document.getElementById('formStatus');
        const successMessage = document.getElementById('successMessage');

        const formFields = {
            name: {
                element: document.getElementById('name'),
                errorElement: document.getElementById('nameError'),
                validate: (value) => {
                    if (!value.trim()) return 'Name is required';
                    if (value.trim().length < 2) return 'Name must be at least 2 characters';
                    if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Name contains invalid characters';
                    return '';
                }
            },
            email: {
                element: document.getElementById('email'),
                errorElement: document.getElementById('emailError'),
                validate: (value) => {
                    if (!value.trim()) return 'Email is required';
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) return 'Please enter a valid email address';
                    return '';
                }
            },
            subject: {
                element: document.getElementById('subject'),
                errorElement: document.getElementById('subjectError'),
                validate: (value) => {
                    if (!value.trim()) return 'Subject is required';
                    if (value.trim().length < 5) return 'Subject must be at least 5 characters';
                    if (value.trim().length > 100) return 'Subject must be less than 100 characters';
                    return '';
                }
            },
            message: {
                element: document.getElementById('message'),
                errorElement: document.getElementById('messageError'),
                validate: (value) => {
                    if (!value.trim()) return 'Message is required';
                    if (value.trim().length < 10) return 'Message must be at least 10 characters';
                    if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
                    return '';
                }
            }
        };

        // Real-time validation on input
        Object.values(formFields).forEach(field => {
            field.element.addEventListener('input', () => {
                const error = field.validate(field.element.value);
                
                if (error) {
                    field.element.classList.add('error');
                    field.errorElement.textContent = error;
                    field.errorElement.classList.add('show');
                } else {
                    field.element.classList.remove('error');
                    field.errorElement.classList.remove('show');
                }
            });

            field.element.addEventListener('blur', () => {
                const error = field.validate(field.element.value);
                if (error) {
                    field.element.classList.add('error');
                    field.errorElement.textContent = error;
                    field.errorElement.classList.add('show');
                }
            });

            field.element.addEventListener('focus', () => {
                field.element.classList.remove('error');
                field.errorElement.classList.remove('show');
            });
        });

        // Form submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate all fields
            let isValid = true;
            Object.values(formFields).forEach(field => {
                const error = field.validate(field.element.value);
                if (error) {
                    isValid = false;
                    field.element.classList.add('error');
                    field.errorElement.textContent = error;
                    field.errorElement.classList.add('show');
                }
            });

            if (!isValid) {
                formStatus.textContent = '';
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            formStatus.textContent = 'Sending...';
            formStatus.className = 'form-status status-loading';

            // Simulate sending (in real app, you'd send to a server)
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Success
                successMessage.classList.add('show');
                formStatus.textContent = '✓ Message sent!';
                formStatus.className = 'form-status status-success';
                
                // Reset form
                contactForm.reset();
                Object.values(formFields).forEach(field => {
                    field.element.classList.remove('error');
                    field.errorElement.classList.remove('show');
                });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                    formStatus.textContent = '';
                }, 5000);

            } catch (error) {
                formStatus.textContent = '✗ Error sending message. Please try again.';
                formStatus.className = 'form-status status-error';
            } finally {
                submitBtn.disabled = false;
            }
        });

        // Character counter for message field
        const messageField = formFields.message.element;
        messageField.addEventListener('input', () => {
            const charCount = messageField.value.length;
            const remaining = 1000 - charCount;
            if (charCount > 0) {
                messageField.title = `${charCount} characters (${remaining} remaining)`;
            }
        });

        // Tech badge interactivity
        document.querySelectorAll('.tech-badge').forEach(badge => {
            badge.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });

        // Active nav link on scroll
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.style.color = 'var(--text-secondary)';
                if (item.getAttribute('href') === `#${current}`) {
                    item.style.color = 'var(--accent-cyan)';
                }
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
            }
        });

        // Prevent form submission on Enter in text inputs
        Object.values(formFields).forEach(field => {
            if (field.element.tagName !== 'TEXTAREA') {
                field.element.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                    }
                });
            }
        });
 