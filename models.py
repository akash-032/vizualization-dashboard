from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class EnergyInsights(db.Model):
    __tablename__ = 'EnergyInsights'

    id = db.Column(db.Integer, primary_key=True)
    end_year = db.Column(db.Integer, nullable=True)
    intensity = db.Column(db.Integer, nullable=True)
    sector = db.Column(db.String(255), nullable=True)
    topic = db.Column(db.String(255), nullable=True)
    insight = db.Column(db.String(255), nullable=True)
    url = db.Column(db.String(512), nullable=True)
    region = db.Column(db.String(255), nullable=True)
    start_year = db.Column(db.String(255), nullable=True)
    impact = db.Column(db.String(255), nullable=True)
    added = db.Column(db.String(255), nullable=True)
    published = db.Column(db.String(255), nullable=True)
    country = db.Column(db.String(255), nullable=True)
    relevance = db.Column(db.Integer, nullable=True)
    pestle = db.Column(db.String(255), nullable=True)
    source = db.Column(db.String(255), nullable=True)
    title = db.Column(db.String(512), nullable=True)
    likelihood = db.Column(db.Integer, nullable=True)

