from flask import Blueprint, render_template, request, json, session, redirect
import requests
import config

login = Blueprint('login', __name__, template_folder='templates')

@login.route('/login', methods=['GET', 'POST'])
def login_page():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        return perform_login(request.json['username'], request.json['password'])

@login.route('/logout')
def logout():
    if 'token' in session:
        del session['token']
    if 'username' in session:
        del session['username']
    if 'role' in session:
        del session['role']
    return redirect('/login')

def perform_login(username, password):
    url = config.bookmark_api_url() + '/authenticate'
    r = requests.post(url,
        json = {'username': username, 'password': password},
        headers={'Content-Type': 'application/json'})

    result = r.json()
    if result['authenticated']:
        role = get_user_role(username)
        session['username'] = username
        session['token'] = result['token']
        session['role'] = role
        return json.dumps({'success': True, 'role': role}), 200
    else:
        return json.dumps({'success': False}), 401

def get_user_role(username):
    url = config.bookmark_api_url() + '/user/' + username
    r = requests.get(url)
    result = r.json()
    if 'type' in result:
        return result['type']
    else:
        return None
