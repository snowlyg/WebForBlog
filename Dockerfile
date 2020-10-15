# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.

FROM golang:1.14

LABEL maintainer="snowlyg <569616226@qq.com>"

# Run the command by default when the container starts.
ENTRYPOINT /go/src/github.com/snowlyg/WebForBlog/dist

# Document that the service listens on port 80
EXPOSE 80
