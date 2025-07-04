import { chemistryCurriculum } from "/static/curriculum.js"

console.log("hi")
const pathParts = window.location.pathname.split('/');
const tag = pathParts[pathParts.length - 1];

const titleInput = document.getElementById("titleInput")
const contentInput = document.getElementById("contentInput")
const cancelButton = document.getElementById("cancelButton")
const saveButton = document.getElementById("saveButton")

function makeTag(title) {
    const tag = String(title).toLowerCase()
    return tag.replaceAll(" ", "-")
}


function generateEditMaterials () {
    const item = chemistryCurriculum.items.find(item => item.tag === tag)
    if (item) {
        titleInput.value = item.title
        contentInput.value = item.content

        cancelButton.addEventListener("click", () => {
            const data = response.json()
            window.location.href = `/item/${item.tag}`
        })

        saveButton.addEventListener("click", () => {
            window.location.href = `/item/${item.tag}`
        })
    } 
}

generateEditMaterials()
