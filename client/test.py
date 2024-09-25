from flask import Flask,request,jsonify
import os
from flask_cors import CORS
app = Flask(__name__)

UPLOAD_FOLDER = "upload"
# CORS(app)
CORS(app, origins="*") 

if not os.path.exists(UPLOAD_FOLDER):
  os.makedirs(UPLOAD_FOLDER)

@app.route("/upload",methods=["GET","POST"])
def upload_file():
  print("recived")
  if "file" in request.files:
    return jsonify({"error","no file is uploaded"}),400
  print(request)
  file = request.files['file']
  file_path = os.path.join(UPLOAD_FOLDER, file.filename)
  file.save(file_path)
  return jsonify({"message","File uploaded successfully"})

@app.route("/test",methods=["GET"])
def test_function():
  return "HELLO"

if __name__ == '__main__':
    app.run(debug=True, port=5000)