#!/bin/bash

# Project Validation Script
# Checks if all components are working correctly

echo "🔍 Validating Blockchain File Verification System..."
echo ""

# Check Node.js version
NODE_VERSION=$(node --version)
echo "✅ Node.js: $NODE_VERSION"

# Check if npm is installed
NPM_VERSION=$(npm --version)
echo "✅ npm: $NPM_VERSION"

# Check if dependencies are installed
if [ -d "node_modules" ]; then
    echo "✅ Root dependencies installed"
else
    echo "❌ Root dependencies missing - run 'npm install'"
    exit 1
fi

if [ -d "client/node_modules" ]; then
    echo "✅ Client dependencies installed"
else
    echo "❌ Client dependencies missing - run 'npm install --prefix client'"
    exit 1
fi

# Check if contracts compile
echo "🔨 Testing smart contract compilation..."
if npx hardhat compile > /dev/null 2>&1; then
    echo "✅ Smart contracts compile successfully"
else
    echo "❌ Smart contract compilation failed"
    exit 1
fi

# Check if tests pass
echo "🧪 Running smart contract tests..."
if npm test > /dev/null 2>&1; then
    echo "✅ All tests pass"
else
    echo "❌ Some tests failed"
    exit 1
fi

# Check file structure
REQUIRED_FILES=(
    "package.json"
    "hardhat.config.js" 
    "index.js"
    "contracts/FileVerification.sol"
    "scripts/deploy.js"
    "test/FileVerification.js"
    "client/package.json"
    "client/src/App.js"
    "README.md"
    ".gitignore"
    "LICENSE"
)

echo "📁 Checking file structure..."
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

echo ""
echo "🎉 All validations passed!"
echo ""
echo "📋 Next steps:"
echo "1. npm run node      # Start blockchain"
echo "2. npm run deploy    # Deploy contract"  
echo "3. npm start         # Start backend"
echo "4. npm run client    # Start frontend"
echo ""
echo "🌐 Access your app at http://localhost:3000"
