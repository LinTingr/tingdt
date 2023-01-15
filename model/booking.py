from model.taipeidb import cnxpool
from flask import *

class Booking:
    def insert_booking(userdata, schedule):
        try :
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor()
            query = "INSERT INTO booking(userid, attractionId, date, time, price) VALUES (%s, %s, %s, %s, %s);"
            order = (userdata["userid"], schedule["attractionId"], schedule["date"], schedule["time"], schedule["price"])
            cursor.execute(query, order)
            cnx.commit() 
        finally:
            cursor.close()
            cnx.close()
    def search_user(userid):
        try:
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor(dictionary=True)
            query = "select * from booking where userid = %s;"
            cursor.execute(query, (userid,)) 
            booking = cursor.fetchone()
            return booking
        finally:
            cursor.close()
            cnx.close()

    def delete_booking(userid):
        try:
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor()
            query = "delete from booking where userid = %s;"
            cursor.execute(query, (userid,))
            cnx.commit()
        finally:
            cursor.close()
            cnx.close()

    def get_booking_attraction(attraction_id):
        try:
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor(dictionary=True)
            query = "select id, name, address, images from attraction where id = %s;"
            cursor.execute(query, (attraction_id,))
            attraction = cursor.fetchone()
            return attraction
        finally:
            cursor.close()
            cnx.close()