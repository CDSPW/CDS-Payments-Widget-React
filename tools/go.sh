echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
unset npm_config_prefix
 wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
 . ~/.nvm/nvm.sh
 nvm i
 nvm use
 sudo npm i -g yarn
 yarn
 npm run start
