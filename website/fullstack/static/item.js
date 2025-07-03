import { chemistryCurriculum } from "/static/curriculum.js"

const pathParts = window.location.pathname.split('/');
const tag = pathParts[pathParts.length - 1];

const itemTitle = document.getElementById('itemTitle')
const contentContainer = document.getElementById('contentContainer')
const editButton = document.getElementById('editButton')

function generateItemMaterials () {
    const item = chemistryCurriculum.items.find(item => item.tag === tag)
    if (item) {
        itemTitle.innerHTML = item.title
        editButton.addEventListener("click", () => {
            window.location.href = `/edit/${item.tag}`
        })
        contentContainer.innerHTML = `<p>${item.content}</p>`
    }   
}

generateItemMaterials()

