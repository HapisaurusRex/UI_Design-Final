"""
Flask for UI Final
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for

app = Flask(__name__)

# Sample data (for existing item view)
data = {
    1: {
        "title": "Casino Royale",
        "image": "https://m.media-amazon.com/images/M/MV5BMTM5MjI4NDExNF5BMl5BanBnXkFtZTcwMDM1MjMzMQ@@._V1_.jpg",
    }
}

# Global score variable
score = None

# ROUTES
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/layer')
def layer():
    return render_template('layer.html')

@app.route('/material')
def weather():
    return render_template('material.html')

@app.route('/clothing')
def clothing():
    return render_template('clothing.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/submit_score', methods=['POST'])
def submit_score():
    global score
    data = request.get_json()
    score = data.get('score')
    details = data.get('details')  # optional: detailed feedback/errors

    print(f"Score received: {score}")
    print(f"Details: {details}")

    return jsonify({"message": "Score saved successfully!"})

@app.route('/get_score', methods=['GET'])
def get_score():
    return jsonify({"score": score})

@app.route('/view/<int:id>')
def view(id):
    entry = data.get(id)
    if not entry:
        return "Item not found", 404
    return render_template('item.html', data=entry, all_data=data)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
