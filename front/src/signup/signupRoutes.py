from flask import Blueprint, render_template, request, json, session, redirect
from login.loginRoutes import perform_login
from users.usersRepository import save_user


app_signup = Blueprint('app_signup', __name__, template_folder='templates')

@app_signup.route('/signup', methods=['GET', 'POST'])
def login_page():
    if request.method == 'GET':
        return render_template('signup.html')
    else:
        return perform_registration(request.json['username'], request.json['password'])


def perform_registration(username, password):
    result = save_user(username, password)
    if 'success' in result:
        return handle_registration_response(result['success'], username, password)
    else:
        return json.dumps(result), 422

def handle_registration_response(success, username, password):
    if success:
        return perform_login(username, password)
    else:
        return json.dumps({'success': False}), 422
