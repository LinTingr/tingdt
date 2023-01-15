from flask import *
import requests
import time 
from dotenv import load_dotenv
import os 
from model.booking import Booking
from model.order import Order
import jwt
import re

phone_regula = "^09\d{2}\d{3}\d{3}$"
email_regula = "^[\w\d._%+-]+@[\w\d.-]+\.[a-zA-Z]{2,}$"

orderdata = Blueprint("orderdata", __name__, static_folder="static", static_url_path="/")

now = time.localtime()
timestring =time.strftime("%Y%m%d%H%M",now)

load_dotenv()
PARTNERKEY = os.getenv("PARTNERKEY")

@orderdata.route("/api/orders", methods=["POST"])
def order():
    try:
        cookies = request.cookies.get('token')
        if cookies == None:
            data = {
                "error": True,
                "message": "未登入系統"
            }
            response = make_response(jsonify(data),403)
            return response
        else:
            userdata = jwt.decode(cookies, "secret", algorithms=["HS256"])
            userid = userdata["userid"]
            order = request.get_json()
            name = order['order']['contact']["name"]
            email = order['order']['contact']["email"]
            phone_number = order['order']['contact']['phone']
            print(name)
            if name == "" or email == "" or phone_number == "" :
                data = {
                    "error": True,
                    "message": "請輸入完整資訊"
                }
                response = make_response(data, 400)
                return response 
            if not re.fullmatch(email_regula, email):
                data = {
                    "error": True,
                    "message": "Email格式輸入錯誤"
                }
                response = make_response(data, 400)
                return response 
            elif not re.fullmatch(phone_regula, phone_number):
                data = {
                    "error": True,
                    "message": "手機號碼格式輸入錯誤"
                }
                response = make_response(data, 400)
                return response 
            else:
                userbookingdata = Booking.search_user(userid)
                number = timestring + str(userbookingdata["id"])
                date = userbookingdata["date"]
                time = userbookingdata["time"]
                price = userbookingdata["price"]
                attractionId = order["order"]["trip"]["attraction"]["id"]
                orderdata = (userid, number, attractionId, date, time, price, name, email, phone_number)
                Order.payorder(orderdata)
                payData = {
                    "prime": order["prime"],
                    "partner_key": PARTNERKEY,
                    "merchant_id": "H0A05_CTBC",
                    "details":"TapPay Test",
                    "amount": price,
                    "currency": "TWD",
                    "cardholder": {
                        "phone_number": "+886"+phone_number,
                        "name": name,
                        "email": email
                    },
                    "remember": False
                }
                headers = {
                    "Content-Type": "application/json",
                    "x-api-key": PARTNERKEY,
                }
                paydata = json.dumps(payData)
                r = requests.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime',paydata.encode("utf-8") , headers= headers )
                r_json=r.json()
                if r_json["status"] == 0 :
                    consequent ={
                        "data": {
                            "number": number,
                            "payment": {
                            "status": r_json["status"],
                            "message": "付款成功"
                            }
                        }
                    }
                    Order.payorder_alter(number)
                    Booking.delete_booking(userid)
                else :
                    consequent ={
                        "data": {
                            "number": number,
                            "payment": {
                            "status": r_json["status"],
                            "message": "付款失敗"
                            }
                        }
                    }
                response = make_response(consequent, 200)
                return response 
    except Exception as e:
        print(e)
        data = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
        response = make_response(data, 500)
        return response 

@orderdata.route("/api/orders/")
def getorder():
    cookies = request.cookies.get('token')
    if cookies == None:
        data = {
            "error": True,
            "message": "未登入系統"
        }
        response = make_response(jsonify(data), 403)
        return response
    else :
        number = request.args.get("number")
        data = Order.get_order(number)
        data = {
            "data": {
                "number": number,
                "price": data["price"],
                "trip": {
                    "attraction": {
                        "id": data["id"],
                        "name": data["attractionName"],
                        "address": data["address"],
                        "image": data["images"][0]
                    },
                "date": data["date"],
                "time": data["time"]
                },
                "contact": {
                    "name": data["name"],
                    "email": data["email"],
                    "phone": data["phone"]
                },
                "status": data["status"]
            }
        }
        response = make_response(jsonify(data), 200)
        return response
