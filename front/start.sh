#!/bin/bash

service nginx start &
python src/app.py
