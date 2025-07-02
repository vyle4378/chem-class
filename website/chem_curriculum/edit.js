import { chemistryCurriculum } from "./curriculum.js"

const params = new URLSearchParams(window.location.search)
const tag = params.get("tag")

const titleInput = document.getElementById("titleInput")
const contentInput = document.getElementById("contentInput")
const cancelButton = document.getElementById("cancelButton")
const saveButton = document.getElementById("saveButton")


function generateEditMaterials () {
    const item = chemistryCurriculum.items.find(item => item.tag === tag)
    if (item) {
        titleInput.value = item.title
        contentInput.value = item.content


        cancelButton.addEventListener("click", () => {
            window.location.href = `item.html?tag=${item.tag}`
        })

        saveButton.addEventListener("click", () => {
            window.location.href = `item.html?tag=${item.tag}`
        })
    } 
}

generateEditMaterials()
