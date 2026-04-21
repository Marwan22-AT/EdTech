// ===== Toast Notifications =====
function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ===== Tab Switching =====
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
        tabs[0].classList.add('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
        tabs[1].classList.add('active');
    }
}

// ===== Authentication =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== LOGIN FORM =====
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (email && password) {
                // Check if user exists
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userName', user.name);
                    localStorage.setItem('authMethod', 'email');
                    showToast('تم تسجيل الدخول بنجاح!', 'success');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    showToast('البريد الإلكتروني أو كلمة المرور غير صحيحة', 'error');
                }
            }
        });
    }
    
    // ===== REGISTER FORM =====
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regConfirm').value;
            const agree = document.getElementById('agreeTerms').checked;
            
            if (password !== confirm) {
                showToast('كلمتا المرور غير متطابقتين', 'error');
                return;
            }
            
            if (password.length < 6) {
                showToast('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
                return;
            }
            
            if (!agree) {
                showToast('يجب الموافقة على الشروط والأحكام', 'error');
                return;
            }
            
            // Check if email exists
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(u => u.email === email)) {
                showToast('البريد الإلكتروني مسجل بالفعل', 'error');
                return;
            }
            
            // Save new user
            users.push({ name, email, password, method: 'email' });
            localStorage.setItem('users', JSON.stringify(users));
            
            // Auto login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            localStorage.setItem('authMethod', 'email');
            
            showToast('تم إنشاء الحساب بنجاح!', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
    
    // ===== CHECK AUTH STATUS =====
    const isAuthPage = document.body.classList.contains('auth-page');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isGuest = localStorage.getItem('isGuest');
    
    if (!isAuthPage && !isLoggedIn && !isGuest) {
        window.location.href = 'index.html';
    }
    
    // ===== UPDATE USER INFO IN HEADER =====
    updateUserInfo();
});

// ===== SOCIAL LOGIN =====
function loginWithGoogle() {
    showSocialModal('google');
}

function loginWithFacebook() {
    showSocialModal('facebook');
}

function showSocialModal(provider) {
    // Remove existing modal
    const existing = document.querySelector('.social-auth-modal');
    if (existing) existing.remove();
    
    const providerName = provider === 'google' ? 'Google' : 'Facebook';
    const iconClass = provider === 'google' ? 'fa-google' : 'fa-facebook';
    
    const modal = document.createElement('div');
    modal.className = 'social-auth-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <i class="fab ${iconClass}"></i>
            <h3>تسجيل الدخول بـ ${providerName}</h3>
            <p>سيتم توجيهك إلى صفحة ${providerName} للمصادقة على حسابك</p>
            <div class="modal-buttons">
                <button class="modal-btn cancel" onclick="closeSocialModal()">إلغاء</button>
                <button class="modal-btn confirm" onclick="completeSocialLogin('${provider}')">متابعة</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeSocialModal() {
    const modal = document.querySelector('.social-auth-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

function completeSocialLogin(provider) {
    closeSocialModal();
    
    // Simulate social login
    setTimeout(() => {
        const names = ['أحمد محمد', 'سارة علي', 'خالد عمر', 'نورا حسن'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomEmail = `user${Math.floor(Math.random() * 10000)}@${provider}.com`;
        
        // Save user
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (!users.find(u => u.email === randomEmail)) {
            users.push({ 
                name: randomName, 
                email: randomEmail, 
                password: null, 
                method: provider 
            });
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', randomEmail);
        localStorage.setItem('userName', randomName);
        localStorage.setItem('authMethod', provider);
        localStorage.removeItem('isGuest');
        
        showToast(`تم تسجيل الدخول بـ ${provider === 'google' ? 'Google' : 'Facebook'} بنجاح!`, 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 800);
}

// ===== GUEST ACCESS =====
function enterAsGuest() {
    localStorage.setItem('isGuest', 'true');
    localStorage.removeItem('isLoggedIn');
    localStorage.setItem('userName', 'ضيف');
    showToast('تم الدخول كضيف - بعض المميزات محدودة', 'info');
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

// ===== UPDATE USER INFO =====
function updateUserInfo() {
    const userName = localStorage.getItem('userName') || 'مستخدم';
    const isGuest = localStorage.getItem('isGuest');
    const authMethod = localStorage.getItem('authMethod');
    
    // Update profile name
    const profileName = document.querySelector('.user-profile span');
    if (profileName) {
        profileName.textContent = userName;
    }
    
    // Update profile image with initials
    const profileImg = document.querySelector('.user-profile img');
    if (profileImg) {
        const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2);
        const bg = isGuest ? '94a3b8' : '6366f1';
        profileImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=${bg}&color=fff`;
    }
    
    // Add guest badge if needed
    if (isGuest) {
        const header = document.querySelector('.top-header');
        if (header && !document.querySelector('.guest-badge')) {
            const badge = document.createElement('div');
            badge.className = 'guest-badge';
            badge.innerHTML = '<i class="fas fa-user-clock"></i> وضع الضيف';
            badge.style.cssText = `
                background: #f59e0b;
                color: white;
                padding: 0.375rem 0.875rem;
                border-radius: 0.5rem;
                font-size: 0.8rem;
                font-weight: 700;
                margin-right: auto;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            `;
            header.insertBefore(badge, header.children[1]);
        }
    }
}

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isGuest');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('authMethod');
    showToast('تم تسجيل الخروج بنجاح', 'info');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}

// ===== LANGUAGE TOGGLE =====
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

const savedLang = localStorage.getItem('lang');
if (savedLang === 'en') {
    toggleLang();
}

// ===== NAVIGATION =====
function openCourse(courseId) {
    localStorage.setItem('currentCourse', courseId);
    window.location.href = 'course-detail.html';
}

function filterCourses(category) {
    localStorage.setItem('filterCategory', category);
    window.location.href = 'courses.html';
}

// ===== COURSE FILTERING =====
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const coursesGrid = document.getElementById('coursesGrid');
    
    if (coursesGrid) {
        const savedCategory = localStorage.getItem('filterCategory');
        if (savedCategory) {
            if (categoryFilter) categoryFilter.value = savedCategory;
            filterCoursesList();
            localStorage.removeItem('filterCategory');
        }
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterCoursesList();
            });
        });
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', filterCoursesList);
        }
        
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
        
        if (activeFilter === 'free' && price > 0) show = false;
        if (activeFilter === 'paid' && price === 0) show = false;
        if (categoryValue !== 'all' && category !== categoryValue) show = false;
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

// ===== COURSE DETAIL =====
function toggleModule(header) {
    const content = header.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    document.querySelectorAll('.module-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.module-header').forEach(h => h.classList.remove('active'));
    
    if (!isActive) {
        content.classList.add('active');
        header.classList.add('active');
    }
}

function playVideo() {
    showToast('جاري تشغيل الفيديو التعريفي...', 'info');
}

// ===== FAVORITES =====
document.addEventListener('click', function(e) {
    if (e.target.closest('.fav-btn')) {
        const btn = e.target.closest('.fav-btn');
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#ef4444';
            showToast('تمت الإضافة للمفضلة', 'success');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
            showToast('تمت الإزالة من المفضلة', 'info');
        }
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 50);
});
