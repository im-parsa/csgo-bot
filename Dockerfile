FROM node:14.16.1-slim

ENV USER=csgo-bot

# install python and make
RUN apt-get update && \
	apt-get install -y python3 build-essential && \
	apt-get purge -y --auto-remove
	
# create csgo-bot user
RUN groupadd -r ${USER} && \
	useradd --create-home --home /home/csgo-bot -r -g ${USER} ${USER}
	
# set up volume and user
USER ${USER}
WORKDIR /home/csgo-bot

COPY package*.json ./
RUN npm install
VOLUME [ "/home/csgo-bot" ]

COPY . .

ENTRYPOINT [ "node", "index.js" ]
