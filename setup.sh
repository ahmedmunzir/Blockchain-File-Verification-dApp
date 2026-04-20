#!/bin/bash

# Blockchain File Verification System - Development Setup Script
# This script sets up the entire development environment

echo "🚀 Setting up Blockchain File Verification System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client && npm install && cd ..

# Compile smart contracts
echo "🔨 Compiling smart contracts..."
npx hardhat compile

echo ""
echo "✨ Setup complete! Here's what to do next:"
echo ""
echo "1️⃣  Start local blockchain:"
echo "   npm run node"
echo ""
echo "2️⃣  Deploy smart contract (in new terminal):"
echo "   npm run deploy"
echo ""
echo "3️⃣  Start backend server (in new terminal):"
echo "   npm start"
echo ""
echo "4️⃣  Start frontend (in new terminal):"
echo "   npm run client"
echo ""
echo "🎉 Your blockchain file verification system will be ready at http://localhost:3000"
