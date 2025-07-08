const newButton = document.getElementById('newButton')
const itemList = document.getElementById('itemList')

newButton.addEventListener("click", async () => {
    try {
        const response = await fetch('/new-item', {method: "POST"})
        const item = await response.json()

        window.location.href = `/edit-page/${item.title}`
    } catch(e) {
        console.error("Error:", e)
    }
})


async function getTitles() {
    try {
        const response = await fetch('/items')
        const items = await response.json()

        for (const item of items) {
            const itemElement = document.createElement("div");
            itemElement.classList.add("item");
            itemElement.dataset.id = item.id

            const linkElement = document.createElement("a")
            linkElement.href = `/item-page/${item.title}`
            linkElement.textContent = item.title

            itemElement.append(linkElement)
            itemList.append(itemElement)
        }
    } catch(e) {
        console.error("Error:", e)
    }
}

getTitles()


// todo: make it so that only the drag icon allows you to drag, not anything else?
new Sortable(itemList, {
    animation: 150,
    onEnd: async () => {
        const reorderedItems = [...itemList.children].map((el, index) => ({
            id: Number(el.dataset.id),
            position: index
        }))

        try {
            await fetch('/reorder-items', {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(reorderedItems)
            })
            
        } catch(e) {
            console.error("Error:", e)
        }

    }
})