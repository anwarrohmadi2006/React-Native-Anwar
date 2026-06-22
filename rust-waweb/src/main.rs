use std::sync::Arc; 
use whatsapp_rust::bot::Bot; 
// Using the correct crate name for sqlite storage
use whatsapp_rust_sqlite_storage::SqliteStore; 
use whatsapp_rust::TokioRuntime; 
use whatsapp_rust_tokio_transport::TokioWebSocketTransportFactory; 
use whatsapp_rust_ureq_http_client::UreqHttpClient; 
use wacore::types::events::Event;

#[tokio::main] 
async fn main() -> Result<(), Box<dyn std::error::Error>> { 
    println!("Starting WhatsApp Rust Bot...");
    
    // Using /data path for persistent storage on Modal/Railway
    let db_path = "/data/whatsapp.db";
    let backend = Arc::new(SqliteStore::new(db_path).await?); 
    
    let mut bot = Bot::builder() 
        .with_backend(backend) 
        .with_transport_factory(TokioWebSocketTransportFactory::new()) 
        .with_http_client(UreqHttpClient::new()) 
        .with_runtime(TokioRuntime) 
        .on_event(|event, _client| async move { 
            // The event is wrapped in an Arc, so we need to dereference it for matching
            match *event { 
                Event::PairingQrCode { ref code, .. } => {
                    println!("\n==================================================");
                    println!("SCAN QR CODE BERIKUT INI UNTUK LOGIN:");
                    println!("{}", code);
                    println!("==================================================\n");
                }, 
                Event::Message(ref msg, ref info) => { 
                    println!("Pesan baru dari {}: {:?}", info.source.sender, msg); 
                } 
                _ => {} 
            } 
        }) 
        .build() 
        .await?; 
        
    println!("Bot successfully initialized! Waiting for events...");
    bot.run().await?.await?; 
    
    Ok(()) 
}
