from flask import *
import jwt
from model.booking import Booking

booking = Blueprint("booking", __name__, static_folder="static", static_url_path="/")

@booking.route("/api/booking", methods=["POST"])
def schedule():
	try: 
		cookies = request.cookies.get('token')
		userdata = jwt.decode(cookies, "secret", algorithms=["HS256"])
		userid = userdata["userid"]
		data = {
			"error": True,
			"message": "未登入系統"
		}
		response = make_response(jsonify(data),403)
		if cookies:
			schedule = request.get_json()
			if schedule["date"] :
				repeat = Booking.search_user(userid)
				if repeat :
					Booking.delete_booking(userid)
				Booking.insert_booking(userdata, schedule)

				data = {"ok":True}
				response = make_response(jsonify(data),200)
			else:
				data = {
					"error": True,
					"message": "請選擇日期"
				}
				response = make_response(jsonify(data),400)
		return response
	except Exception as e:
		print(e)
		data = {
			"error": True,
			"message": "伺服器錯誤"
		}
		response = make_response(jsonify(data),500)
		return response

@booking.route("/api/booking", methods=["GET"])
def schedule__():
	try :
		data = {
			"data":None
		}
		cookies = request.cookies.get('token')
		userdata = jwt.decode(cookies, "secret", algorithms=["HS256"])
		userid = userdata["userid"]
		booking = Booking.search_user(userid)
		if booking:
			attraction = Booking.get_booking_attraction(booking["attractionId"])
			images = attraction["images"]
			image = images.split(", ")
			data = {
				"data": {
					"attraction": {
						"id": attraction["id"],
						"name": attraction["name"],
						"address": attraction["address"],
						"image": image[0]
					},
					"date": booking["date"],
					"time": booking["time"],
					"price": booking["price"]
					}
			}
		response = make_response(jsonify(data),200)
		return response
	except :
		data = {
			"error": True,
			"message": "未登入系統"
		}
		response = make_response(jsonify(data),403)
		return response

@booking.route("/api/booking", methods=["DELETE"])
def schedule___():
	try :
		cookies = request.cookies.get('token')
		userdata = jwt.decode(cookies, "secret", algorithms=["HS256"])
		userid = userdata["userid"]
		Booking.delete_booking(userid)
		data = {"ok":True}
		response = make_response(jsonify(data),200)
		return response
	except :
		data = {
			"error": True,
			"message": "未登入系統"
		}
		response = make_response(jsonify(data),403)
		return response
