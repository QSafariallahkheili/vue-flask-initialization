import psycopg2
from psycopg2.extras import Json
from os import getenv

dbConfig = {
    'host': getenv('DB_HOST', 'database'),
    'port': getenv('DB_PORT', 5432),
    'dbname': getenv('DB_NAME', 'ligfinder'),
    'user': getenv('DB_USER', 'postgres'),
    'password': getenv('DB_PASSWORD', 'postgres')
}

def connect():
  return psycopg2.connect(
    host=dbConfig['host'],
    port=dbConfig['port'], 
    dbname=dbConfig['dbname'], 
    user=dbConfig['user'], 
    password=dbConfig['password'])

