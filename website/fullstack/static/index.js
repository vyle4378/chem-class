import { chemistryCurriculum } from "/static/curriculum.js";

const curriculumContainer = document.getElementById("curriculumContainer");

function createCurriculum() {
    for (const item of chemistryCurriculum.items) {
        const itemElement = document.createElement("div");
        itemElement.classList.add("curriculum-item");
        itemElement.innerHTML= `<button>${item.title}</button>`
        
        itemElement.addEventListener("click", () => {
            window.location.href = `/item/${item.tag}`
        });
        curriculumContainer.appendChild(itemElement);
    }
}

createCurriculum();