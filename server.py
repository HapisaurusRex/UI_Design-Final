"""
Flask for UI Final
"""

from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask import redirect,url_for

app = Flask(__name__)

data = {
    1: { ''' Example data style'''
        "title": "Casino Royale",
        "image": "https://m.media-amazon.com/images/M/MV5BMTM5MjI4NDExNF5BMl5BanBnXkFtZTcwMDM1MjMzMQ@@._V1_.jpg",
    }
}
# ROUTES
@app.route('/')
def home():
    global data
    return render_template('home.html')   

@app.route('/view/<id>')
def view(id):
    # Get the data entry
    global data
    entry = data[int(id)]
    #Pass info to html
    return render_template('item.html',data = entry, all_data = data)
@app.route('/quiz/<id>')
def view(id):

    return render_template('item.html')

# Necessary to run
if __name__ == '__main__':
   app.run(debug = True, port=5001)