from flask import *
from flask_bcrypt import Bcrypt
from model.user import User
import jwt
import boto3
import numpy as np
import os
from dotenv import load_dotenv

load_dotenv()

Access_key = os.getenv("Access_key")
Access_secret = os.getenv("Access_secret")
Bucket_name = os.getenv("AcBucket_namecess_key")

memberpage = Blueprint("memberpage", __name__, static_folder="static", static_url_path="/")

@memberpage.route("/api/member")
def member():
	cookies = request.cookies.get('token')
	user_signin = {
		"data" : None
	}
	if cookies :
		userdata = jwt.decode(cookies, "secret", algorithms=["HS256"])
		access_key = Access_key
		access_secret = Access_secret
		bucket_name = Bucket_name

		client_s3 = boto3.client(
			"s3",
			aws_access_key_id = access_key,
			aws_secret_access_key = access_secret
		)

		file_name = 'test2.txt'

		# Use the S3 client to get the file contents
		response = client_s3.get_object(Bucket=bucket_name, Key=file_name)
		file_content = response['Body'].read()

		# Print the file contents
		# print(file_content)
		user_signin = {
			"data" : { 
				"id": userdata["userid"],
				"name": userdata["username"],
				"email": userdata["useremail"],
				"image": str(file_content, encoding="UTF-8")
			}
		}
	
	response = make_response(jsonify(user_signin),200)
	return response

# @memberpage.route("/api/member", methods=["PUT"])
# def memberupdate():
#     data = request.get_json()
#     cookies = request.cookies.get('token')
#     if cookies :
#         userdata = jwt.decode(cookies, "secret", algorithms=["HS256"])
#         id = userdata["userid"]
#         User.signin_update(name, id)
   
#     return data

@memberpage.route("/api/member", methods=["POST"])
def memberavatar():
	access_key = "AKIATVB3VJIOISCXZW65"
	access_secret = "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"
	bucket_name = "mywebtingr"
	s3 = boto3.resource(
	    "s3",
	    aws_access_key_id = access_key,
	    aws_secret_access_key = access_secret
	)
	data = request.get_json()
	path = 'output.txt'
	f = open(path, 'w')
	# byte = bytes(data["avatar"])
	# print("byte",byte)
	# with open("test.bin", "wb") as f:
	# 	f.write(byte)
	# new_array = np.array(data["avatar"])
	# content = str(new_array)
	f.write(data["avatar"])
	f.close()
	image = open(path, 'rb')
	s3.Bucket(bucket_name).put_object(Key='test3.txt', Body=image)	
	ddd = {
		"data":True
	}
	response = make_response(jsonify(ddd),200)
	return response
