//=============================
// 📌 Footer セクションを生成
// - コピーライト情報を追加
//=============================
export function createFooter() {
    const footer = document.createElement("footer");
    footer.classList.add("footer");

    const copyright = document.createElement("p");
    copyright.textContent = "© East Projects";
    footer.appendChild(copyright);

    return footer;
}
