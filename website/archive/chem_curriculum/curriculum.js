export const chemistryCurriculum = {
    items: [ 
        {title: "Atomic Structure",
        tag: "atomic-structure",
        content: "atomic structure is the study of the structure of atoms and the properties of the elements that make up the periodic table.",
        },

        {title: "Periodic Table",
        tag: "periodic-table",
        content: "the periodic table is a table that lists all the elements in the periodic table and their properties.",
        },

        {title: "Chemical Bonding",
        tag: "chemical-bonding",
        content: "chemical bonding is the study of the forces that hold atoms together to form molecules and compounds.",
        },
    ]
}


export function updateAllChanges(curriculum, oldTag, newTitle, newContent) {
    const item = curriculum.items.find(item => item.tag === oldTag)
    item.title = newTitle
    item.content = newContent
    item.tag = makeTag(newTitle)
    return curriculum
}

function makeTag(title) {
    const tag = String(title).toLowerCase()
    return tag.replaceAll(" ", "-")
}
