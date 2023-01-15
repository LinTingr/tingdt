from flask import *
from model.taipeidb import cnxpool, category_query

class Category:
    def categories():
        try:
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor()
            cursor.execute(category_query)
            allcat = cursor.fetchall()
            if allcat:
                return allcat
        except:
            return False
        finally:
            cursor.close()
            cnx.close()