FROM python:latest
LABEL author="aderajew mengistu"

RUN apt-get update
RUN mkdir /usr/src/app
# RUN mkdir /usr/src/app/backend

WORKDIR /usr/src/app

COPY . ./
RUN pip install -r requirements.txt
EXPOSE 8000