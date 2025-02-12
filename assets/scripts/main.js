import { createHeader } from "./components/Header.js";
import { createHeroSection } from "./components/Hero.js";
import { createAboutSection } from "./components/About.js";
import { createFeatureSection } from "./components/Feature.js";
import { createMemberSection } from "./components/Member.js";
import { createFooter } from "./components/Footer.js";
import { siteConfig } from "./data/config.js";

//=============================
// 📌 デバッグログ（関数が正しく読み込まれているか確認）
//=============================
console.log("createHeader:", typeof createHeader);
console.log("createHeroSection:", typeof createHeroSection);
console.log("createAboutSection:", typeof createAboutSection);
console.log("createFeatureSection:", typeof createFeatureSection);
console.log("createMemberSection:", typeof createMemberSection);
console.log("createFooter:", typeof createFooter);

//=============================
// 📌 メタデータを動的に設定
//=============================
function setMetaData() {
    document.title = siteConfig.title;
    const metaTags = {
        description: siteConfig.description,
        keywords: siteConfig.keywords.join(", "),
        "theme-color": siteConfig.themeColor,
        "og:title": siteConfig.title,
        "og:description": siteConfig.description,
        "og:image": siteConfig.ogImage,
        "og:url": siteConfig.siteUrl,
    };

    for (const [name, content] of Object.entries(metaTags)) {
        const meta = document.querySelector(`meta[name='${name}']`);
        if (meta) meta.content = content;
    }
}

//=============================
// 📌 ページを初期化 & 構築
//=============================
function initializePage() {
    console.log("📌 ページ初期化開始");
    setMetaData();

    document.body.prepend(createHeader());
    document.body.appendChild(createHeroSection());
    document.body.appendChild(createAboutSection());
    document.body.appendChild(createFeatureSection());
    document.body.appendChild(createMemberSection());
    document.body.appendChild(createFooter());

    console.log("✅ ページ構築完了");
}

//=============================
// 📌 `DOMContentLoaded` イベントで実行
//=============================
document.addEventListener("DOMContentLoaded", initializePage);
