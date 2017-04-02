from flask import Flask, render_template, session, redirect

from login.loginRoutes import login
from signup.signupRoutes import app_signup
from bookmarks.bookmarksRoutes import bookmarks
from admin.adminRoutes import admin

app = Flask(__name__)
app.register_blueprint(login)
app.register_blueprint(app_signup)
app.register_blueprint(bookmarks)
app.register_blueprint(admin)

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

app.secret_key = 'VSK6Wx32GhpbAKojh6aF'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
