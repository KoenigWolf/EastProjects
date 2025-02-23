// スクロールプログレス
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    const progressElement = document.querySelector('.scroll-progress');

    if (!progressBar || !progressElement) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = `${scrolled}%`;
        progressElement.setAttribute('aria-valuenow', Math.round(scrolled));
    });
}

// スクロールアニメーション
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        }
    }, observerOptions);

    for (const element of document.querySelectorAll('[data-animate]')) {
        observer.observe(element);
    }
}

// ナビゲーション管理
function initNavigation() {
    const header = document.querySelector('.header');
    const menuButton = document.querySelector('.header-menu-button');
    const navItems = document.querySelectorAll('.header-nav-item');
    let lastScroll = 0;

    // ハンバーガーメニュー
    menuButton?.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isExpanded));
        header.classList.toggle('is-menu-open');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // スクロールでヘッダーの表示/非表示
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('is-hidden');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('is-hidden')) {
            header.classList.add('is-hidden');
        } else if (currentScroll < lastScroll && header.classList.contains('is-hidden')) {
            header.classList.remove('is-hidden');
        }

        lastScroll = currentScroll;
    });

    // アクティブなセクションの監視
    const observerOptions = {
        threshold: 0.4
    };

    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                for (const item of navItems) {
                    const href = item.querySelector('a')?.getAttribute('href');
                    item.classList.toggle('is-active', href === `#${id}`);
                }
            }
        }
    }, observerOptions);

    for (const section of document.querySelectorAll('section[id]')) {
        observer.observe(section);
    }
}

// フォームバリデーション
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const validateField = (field) => {
        const errorElement = document.getElementById(`${field.id}-error`);
        let isValid = true;
        let errorMessage = '';

        // 必須チェック
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = '必須項目です';
        } 
        // メールアドレスの形式チェック
        else if (field.type === 'email' && field.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value)) {
                isValid = false;
                errorMessage = '正しいメールアドレスを入力してください';
            }
        }

        field.classList.toggle('error', !isValid);
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }

        return isValid;
    };

    // リアルタイムバリデーション
    for (const input of form.querySelectorAll('.form-input')) {
        for (const eventType of ['blur', 'input']) {
            input.addEventListener(eventType, () => validateField(input));
        }
    }

    // フォーム送信
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 全フィールドのバリデーション
        const formInputs = Array.from(form.querySelectorAll('.form-input'));
        const isValid = formInputs.every(field => validateField(field));

        if (!isValid) return;

        const submitButton = form.querySelector('button[type="submit"]');
        const feedbackElement = form.querySelector('.form-feedback');
        
        if (!submitButton || !feedbackElement) return;

        // 送信中の状態表示
        submitButton.disabled = true;
        submitButton.textContent = '送信中...';

        try {
            // ここにAPI送信処理を実装
            await new Promise(resolve => setTimeout(resolve, 1000)); // デモ用のディレイ

            // 送信成功
            feedbackElement.className = 'form-feedback success';
            feedbackElement.textContent = 'メッセージを送信しました。担当者より連絡させていただきます。';
            form.reset();

        } catch (error) {
            // エラー処理
            feedbackElement.className = 'form-feedback error';
            feedbackElement.textContent = 'エラーが発生しました。時間をおいて再度お試しください。';
            
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = '送信する';
            
            // フィードバックメッセージを一定時間後に消す
            setTimeout(() => {
                feedbackElement.textContent = '';
                feedbackElement.className = 'form-feedback';
            }, 5000);
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    for (const anchor of document.querySelectorAll('a[href^="#"]')) {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            // モバイルメニューを閉じる
            const header = document.querySelector('.header');
            const menuButton = document.querySelector('.header-menu-button');
            if (header?.classList.contains('is-menu-open')) {
                header.classList.remove('is-menu-open');
                menuButton?.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }

            // スムーズスクロール
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initScrollAnimations();
    initNavigation();
    initContactForm();
    initSmoothScroll();
});

// パフォーマンス最適化
window.addEventListener('load', () => {
    // 画像の遅延読み込み
    if ('loading' in HTMLImageElement.prototype) {
        for (const img of document.querySelectorAll('img[loading="lazy"]')) {
            img.loading = 'lazy';
        }
    }

    // Intersection Observerのポリフィル
    if (!('IntersectionObserver' in window)) {
        for (const el of document.querySelectorAll('[data-animate]')) {
            el.classList.add('is-visible');
        }
    }
});
