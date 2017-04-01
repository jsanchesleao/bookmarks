from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def home():
    return login_page()

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/signup')
def signup_page():
    return render_template('signup.html')

@app.route('/bookmarks/<username>')
def bookmarks_page_user(username = None):
    return render_template('bookmarks.html', username=username)

@app.route('/admin')
def admin_page():
    return render_template('admin.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
