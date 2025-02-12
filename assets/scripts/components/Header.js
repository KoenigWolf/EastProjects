import { navLinks } from "../data/contents.js";

export function createHeader() {
    const header = document.createElement("header");
    header.classList.add("header");

    // ロゴ部分
    const logo = document.createElement("div");
    logo.classList.add("header-logo");
    logo.innerHTML = `<a href="#" aria-label="East Projects ホーム">
                        <img src="./assets/images/EASTProjects_mark-2.svg" alt="East Projects ロゴ" width="50" height="50">
                     </a>`;
    header.appendChild(logo);

    // ナビゲーション
    const nav = document.createElement("nav");
    nav.classList.add("header-nav");
    
    // モバイルメニューボタン
    const menuButton = document.createElement("button");
    menuButton.classList.add("header-menu-button");
    menuButton.setAttribute("aria-label", "メニュー");
    menuButton.innerHTML = `
        <span class="header-menu-line"></span>
        <span class="header-menu-line"></span>
        <span class="header-menu-line"></span>
    `;
    
    const ul = document.createElement("ul");
    ul.classList.add("header-nav-list");

    const fragment = document.createDocumentFragment();
    for (const link of navLinks) {
        const li = document.createElement("li");
        li.classList.add("header-nav-item");
        li.innerHTML = `<a href="${link.href}">${link.text}</a>`;
        fragment.appendChild(li);
    }
    ul.appendChild(fragment);

    nav.appendChild(menuButton);
    nav.appendChild(ul);
    header.appendChild(nav);

    // モバイルメニューの動作
    menuButton.addEventListener("click", () => {
        header.classList.toggle("is-menu-open");
        menuButton.classList.toggle("is-active");
        
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", !isExpanded);
    });

    return header;
}
