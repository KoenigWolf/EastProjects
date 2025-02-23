/**
 * @fileoverview ヒーローセクションコンポーネント
 * メインビジュアルとタイトル、スクロールボタンを含むヒーローエリアを生成
 */

import { heroVideo, siteTitle } from "../data/contents.js";

// 定数定義
const ANIMATION_DELAYS = {
    TITLE: 500,
    SUBTITLE: 200,
    SCROLL_BUTTON: 400
};

const TEXTS = {
    SUBTITLE: "Create the Future with Technology",
    SCROLL_LABEL: "コンテンツへスクロール",
    SCROLL_TEXT: "Scroll"
};

/**
 * ビデオ背景要素を生成
 * @returns {HTMLVideoElement} 設定済みのビデオ要素
 */
function createBackgroundVideo() {
    const video = document.createElement("video");
    Object.assign(video, {
        autoplay: true,
        loop: true,
        muted: true,
        preload: "auto"
    });
    video.classList.add("hero-video");

    const source = document.createElement("source");
    source.src = heroVideo.src;
    source.type = "video/mp4";
    video.appendChild(source);

    return video;
}

/**
 * ヒーローコンテンツ（タイトル、サブタイトル）を生成
 * @returns {HTMLDivElement} コンテンツコンテナ要素
 */
function createHeroContent() {
    const container = document.createElement("div");
    container.classList.add("hero-content");

    const title = document.createElement("h1");
    title.classList.add("hero-title", "fade-in-up");
    title.textContent = siteTitle;

    const subtitle = document.createElement("p");
    subtitle.classList.add("hero-subtitle", "fade-in-up");
    subtitle.textContent = TEXTS.SUBTITLE;

    container.appendChild(title);
    container.appendChild(subtitle);

    return { container, title, subtitle };
}

/**
 * スクロールボタンを生成
 * @returns {HTMLButtonElement} 設定済みのスクロールボタン要素
 */
function createScrollButton() {
    const button = document.createElement("button");
    button.classList.add("hero-scroll", "fade-in");
    button.setAttribute("aria-label", TEXTS.SCROLL_LABEL);
    button.innerHTML = `
        <span class="hero-scroll-text">${TEXTS.SCROLL_TEXT}</span>
        <span class="hero-scroll-arrow"></span>
    `;

    button.addEventListener("click", () => {
        const aboutSection = document.querySelector("#about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    });

    return button;
}

/**
 * アニメーション要素を順次表示
 * @param {Object} elements アニメーション対象の要素群
 * @param {HTMLElement} elements.title タイトル要素
 * @param {HTMLElement} elements.subtitle サブタイトル要素
 * @param {HTMLElement} elements.scrollButton スクロールボタン要素
 */
function initializeAnimations({ title, subtitle, scrollButton }) {
    const animate = (element, delay) => {
        return new Promise(resolve => {
            setTimeout(() => {
                element.classList.add("is-visible");
                resolve();
            }, delay);
        });
    };

    // アニメーションを順次実行
    animate(title, ANIMATION_DELAYS.TITLE)
        .then(() => animate(subtitle, ANIMATION_DELAYS.SUBTITLE))
        .then(() => animate(scrollButton, ANIMATION_DELAYS.SCROLL_BUTTON))
        .catch(error => {
            console.error('Animation sequence failed:', error);
        });
}

/**
 * ヒーローセクションを生成
 * @returns {HTMLElement} 完全に構成されたヒーローセクション
 */
export function createHeroSection() {
    // セクションのベース作成
    const section = document.createElement("section");
    section.id = "hero";
    section.classList.add("hero");
    section.setAttribute("role", "banner");

    // 各パーツを生成
    const video = createBackgroundVideo();
    const overlay = document.createElement("div");
    overlay.classList.add("hero-overlay");
    const { container: content, title, subtitle } = createHeroContent();
    const scrollButton = createScrollButton();

    // 要素を組み立て
    content.appendChild(scrollButton);
    section.append(video, overlay, content);

    // アニメーションを初期化
    initializeAnimations({ title, subtitle, scrollButton });

    return section;
}
