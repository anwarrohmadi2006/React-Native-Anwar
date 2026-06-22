import modal
import os
import sys
import subprocess

# Define the Modal App
app = modal.App("nanotabpfn-plus-training")

# Define the container image with required dependencies
image = (
    modal.Image.debian_slim(python_version="3.10")
    .pip_install(
        "torch>=2.0.0",
        "numpy>=1.24.0",
        "scikit-learn>=1.3.0",
        "networkx>=3.0",
        "schedulefree>=1.0",
        "h5py>=3.9.0"
    )
    .add_local_dir(".", remote_path="/root/nanotabpfn")
)

# Define the remote function to run training
@app.function(
    image=image,
    gpu="H100", # Menggunakan GPU H100
    timeout=7200 # Timeout 2 jam
)
def run_training():
    print("Starting training on Modal with GPU...")
    
    # Change directory to where our code is mounted
    os.chdir("/root/nanotabpfn")
    
    # Run train.py
    result = subprocess.run([sys.executable, "train.py"], capture_output=True, text=True)
    
    if result.returncode == 0:
        print(result.stdout)
        print("Training completed successfully!")
        # Read the saved model to return it to the local machine
        if os.path.exists("nanotabpfn_plus.pt"):
            with open("nanotabpfn_plus.pt", "rb") as f:
                model_bytes = f.read()
            return model_bytes
        else:
            print("Warning: Model file 'nanotabpfn_plus.pt' not found after training.")
            return None
    else:
        print("--- STDOUT ---")
        print(result.stdout)
        print("--- STDERR ---")
        print(result.stderr)
        raise Exception("Training failed! Check the logs above.")

# Local entrypoint to trigger the training
@app.local_entrypoint()
def main():
    print("Menyebarkan (Deploying) dan menjalankan training di Modal...")
    
    # Call the remote function
    model_bytes = run_training.remote()
    
    if model_bytes:
        # Save the returned model bytes to a local file
        local_model_path = "nanotabpfn_plus_from_modal.pt"
        with open(local_model_path, "wb") as f:
            f.write(model_bytes)
        print(f"Training selesai! Model berhasil diunduh dan disimpan sebagai '{local_model_path}'")
