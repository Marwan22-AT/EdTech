// ===== Authentication =====
document.addEventListener('DOMContentLoaded', function() {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (email && password) {
                // Simulate login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                window.location.href = 'dashboard.html';
            }
        });
    }

    // Check auth status
    const isAuthPage = document.body.classList.contains('auth-page');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isAuthPage && !isLoggedIn) {
        window.location.href = 'index.html';
    }

    // Logout
    const logoutBtn = document.querySelector('.nav-item.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            window.location.href = 'index.html';
        });
    }
});

// ===== Mobile Menu =====
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}

// ===== Language Toggle =====
let currentLang = 'ar';

function toggleLang() {
    const html = document.documentElement;
    const langText = document.getElementById('langText');
    const langBtn = document.querySelector('.lang-switch-header');
    
    if (currentLang === 'ar') {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        currentLang = 'en';
        if (langText) langText.textContent = 'العربية';
        if (langBtn) langBtn.innerHTML = '<i class="fas fa-globe"></i> AR';
        localStorage.setItem('lang', 'en');
    } else {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        currentLang = 'ar';
        if (langText) langText.textContent = 'English';
        if (langBtn) langBtn.innerHTML = '<i class="fas fa-globe"></i> EN';
        localStorage.setItem('lang', 'ar');
    }
}

// Load saved language
const savedLang = localStorage.getItem('lang');
if (savedLang === 'en') {
    toggleLang();
}

// ===== Navigation =====
function openCourse(courseId) {
    localStorage.setItem('currentCourse', courseId);
    window.location.href = 'course-detail.html';
}

function filterCourses(category) {
    localStorage.setItem('filterCategory', category);
    window.location.href = 'courses.html';
}

// ===== Course Filtering =====
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const coursesGrid = document.getElementById('coursesGrid');
    
    if (coursesGrid) {
        // Apply saved filter
        const savedCategory = localStorage.getItem('filterCategory');
        if (savedCategory) {
            if (categoryFilter) categoryFilter.value = savedCategory;
            filterCoursesList();
            localStorage.removeItem('filterCategory');
        }
        
        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterCoursesList();
            });
        });
        
        // Category select
        if (categoryFilter) {
            categoryFilter.addEventListener('change', filterCoursesList);
        }
        
        // Search
        if (searchInput) {
            searchInput.addEventListener('input', debounce(filterCoursesList, 300));
        }
    }
});

function filterCoursesList() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;
    
    const cards = coursesGrid.querySelectorAll('.course-card');
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const categoryValue = document.getElementById('categoryFilter')?.value || 'all';
    const searchValue = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    cards.forEach(card => {
        const price = parseFloat(card.dataset.price);
        const category = card.dataset.category;
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
        
        let show = true;
        
        // Price filter
        if (activeFilter === 'free' && price > 0) show = false;
        if (activeFilter === 'paid' && price === 0) show = false;
        
        // Category filter
        if (categoryValue !== 'all' && category !== categoryValue) show = false;
        
        // Search filter
        if (searchValue && !title.includes(searchValue) && !desc.includes(searchValue)) show = false;
        
        card.style.display = show ? 'block' : 'none';
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Course Detail =====
function toggleModule(header) {
    const content = header.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    // Close all modules
    document.querySelectorAll('.module-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.module-header').forEach(h => h.classList.remove('active'));
    
    // Open clicked if was closed
    if (!isActive) {
        content.classList.add('active');
        header.classList.add('active');
    }
}

function playVideo() {
    alert('سيتم تشغيل الفيديو التعريفي للكورس');
}

// ===== Favorites =====
document.addEventListener('click', function(e) {
    if (e.target.closest('.fav-btn')) {
        const btn = e.target.closest('.fav-btn');
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#ef4444';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
        }
    }
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Loading Animation =====
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 50);
});
