#  to run: rename file to main.py and execute file

from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI()
curriculum = [
  {
    "id": "1",
    "title": "Untitled",
    "content": None
  },
  {
    "id": "atomic-structure",
    "title": "Atomic Structure",
    "content": "dakfjhl"
  }
]

class Item(BaseModel): # good for item creation
    id: str
    title: str | None = "Untitled"
    content: str | None = None

class UpdateItem(BaseModel): # good for updating stuff 
    id: str | None = None
    title: str | None = None
    content: str | None = None

# home
@app.get("/")
def main():
    return {"message": "Hello"}

# get all items in curriculum
@app.get("/curriculum")
def get_curriculum():
    return curriculum

# R: get a specific item based on tag
@app.get("/item/{id}")
def get_item(id: str):
    for item in curriculum:
        if item['id'] == id:
            return item
    return "Item not found."

# D: delete a specific item based on tag
@app.delete("/item/{id}")
def delete_item(id: str):
    # for index, item in enumerate(curriculum):
    #     if item['tag'] == tag:
    #         del curriculum[index]
    #         return curriculum
        
    for i in range(len(curriculum)):
        if curriculum[i]['id'] == id:
            del curriculum[i]
            return curriculum
    return "Item not found."

# C: add an item
@app.post("/item")
def create_item(item: Item):
    curriculum.append(item)
    # print(curriculum)
    return curriculum

# U1: edit the entire item
@app.put("/item/{id}")
def edit_entire_item(id: str, newItem: Item):
    for index, item in enumerate(curriculum):
        if item['id'] == id:
            curriculum[index] = newItem
            print(curriculum)
            return curriculum    
    return "Item not found."

# U2: edit certain parts in an item
@app.patch("/item/{id}")
def edit_item(id: str, updates: UpdateItem):
    for item in curriculum:
        if item['id'] == id:
            # "updates.dict(exclude_unset=True)" ensure that we keep those excluded UNset
            item.update(updates.dict(exclude_unset=True))
            print(curriculum)
            return curriculum    
    return "Item not found."

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=3000, reload=True)