/**
 * @fileoverview フッターコンポーネント
 * フッター領域とコピーライト情報を生成
 */

// 定数定義
const CONFIG = {
    CURRENT_YEAR: new Date().getFullYear(),
    COMPANY_NAME: 'East Projects'
};

const TEXTS = {
    COPYRIGHT: `© ${CONFIG.CURRENT_YEAR} ${CONFIG.COMPANY_NAME}`,
    BACK_TO_TOP: 'トップへ戻る'
};

/**
 * コピーライトセクションを生成
 * @returns {HTMLParagraphElement} コピーライト要素
 */
function createCopyright() {
    const copyright = document.createElement('p');
    copyright.classList.add('footer-copyright');
    copyright.textContent = TEXTS.COPYRIGHT;
    return copyright;
}

/**
 * トップへ戻るボタンを生成
 * @returns {HTMLButtonElement} スクロールボタン要素
 */
function createBackToTopButton() {
    const button = document.createElement('button');
    button.classList.add('footer-back-to-top');
    button.setAttribute('aria-label', TEXTS.BACK_TO_TOP);
    button.innerHTML = `
        <span class="arrow-up"></span>
        <span class="visually-hidden">${TEXTS.BACK_TO_TOP}</span>
    `;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    return button;
}

/**
 * フッターを生成
 * @returns {HTMLElement} 完全に構成されたフッター要素
 */
export function createFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.setAttribute('role', 'contentinfo');

    const container = document.createElement('div');
    container.classList.add('footer-container');

    // コピーライトとトップへ戻るボタンを追加
    const copyright = createCopyright();
    const backToTop = createBackToTopButton();

    container.append(copyright, backToTop);
    footer.appendChild(container);

    return footer;
}
