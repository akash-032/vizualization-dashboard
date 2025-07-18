from flask import Flask, render_template, jsonify, request
from models import db, EnergyInsights
import random
from collections import Counter

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def index():
    return render_template('index.html')
@app.route('/api/data', methods=['GET'])
def get_data():
    data = EnergyInsights.query.all()
    results = [{
        'intensity': item.intensity,
        'likelihood': item.likelihood,
        'relevance': item.relevance,
        'endYear': item.end_year,
        'country': item.country,
        'topic': item.topic,
        'region': item.region,
        'pestle': item.pestle,
        'source': item.source,
        'sector': item.sector
    } for item in data]
    return jsonify(results)
@app.route('/test-fetch', methods=['GET'])
def test_fetch():
    data = get_data()
    return get_data() 
def validate_request_param(query_param):
    if query_param =='':
        return None
    return query_param



if __name__ == '__main__':
    app.run(debug=True)
