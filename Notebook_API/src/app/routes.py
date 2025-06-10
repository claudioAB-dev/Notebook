from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token
from .models import Usuarios, db

main_blueprint = Blueprint('main', __name__)

@main_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user_name = data.get('nombre_usuario', None)
    password = data.get('password', None)

    if not user_name or not password:
        return jsonify({"msg": "Faltan el nombre de usuario o la contraseña"}), 400

    user = Usuarios.query.filter_by(nombre_usuario=user_name).first()


    if not user or not user.check_password(password):
        return jsonify({"msg": "Usuario o contraseña incorrectos"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)

@main_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user_name = data.get('nombre_usuario')
    email = data.get('email')
    password = data.get('password')


    new_user = Usuarios(
        nombre_usuario=user_name,
        email=email
    )
    
    new_user.set_password(password)
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "Usuario creado exitosamente"}), 201