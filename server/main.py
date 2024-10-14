from huggingface_hub import InferenceClient
import os
from dotenv import load_dotenv
load_dotenv()

HF_TOKEN = os.getenv('HF_TOKEN')
client = InferenceClient(api_key=HF_TOKEN)
for message in client.chat_completion(
	model="mistralai/Mistral-7B-Instruct-v0.2",
	messages=[{"role": "user", "content": "Based on this person's linkedin profile, write a short 50 word maximum formal linkedin biography for him as though he wrote it himself. Name: Liao Zhu, Experiences: Software ENgineer Internn at Collins Aerospace, Undergrad Researcher at Columbia University, Education: University of Iowa BS Math and BS Computer Science 2021-2025"}],
	max_tokens=500,
	stream=True,
):
    print(message.choices[0].delta.content, end="")
