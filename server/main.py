from huggingface_hub import InferenceClient
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
load_dotenv()

# HF_TOKEN = os.getenv('HF_TOKEN')
# client = InferenceClient(api_key=HF_TOKEN)
# for message in client.chat_completion(
# 	model="mistralai/Mistral-7B-Instruct-v0.2",
# 	messages=[{"role": "user", "content": "Based on this person's linkedin profile, write a short 50 word maximum formal linkedin biography for him as though he wrote it himself. Name: Liao Zhu, Experiences: Software ENgineer Internn at Collins Aerospace, Undergrad Researcher at Columbia University, Education: University of Iowa BS Math and BS Computer Science 2021-2025"}],
# 	max_tokens=500,
# 	stream=True,
# ):
#     print(message.choices[0].delta.content, end="")

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})


@app.route('/api/data', methods=['POST'])
def post_data():
    data = request.json
    return jsonify({"response": data}), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
