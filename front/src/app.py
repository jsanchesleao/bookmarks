from flask import Flask, redirect
app = Flask(__name__)

@app.route('/')
def home():
    return login_page()


@app.route('/login')
def login_page():
    return "LOGIN PAGE"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
