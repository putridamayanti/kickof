FROM golang:1.22-alpine

WORKDIR /app
COPY . .
RUN go mod tidy

COPY *.go ./

RUN go build -o /kickof-go

EXPOSE 8080

CMD [ "/kickof-go" ]