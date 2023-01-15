from model.taipeidb import cnxpool
from flask import *

class Attraction:
    def attractions(page, number_of_page, keyword):
        try:
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor(dictionary=True)
            if keyword == None:
                query = "select * from attraction limit %s, %s;"
                cursor.execute(query, ((int(page) * number_of_page), number_of_page+1))
                viewpoint_data = cursor.fetchall()
            else :
                query = "select * from attraction where LOCATE(%s, name)>0 OR category = %s limit %s, %s;"
                cursor.execute(query, (keyword, keyword, (int(page) * number_of_page), number_of_page+1))
                viewpoint_data = cursor.fetchall()

            return viewpoint_data
        except:
            return False
        finally:
            cursor.close()  
            cnx.close()
    
    def attractions_id(id):
        try:
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor(dictionary=True)
            query = "select * from attraction where id = %s;"
            cursor.execute(query, (id,))
            viewpoint_data = cursor.fetchone()
            return viewpoint_data
        except:
            return False
        finally:
            cursor.close()  
            cnx.close()