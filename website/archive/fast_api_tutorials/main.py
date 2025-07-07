#  to run: rename file to main.py and execute file

from fastapi import FastAPI
import uvicorn

from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_engine("sqlite:///./test.db") # creates a database in the folder you're in
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# kind of like BaseModel, but for database/table creation
class Item(Base):
    __tablename__ = "chemCurriculum"
    id = Column(Integer, primary_key=True)
    title = Column(String, index=True, unique=True)
    content = Column(String, index=True)

# create all tables that inhereted the Base class
Base.metadata.create_all(bind=engine)
# User.__table__.create(bind=engine) creates the specified table, in this case, the User table 

app = FastAPI()

@app.post("/item")
def create_item(title: str, content: str):
    db = SessionLocal()
    db_item = Item(title=title, content=content)
    db.add(db_item) # add
    db.commit() # sumbit change
    db.refresh(db_item) #fields like id (if auto-generated) may still be None in memory. To get the updated values (like the new id, timestamps, etc.) from the database
    return db_item

@app.get("/items")
def get_all_items():
    db = SessionLocal()
    items = db.query(Item).all() # get all
    return items

@app.get("/item/{item_id}")
def get_an_item(item_id: int):
    db = SessionLocal()
    item = db.query(Item).filter(Item.id == item_id).first() # get item with specific id
    return item

@app.put("/item/{item_id}")
def update_item(item_id: int, title: str, content: str):
    db = SessionLocal()
    item = db.query(Item).filter(Item.id == item_id).first()
    if item == None:
        return {"message": "no item with this index"}
    item.title = title # change stuff
    item.content = content
    db.commit()
    return item

@app.delete("/item/{item_id}")
def delete_item(item_id: int):
    db = SessionLocal()
    item = db.query(Item).filter(Item.id == item_id).first()
    if item == None:
        return {"message": "no item with this index"}
    db.delete(item) # delete
    db.commit()
    return {"message": "Item deleted successfully"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=3000, reload=True)