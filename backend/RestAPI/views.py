from flask import Flask, request, jsonify, json, Response
from RestAPI import app

@app.route('/', methods=["GET", "POST"])
def welcomePage():
    return "<h2 style= 'color:green'> Welcom to the UCODE's API home page! <h2>"

@app.route('/get_trees', methods=["GET", "POST"])
def get_trees():
    data = request.get_json()
    return "ok"

