// 📌 共通パス設定
const PATHS = {
  images: "./assets/images",
};

// 📌 ナビゲーションメニュー
export const navLinks = [
  { href: "#about", text: "About" },
  { href: "#feature", text: "Feature" },
  { href: "#member", text: "Member" },
  { href: "#contact", text: "Contact" },
];

// 📌 About セクション
export const aboutContent = {
  image: `${PATHS.images}/image01-1.webp`, // 既存の画像を使用
  text: "常に好奇心を持ち、人との繋がりをCreateし、創造する。",
};

// 📌 Feature セクション
export const features = [
  {
    image: `${PATHS.images}/001-settings.webp`,
    title: "動画制作・編集",
    description: "映像でリアルに伝え、施設の魅力を最大限に伝えます。",
  },
  {
    image: `${PATHS.images}/002-layout.webp`,
    title: "企画提案",
    description: "ヒアリングを基に、最適な映像制作を企画・提案します。",
  },
  {
    image: `${PATHS.images}/003-jigsaw.webp`,
    title: "動画作成",
    description: "事前ヒアリングを基に、最適な撮影プランを提案します。",
  },
  {
    image: `${PATHS.images}/004-product.webp`,
    title: "動画編集",
    description: "「伝わる映像」「クオリティの高さ」を重視し、映像を制作します。",
  },
];

// 📌 Member セクション
export const members = [
  {
    image: `${PATHS.images}/image_Aki.webp`,
    name: "Higashi Akimitsu",
    role: "映像クリエイター",
    description: "Cinematic映像を中心に活動。",
  },
  {
    image: `${PATHS.images}/image_Mary.webp`,
    name: "Mary",
    role: "撮影 & 編集",
    description: "クライアントの要望に応じた映像制作。",
  },
  {
    image: `${PATHS.images}/image_Kaede.webp`,
    name: "Kaede",
    role: "モデル / 企画",
    description: "モデルとしての活動と共に、企画面でもチームに貢献。",
  },
  {
    image: `${PATHS.images}/image_Taku.webp`,
    name: "Taku",
    role: "プロデューサー",
    description: "映像制作の企画から撮影・編集までトータルサポート。",
  },
];
