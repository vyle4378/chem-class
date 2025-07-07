import json
from main import SessionLocal, Item

with open("upload.json", "r") as f:
    data = json.load(f)

db = SessionLocal()
titles = db.query(Item.title).all()
titles = [t[0] for t in titles]
print("list of titles:", titles)

for item in data:
    if item["title"] in titles:
        continue
    else:
        db.add(Item(title=item["title"], content=item["content"]))

# # Convert each dictionary to an Item object
# items = [Item(**item_data) for item_data in data]
# # Add all
# db.add_all(items)

db.commit()
db.close()
db.close()