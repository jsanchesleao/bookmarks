from flask import Flask, render_template, session, redirect
from login.loginRoutes import login, login_page

app = Flask(__name__)
app.register_blueprint(login)

@app.route('/')
def home():
    if 'token' in session:
        return page_for(session['role'])
    else:
        return redirect('/login')

def page_for(role):
    if role == 'admin':
        return redirect('/admin')
    else:
        return redirect('/bookmarks')

@app.route('/signup')
def signup_page():
    return render_template('signup.html')

@app.route('/bookmarks')
def bookmarks_page_user():
    if 'token' in session:
        return render_template('bookmarks.html')
    else:
        return redirect('/login')

@app.route('/admin')
def admin_page():
    return render_template('admin.html')

app.secret_key = 'VSK6Wx32GhpbAKojh6aF'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
