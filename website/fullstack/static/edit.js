const pathParts = window.location.pathname.split('/');
const title = pathParts[pathParts.length - 1].replace("%20", " ");

const titleInput = document.getElementById("titleInput")
const contentInput = document.getElementById("contentInput")
const cancelButton = document.getElementById("cancelButton")
const saveButton = document.getElementById("saveButton")

async function generateEditMaterials () {
    try {
        const response = await fetch(`/item/${title}`)
        const item = await response.json()

        titleInput.value = item.title
        console.log(item.content)
        contentInput.innerHTML = item.content

        cancelButton.addEventListener("click", () => {
            window.location.href = `/item-page/${title}`
        })
        
        saveButton.addEventListener("click", async () => {
            try {
                const response = await fetch(`/edit/${title}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: item.id,
                        new_title: titleInput.value,
                        new_content: contentInput.innerHTML,
                    })
                })
                
                window.location.href = `/item-page/${titleInput.value}`
                // or... if i refresh(item)
                // const updatedItem = await response.json()
                // window.location.href = `/item-page/${updatedItem.title}`

            } catch(error) {
                console.error("Error:", error)
            }
        })

    } catch(e) {
        console.error("Error:", e)
    }
}
    

generateEditMaterials()
