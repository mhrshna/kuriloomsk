FROM nginx:bookworm
# COPY KuriloOmsk_clean.html /usr/share/nginx/html/index.html

RUN apt-get update && apt-get install -y git