from flask import *
from model.order import Order
import jwt
 
history = Blueprint("history", __name__, static_folder="static", static_url_path="/")

@history.route("/api/history")
def historyorder():
    try:
        already = request.args.get("status")
        print(already)
        cookies = request.cookies.get("token")
        # print(cookies)
        userdata = jwt.decode(cookies, "secret", algorithms=["HS256"])
        userid = userdata["userid"]
        # print(userid)
        order_get = Order.get(userid)
        # print(order_get)
        data = {
            "data":order_get
        }
        response = make_response(jsonify(data),200)
        return response
    except:
        data = {
            "error":True,
            "message":"???"
        }
        response = make_response(jsonify(data),500)
        return response
