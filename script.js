// Theme switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark'; // Switch checked state for dark mode

    // Theme toggle event listener
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Initialize skill bars with animation
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 300); // Small delay for animation
    });

    // Initialize projects
    loadProjects();
    initProjectFilters();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project data
const projects = [
    {
        title: "E-Commerce Website",
        category: "IT",
        image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80",
        description: "Developed a full-stack e-commerce platform using MERN stack.",
        link: "https://github.com/yourusername" // Replace with your actual GitHub link
    },
    {
        title: "Gaming Video Content",
        category: "Video",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
        description: "Creating and editing gaming content including shorts and long-form videos.",
        link: "https://youtube.com/@arcessgaming179" // Your YouTube channel
    },
    {
        title: "Inventory System",
        category: "IT",
        image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
        description: "Created an inventory management system using PHP and MySQL.",
        link: "https://your-inventory-project.com" // Your project link
    },
    {
        title: "Mobile App Development",
        category: "IT",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
        description: "Currently developing a mobile application using Flutter and Firebase.",
        link: "https://github.com/yourusername/flutter-app" // Update with your actual repository link
    }
];

// Load and filter projects
function loadProjects(filter = 'all') {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = ''; // Clear existing projects

    projects.forEach(project => {
        if (filter === 'all' || project.category === filter) {
            const projectCard = `
                <a href="${project.link}" target="_blank" class="project-card" data-category="${project.category}">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                    </div>
                </a>
            `;
            projectsGrid.innerHTML += projectCard;
        }
    });
}

// Project filters
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Filter projects
            loadProjects(btn.getAttribute('data-filter'));
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 62, 80, 0.9)';
    } else {
        navbar.style.background = 'var(--primary-color)';
    }
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Form validation and handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    // Don't prevent default - let the form submit to FormSubmit
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !message) {
        e.preventDefault();
        alert('Please fill in all fields');
        return;
    }
});

// Updated email sending function
function sendEmail(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElement('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    const mailtoLink = `mailto:robinsaldo06@gmail.com?subject=Portfolio Contact from ${name}&body=${emailBody}`;
    
    
    // Reset form after sending
    document.getElementById('contactForm').reset();
}


document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Message sent successfully!');
            this.reset();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        alert('Error sending message. Please try again.');
        console.error('Error:', error);
    }
});


const testimonials = [
    {
        text: "Exceptional work on our website. Professional and creative!",
        name: "John Doe",
        position: "CEO, Tech Company",
        image: "images/testimonials/testimonial1.jpg" // Local image path
    },
    {
        text: "Amazing video editing skills. Transformed our content completely!",
        name: "Jane Smith",
        position: "Marketing Director",
        image: "images/testimonials/testimonial2.jpg" // Local image path
    },
    {
        text: "Highly recommend for both technical and creative projects.",
        name: "Mike Johnson",
        position: "Project Manager",
        image: "images/testimonials/testimonial3.jpg" // Local image path
    }
];

// Initialize testimonials slider
function initTestimonials() {
    const slider = document.querySelector('.testimonials-slider');
    const dots = document.querySelector('.slider-dots');
    
    testimonials.forEach((testimonial, index) => {
        const card = `
            <div class="testimonial-card" style="display: ${index === 0 ? 'block' : 'none'}">
                <div class="quote"><i class="fas fa-quote-left"></i></div>
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="client-info">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                    <div>
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.position}</p>
                    </div>
                </div>
            </div>
        `;
        slider.innerHTML += card;
        
        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => showTestimonial(index);
        dots.appendChild(dot);
    });
}

function showTestimonial(index) {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.slider-dot');
    
    cards.forEach(card => card.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));
    
    cards[index].style.display = 'block';
    dots[index].classList.add('active');
}

// Skills progress bars
function initSkillsBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const progress = bar.dataset.progress;
        setTimeout(() => {
            bar.style.width = `${progress}%`;
        }, 500);
    });
}

// Chat widget
function toggleChat() {
    const popup = document.querySelector('.chat-popup');
    popup.classList.toggle('active');
}

// Project modal
function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    modal.classList.add('active');
    modal.querySelector('.modal-content').innerHTML = `
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}">
        <p>${project.description}</p>
        <!-- Add more project details -->
    `;
}

// Blog posts
const blogPosts = [
    {
        title: "Latest Web Development Trends",
        excerpt: "Exploring modern web technologies...",
        date: "2024-01-15",
        image: "path/to/blog-image.jpg",
        link: "#"
    }
    // Add more blog posts
];

function loadBlogPosts() {
    const blogGrid = document.querySelector('.blog-grid');
    blogPosts.forEach(post => {
        const blogCard = `
            <article class="blog-card">
                <img src="${post.image}" alt="${post.title}">
                <div class="blog-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <span class="date">${post.date}</span>
                    <a href="${post.link}" class="read-more">Read More</a>
                </div>
            </article>
        `;
        blogGrid.innerHTML += blogCard;
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initThemeSwitch();
    loadProjects();
    
    // 3D card tilt effect for both skills and certifications
    const cards = document.querySelectorAll('.project-card, .skill-category, .cert-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });

    initTestimonials();
    
    // Auto-rotate testimonials
    setInterval(() => {
        const activeDot = document.querySelector('.slider-dot.active');
        const nextIndex = [...document.querySelectorAll('.slider-dot')].indexOf(activeDot) + 1;
        showTestimonial(nextIndex >= testimonials.length ? 0 : nextIndex);
    }, 5000);

    // Page loader
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        loader.classList.add('hidden');
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    initProjectFilters();
    initSkillsBars();
    loadBlogPosts();
});

function handleTilt(e) {
    const card = this;
    const cardRect = card.getBoundingClientRect();
    const centerX = cardRect.left + cardRect.width / 2;
    const centerY = cardRect.top + cardRect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (cardRect.height / 2)) * -10;
    const rotateY = (mouseX / (cardRect.width / 2)) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
}

function resetTilt(e) {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.transform = `translateY(${scrolled * 0.5}px) translateZ(-${scrolled * 0.1}px)`;
});

// Smooth reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});
