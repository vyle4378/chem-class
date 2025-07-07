const pathParts = window.location.pathname.split('/');
const title = pathParts[pathParts.length - 1].replace("%20", " ");

const itemTitle = document.getElementById('itemTitle')
const contentContainer = document.getElementById('contentContainer')
const editButton = document.getElementById('editButton')
const deleteButton = document.getElementById('deleteButton')

async function generateItemMaterials () {
    try {
        const response = await fetch(`/item/${title}`)
        const item = await response.json()

        itemTitle.innerHTML = item.title
        contentContainer.innerHTML = `<p>${item.content}</p>`

        editButton.addEventListener("click", () => {
            window.location.href = `/edit-page/${title}`
        })

        deleteButton.addEventListener("click", async () => {
            const response = await fetch(`/delete-item/${title}`, {method: 'DELETE'})
            
            window.location.href = '/'
            const rem_item = await response.json()
            console.log(rem_item)
        })
    } catch(error) {
        console.error("Error:", error)
    }
}

generateItemMaterials()

