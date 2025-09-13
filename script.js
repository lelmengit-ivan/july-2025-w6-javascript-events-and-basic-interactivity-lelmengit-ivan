// DOM Elements
const registrationForm = document.getElementById('registrationForm');
const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const themeButtons = document.querySelectorAll('.theme-btn');
const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');
const ticketCount = document.getElementById('ticketCount');
const countdownElement = document.getElementById('countdown');

// Feature 1: Form Validation
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (name.value.trim() === '') {
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }
    
    // Validate password
    const passwordError = document.getElementById('passwordError');
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(passwordInput.value)) {
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }
    
    // Validate role
    const role = document.getElementById('role');
    const roleError = document.getElementById('roleError');
    if (role.value === '') {
        roleError.style.display = 'block';
        isValid = false;
    } else {
        roleError.style.display = 'none';
    }
    
    // If form is valid, show success message
    if (isValid) {
        document.getElementById('successMessage').style.display = 'block';
        // In a real application, you would submit the form data to a server here
    }
});

// Feature 2: Password Visibility Toggle
togglePasswordBtn.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = 'Show';
    }
});

// Feature 3: Theme Switcher
themeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const theme = this.getAttribute('data-theme');
        document.body.className = ''; // Reset classes
        
        if (theme !== 'default') {
            document.body.classList.add(`theme-${theme}`);
        }
        
        // Update header gradient based on theme
        const header = document.querySelector('header');
        if (theme === 'dark') {
            header.style.background = 'linear-gradient(135deg, #2c3e50, #34495e)';
        } else if (theme === 'light') {
            header.style.background = 'linear-gradient(135deg, #3498db, #2ecc71)';
        } else {
            header.style.background = 'linear-gradient(135deg, #6e8efb, #a777e3)';
        }
        
        // Save theme preference to localStorage
        localStorage.setItem('theme', theme);
    });
});

// Load saved theme from localStorage
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = '';
        if (savedTheme !== 'default') {
            document.body.classList.add(`theme-${savedTheme}`);
        }
        
        // Update header gradient based on saved theme
        const header = document.querySelector('header');
        if (savedTheme === 'dark') {
            header.style.background = 'linear-gradient(135deg, #2c3e50, #34495e)';
        } else if (savedTheme === 'light') {
            header.style.background = 'linear-gradient(135deg, #3498db, #2ecc71)';
        } else {
            header.style.background = 'linear-gradient(135deg, #6e8efb, #a777e3)';
        }
    }
});

// Feature 4: Ticket Counter
let ticketQuantity = 1;

decreaseBtn.addEventListener('click', function() {
    if (ticketQuantity > 1) {
        ticketQuantity--;
        ticketCount.textContent = ticketQuantity;
    }
});

increaseBtn.addEventListener('click', function() {
    if (ticketQuantity < 10) {
        ticketQuantity++;
        ticketCount.textContent = ticketQuantity;
    }
});

// Feature 5: Conference Countdown Timer
function updateCountdown() {
    // Set conference date to 10 days from now
    const conferenceDate = new Date();
    conferenceDate.setDate(conferenceDate.getDate() + 10);
    
    const now = new Date();
    const timeRemaining = conferenceDate - now;
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    countdownElement.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

// Initial call and set interval to update every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Additional interactive feature: Input focus effects
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Additional feature: Save form data to localStorage on input change
const formInputs = document.querySelectorAll('#registrationForm input, #registrationForm select, #registrationForm textarea');
formInputs.forEach(input => {
    input.addEventListener('input', function() {
        const formData = {};
        formInputs.forEach(item => {
            if (item.type !== 'password') {
                formData[item.id] = item.value;
            }
        });
        localStorage.setItem('formData', JSON.stringify(formData));
    });
});

// Load saved form data from localStorage
document.addEventListener('DOMContentLoaded', function() {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
        const formData = JSON.parse(savedFormData);
        for (const id in formData) {
            if (document.getElementById(id)) {
                document.getElementById(id).value = formData[id];
            }
        }
    }
});