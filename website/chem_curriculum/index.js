import { chemistryCurriculum } from "./curriculum.js";

const curriculumContainer = document.getElementById("curriculumContainer");

async function goToItem() {
    try {
        const res = await fetch('/item')

    } catch (e) {
        console.error("Failed to go to URL:", e)
    }
}

function createCurriculum() {
    for (const item of chemistryCurriculum.items) {
        const itemElement = document.createElement("div");
        itemElement.classList.add("curriculum-item");
        itemElement.innerHTML= `<button>${item.title}</button>`
        
        itemElement.addEventListener("click", () => {
            window.location.href = `item.html?tag=${item.tag}`
        });

        curriculumContainer.appendChild(itemElement);
    }
}


createCurriculum();