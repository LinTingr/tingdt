from flask import *
from api.api_attraction import attraction
from api.api_booking import booking
from api.api_category import category
from api.api_user import user
from api.api_order import orderdata
from api.api_history import history
from api.api_member import memberpage



app=Flask(__name__, static_folder="static", static_url_path="/")
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.config["JSON_SORT_KEYS"]=False

app.secret_key="any"

app.register_blueprint(attraction)
app.register_blueprint(category)
app.register_blueprint(user)
app.register_blueprint(booking) 
app.register_blueprint(orderdata) 
app.register_blueprint(history) 
app.register_blueprint(memberpage) 

# Pages
@app.route("/")
def index():
	return render_template("index.html")
@app.route("/attraction/<id>")
def attraction(id):
	return render_template("attraction.html")
@app.route("/booking")
def booking():
	return render_template("booking.html")
@app.route("/thankyou")
def thankyou():
	return render_template("thankyou.html")
@app.route("/history")
def history():
	return render_template("history.html")
@app.route("/member")
def member():
	return render_template("member.html")

app.run(host="0.0.0.0", port=3000)