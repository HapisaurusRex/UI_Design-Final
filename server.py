"""
Flask for UI Final
"""

from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask import redirect,url_for

app = Flask(__name__)

# Sample data (for existing item view)
data = {
    1: {
        "title": "Casino Royale",
        "image": "https://m.media-amazon.com/images/M/MV5BMTM5MjI4NDExNF5BMl5BanBnXkFtZTcwMDM1MjMzMQ@@._V1_.jpg",
    }
}

# ROUTES
@app.route('/')
def home():
    # Home page
    return render_template('home.html')

@app.route('/layer')
def layer():
    return render_template('layer.html')

@app.route('/weather')
def weather():
    return render_template('weather.html')

@app.route('/clothing')
def clothing():
    return render_template('clothing.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/view/<int:id>')
def view(id):
    # Get the data entry or return 404
    entry = data.get(id)
    if not entry:
        return "Item not found", 404
    return render_template('item.html', data=entry, all_data=data)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
