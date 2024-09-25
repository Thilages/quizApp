from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import PyPDF2

app = Flask(__name__)

UPLOAD_FOLDER = "upload"
CORS(app, origins="*")

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def extract_text(pdf_file):
    with open(pdf_file,'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    print(text)
    with open("text.txt",'w',encoding='utf-8') as file:
        file.write(text)

@app.route("/upload", methods=["GET", "POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "no file is uploaded"}), 400

    file = request.files['file']
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    extract_text(file_path)

    return jsonify({"message": "File uploaded successfully"})



if __name__ == '__main__':
    app.run(debug=True, port=5000)
