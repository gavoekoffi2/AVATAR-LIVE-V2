#!/bin/bash

# AvatarLive — LiveKit Server Setup Script
# Run this on your VPS to set up LiveKit

echo "🚀 Setting up LiveKit for AvatarLive..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Installing..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    echo "✅ Docker installed"
fi

# Check if docker-compose is installed
if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install it."
    exit 1
fi

# Generate LiveKit keys
echo "🔑 Generating LiveKit API keys..."
KEYS=$(docker run --rm livekit/livekit-server generate-keys 2>/dev/null)
echo "Generated keys:"
echo "$KEYS"
echo ""
echo "⚠️  Save these keys! Add them to your .env.local file:"
echo "LIVEKIT_API_KEY=<api-key>"
echo "LIVEKIT_API_SECRET=<api-secret>"
echo ""

# Install FFmpeg for RTMP bridge
echo "📦 Installing FFmpeg..."
apt-get update -qq && apt-get install -y -qq ffmpeg > /dev/null 2>&1
echo "✅ FFmpeg installed"

# Start LiveKit
echo "🎬 Starting LiveKit server..."
cd "$(dirname "$0")/../livekit-server"
docker compose up -d
echo "✅ LiveKit server started on port 7880"

echo ""
echo "🎉 Setup complete!"
echo "LiveKit WebSocket URL: ws://$(hostname -I | awk '{print $1}'):7880"
echo ""
echo "Next steps:"
echo "1. Update livekit-server/livekit.yaml with your generated keys"
echo "2. Update .env.local with your keys and the WebSocket URL"
echo "3. Set up SSL/TLS for production (required for getUserMedia)"
