FROM ubuntu:18.04

RUN dpkg --add-architecture i386
RUN apt update
RUN apt install -y wine32 xvfb

WORKDIR /usr/scr/app
COPY ./Simulation/ .

CMD ["./start.sh"]
