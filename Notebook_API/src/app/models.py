import flask_sqlalchemy
from datetime import datetime
from flask import current_app
db = SQLAlchemy()
class Usuarios(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    fecha_creacion  = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        from app.app import bcrypt
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    def check_password(self, password):
        from app.app import bcrypt
        return bcrypt.check_password_hash(self.password_hash, password)
    def __repr__(self):
        return f'<Usuario {self.nome}>'
    def serialize(self):
        return {
            'id': self.id,
            'nombre_usuario': self.nombre_usuario,
            'email': self.email,
            'fecha_creacion': self.fecha_creacion.isoformat()
        }

class Libretas(db.Model):
    __tablename__ = "libretas"
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    titulo = db.Column(db.String(100), nullable=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Libreta {self.titulo}>'
    def serialize(self):
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'titulo': self.titulo,
            'fecha_creacion': self.fecha_creacion.isoformat()
        }
    
    class Paginas(db.Model):
        __tablename__="Paginas"
        id = db.Column(db.Integer, primary_key=True)
        libreta_id = db.Column(db.Integer, db.ForeignKey('libretas.id'), nullable=False)
        titulo = db.Column(db.String(100), nullable=False)
        contenido = db.Column(db.Text, nullable=True)
        fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)

        def __repr__(self):
            return f'<Pagina {self.titulo}>'
        def serialize(self):
            return {
                'id': self.id,
                'libreta_id': self.libreta_id,
                'titulo': self.titulo,
                'contenido': self.contenido,
                'fecha_creacion': self.fecha_creacion.isoformat()
            }