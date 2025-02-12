## **📌 README.md（East Projects）**  

---

# **East Projects - クリエイティブ動画制作 & 企画提案**  

🚀 **East Projects** は、映像制作・編集、企画提案を行うクリエイティブエージェンシーです。  
本プロジェクトは、**軽量で高速な静的サイト** として設計され、**Next.js なしでシンプルに管理** できます。  

---

## **📁 ディレクトリ構成**  

```
.
├── assets
│   ├── images               # 画像（メンバー写真・アイコン・背景画像など）
│   │   ├── 001-settings.webp
│   │   ├── 002-layout.webp
│   │   ├── image_Aki.webp
│   │   ├── image_Mary.webp
│   │   ├── headerVideo_resized.mp4
│   │   └── favicon.ico
│   ├── scripts              # JavaScriptファイル
│   │   ├── components       # 各コンポーネント
│   │   │   ├── About.js
│   │   │   ├── Feature.js
│   │   │   ├── Footer.js
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   └── Member.js
│   │   ├── data             # サイト設定データ
│   │   │   ├── config.js    # サイト情報（タイトル・OGPなど）
│   │   │   ├── contents.js  # コンテンツデータ（テキスト・画像リンクなど）
│   │   └── main.js          # メインスクリプト（サイトの初期化）
│   ├── style.css            # サイトのスタイル
└── index.html               # メインHTML
```

---

## **📜 機能一覧**  

✅ **トップページ (`index.html`)**  
✅ **ヘッダー・ナビゲーション**  
✅ **ヒーローセクション（動画背景）**  
✅ **About・Feature・Member・Contact セクション**  
✅ **レスポンシブデザイン（PC・タブレット・スマホ対応）**  
✅ **軽量な `.webp` 画像と最適化された `.mp4` 動画**  
✅ **スムーズなスクロールアニメーション**  

---

## **🚀 セットアップ & 実行方法**  

### **🔹 1️⃣ 必要なツール**
- **Mac / Windows / Linux**
- **Live Server**（VS Code の拡張機能）
- **もしくは Python HTTP サーバー**  

---

### **🔹 2️⃣ ローカルで実行する**  
#### **方法①: VS Code の Live Server を使用**  
1. **VS Code の拡張機能「Live Server」をインストール**  
2. `index.html` を開き、右クリック → **"Open with Live Server"**  
3. `http://127.0.0.1:5500/` にアクセス  

#### **方法②: Python HTTP サーバーを使用**  
**Python 3 がインストールされている場合、以下のコマンドを実行**  

```sh
# プロジェクトフォルダに移動
cd /path/to/EastProjects

# Python3 で HTTP サーバー起動
python3 -m http.server 8000

# ブラウザでアクセス
http://localhost:8000/
```

---

## **🎨 デザイン・レイアウト**  

- **CSS 変数を活用し、テーマカラーやフォントを統一**  
- **`grid` や `flexbox` を使用したレスポンシブレイアウト**  
- **シンプル & モダンな UI 設計**  

---

## **📌 カスタマイズ方法**  

### **🔹 1️⃣ サイトタイトル & メタ情報変更**
`assets/scripts/data/config.js` で以下を変更できます。  

```js
export const siteConfig = {
  title: "East Projects",
  description: "East Projectsは、動画制作・編集、企画提案を行うクリエイティブエージェンシーです。",
  keywords: ["動画制作", "映像編集", "クリエイティブ", "East Projects"],
  themeColor: "#ffffff"
};
```

---

### **🔹 2️⃣ 画像・動画の変更**
- 画像 → `assets/images/` に格納  
- 背景動画 → `headerVideo_resized.mp4` を差し替え  

---

### **🔹 3️⃣ ナビゲーションリンクの編集**
`assets/scripts/data/contents.js` の `navLinks` を編集  

```js
export const navLinks = [
  { id: "about", text: "About" },
  { id: "feature", text: "Feature" },
  { id: "member", text: "Member" },
  { id: "contact", text: "Contact" }
];
```

---

### **🔹 4️⃣ メンバー情報の追加**
`assets/scripts/data/contents.js` の `members` を編集  

```js
export const members = [
  {
    image: "./assets/images/image_Aki.webp",
    name: "Higashi Akimitsu",
    role: "映像クリエイター",
    description: "Cinematic映像を中心に活動。"
  },
  {
    image: "./assets/images/image_Mary.webp",
    name: "Mary",
    role: "撮影 & 編集",
    description: "クライアントの要望に応じた映像制作。"
  }
];
```

---

## **📌 デプロイ方法（無料で公開）**  

### **🔹 1️⃣ GitHub Pages**
1. **GitHub にリポジトリを作成**
2. プロジェクトフォルダで以下を実行  
```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```
3. **GitHub の「Settings」→「Pages」から `main` を選択 → 公開完了！**  

---

### **🔹 2️⃣ Netlify / Vercel**
1. **Netlify / Vercel にログイン**
2. **プロジェクトをアップロード**
3. **デプロイボタンをクリック → 公開完了！**  

---

## **✅ まとめ**
✔ **シンプル & 軽量な静的サイト**  
✔ **HTML + CSS + JavaScript で管理しやすい**  
✔ **最適化された `.webp` 画像 & `.mp4` 動画で高速表示**  
✔ **GitHub Pages / Netlify / Vercel で簡単に公開**  

