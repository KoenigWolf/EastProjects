/**
 * @fileoverview ヘッダーコンポーネント
 * サイトのナビゲーションとロゴを含むヘッダー領域を生成
 */

import { navLinks } from "../data/contents.js";

// 定数定義
const CONFIG = {
    LOGO: {
        IMAGE: './assets/images/EASTProjects_mark-2.svg',
        WIDTH: 50,
        HEIGHT: 50
    }
};

const TEXTS = {
    LOGO_ALT: 'East Projects ロゴ',
    HOME_LABEL: 'East Projects ホーム',
    MENU_LABEL: 'メニュー',
    MENU_EXPANDED: 'メニューを閉じる',
    MENU_COLLAPSED: 'メニューを開く'
};

/**
 * ロゴ要素を生成
 * @returns {HTMLDivElement} ロゴコンテナ要素
 */
function createLogo() {
    const container = document.createElement('div');
    container.classList.add('header-logo');

    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('aria-label', TEXTS.HOME_LABEL);

    const img = document.createElement('img');
    img.src = CONFIG.LOGO.IMAGE;
    img.alt = TEXTS.LOGO_ALT;
    img.width = CONFIG.LOGO.WIDTH;
    img.height = CONFIG.LOGO.HEIGHT;

    link.appendChild(img);
    container.appendChild(link);
    return container;
}

/**
 * メニューボタンを生成
 * @returns {HTMLButtonElement} メニューボタン要素
 */
function createMenuButton() {
    const button = document.createElement('button');
    button.classList.add('header-menu-button');
    button.setAttribute('aria-label', TEXTS.MENU_LABEL);
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'header-nav-list');

    // ハンバーガーメニューのライン
    for (let i = 0; i < 3; i++) {
        const line = document.createElement('span');
        line.classList.add('header-menu-line');
        button.appendChild(line);
    }

    return button;
}

/**
 * ナビゲーションリンクを生成
 * @param {Object} link リンク情報
 * @param {string} link.href リンク先のURL
 * @param {string} link.text リンクのテキスト
 * @returns {HTMLLIElement} ナビゲーション項目要素
 */
function createNavItem(link, index) {
    const li = document.createElement('li');
    li.classList.add('header-nav-item');
    li.style.setProperty('--item-index', index);

    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;

    li.appendChild(a);
    return li;
}

/**
 * ナビゲーションメニューを生成
 * @param {HTMLButtonElement} menuButton メニューボタン要素
 * @returns {HTMLElement} ナビゲーション要素
 */
function createNavigation(menuButton) {
    const nav = document.createElement('nav');
    nav.classList.add('header-nav');
    nav.setAttribute('role', 'navigation');

    const ul = document.createElement('ul');
    ul.id = 'header-nav-list';
    ul.classList.add('header-nav-list');

    const fragment = document.createDocumentFragment();
    navLinks.forEach((link, index) => {
        fragment.appendChild(createNavItem(link, index));
    });
    ul.appendChild(fragment);

    nav.append(menuButton, ul);
    return nav;
}

/**
 * メニューの状態を切り替え
 * @param {HTMLElement} header ヘッダー要素
 * @param {HTMLButtonElement} button メニューボタン要素
 * @param {boolean} isOpen メニューを開くかどうか
 */
function toggleMenu(header, button, isOpen) {
    header.classList.toggle('is-menu-open', isOpen);
    button.classList.toggle('is-active', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? TEXTS.MENU_EXPANDED : TEXTS.MENU_COLLAPSED);

    // メニューが開いているときは背景スクロールを無効化
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

/**
 * ヘッダーを生成
 * @returns {HTMLElement} 完全に構成されたヘッダー要素
 * @throws {Error} 必要なナビゲーションデータが欠落している場合
 */
export function createHeader() {
    // データの存在確認
    if (!Array.isArray(navLinks) || navLinks.length === 0) {
        throw new Error('Navigation data is missing or empty');
    }

    const header = document.createElement('header');
    header.classList.add('header');
    header.setAttribute('role', 'banner');

    // ロゴとナビゲーションを生成
    const logo = createLogo();
    const menuButton = createMenuButton();
    const nav = createNavigation(menuButton);

    // メニューボタンのイベントハンドラー
    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        toggleMenu(header, menuButton, !isExpanded);
    });

    header.append(logo, nav);

    return header;
}
