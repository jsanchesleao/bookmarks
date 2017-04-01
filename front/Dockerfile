FROM ubuntu:16.10

RUN apt-get update
RUN apt-get install -y nginx

RUN apt-get install -y python python-dev python-pip python-virtualenv
RUN rm -rf /var/lib/apt/lists/*
RUN pip install --upgrade pip

RUN pip install Flask

RUN mkdir -p /opt/app

ADD . /opt/app

EXPOSE 5000

CMD bash
