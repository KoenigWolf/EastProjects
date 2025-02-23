/**
 * @fileoverview 特徴セクションコンポーネント
 * 会社の主要な特徴や提供価値を表示するセクションを生成
 */

import { features } from "../data/contents.js";

// 定数定義
const CONFIG = {
    SECTION_ID: 'feature',
    ANIMATION: {
        THRESHOLD: 0.2,
        DELAY_INCREMENT: 0.2
    }
};

const TEXTS = {
    HEADING: 'Features',
    SUBHEADING: '私たちが提供する価値'
};

/**
 * セクションヘッダーを生成
 * @returns {HTMLDivElement} ヘッダーコンテナ要素
 */
function createSectionHeader() {
    const container = document.createElement('div');
    container.classList.add('section-header', 'fade-in');

    const headline = document.createElement('h2');
    headline.classList.add('section-headline');
    headline.textContent = TEXTS.HEADING;

    const description = document.createElement('p');
    description.classList.add('section-description');
    description.textContent = TEXTS.SUBHEADING;

    container.append(headline, description);
    return container;
}

/**
 * 個別のフィーチャーカードを生成
 * @param {Object} feature フィーチャー情報
 * @param {string} feature.image アイコン画像のURL
 * @param {string} feature.title フィーチャーのタイトル
 * @param {string} feature.description フィーチャーの説明
 * @param {number} index アニメーションディレイ計算用のインデックス
 * @returns {HTMLDivElement} フィーチャーカード要素
 */
function createFeatureCard(feature, index) {
    const card = document.createElement('div');
    card.classList.add('feature', 'fade-in');
    card.style.animationDelay = `${index * CONFIG.ANIMATION.DELAY_INCREMENT}s`;

    // アイコン
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('feature-icon');
    
    const icon = document.createElement('img');
    icon.src = feature.image;
    icon.alt = '';  // 装飾的な画像
    icon.classList.add('feature-img');
    icon.loading = 'lazy';
    
    iconContainer.appendChild(icon);

    // コンテンツ
    const content = document.createElement('div');
    content.classList.add('feature-content');

    const title = document.createElement('h3');
    title.classList.add('feature-title');
    title.textContent = feature.title;

    const description = document.createElement('p');
    description.classList.add('feature-description');
    description.textContent = feature.description;

    content.append(title, description);
    card.append(iconContainer, content);

    return card;
}

/**
 * フィーチャーグリッドを生成
 * @param {Array} features フィーチャー情報の配列
 * @returns {HTMLDivElement} グリッドコンテナ要素
 */
function createFeatureGrid(features) {
    const grid = document.createElement('div');
    grid.classList.add('grid', 'grid-col-3', 'feature-grid');

    const fragment = document.createDocumentFragment();
    features.forEach((feature, index) => {
        const card = createFeatureCard(feature, index);
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
            }
        }
    }, {
        threshold: CONFIG.ANIMATION.THRESHOLD
    });

    for (const element of section.querySelectorAll('.fade-in')) {
        observer.observe(element);
    }
}

/**
 * フィーチャーセクションを生成
 * @returns {HTMLElement} 完全に構成されたフィーチャーセクション
 * @throws {Error} 必要なフィーチャーデータが欠落している場合
 */
export function createFeatureSection() {
    // データの存在確認
    if (!Array.isArray(features) || features.length === 0) {
        throw new Error('Feature data is missing or empty');
    }

    // セクションのベース作成
    const section = document.createElement('section');
    section.id = CONFIG.SECTION_ID;
    section.classList.add('section', 'section-secondary');

    // コンテナ作成
    const container = document.createElement('div');
    container.classList.add('container');

    // 各パーツを生成して組み立て
    const header = createSectionHeader();
    const grid = createFeatureGrid(features);
    
    container.append(header, grid);
    section.appendChild(container);

    // アニメーションを初期化
    initializeAnimations(section);

    return section;
}
