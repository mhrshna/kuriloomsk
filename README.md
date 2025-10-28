# kuriloomsk

### DOCKER

docker build -t kurilohtml .
docker stop $(docker ps -aq) && docker rm $(docker ps -aq) && docker run -d -p 80:80 -v "C:\Users\macda\OneDrive\Рабочий стол\Kuriloomsk\html:/usr/share/nginx/html" --name kurilo kurilohtml

