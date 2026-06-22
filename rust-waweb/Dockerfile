FROM golang:1.22-alpine AS builder

# Install required packages for CGO (sqlite3 needs it)
RUN apk add --no-cache gcc musl-dev

WORKDIR /app

# Copy the go code
COPY main.go .

# Initialize and download dependencies
RUN go mod init wawebbot
RUN go get go.mau.fi/whatsmeow
RUN go get github.com/mattn/go-sqlite3
RUN go mod tidy

# Build the binary
RUN CGO_ENABLED=1 GOOS=linux go build -o bot main.go

# Production stage
FROM alpine:latest
RUN apk add --no-cache tzdata
WORKDIR /app
COPY --from=builder /app/bot .

# Create the data directory for SQLite
RUN mkdir -p /data

CMD ["./bot"]
