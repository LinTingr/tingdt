from flask import *
from model.category import Category
category = Blueprint('category', __name__, static_folder="static", static_url_path="/")

@category.route("/api/categories")
def api_categories():
	result = Category.categories()
	cat = []
	if result :
		for i in set(result):
			cat.append(i[0])
		data = {
			"data":cat
		}
		res = make_response(jsonify(data), 200)
		return res
	data = {
		"error": True,
		"message": "server error"
	}
	res = make_response(jsonify(data), 500)
	return res