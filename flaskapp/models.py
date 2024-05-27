from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
 
db = SQLAlchemy()
 
def get_uuid():
    return uuid4().hex
 
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)

class UserProfile(db.Model):
    __tablename__ = "user_profiles"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    user_id = db.Column(db.String(11), db.ForeignKey("users.id"), nullable=False)
    firstname = db.Column(db.String(150), nullable=False)
    lastname = db.Column(db.String(150), nullable=False)
    age = db.Column(db.String(3), nullable=False)
    sex = db.Column(db.String(3), nullable=False)
class Skill(db.Model):
    __tablename__ = "skills"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    skillname = db.Column(db.String(150), nullable=False)
class UserSkill(db.Model):
    __tablename__ = "user_skills"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    user_id = db.Column(db.String(11), db.ForeignKey("users.id"), nullable=False)
    skillid = db.Column(db.String(150), db.ForeignKey("skills.id"), nullable=False)
class connection(db.Model):
    __tablename__ = "connections"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    user1_id = db.Column(db.String(11), db.ForeignKey("users.id"), nullable=False)
    user2_id = db.Column(db.String(11), db.ForeignKey("users.id"), nullable=False)
    connection_id = db.Column(db.String(11), db.ForeignKey("users.id"), nullable=False)
    status = db.Column(db.String(150), nullable=False)