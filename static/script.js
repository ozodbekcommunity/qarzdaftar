// Dark mode funksiyasi
function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    updateThemeIcon(theme);
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    if (isDark) {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }
    
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    
    if (theme === 'dark') {
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
    } else {
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
    }
}

// Modal oynalar
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Sana o'rnatish (kunlar oldinga)
function setDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const input = document.querySelector('input[name="promised_date"]');
    if (input) {
        input.value = date.toISOString().split('T')[0];
    }
}

function setPromisedDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const input = document.querySelector('input[name="promised_date"]');
    if (input) {
        input.value = date.toISOString().split('T')[0];
    }
}

// Kompaniya ma'lumotlarini tahrirlash
function toggleEdit() {
    const inputs = document.querySelectorAll('#company-name, #company-phone, #company-email, #company-address');
    const buttons = document.getElementById('save-buttons');
    
    inputs.forEach(input => {
        input.removeAttribute('readonly');
        input.classList.remove('bg-gray-50');
        input.classList.add('focus:ring-blue-500', 'focus:border-blue-500');
    });
    
    buttons.classList.remove('hidden');
}

function cancelEdit() {
    const inputs = document.querySelectorAll('#company-name, #company-phone, #company-email, #company-address');
    const buttons = document.getElementById('save-buttons');
    
    inputs.forEach(input => {
        input.setAttribute('readonly', true);
        input.classList.add('bg-gray-50');
        input.classList.remove('focus:ring-blue-500', 'focus:border-blue-500');
    });
    
    buttons.classList.add('hidden');
    
    // O'zgarishlarni bekor qilish
    location.reload();
}

// Tranzaksiya miqdorini formatlash
function formatAmount(amount) {
    return new Intl.NumberFormat('uz-UZ', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Sana formatlash
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
}

// To'lov turini o'zgartirish
function togglePaymentType() {
    const fullPayment = document.getElementById('full');
    const partialPayment = document.getElementById('partial');
    const amountField = document.getElementById('amount_field');
    const amountInput = document.getElementById('amount');
    
    if (partialPayment.checked) {
        amountField.style.display = 'block';
        amountInput.required = true;
    } else {
        amountField.style.display = 'none';
        amountInput.required = false;
    }
}

// Qidirish funksiyasi
function performSearch(query) {
    const searchInput = document.querySelector('input[name="search"]');
    if (searchInput) {
        searchInput.value = query;
        searchInput.form.submit();
    }
}

// Tranzaksiya o'chirishni tasdiqlash
function confirmDeleteTransaction(transactionId) {
    if (confirm('Tranzaksiyani o\'chirishni xohlaysizmi? Bu amalni qaytarib bo\'lmaydi.')) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/transaction/delete/${transactionId}`;
        document.body.appendChild(form);
        form.submit();
    }
}

// Mijoz o'chirishni tasdiqlash
function confirmDeleteClient(clientId) {
    if (confirm('Mijozni o\'chirishni xohlaysizmi? Bu amalni qaytarib bo\'lmaydi.')) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/clients/delete/${clientId}`;
        document.body.appendChild(form);
        form.submit();
    }
}

// Loading spinner
function showLoading(element) {
    // Element mavjudligini tekshirish
    if (!element) return;
    
    // Loading holatini saqlash
    element.setAttribute('data-loading', 'true');
    
    // Spinner yaratish
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    
    // Elementning asl matnini saqlash
    element.setAttribute('data-original-text', element.innerHTML);
    element.innerHTML = '';
    element.appendChild(spinner);
    element.disabled = true;
}

function hideLoading(element) {
    // Element mavjudligini tekshirish
    if (!element) return;
    
    // Loading holatini tozalash
    element.removeAttribute('data-loading');
    
    // Spinner ni o'chirish
    const spinner = element.querySelector('.spinner');
    if (spinner) {
        spinner.remove();
    }
    
    // Asl matnni qaytarish
    const originalText = element.getAttribute('data-original-text');
    if (originalText) {
        element.innerHTML = originalText;
        element.removeAttribute('data-original-text');
    }
    
    element.disabled = false;
}

// Tooltip funksiyasi
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = this.querySelector('.tooltiptext');
            if (tooltip) {
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltiptext');
            if (tooltip) {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            }
        });
    });
}

// Dropdown funksiyasi
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (toggle && content) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            });
            
            // Tashqi sohaga bosish orqali yopish
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    content.style.display = 'none';
                }
            });
        }
    });
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('border-red-500', 'dark:border-red-400');
            isValid = false;
        } else {
            field.classList.remove('border-red-500', 'dark:border-red-400');
        }
    });
    
    return isValid;
}

// Auto-save funksiyasi
function autoSave(form, interval = 30000) {
    let timeout;
    
    form.addEventListener('input', function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const formData = new FormData(form);
            // Bu yerda auto-save logikasi bo'lishi mumkin
            console.log('Auto-saving...', Object.fromEntries(formData));
        }, interval);
    });
}

// Notification funksiyasi
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} fixed top-4 right-4 z-50 max-w-sm`;
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
            </span>
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, duration);
}

// Debounce funksiyasi
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

// Throttle funksiyasi
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Modal oynalarni tashqi sohaga bosish orqali yopish
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});

// ESC tugmasi bilan modal yopish
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
});

// Sahifa yuklanganda ishga tushirish
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode ni ishga tushirish
    initTheme();
    
    // Theme toggle tugmasini bog'lash
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Tooltip va dropdown larni ishga tushirish
    initTooltips();
    initDropdowns();
    
    // Form validation
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            console.log('Form validation triggered');
            if (!validateForm(this)) {
                e.preventDefault();
                showNotification('Iltimos, barcha majburiy maydonlarni to\'ldiring', 'error');
            }
        });
    });
    
    // Auto-save
    const autoSaveForms = document.querySelectorAll('form[data-auto-save]');
    autoSaveForms.forEach(form => {
        autoSave(form);
    });
    
    // Loading animatsiyalari - removed to avoid conflicts with payment form
    
    // Mijoz yaratish formasi uchun maxsus handler
    const clientForm = document.getElementById('clientForm');
    if (clientForm) {
        clientForm.addEventListener('submit', function(e) {
            console.log('Form submission started');
            const saveBtn = document.getElementById('saveClientBtn');
            if (saveBtn) {
                showLoading(saveBtn);
                
                // Form submit bo'lganda loading to'xtatish
                setTimeout(() => {
                    hideLoading(saveBtn);
                }, 3000);
                
                // Agar form submit bo'lmagan bo'lsa, 10 soniyadan keyin loading to'xtatish
                setTimeout(() => {
                    if (saveBtn.hasAttribute('data-loading')) {
                        hideLoading(saveBtn);
                        showNotification('Jarayon vaqt o\'tib ketdi. Iltimos, qaytadan urinib ko\'ring', 'warning');
                    }
                }, 10000);
            }
        });
    }
    
    // To'lov formasi uchun maxsus handler - removed to avoid conflicts with inline script
});

// Responsive menu
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Search debounce
const debouncedSearch = debounce(function(query) {
    performSearch(query);
}, 500);

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Nusxa ko\'chirildi', 'success');
    }).catch(() => {
        showNotification('Nusxa ko\'chirishda xatolik', 'error');
    });
}

// Export data
function exportData(format = 'csv') {
    const table = document.querySelector('table');
    if (!table) return;
    
    let csv = '';
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        const rowData = Array.from(cells).map(cell => {
            return `"${cell.textContent.trim()}"`;
        });
        csv += rowData.join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data.${format}`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Ma\'lumotlar yuklab olindi', 'success');
}