from flask import Blueprint, render_template, session, redirect

bookmarks = Blueprint('signup', __name__, template_folder='templates')


@bookmarks.route('/bookmarks')
def bookmarks_page_user():
    if 'token' in session:
        return render_template('bookmarks.html')
    else:
        return redirect('/login')
