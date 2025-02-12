import { members } from "../data/contents.js";

//=============================
// 📌 Member セクションを生成
// - `members` データを動的に適用
//=============================
export function createMemberSection() {
    const section = document.createElement("section");
    section.id = "member";
    section.classList.add("section");

    const headline = document.createElement("h2");
    headline.textContent = "Members";
    section.appendChild(headline);

    const memberGrid = document.createElement("div");
    memberGrid.classList.add("member-grid");

    // 🔹 `forEach` の代わりに `for...of` を使用（Biome 対応）
    const fragment = document.createDocumentFragment();
    for (const member of members) {
        const div = document.createElement("div");
        div.classList.add("member-card");
        div.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p><strong>${member.role}</strong></p>
            <p>${member.description}</p>
        `;
        fragment.appendChild(div);
    }
    memberGrid.appendChild(fragment);
    section.appendChild(memberGrid);

    return section;
}
