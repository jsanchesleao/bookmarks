from flask import Blueprint, render_template, request, json, session, redirect
from login.loginRoutes import perform_login

import requests
import config

app_signup = Blueprint('app_signup', __name__, template_folder='templates')

@app_signup.route('/signup', methods=['GET', 'POST'])
def login_page():
    if request.method == 'GET':
        return render_template('signup.html')
    else:
        return perform_registration(request.json['username'], request.json['password'])


def perform_registration(username, password):
    url = config.bookmark_api_url() + '/user'
    r = requests.post(url,
      json = {'username': username, 'password': password},
      headers = {'Content-Type': 'application/json'})

    result = r.json()
    if 'success' in result:
        return handle_registration_response(result['success'], username, password)
    else:
        return json.dumps({'success': False}), 422

def handle_registration_response(success, username, password):
    if success:
        return perform_login(username, password)
    else:
        return json.dumps({'success': False}), 422
