from flask import Blueprint, request, jsonify
import re, os
from sqlalchemy.exc import IntegrityError
from .models import db, Usuarios, Libretas, Paginas
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps
from datetime import datetime

main_blueprint = Blueprint('main', __name__)

#Crea un decorador para validar que el usuario x muestre las libretas y paginas que le pertenecen



@main_blueprint.route('/login', methods=['POST'])
def login():
    return jsonify({"message": "Login endpoint not implemented"}), 501

