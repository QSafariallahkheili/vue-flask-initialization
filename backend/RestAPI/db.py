import psycopg2
from psycopg2.extras import Json
from os import getenv

dbConfig = {
    'host': getenv('DB_HOST', 'localhost'),
    'port': getenv('DB_PORT', 5432),
    'dbname': getenv('DB_NAME', 'ucode'),
    'user': getenv('DB_USER', 'postgres'),
    'password': getenv('DB_PASSWORD', '1234')
}

def connect():
  return psycopg2.connect(
        user="postgres",
        password="1234",
        host="localhost",
        port="5432",
        database="ucode"
    )
  

def get_trees(geom):
    connection = connect()

    cursor = connection.cursor()
    create_table_query = ''' drop table tree; create table tree (id SERIAL PRIMARY KEY, geom geometry(Point, 4326)); '''

    cursor.execute(create_table_query)

    insert_query= ''' INSERT INTO tree (geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON(%s), 4326)); '''
    for feature in dataa['elements']:
        geom=json.dumps(feature['geometry'])
        cursor.execute(insert_query, (geom,))
    
    connection.commit()
    connection.close()
