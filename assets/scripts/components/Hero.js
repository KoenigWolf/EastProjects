import { heroVideo, siteTitle } from "../data/contents.js";

export function createHeroSection() {
    const section = document.createElement("section");
    section.id = "hero";
    section.classList.add("hero");
    section.setAttribute("role", "banner");

    // ビデオ背景
    const video = document.createElement("video");
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.preload = "auto";
    video.classList.add("hero-video");

    const source = document.createElement("source");
    source.src = heroVideo.src;
    source.type = "video/mp4";
    video.appendChild(source);

    // オーバーレイ
    const overlay = document.createElement("div");
    overlay.classList.add("hero-overlay");

    // メインテキスト
    const textContainer = document.createElement("div");
    textContainer.classList.add("hero-content");

    const title = document.createElement("h1");
    title.classList.add("hero-title", "fade-in-up");
    title.textContent = siteTitle;

    const subtitle = document.createElement("p");
    subtitle.classList.add("hero-subtitle", "fade-in-up");
    subtitle.textContent = "Create the Future with Technology";

    // スクロールダウンボタン
    const scrollButton = document.createElement("button");
    scrollButton.classList.add("hero-scroll", "fade-in");
    scrollButton.setAttribute("aria-label", "コンテンツへスクロール");
    scrollButton.innerHTML = `
        <span class="hero-scroll-text">Scroll</span>
        <span class="hero-scroll-arrow"></span>
    `;

    // スクロールボタンのクリックイベント
    scrollButton.addEventListener("click", () => {
        document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
    });

    textContainer.appendChild(title);
    textContainer.appendChild(subtitle);
    textContainer.appendChild(scrollButton);

    section.appendChild(video);
    section.appendChild(overlay);
    section.appendChild(textContainer);

    // アニメーションクラスを遅延して追加
    setTimeout(() => {
        title.classList.add("is-visible");
        setTimeout(() => {
            subtitle.classList.add("is-visible");
            setTimeout(() => {
                scrollButton.classList.add("is-visible");
            }, 400);
        }, 200);
    }, 500);

    return section;
}
