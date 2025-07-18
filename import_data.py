import json
from flask import Flask
from models import db, EnergyInsights

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

def load_json_to_db():
    with open('jsondata.json', 'r', encoding='utf-8') as f:

        data = json.load(f)

    with app.app_context():
        db.create_all()

        db.create_all()
        for item in data:
            record = EnergyInsights(**item)  

            db.session.add(record)  



        db.session.commit()  
        print("Data imported successfully.")  


if __name__ == '__main__':
    load_json_to_db()
