import { features } from "../data/contents.js";

export function createFeatureSection() {
    const section = document.createElement("section");
    section.id = "feature";
    section.classList.add("section", "section-secondary");

    const container = document.createElement("div");
    container.classList.add("container");

    // セクションヘッダー
    const headerContainer = document.createElement("div");
    headerContainer.classList.add("section-header", "fade-in");
    
    const headline = document.createElement("h2");
    headline.classList.add("section-headline");
    headline.textContent = "Features";
    
    const description = document.createElement("p");
    description.classList.add("section-description");
    description.textContent = "私たちが提供する価値";
    
    headerContainer.appendChild(headline);
    headerContainer.appendChild(description);
    container.appendChild(headerContainer);

    // フィーチャーグリッド
    const featureGrid = document.createElement("div");
    featureGrid.classList.add("grid", "grid-col-3", "feature-grid");

    const fragment = document.createDocumentFragment();
    let index = 0;
    for (const feature of features) {
        const div = document.createElement("div");
        div.classList.add("feature", "fade-in");
        div.style.animationDelay = `${index * 0.2}s`;
        
        const icon = document.createElement("div");
        icon.classList.add("feature-icon");
        icon.innerHTML = `<img src="${feature.image}" alt="" class="feature-img">`;
        
        const content = document.createElement("div");
        content.classList.add("feature-content");
        
        const title = document.createElement("h3");
        title.classList.add("feature-title");
        title.textContent = feature.title;
        
        const description = document.createElement("p");
        description.classList.add("feature-description");
        description.textContent = feature.description;
        
        content.appendChild(title);
        content.appendChild(description);
        
        div.appendChild(icon);
        div.appendChild(content);
        fragment.appendChild(div);
        index++;
    }

    featureGrid.appendChild(fragment);
    container.appendChild(featureGrid);
    section.appendChild(container);

    // Intersection Observerの設定
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        }
    }, {
        threshold: 0.2
    });

    // アニメーション要素を監視
    const fadeElements = section.querySelectorAll(".fade-in");
    for (const el of fadeElements) {
        observer.observe(el);
    }

    return section;
}
