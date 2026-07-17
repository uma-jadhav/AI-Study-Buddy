import os
from flask import Flask, render_template, request, jsonify 
from google import genai 
from dotenv import load_dotenv

current_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(current_dir, 'config.env')

load_dotenv(dotenv_path=env_path)

app = Flask(__name__)

api_key = os.environ.get("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question")

    if not question:
        return jsonify({"answer": "Please enter a question."})
    
    prompt = f"""
     You are an AI Study Buddy.

     Rules:
     -Answer in simple english.
     -Explain step by step.
     -Keep the answer easy for beginners.
     -if needed, give one example.
     -if the question is related to programming, provide a short code example.
     -Keep the answer clear and concise.

     Student Question:
     {question}
"""
    try:
        response = client.models.generate_content(
            model='gemini-3.5-flash',
            contents=prompt
        )
        return jsonify({"answer": response.text})
    except Exception as e:
        return jsonify({"answer": f"Backend Error: {str(e)}"})


@app.route("/summary", methods=["POST"])
def summary():
    data = request.get_json()
    notes = data.get("notes")

    prompt = f"""
    Summarize these notes in simple english.
    Give the answer in bullet points.

    Notes:
    {notes}
"""
    try:
        response = client.models.generate_content(
            model='gemini-3.5-flash',
            contents=prompt
        )
        return jsonify({"summary": response.text})
    except Exception as e:

        return jsonify({"summary": f"Backend Error: {str(e)}"})
    

@app.route("/quiz", methods=["POST"])
def quiz():
    data = request.get_json()
    topic = data.get("topic")

    prompt = f"""
    Create a quiz on {topic}.

    Rules:
    -Generate exactly five multiple choice questions.
    -Each question should have four options.
    -Mention the correct answer after each question.
    -Keep the language simple for students.
"""
    try:
        response = client.models.generate_content(
            model='gemini-3.5-flash',
            contents=prompt
        )
        return jsonify({"quiz": response.text})
    except Exception as e:
   
        return jsonify({"quiz": f"Backend Error: {str(e)}"})


@app.route("/tips", methods=["POST"])
def tips():
    data = request.get_json()
    subject = data.get("topic")

    prompt = f"""
    You are an AI Study Coach.
    
    Give 10 easy and practical study tips for studying {subject}.

    Rules:
    -Use simple English.
    -Give bullet points.
    -Keep each tip short.
    -Motivate the student.
"""
    try:
        response = client.models.generate_content(
            model='gemini-3.5-flash',
            contents=prompt
        )
        return jsonify({"tips": response.text})
    except Exception as e:
        return jsonify({"tips": f"Backend Error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True)