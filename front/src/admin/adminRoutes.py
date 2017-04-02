from flask import Blueprint, render_template, session, redirect, json, request, g
from users.usersRepository import find_users
from bookmarks.bookmarksRepository import find_bookmarks

admin = Blueprint('admin', __name__, template_folder='templates')


@admin.route('/admin')
def admin_page():
    return render_template('admin.html')

@admin.route('/load_users')
def load_users_ajax():
    if 'token' in session:
        return json.dumps(find_users(session['token']))
    else:
        return json.dumps({'authorized': False}), 401

@admin.route('/load_admin_bookmarks/<username>')
def load_users_bookmark_ajax(username):
    if 'token' in session:
        return json.dumps(find_bookmarks(session['token'], username))
    else:
        return json.dumps({'authorized': False}), 401
