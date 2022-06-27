from flask import Flask, request, jsonify, json, Response
from RestAPI import app
import requests
import psycopg2
import os
from .db import get_trees


def connect():
  return psycopg2.connect(
        user="postgres",
        password="1234",
        host="localhost",
        port="5432",
        database="ucode"
    )

@app.route('/', methods=["GET", "POST"])
def welcomePage():
    return "<h2 style= 'color:green'> Welcom to the UCODE's API home page! <h2>"

@app.route('/get-trees', methods=["GET", "POST"])
def get_tree():

    data = request.get_json()
    print(data["data"])
    xmin = data['bbox'][0]
    ymin = data['bbox'][1]
    xmax = data['bbox'][2]
    ymax = data['bbox'][3]
    overpass_url = "http://overpass-api.de/api/interpreter"
    overpass_query = """
        [out:json];
        node["natural"="tree"](%s,%s,%s,%s);
        convert item ::=::,::geom=geom(),_osm_type=type();
        out geom;


    """ % ( ymin, xmin, ymax ,xmax )
    response = requests.get(overpass_url, 
                        params={'data': overpass_query})
    dataa = response.json()

    connection = connect()

    cursor = connection.cursor()
    create_table_query =''' 
        drop table if exists tree;
        drop table if exists aoi;
        create table tree (id SERIAL PRIMARY KEY, geom geometry(Point, 4326));
        create table aoi (id SERIAL PRIMARY KEY, geom geometry(Polygon, 4326));
    '''

    cursor.execute(create_table_query)

    insert_query_tree= '''
        INSERT INTO tree (geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON(%s), 4326));
        '''
    insert_query_aoi= '''
        INSERT INTO aoi (geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON(%s), 4326));

        '''
    boundry=json.dumps(data["data"]['features'][0]['geometry'])
    cursor.execute(insert_query_aoi, (boundry,))

    for feature in dataa['elements']:
        geom=json.dumps(feature['geometry'])
        cursor.execute(insert_query_tree, (geom,))
    
    delete_tree_outside_boundry_query= '''
        delete from tree WHERE ST_Disjoint(
            geom, (SELECT geom FROM aoi)
        );

    '''

    cursor.execute(delete_tree_outside_boundry_query)

    connection.commit()
    connection.close()
    

    return "ok"


@app.route('/retrieve-trees', methods=["GET", "POST"])
def retrieve_trees():
    connection = connect()
    cursor = connection.cursor()
    get_table_query = ''' select json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(tree.*)::json)
        )
        from tree
      ; 
    '''

    cursor.execute(get_table_query)
    data = cursor.fetchall()[0][0]
    print(data)

    return data


@app.route('/delete-trees', methods=["GET", "POST"])
def delete_trees():
    connection = connect()
    cursor = connection.cursor()
    delete_tree_query =''' 
        drop table if exists tree;
        '''
    cursor.execute(delete_tree_query)
    connection.commit()
    connection.close()

    return "Ok"
