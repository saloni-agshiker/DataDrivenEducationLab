from flask import Flask, render_template, request, json
from canvasapi import Canvas
app = Flask(__name__)

API_KEY = '2096~ppaS3UNodRDzyJ6hkPVbzbJwixKpCwGq36Nc2PvuqviZfR74ZMl3fpRC9WHLfoIm'
API_URL = 'https://gatech.instructure.com'
AUTH_HEADER = {"Authorization": "Bearer {}".format(API_KEY)}

# Create Canvas object and get a discussion's message
canvas = Canvas(API_URL, API_KEY)
course = canvas.get_course(109608)
courseName = course.name

@app.route("/")
def main():
    return render_template('courses.html', course=courseName)

@app.route("/showSignUp")
def showSignUp():
    return render_template('signup.html')

@app.route("/signUp")
def signUp():
    # read the posted values from the UI
    _name = request.form['inputName']
    _email = request.form['inputEmail']
    _password = request.form['inputPassword']

    # validate the received values
    if _name and _email and _password:
        return json.dumps({'html':'<span>All fields good !!</span>'})
    else:
        return json.dumps({'html':'<span>Enter the required fields</span>'})

if __name__ == "__main__":
    app.run()
