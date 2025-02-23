/**
 * @fileoverview Aboutセクションコンポーネント
 * 会社概要とビジョンを表示するセクションを生成
 */

import { aboutContent } from "../data/contents.js";

// 定数定義
const SECTION_ID = 'about';
const TEXTS = {
    HEADING: 'About',
    IMAGE_ALT: 'East Projectsについて'
};

/**
 * Aboutセクションの画像要素を生成
 * @returns {HTMLImageElement} 設定済みの画像要素
 */
function createAboutImage() {
    const image = document.createElement('img');
    image.src = aboutContent.image;
    image.alt = TEXTS.IMAGE_ALT;
    image.setAttribute('loading', 'lazy');
    image.setAttribute('data-animate', 'fade-in');
    return image;
}

/**
 * Aboutセクションのテキストコンテンツを生成
 * @returns {HTMLParagraphElement} 設定済みの段落要素
 */
function createAboutText() {
    const paragraph = document.createElement('p');
    paragraph.textContent = aboutContent.text;
    paragraph.setAttribute('data-animate', 'fade-in');
    return paragraph;
}

/**
 * Aboutセクションのコンテンツコンテナを生成
 * @param {HTMLImageElement} image - About画像要素
 * @param {HTMLParagraphElement} text - Aboutテキスト要素
 * @returns {HTMLDivElement} コンテンツを含むコンテナ要素
 */
function createAboutContent(image, text) {
    const container = document.createElement('div');
    container.classList.add('about-content');
    container.append(image, text);
    return container;
}

/**
 * Aboutセクションを生成
 * @returns {HTMLElement} 完全に構成されたAboutセクション
 * @throws {Error} 必要なコンテンツが欠落している場合
 */
export function createAboutSection() {
    // コンテンツの存在確認
    if (!aboutContent?.image || !aboutContent?.text) {
        throw new Error('Required about content is missing');
    }

    // セクションのベース作成
    const section = document.createElement('section');
    section.id = SECTION_ID;
    section.classList.add('section');
    
    // 見出し作成
    const heading = document.createElement('h2');
    heading.textContent = TEXTS.HEADING;
    heading.setAttribute('data-animate', 'fade-in');
    
    // コンテンツ要素の生成と組み立て
    const image = createAboutImage();
    const text = createAboutText();
    const content = createAboutContent(image, text);

    section.append(heading, content);
    
    return section;
}
