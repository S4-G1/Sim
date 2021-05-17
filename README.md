# Readme for running on linux.

### Exposed ports
* 5900 - **vnc**
* 81 - **website**
* 4840 - **UPC-UA**

### Running the beer simulator
`$ docker-compose up --force-recreate`

Open your browser [localhost:81/index.html?visuId=visu](http://localhost:81/index.html?visuId=visu)

open a **vnc client** and connect to localhost:5900
