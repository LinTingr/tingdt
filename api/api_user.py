from flask import *
from flask_bcrypt import Bcrypt
from model.user import User
import time
import jwt

bcrypt = Bcrypt()

user = Blueprint("user", __name__, static_folder="static", static_url_path="/")

@user.route("/api/user", methods=["POST"])
def signup():
	front_signup = request.get_json()
	name = front_signup["name"]
	account = front_signup["account"]
	password = front_signup["password"]
	if name != "" or account != "" or password != "":
		isdata = User.signin_repeat(account)
		if isdata :
			data = {
				"error": True,
				"message": "Email 已被註冊"
			}
			response = make_response(jsonify(data),200)
		else:
			hashed_password =bcrypt.generate_password_hash(password=password)
			result = User.signup(name, account, hashed_password)
			if result :
				data = { "ok": True }
				response = make_response(jsonify(data),200)
			else:
				data = {
					"error": True,
					"message": "伺服器錯誤"
				}
				response = make_response(jsonify(data),500)
		return response
	else:
		data = {
			"error": True,
			"message": "欄位不能為空"
		}
		response = make_response(jsonify(data),400)
		return response
		

@user.route("/api/user/auth", methods=["PUT"])
def signin_():
	front_signin = request.get_json()
	account = front_signin["account"]
	password = front_signin["password"]
	result = User.signin(account, password)
	# print(result)
	# print("api",result)
	if result == None:					
		data = {
			"error": True,
			"message": "帳號或密碼錯誤"
		}
		response = make_response(jsonify(data),400)
		return response
	if result:					
		token1 = jwt.encode(result, "secret", algorithm="HS256")
		data = {
			"ok":True
		}
		response = make_response(jsonify(data),200)
		response.set_cookie(key="token", value=token1, expires=time.time()+7*24*60*60+8*60*60)
		return response
	else:
		data = {
			"error": True,
			"message": "伺服器錯誤"
		}
		response = make_response(jsonify(data),500)
		return response

@user.route("/api/user/auth", methods=["GET"])
def signin_in():
	cookies = request.cookies.get('token')
	user_signin = {
		"data" : None
	}
	if cookies :
		userdata = jwt.decode(cookies, "secret", algorithms=["HS256"])
		user_signin = {
			"data" : { 
				"id": userdata["userid"],
				"name": userdata["username"],
				"email": userdata["useremail"]
			}
		}
	response = make_response(jsonify(user_signin),200)
	return response

@user.route("/api/user/auth", methods=["DELETE"])
def signin_out():
	cookies = request.cookies.get('token')
	token = jwt.decode(cookies, "secret", algorithms=["HS256"])
	print(token)
	data = {
		"ok":True
	}
	response = make_response(jsonify(data),200)
	response.set_cookie(key="token", value="", expires=0)
	return response

