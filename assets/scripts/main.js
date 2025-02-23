/**
 * @fileoverview メインアプリケーションエントリーポイント
 * 各機能の初期化とライフサイクル管理を担当
 */

// 定数定義
const CONFIG = {
    SCROLL: {
        ANIMATION_THRESHOLD: 0.1,
        ANIMATION_ROOT_MARGIN: '0px 0px -50px 0px',
        SECTION_THRESHOLD: 0.4
    },
    VALIDATION: {
        EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    FEEDBACK: {
        DISPLAY_DURATION: 5000,
        SUCCESS_MESSAGE: 'メッセージを送信しました。担当者より連絡させていただきます。',
        ERROR_MESSAGE: 'エラーが発生しました。時間をおいて再度お試しください。'
    }
};

/**
 * スクロールプログレスバーの初期化と管理
 * @returns {void}
 */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    const progressElement = document.querySelector('.scroll-progress');

    if (!progressBar || !progressElement) return;

    const updateProgress = () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = `${scrolled}%`;
        progressElement.setAttribute('aria-valuenow', Math.round(scrolled));
    };

    // スロットリング適用
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * スクロールアニメーションの初期化
 * Intersection Observerを使用して要素の可視性を監視
 * @returns {void}
 */
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
        for (const el of document.querySelectorAll('[data-animate]')) {
            el.classList.add('is-visible');
        }
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        }
    }, {
        threshold: CONFIG.SCROLL.ANIMATION_THRESHOLD,
        rootMargin: CONFIG.SCROLL.ANIMATION_ROOT_MARGIN
    });

    for (const element of document.querySelectorAll('[data-animate]')) {
        observer.observe(element);
    }
}

/**
 * ナビゲーション機能の初期化と管理
 * ヘッダーの表示/非表示とアクティブセクションの追跡を担当
 * @returns {void}
 */
function initNavigation() {
    const header = document.querySelector('.header');
    const menuButton = document.querySelector('.header-menu-button');
    const navItems = document.querySelectorAll('.header-nav-item');
    let lastScroll = 0;

    // メニューの開閉状態管理
    const toggleMenu = (isOpen) => {
        menuButton?.setAttribute('aria-expanded', String(isOpen));
        header?.classList.toggle('is-menu-open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    // ハンバーガーメニューの制御
    menuButton?.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        toggleMenu(!isExpanded);
    });

    // スクロールヘッダーの制御
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 0) {
                    header?.classList.remove('is-hidden');
                } else {
                    if (currentScroll > lastScroll && !header?.classList.contains('is-hidden')) {
                        header?.classList.add('is-hidden');
                    } else if (currentScroll < lastScroll && header?.classList.contains('is-hidden')) {
                        header?.classList.remove('is-hidden');
                    }
                }

                lastScroll = currentScroll;
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    // アクティブセクションの監視
    const sectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                for (const item of navItems) {
                    const href = item.querySelector('a')?.getAttribute('href');
                    item.classList.toggle('is-active', href === `#${id}`);
                }
            }
        }
    }, {
        threshold: CONFIG.SCROLL.SECTION_THRESHOLD
    });

    for (const section of document.querySelectorAll('section[id]')) {
        sectionObserver.observe(section);
    }
}

/**
 * フォームフィールドのバリデーション
 * @param {HTMLInputElement} field - バリデーション対象のフィールド
 * @returns {boolean} バリデーション結果
 */
function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = '必須項目です';
    } else if (field.type === 'email' && field.value.trim()) {
        if (!CONFIG.VALIDATION.EMAIL_PATTERN.test(field.value)) {
            isValid = false;
            errorMessage = '正しいメールアドレスを入力してください';
        }
    }

    field.classList.toggle('error', !isValid);
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }

    return isValid;
}

/**
 * コンタクトフォームの初期化と管理
 * フォームのバリデーションと送信処理を担当
 * @returns {void}
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    // リアルタイムバリデーション
    for (const input of form.querySelectorAll('.form-input')) {
        for (const eventType of ['blur', 'input']) {
            input.addEventListener(eventType, () => validateField(input));
        }
    }

    // フォーム送信処理
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formInputs = Array.from(form.querySelectorAll('.form-input'));
        const isValid = formInputs.every(validateField);
        if (!isValid) return;

        const submitButton = form.querySelector('button[type="submit"]');
        const feedbackElement = form.querySelector('.form-feedback');
        if (!submitButton || !feedbackElement) return;

        submitButton.disabled = true;
        submitButton.textContent = '送信中...';

        try {
            // TODO: 実際のAPI送信処理を実装
            await new Promise(resolve => setTimeout(resolve, 1000));

            feedbackElement.className = 'form-feedback success';
            feedbackElement.textContent = CONFIG.FEEDBACK.SUCCESS_MESSAGE;
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            feedbackElement.className = 'form-feedback error';
            feedbackElement.textContent = CONFIG.FEEDBACK.ERROR_MESSAGE;
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = '送信する';

            setTimeout(() => {
                feedbackElement.textContent = '';
                feedbackElement.className = 'form-feedback';
            }, CONFIG.FEEDBACK.DISPLAY_DURATION);
        }
    });
}

/**
 * スムーズスクロール機能の初期化
 * アンカーリンクのクリックハンドリングとスクロール制御を担当
 * @returns {void}
 */
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

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

/**
 * 画像の遅延読み込み最適化
 * @returns {void}
 */
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        for (const img of document.querySelectorAll('img[loading="lazy"]')) {
            img.loading = 'lazy';
        }
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initScrollAnimations();
    initNavigation();
    initContactForm();
    initSmoothScroll();
});

// 画面読み込み完了後の最適化処理
window.addEventListener('load', initLazyLoading);
