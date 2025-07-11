from fastapi import FastAPI, Request, Body
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates 
import uvicorn
from pydantic import BaseModel
from fastapi import Depends
from typing import List

app = FastAPI()
# app.mount(path, app, name of this path which can be anything | None)
# you need to do this when you have non-HTML folders. You can do this for as many folders you have
app.mount("/static", StaticFiles(directory="static"), name="static")
# you should only have 1 templates folder, so you will always do this once
templates = Jinja2Templates(directory="templates")

# --------------

from sqlalchemy import Column, Integer, String, Float, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session

engine = create_engine("sqlite:///./curriculum.db")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Item(Base):
    __tablename__ = "chemCurriculum"
    id = Column(Integer, primary_key=True)
    position = Column(Float, index=True)
    title = Column(String, index=True, unique=True)
    content = Column(String, index=True, nullable=True)


class ItemUpdate(BaseModel):
    id: int
    new_title: str
    new_content: str | None = "New Content"

class PositionUpdate(BaseModel):
    id: int
    position: float

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --------------

@app.get("/", response_class=HTMLResponse) # "/" the path user sees
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request}) # "index.html" the path that dev sees

@app.post("/new-item")
async def create_item(db: Session = Depends(get_db)):
    item = Item(title = "New Item", content = "New Content")
    db.add(item)
    db.commit()
    db.refresh(item)
    return(item)

# index 

@app.get("/items")
async def get_all_items(db: Session = Depends(get_db)):
    items = db.query(Item).order_by(Item.position).all() # get all items sorted by position
    return items

@app.put("/reorder-items")
async def reorder_items(updates: List[PositionUpdate] = Body(...), db: Session = Depends(get_db)):
    for update in updates:
        item = db.query(Item).filter(Item.id == update.id).first()
        if item == None:
            return {"message": "no item with this index"}
        
        item.position = update.position
    
    db.commit()
        
    items = db.query(Item).order_by(Item.position).all()
    return items


# item

@app.get("/item-page/{title}", response_class=HTMLResponse) # renders item.html
async def to_item_page(request: Request):
    return templates.TemplateResponse('item.html', {"request": request})

@app.get("/item/{title}")
async def get_item_by_title(title: str, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.title == title).first()
    return item

# edit

@app.get("/edit-page/{title}")
async def to_edit_page(request: Request):
    return templates.TemplateResponse('edit.html', {"request": request})

@app.put("/edit/{title}")
async def edit_item(title: str, update: ItemUpdate, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.title == title).first()
    if item == None:
        return {"message": "no item with this index"}
    item.id = update.id 
    item.title = update.new_title
    item.content = update.new_content
    db.commit()
    db.refresh(item)
    return item

# 

@app.delete("/delete-item/{title}")
async def delete_item(title: str, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.title == title).first()
    if item == None:
        return {"message": "no item with this index"}
    db.delete(item)
    db.commit()
    db.refresh(item)

    rem_items = db.query(Item).all()
    # print(rem_items) # does not turn it into a dict. you have to do it manually 
    return {"message": "Item deleted",
            "remaining items": rem_items} # handled here though


@app.get("/atom-diagram.png")
async def get_image():
    return "<img src=\"/atom-diagram.png\" alt=\"Atom diagram\" style=\"width: 100%; max-width: 100px;\">\n"

# --------------

# @app.get("/titles")
# async def get_titles(db: Session = Depends(get_db)):
#     titles = db.query(Item.title).order_by(Item.position).all() # returns [('Lesson 1',), ('Lesson 2',)]
#     titles = [t[0] for t in titles] # gets the first part of the tuple
#     return titles



if __name__ == "__main__":
    uvicorn.run("main:app", reload=True) 

