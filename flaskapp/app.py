from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt 
from flask_cors import CORS, cross_origin 
from models import db, User, Skill, UserProfile, UserSkill
from functools import wraps
 
app = Flask(__name__)
 
app.config['SECRET_KEY'] = '...'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
  
bcrypt = Bcrypt(app) 
CORS(app, supports_credentials=True)
db.init_app(app)
  
with app.app_context():
    db.create_all()
 
@app.route("/")
def test():
    return "My App is running!"
 
@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
 
    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
 
    session["user_id"] = new_user.id
 
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })
 
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
  
    user = User.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
      
    session["user_id"] = user.id
  
    if email == "thoaittn@gmail.com":
        return jsonify({
            "id": user.id,
            "email": user.email,
            "isAdmin": True  # Thêm trường isAdmin vào response
        })
    else:
        return jsonify({
            "id": user.id,
            "email": user.email,
            "isAdmin": False  # Thêm trường isAdmin vào response
        })

@app.route('/usermanagement', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_list.append({
            'id': user.id,
            'email': user.email
        })
    return jsonify(user_list)



@app.route('/deleteuser/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404

@app.route('/skills', methods=['GET'])
def get_skills():
    skills = Skill.query.all()
    skill_list = []
    for skill in skills:
        skill_list.append({
            'id': skill.id,
            'skillname': skill.skillname
        })
    return jsonify(skill_list)

@app.route('/addskill', methods=['POST'])
def add_skill():
    data = request.get_json()
    if 'skillname' not in data:
        return jsonify({'message': 'Skill name is required'}), 400
    skill = Skill(skillname=data['skillname'])
    db.session.add(skill)
    db.session.commit()
    return jsonify({'message': 'Skill added successfully'}), 201

    
@app.route('/userprofile', methods=['GET', 'POST'])
def userprofile():
    if 'user_id' in session:
        user_id = session.get("user_id")

        # Kiểm tra xem UserProfile đã tồn tại chưa
        userprofile = UserProfile.query.filter_by(user_id=user_id).first()

        if request.method == 'POST':
            firstname = request.json.get('firstname')
            lastname = request.json.get('lastname')
            age = request.json.get('age')
            sex = request.json.get('sex')

            if userprofile:
                # Cập nhật thông tin
                userprofile.firstname = firstname
                userprofile.lastname = lastname
                userprofile.age = age
                userprofile.sex = sex
                db.session.commit()
                return jsonify({'success': True, 'message': 'Cập nhật thông tin thành công'})
            else:
                # Tạo UserProfile mới
                userprofile = UserProfile(user_id=user_id, firstname=firstname, lastname=lastname, age=age, sex=sex)
                db.session.add(userprofile)
                db.session.commit()
                return jsonify({'success': True, 'message': 'Thêm UserProfile thành công'})
        else:
            # Nếu UserProfile chưa tồn tại, tạo mới
            if not userprofile:
                firstname = request.json.get('firstname', 'N/A')
                lastname = request.json.get('lastname', 'N/A')
                age = request.json.get('age', 'N/A')
                sex = request.json.get('sex', 'N/A')
                userprofile = UserProfile(user_id=user_id, firstname=firstname, lastname=lastname, age=age, sex=sex)
                db.session.add(userprofile)
                db.session.commit()
            return jsonify({'success': True, 'userprofile': userprofile.to_dict()})
    else:
        return jsonify({'success': False, 'message': 'Vui lòng đăng nhập'})

@app.route('/useraddskill', methods=['POST'])
def add_skill():
    user_id = session.get("user_id")
    if user_id:
        skill_id = request.form.get('skill_id')
        user_skill = UserSkill(user_id=user_id, skillid=skill_id)
        db.session.add(user_skill)
        db.session.commit()
        return jsonify({'message': 'Thêm kỹ năng thành công'})
    else:
        return jsonify({'message': 'Bạn cần đăng nhập'})



if __name__ == "__main__":

    app.run(debug=True)
