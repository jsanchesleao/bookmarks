import requests
import config

def find_users(token):
    url = config.bookmark_api_url() + '/user'
    r = requests.get(url, headers = {'Authorization': 'Bearer ' + token})

    return r.json()

def save_user(username, password):
    url = config.bookmark_api_url() + '/user'
    r = result = requests.post(url,
      json = {'username': username, 'password': password},
      headers = {'Content-Type': 'application/json'})

    return r.json()
