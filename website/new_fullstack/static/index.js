const newButton = document.getElementById('newButton')

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
        const response = await fetch('/titles')
        const titles = await response.json()
        // console.log(titles)

        for (const title of titles) {
            const itemElement = document.createElement("div");
            itemElement.classList.add("curriculum-item");

            // itemElement.innerHTML= "<a href= ">${title}</button>`
            // curriculumContainer.append(itemElement)

            // itemElement.addEventListener("click", () => {
            //     window.location.href = `/item-page/${title}`

            itemElement.innerHTML= `<button>${title}</button>`
            curriculumContainer.append(itemElement)

            itemElement.addEventListener("click", () => {
                window.location.href = `/item-page/${title}`
            })
        }
    } catch(e) {
        console.error("Error:", e)
    }
}

getTitles()
