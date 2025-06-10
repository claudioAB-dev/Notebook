import os
from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager

# Importa 'db' desde tu archivo de modelos
from .models import db
from .routes import main_blueprint

load_dotenv()

jwt = JWTManager()
bcrypt = Bcrypt()
# Ya no necesitamos la instancia local 'sqlalchemy'

def create_app():
    current_app = Flask(__name__)
    CORS(current_app, resources={r"/*": {"origins": "*"}})

    database_uri = os.getenv('DATABASE_URI')
    if not database_uri:
        raise RuntimeError("DATABASE_URI environment variable not set")

    current_app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
    current_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    current_app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

    # Inicializa 'db' con la aplicación
    db.init_app(current_app)
    bcrypt.init_app(current_app)
    jwt.init_app(current_app)

    current_app.register_blueprint(main_blueprint)

    return current_app

app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, port=port, host='0.0.0.0')