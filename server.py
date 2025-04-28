"""
Flask for UI Final
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from datetime import datetime, timedelta

app = Flask(__name__)
app.secret_key = 'scooter'  # still needed for CSRF protection

quiz_scores = {}

# Sample data (for existing item view)
data = {
    1: {
        "title": "Casino Royale",
        "image": "https://m.media-amazon.com/images/M/MV5BMTM5MjI4NDExNF5BMl5BanBnXkFtZTcwMDM1MjMzMQ@@._V1_.jpg",
    }
}

visit_log = {
    "home": None,
    "layer": None,
    "material": None,
    "clothing": None
}

quiz_media = {
    "questions": [
        {
            "background": "Images/Background1.png",
            "scooter": "Images/scooter.png",
            "base": [
                {"name": "Wool",      "img": "Images/woolShirt.png"},
                {"name": "Cotton",    "img": "Images/cottonShirt.png"},
                {"name": "Synthetic", "img": "Images/syntheticShirt.png"}
            ],
            "mid": [
                {"name": "Fleece",    "img": "Images/fleeceShirt.png"},
                {"name": "Down",      "img": "Images/downShirt.png"},
                {"name": "Wool",      "img": "Images/woolShirt.png"}
            ],
            "outer": [
                {"name": "GoreTex",                "img": "Images/goretexShirt.png"},
                {"name": "Down",                   "img": "Images/downShirt.png"},
                {"name": "Polartec Power Shield",  "img": "Images/PolartecShirt.png"}
            ]
        },
        {
            "background": "Images/Background2.png",
            "scooter": "Images/scooter.png",
            "base": [
                {"name": "Dense Synthetic", "img": "Images/syntheticShirt.png"},
                {"name": "Cotton",          "img": "Images/cottonShirt.png"},
                {"name": "Wool",            "img": "Images/woolShirt.png"}
            ],
            "mid": [
                {"name": "No need!"},
                {"name": "Down",        "img": "Images/downShirt.png"},
                {"name": "Wool",        "img": "Images/woolShirt.png"}
            ],
            "outer": [
                {"name": "Ventilated Windbreaker", "img": "Images/windbreaker.png"},
                {"name": "Down",                   "img": "Images/downShirt.png"},
                {"name": "Polartec Power Shield",  "img": "Images/PolartecShirt.png"}
            ]
        }
    ]
}


# Helper for page visits (if you need it)
visit_log = {"home": None, "layer": None, "material": None, "clothing": None}
def log_visit(page_name):
    visit_log[page_name] = datetime.now().isoformat()

@app.route('/')
def home():
    log_visit('home')
    return render_template('home.html')

@app.route('/layer')
def layer():
    log_visit('layer')
    return render_template('layer.html')

@app.route('/material')
def material():
    log_visit('material')
    return render_template('material.html')

@app.route('/weather')
def clothing():
    log_visit('weather')
    return render_template('weather.html')

@app.route('/quiz')
def quiz():
    # now passes quiz_media into the template
    return render_template('quiz.html', quiz_media=quiz_media)

@app.route('/submit_score', methods=['POST'])
def submit_score():
    data = request.get_json()
    session_id = session.get('session_id')
    
    # If no session ID exists yet, create one
    if not session_id:
        session_id = str(datetime.now().timestamp())
        session['session_id'] = session_id
    
    # Store score in our in-memory dictionary instead of Flask session
    quiz_scores[session_id] = {
        'score': data.get('score'),
        'details': data.get('details')
    }
    
    print(f"Score received for session {session_id}: {data.get('score')}")
    return jsonify({"message": "Score saved successfully!"})

@app.route('/get_score', methods=['GET'])
def get_score():
    session_id = session.get('session_id')
    
    if session_id and session_id in quiz_scores:
        data = quiz_scores[session_id]
        return jsonify({
            'score': data['score'], 
            'details': data['details']
        })
    else:
        return jsonify({'score': None, 'details': []})

@app.route('/visits')
def show_visits():
    return jsonify(visit_log)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
