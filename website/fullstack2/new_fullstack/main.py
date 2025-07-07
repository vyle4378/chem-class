from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates 
import uvicorn

from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


app = FastAPI()
# app.mount(path, app, name of this path which can be anything | None)
# you need to do this when you have non-HTML folders. You can do this for as many folders you have
app.mount("/static", StaticFiles(directory="static"), name="static")
# you should only have 1 templates folder, so you will always do this once
templates = Jinja2Templates(directory="templates")

engine = create_engine("sqlite:///./chemCurriculum.db")


@app.get("/", response_class=HTMLResponse) # "/" the path user sees
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request}) # "index.html" the path that dev sees

@app.get("/item/{tag}", response_class=HTMLResponse)
def to_content_page(request: Request):
    return templates.TemplateResponse('item.html', {"request": request})

@app.get("/edit/{tag}", response_class=HTMLResponse)
def to_edit_page(request: Request):
    return templates.TemplateResponse('edit.html', {"request": request})



if __name__ == "__main__":
    uvicorn.run("main:app", reload=True) 

