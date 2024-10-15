from huggingface_hub import InferenceClient
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
load_dotenv()

HF_TOKEN = os.getenv('HF_TOKEN')
MODEL = "mistralai/Mistral-7B-Instruct-v0.2"


def get_response_from_model(prompt, system_prompt="You are an assistant called Fliee who helps people with their linkedin profiles."):
    
    client = InferenceClient(api_key=HF_TOKEN)
    response = ""
    for message in client.chat_completion(
        model=MODEL,
        messages=[{"role": "system", "content": system_prompt}, {"role": "user", "content": prompt}],
        max_tokens=500,
        stream=True,
    ):
        response += message.choices[0].delta.content
    return response

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})


@app.route('/api/data', methods=['POST'])
def post_data():
    data = request.json
    return jsonify({"response": data}), 201

@app.route('/api/model', methods=['POST'])
def prompt_model():
    data = request.json
    prompt = data['prompt']
    response = get_response_from_model(prompt)[1:] # strip off leading space
    return jsonify({"response": response}), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
