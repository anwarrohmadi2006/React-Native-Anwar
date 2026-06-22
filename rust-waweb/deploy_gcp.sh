#!/bin/bash

# Pastikan project sudah benar
gcloud config set project wa-web-496109

# Mengaktifkan Compute Engine API jika belum aktif
gcloud services enable compute.googleapis.com

echo "Membuat Virtual Machine e2-micro gratis di us-central1-a..."
gcloud compute instances create waweb-bot \
    --project=wa-web-496109 \
    --zone=us-central1-a \
    --machine-type=e2-micro \
    --image-family=debian-12 \
    --image-project=debian-cloud \
    --boot-disk-size=10GB

echo "Menunggu VM siap (15 detik)..."
sleep 15

echo "Membuat file konfigurasi bot..."
cat << 'EOF' > main.go
package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"go.mau.fi/whatsmeow"
	"go.mau.fi/whatsmeow/store/sqlstore"
	"go.mau.fi/whatsmeow/types/events"
	waLog "go.mau.fi/whatsmeow/util/log"

	_ "github.com/mattn/go-sqlite3"
)

func eventHandler(evt interface{}) {
	switch v := evt.(type) {
	case *events.Message:
		fmt.Printf("Pesan baru dari %s: %s\n", v.Info.Sender.User, v.Message.GetConversation())
	}
}

func main() {
	dbLog := waLog.Stdout("Database", "DEBUG", true)
	container, err := sqlstore.New("sqlite3", "file:/data/store.db?_foreign_keys=on", dbLog)
	if err != nil {
		panic(err)
	}

	deviceStore, err := container.GetFirstDevice()
	if err != nil {
		panic(err)
	}

	clientLog := waLog.Stdout("Client", "DEBUG", true)
	client := whatsmeow.NewClient(deviceStore, clientLog)
	client.AddEventHandler(eventHandler)

	if client.Store.ID == nil {
		qrChan, _ := client.GetQRChannel(context.Background())
		err = client.Connect()
		if err != nil {
			panic(err)
		}
		for evt := range qrChan {
			if evt.Event == "code" {
				fmt.Println("==================================================")
				fmt.Println("SCAN QR CODE BERIKUT INI UNTUK LOGIN:")
				fmt.Println(evt.Code)
				fmt.Println("Atau tunggu sampai log berikutnya muncul jika memakai library QR...")
				fmt.Println("==================================================")
			} else {
				fmt.Println("Login event:", evt.Event)
			}
		}
	} else {
		err = client.Connect()
		if err != nil {
			panic(err)
		}
	}

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	<-c

	client.Disconnect()
}
EOF

cat << 'EOF' > Dockerfile
FROM golang:1.22-alpine AS builder
RUN apk add --no-cache gcc musl-dev
WORKDIR /app
COPY main.go .
RUN go mod init wawebbot
RUN go get go.mau.fi/whatsmeow
RUN go get github.com/mattn/go-sqlite3
RUN go mod tidy
RUN CGO_ENABLED=1 GOOS=linux go build -o bot main.go

FROM alpine:latest
RUN apk add --no-cache tzdata
WORKDIR /app
COPY --from=builder /app/bot .
RUN mkdir -p /data
CMD ["./bot"]
EOF

echo "Mengirim file ke VM..."
gcloud compute scp main.go Dockerfile waweb-bot:~ --zone=us-central1-a

echo "Menginstal Docker dan Menjalankan Bot di VM..."
gcloud compute ssh waweb-bot --zone=us-central1-a --command="sudo apt-get update && sudo apt-get install -y docker.io && sudo systemctl enable --now docker && sudo docker build -t wawebbot . && sudo docker run -d --name bot --restart always -v /home/\$USER/wa_data:/data wawebbot"

echo "======================================================="
echo "Bot berhasil dibuat dan dijalankan di background!"
echo "Untuk melihat QR Code, jalankan perintah ini:"
echo "gcloud compute ssh waweb-bot --zone=us-central1-a --command=\"sudo docker logs -f bot\""
echo "======================================================="
