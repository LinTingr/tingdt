from model.taipeidb import cnxpool
from flask import *

class Order:
    def payorder(orderdata):
        try :
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor()
            query = "INSERT INTO orders(userid, number, attractionId, date, time, price, name, email, phone) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s);"
            cursor.execute(query, orderdata)
            cnx.commit()
        finally:
            cursor.close()
            cnx.close()

    def payorder_alter(number):
        try :
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor()
            query = "UPDATE orders SET status = 0 where number = %s;"
            cursor.execute(query, (number,))
            cnx.commit()
        finally:
            cursor.close()
            cnx.close()

    def get_order(number):
        try :
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor(dictionary=True)
            query = """select orders.price, orders.date, orders.time, orders.name, orders.email, orders.phone, orders.status,
            attraction.id, attraction.name as attractionName, attraction.address, attraction.images
            from orders 
            INNER JOIN attraction
            ON  orders.attractionId = attraction.id 
            where orders.number = %s """
            # print(number)
            cursor.execute(query, (number,))
            data = cursor.fetchone()
            return data
        finally:
            cursor.close()
            cnx.close()

    def get(userid):
        try :
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor(dictionary=True)
            query = '''select orders.name, orders.email, orders.phone, orders.number, orders.price, orders.date, orders.time, orders.status,
            attraction.id, attraction.name as attractionName, attraction.images
            from orders 
            INNER JOIN attraction
            ON  orders.attractionId = attraction.id 
            where userid = %s order by orders.id desc '''
            cursor.execute(query, (userid,))
            data = cursor.fetchall()
            return data
        finally:
            cursor.close()
            cnx.close()