FROM ubuntu:16.10

RUN apt-get update
RUN apt-get install -y nginx

RUN apt-get install -y python python-dev python-pip python-virtualenv
RUN rm -rf /var/lib/apt/lists/*
RUN pip install --upgrade pip

RUN pip install Flask
RUN pip install requests

RUN mkdir -p /opt/app

ADD ./src /opt/app/src
ADD ./static /opt/app/static
ADD ./start.sh /opt/app/start.sh

ADD ./scripts/nginx.conf /etc/nginx/sites-enabled/default

EXPOSE 5000
EXPOSE 80

WORKDIR /opt/app

CMD ./start.sh
