from flask import *
from model.attraction import Attraction
 
attraction = Blueprint("attraction", __name__, static_folder="static", static_url_path="/")

def push_data(viewpoint_data, viewpoint):
	if len(viewpoint_data) == 13:
		data_length = len(viewpoint_data)-1
	else:
		data_length = len(viewpoint_data)
	for i in range(data_length):
		images = viewpoint_data[i]["images"]
		image = images.split(", ")
		data = {
			"id": viewpoint_data[i]["id"],
			"name": viewpoint_data[i]["name"],
			"category": viewpoint_data[i]["category"],
			"description": viewpoint_data[i]["description"],
			"address": viewpoint_data[i]["address"],
			"transport": viewpoint_data[i]["transport"],
			"mrt": viewpoint_data[i]["mrt"],
			"lat": viewpoint_data[i]["lat"],
			"lng": viewpoint_data[i]["lng"],
			"images": image
		}
		viewpoint.append(data)

@attraction.route("/api/attractions")
def api_attractions():
	page = request.args.get("page", 0)
	number_of_page = 12
	keyword = request.args.get("keyword", None)
	viewpoint = []
	result = Attraction.attractions(page, number_of_page, keyword)
	# print(result)
	if result:
		push_data(result, viewpoint)

		if len(result) <= 12:
			nextpage = None
		else: 
			nextpage = 1

		data = {
			"nextPage": nextpage,
			"data" : viewpoint
		}
		res = make_response(data, 200)
		return res
	else:
		data={
				"error": True,
				"message": "server error"
			}
		res = make_response(data, 500)
		return res
          
@attraction.route("/api/attraction/<id>")
def api_attraction_id(id):
	result = Attraction.attractions_id(id)
	if result :
		images = result["images"]
		image = images.split(", ")
		data = {
			"data": [
				{
					"id": result["id"],
					"name": result["name"],
					"category": result["category"],
					"description": result["description"],
					"address": result["address"],
					"transport": result["transport"],
					"mrt": result["mrt"],
					"lat": result["lat"],
					"lng": result["lng"], 
					"images": image
				}
			]
		}
		res = make_response(data, 200)
		return res
	else:
		data={
			"error": True,
			"message": "server error"
		}
		res = make_response(data, 200)
		return res