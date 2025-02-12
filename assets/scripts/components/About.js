import { aboutContent } from "../data/contents.js";

export function createAboutSection() {
  const section = document.createElement("section");
  section.id = "about";
  section.classList.add("section");

  section.innerHTML = `
    <h2>About</h2>
    <div class="about-content">
      <img src="${aboutContent.image}" alt="East Projectsについて">
      <p>${aboutContent.text}</p>
    </div>
  `;

  return section;
}
