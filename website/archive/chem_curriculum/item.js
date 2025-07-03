import { chemistryCurriculum } from "./curriculum.js"

const params = new URLSearchParams(window.location.search)
const tag = params.get("tag")

const itemTitle = document.getElementById('itemTitle')
const contentContainer = document.getElementById('contentContainer')
const editButton = document.getElementById('editButton')

function generateItemMaterials () {
    const item = chemistryCurriculum.items.find(item => item.tag === tag)
    if (item) {
        itemTitle.innerHTML = item.title
        editButton.addEventListener("click", () => {
            window.location.href = `edit.html?tag=${item.tag}`
        })
        contentContainer.innerHTML = `<p>${item.content}</p>`
    }   
}

generateItemMaterials()