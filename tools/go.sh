echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
unset npm_config_prefix
 . ~/.nvm/nvm.sh
 nvm i
 nvm use
 npm i
 npm run start
