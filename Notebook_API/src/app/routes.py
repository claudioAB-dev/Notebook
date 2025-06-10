from flask import Blueprint, request, jsonify
import  os
from sqlalchemy.exc import IntegrityError
from .models import db, Usuarios, Libretas, Paginas
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps
from datetime import datetime

main_blueprint = Blueprint('main', __name__)




@main_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user_name = data.get('nombre_usuario', None)
    password = data.get('password', None)

    user = Usuarios.query.filter_by(nombre_usuario=user_name).first()

    if not user or not check_password_hash(user.passwors, password):
        return jsonify({"msg": "Bad username or password"}), 401
    
    acces_token = create_access_token(identity=user.id)
    return jsonify(acces_token=acces_token)


