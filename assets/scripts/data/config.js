export const siteConfig = {
    // 基本設定
    title: "East Projects",
    description: "East Projectsは、動画制作・編集、企画提案を行うクリエイティブエージェンシーです。",
    keywords: ["East Projects", "動画制作", "映像制作", "企画提案", "クリエイティブ"],
    
    // デザイン設定
    themeColor: "#ffffff",
    favicon: "./assets/images/001-settings.webp",
    
    // OGP設定
    siteUrl: "https://east-projects.com", // 本番環境のURLに変更する必要があります
    ogImage: "./assets/images/image01-1.webp",
    ogType: "website",
    
    // メディアファイル
    heroVideo: "./assets/images/headerVideo_optimized.mp4"
};

// ページのメタデータを動的にセット
document.addEventListener("DOMContentLoaded", () => {
    // 基本メタデータ
    document.title = siteConfig.title;
    document.getElementById("favicon").href = siteConfig.favicon;

    // メタタグの更新
    const metaTags = {
        "description": siteConfig.description,
        "keywords": siteConfig.keywords.join(", "),
        "theme-color": siteConfig.themeColor,
        "og:title": siteConfig.title,
        "og:description": siteConfig.description,
        "og:image": siteConfig.ogImage,
        "og:url": siteConfig.siteUrl,
        "og:type": siteConfig.ogType
    };

    // メタタグを更新
    for (const [name, content] of Object.entries(metaTags)) {
        const selector = name.startsWith("og:") 
            ? `meta[property="${name}"]` 
            : `meta[name="${name}"]`;
        const element = document.querySelector(selector);
        if (element) {
            element.setAttribute("content", content);
        }
    }
});
