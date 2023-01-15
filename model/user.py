from model.taipeidb import cnxpool
from flask_bcrypt import Bcrypt
from flask import *

bcrypt = Bcrypt()

class User:
    def signup(name, account, password):
        try:
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor()
            query = "select * from usertaipei where useremail = %s;"
            cursor.execute(query, (account,))
            isdata = cursor.fetchall()
            if isdata:
                return False
            query = "INSERT INTO usertaipei(username, useremail, userpassword) values(%s, %s, %s);"
            cursor.execute(query, (name, account, password))
            cnx.commit()
            return True
        except:
            return False
        finally:
            cursor.close()
            cnx.close()
    
    def signin(account, password):
        try:
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor(dictionary=True)
            query = "select * from usertaipei where useremail = %s ;"
            cursor.execute(query, (account, ))
            isdata = cursor.fetchone()
            if isdata:
                check_password = bcrypt.check_password_hash(isdata["userpassword"],password)
                if check_password :
                    userdata = {
						"userid" : isdata["userid"], 
						"username" : isdata["username"],
						"useremail" : isdata["useremail"]
                    }
                    return userdata
            return None
        except:
            return False
        finally:  
            cursor.close()
            cnx.close()

    def signin_repeat(account):
        try:
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor(dictionary=True)
            query = "select * from usertaipei where useremail = %s ;"
            cursor.execute(query, (account, ))
            isdata = cursor.fetchone()
            if isdata:
                return isdata
            return None
        except:
            return False
        finally:  
            cursor.close()
            cnx.close()

    def signin_update(name, id):
        try:
            cnx = cnxpool.get_connection()
            cursor = cnx.cursor(dictionary=True)
            query = "UPDATE usertaipei SET name = %s WHERE id = %s;"
            cursor.execute(query, (name, id))
            return True
        except:
            return False
        finally:  
            cursor.close()
            cnx.close()
    
        