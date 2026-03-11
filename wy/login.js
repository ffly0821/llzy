// 1. 登录/注册标签切换
const tabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 移除所有标签active类
        tabs.forEach(t => t.classList.remove('active'));
        // 给当前标签加active
        tab.classList.add('active');
        // 切换表单显示
        if (tab.dataset.tab === 'login') {
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        } else {
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        }
    });
});

// 2. 表单验证工具函数
function showError(tipId) {
    document.getElementById(tipId).style.display = 'block';
}

function hideError(tipId) {
    document.getElementById(tipId).style.display = 'none';
}

// 验证手机号
function validatePhone(phone) {
    const reg = /^1[3-9]\d{9}$/;
    return reg.test(phone);
}

// 验证密码（字母+数字，6-16位）
function validatePwd(pwd) {
    const reg = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
    return reg.test(pwd);
}

// 3. 登录按钮点击事件
const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', () => {
    const account = document.getElementById('login-account').value.trim();
    const pwd = document.getElementById('login-pwd').value.trim();
    let isOk = true;

    // 验证账号
    if (!account) {
        showError('login-account-error');
        isOk = false;
    } else {
        hideError('login-account-error');
    }

    // 验证密码
    if (pwd.length < 6) {
        showError('login-pwd-error');
        isOk = false;
    } else {
        hideError('login-pwd-error');
    }

    // 验证通过，提交请求（这里仅做演示，实际对接后端）
    if (isOk) {
        alert('登录成功！即将跳转到首页');
        // 实际项目中：window.location.href = 'index.html';
    }
});

// 4. 注册按钮点击事件
const regBtn = document.getElementById('reg-btn');
regBtn.addEventListener('click', () => {
    const phone = document.getElementById('reg-phone').value.trim();
    const code = document.getElementById('reg-code').value.trim();
    const pwd = document.getElementById('reg-pwd').value.trim();
    const repwd = document.getElementById('reg-repwd').value.trim();
    let isOk = true;

    // 验证手机号
    if (!validatePhone(phone)) {
        showError('reg-phone-error');
        isOk = false;
    } else {
        hideError('reg-phone-error');
    }

    // 验证验证码
    if (!/^\d{6}$/.test(code)) {
        showError('reg-code-error');
        isOk = false;
    } else {
        hideError('reg-code-error');
    }

    // 验证密码
    if (!validatePwd(pwd)) {
        showError('reg-pwd-error');
        isOk = false;
    } else {
        hideError('reg-pwd-error');
    }

    // 验证确认密码
    if (repwd !== pwd) {
        showError('reg-repwd-error');
        isOk = false;
    } else {
        hideError('reg-repwd-error');
    }

    // 验证通过，提交注册（演示）
    if (isOk) {
        alert('注册成功！即将跳转到登录页');
        // 注册成功后切回登录标签
        tabs[0].click();
    }
});

// 5. 获取验证码按钮（演示倒计时）
const getCodeBtn = document.getElementById('get-code-btn');
getCodeBtn.addEventListener('click', () => {
    const phone = document.getElementById('reg-phone').value.trim();
    if (!validatePhone(phone)) {
        showError('reg-phone-error');
        return;
    }

    // 倒计时逻辑
    let count = 60;
    getCodeBtn.disabled = true;
    getCodeBtn.style.backgroundColor = '#ccc';
    getCodeBtn.innerText = `重新获取(${count}s)`;

    const timer = setInterval(() => {
        count--;
        getCodeBtn.innerText = `重新获取(${count}s)`;
        if (count === 0) {
            clearInterval(timer);
            getCodeBtn.disabled = false;
            getCodeBtn.style.backgroundColor = '#f97316';
            getCodeBtn.innerText = '获取验证码';
        }
    }, 1000);

    alert('验证码已发送，请注意查收');
});

// 6. 输入框聚焦时隐藏错误提示
const allInputs = document.querySelectorAll('.form-input');
allInputs.forEach(input => {
    input.addEventListener('focus', () => {
        const errorId = input.id + '-error';
        hideError(errorId);
    });
});