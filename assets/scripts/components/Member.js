/**
 * @fileoverview メンバーセクションコンポーネント
 * チームメンバーの紹介カードを表示するセクションを生成
 */

import { members } from "../data/contents.js";

// 定数定義
const CONFIG = {
    SECTION_ID: 'member',
    ANIMATION: {
        THRESHOLD: 0.2,
        DELAY_INCREMENT: 0.15
    }
};

const TEXTS = {
    HEADING: 'Members'
};

/**
 * メンバーカードを生成
 * @param {Object} member メンバー情報
 * @param {string} member.image プロフィール画像のURL
 * @param {string} member.name メンバー名
 * @param {string} member.role 役職
 * @param {string} member.description 自己紹介
 * @param {number} index アニメーションディレイ計算用のインデックス
 * @returns {HTMLDivElement} メンバーカード要素
 */
function createMemberCard(member, index) {
    const card = document.createElement('div');
    card.classList.add('member-card', 'fade-in');
    card.style.animationDelay = `${index * CONFIG.ANIMATION.DELAY_INCREMENT}s`;
    card.setAttribute('data-animate', 'fade-in');

    // プロフィール画像
    const image = document.createElement('img');
    image.src = member.image;
    image.alt = member.name;
    image.loading = 'lazy';

    // 名前
    const name = document.createElement('h3');
    name.textContent = member.name;

    // 役職
    const role = document.createElement('p');
    const roleText = document.createElement('strong');
    roleText.textContent = member.role;
    role.appendChild(roleText);

    // 自己紹介
    const description = document.createElement('p');
    description.textContent = member.description;

    card.append(image, name, role, description);
    return card;
}

/**
 * メンバーグリッドを生成
 * @param {Array} members メンバー情報の配列
 * @returns {HTMLDivElement} グリッドコンテナ要素
 */
function createMemberGrid(members) {
    const grid = document.createElement('div');
    grid.classList.add('member-grid');

    const fragment = document.createDocumentFragment();
    members.forEach((member, index) => {
        const card = createMemberCard(member, index);
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
    return grid;
}

/**
 * アニメーションの初期化
 * @param {HTMLElement} section セクション要素
 */
function initializeAnimations(section) {
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        }
    }, {
        threshold: CONFIG.ANIMATION.THRESHOLD
    });

    for (const element of section.querySelectorAll('[data-animate]')) {
        observer.observe(element);
    }
}

/**
 * メンバーセクションを生成
 * @returns {HTMLElement} 完全に構成されたメンバーセクション
 * @throws {Error} 必要なメンバーデータが欠落している場合
 */
export function createMemberSection() {
    // データの存在確認
    if (!Array.isArray(members) || members.length === 0) {
        throw new Error('Member data is missing or empty');
    }

    // セクションのベース作成
    const section = document.createElement('section');
    section.id = CONFIG.SECTION_ID;
    section.classList.add('section');

    // 見出し作成
    const heading = document.createElement('h2');
    heading.textContent = TEXTS.HEADING;
    heading.setAttribute('data-animate', 'fade-in');

    // メンバーグリッドを生成
    const grid = createMemberGrid(members);

    // 要素を組み立て
    section.append(heading, grid);

    // アニメーションを初期化
    initializeAnimations(section);

    return section;
}
