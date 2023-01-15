import mysql.connector.pooling
from dotenv import load_dotenv
import os 

load_dotenv()

PASSWORD = os.getenv("PASSWORD")

dbconfig={
    "database" : "taipeitravel",
    "user" : "root",
    "password" : PASSWORD,
    "host" : '127.0.0.1',
    "port" : "3306"
}

cnxpool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="poolname",
    pool_size=1, 
    pool_reset_session=True, 
    **dbconfig
)


category_query = "select category from attraction;"