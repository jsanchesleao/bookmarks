import requests
import config

def find_bookmarks(token, username):
    url = config.bookmark_api_url() + '/user/' + username + '/bookmark'
    r = requests.get(url, headers = {'Authorization': 'Bearer ' + token})

    return r.json()


def save_bookmark(token, username, bookmarkUrl, bookmarkName):
    url = config.bookmark_api_url() + '/user/' + username + '/bookmark/' + bookmarkName
    r = requests.put(url,
      json={'url': bookmarkUrl},
      headers = {'Authorization': 'Bearer ' + token})

    return r.json()

def edit_bookmark(token, username, bookmarkUrl, bookmarkName):
    url = config.bookmark_api_url() + '/user/' + username + '/bookmark/' + bookmarkName
    r = requests.post(url,
      json={'url': bookmarkUrl},
      headers = {'Authorization': 'Bearer ' + token})

    return r.json()

def remove_bookmark(token, username, bookmarkName):
    url = config.bookmark_api_url() + '/user/' + username + '/bookmark/' + bookmarkName
    r = requests.delete(url,
      headers = {'Authorization': 'Bearer ' + token})

    return r.json()
