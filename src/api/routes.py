"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# USER ENDPOINTS
@api.route('/users', methods=['GET'])
def get_users():
    all_users = User.query.all()
    all_users_list = list(map(lambda user: user.serialize(),all_users))

    return jsonify(all_users_list), 200

@api.route('/users', methods=['POST'])
def add_user():
    user_data = request.json
    required_properties = ["email", "password"]

    for prop in required_properties:
        if prop not in user_data: return jsonify({"Error": f"The property '{prop}' was not properly written"}), 400 

    user_to_add = User(**user_data)
    db.session.add(user_to_add)
    db.session.commit()

    return jsonify(user_to_add.serialize()), 200

@api.route('/users/<int:user_id>', methods=['DELETE'])
def del_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if not user: return jsonify({"Error": f"The ID '{user_id}' is not associated with any user"}), 400 
    db.session.delete(user)
    db.session.commit()

    return jsonify({"Deleted": f"The user '{user.email}' was deleted successfully"}), 200 