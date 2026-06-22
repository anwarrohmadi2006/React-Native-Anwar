import modal
import os
import subprocess

# Define the app
app = modal.App("whatsapp-rust-bot")

# Create a persistent volume for the WhatsApp session
# This ensures that your QR code login is saved even if the app restarts
session_volume = modal.NetworkFileSystem.from_name("whatsapp-session-storage", create_if_missing=True)

# Define the image: Debian Slim + Rust + Build dependencies
# We use add_local_dir with copy=True to include the source code in the image build
bot_image = (
    modal.Image.debian_slim()
    .apt_install("curl", "gcc", "pkg-config", "libsqlite3-dev", "ca-certificates", "build-essential")
    .run_commands(
        "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y",
    )
    .env({"PATH": "/root/.cargo/bin:$PATH"})
    .add_local_dir("src", remote_path="/root/src", copy=True)
    .add_local_file("Cargo.toml", remote_path="/root/Cargo.toml", copy=True)
    .run_commands(
        "cd /root && cargo build --release"
    )
)

@app.function(
    image=bot_image,
    network_file_systems={"/data": session_volume},
    cpu=0.25,
    memory=128,
    timeout=86400, # Run for up to 24 hours
)
def run_bot():
    print("🚀 Starting WhatsApp Rust Bot on Modal...")
    # The database path should match what's in src/main.rs (/data/whatsapp.db)
    # We use subprocess to run the compiled Rust binary
    process = subprocess.Popen(["/root/target/release/wawebbot"])
    process.wait()

@app.local_entrypoint()
def main():
    run_bot.remote()
