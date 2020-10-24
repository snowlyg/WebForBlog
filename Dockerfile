# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.

FROM nginx

LABEL maintainer="snowlyg <569616226@qq.com>"

COPY dist/static /www/blog/static
COPY dist/favicon.ico /www/blog/favicon.ico
COPY dist/index.html /www/blog/index.html


# Document that the service listens on port 80
EXPOSE 80
