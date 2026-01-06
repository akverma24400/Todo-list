from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import mysql.connector
import os
import time

app = Flask(__name__, template_folder="templates", static_folder="static")

CORS(app)
time.sleep(15)

db = mysql.connector.connect(
    host=os.environ.get("MYSQL_HOST"),
    user=os.environ.get("MYSQL_USER"),
    password=os.environ.get("MYSQL_PASSWORD"),
    database=os.environ.get("MYSQL_DB")
)


cursor = db.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS todos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255)
)
""")
db.commit()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/todos", methods=["GET"])
def get_todos():
    cursor.execute("SELECT * FROM todos")
    return jsonify(cursor.fetchall())

@app.route("/todos", methods=["POST"])
def add_todo():
    data = request.json
    cursor.execute("INSERT INTO todos (task) VALUES (%s)", (data["task"],))
    db.commit()
    return {"message": "Todo added"}, 201

app.run(host="0.0.0.0", port=5000)

