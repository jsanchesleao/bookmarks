from flask import Blueprint, render_template, session, redirect, json, request
from bookmarks.bookmarksRepository import find_bookmarks, save_bookmark, remove_bookmark, edit_bookmark

bookmarks = Blueprint('signup', __name__, template_folder='templates')


@bookmarks.route('/bookmarks')
def bookmarks_page_user():
    if 'token' in session:
        return render_template('bookmarks.html')
    else:
        return redirect('/login')

@bookmarks.route('/load_bookmarks')
def load_bookmarks_ajax():
    if 'token' in session:
        return json.dumps(find_bookmarks(session['token'], session['username']))
    else:
        return json.dumps({'authorized': False}), 401

@bookmarks.route('/save_bookmark', methods=['POST'])
def save_bookmark_ajax():
    if 'token' in session:
        save_bookmark(session['token'], session['username'], request.json['url'], request.json['name'])
        return json.dumps(find_bookmarks(session['token'], session['username']))
    else:
        return json.dumps({'authorized': False}), 401

@bookmarks.route('/edit_bookmark', methods=['POST'])
def edit_bookmark_ajax():
    if 'token' in session:
        edit_bookmark(session['token'], session['username'], request.json['url'], request.json['name'])
        return json.dumps(find_bookmarks(session['token'], session['username']))
    else:
        return json.dumps({'authorized': False}), 401

@bookmarks.route('/remove_bookmark', methods=['POST'])
def remove_bookmark_ajax():
    if 'token' in session:
        remove_bookmark(session['token'], session['username'], request.json['name'])
        return json.dumps(find_bookmarks(session['token'], session['username']))
    else:
        return json.dumps({'authorized': False}), 401
