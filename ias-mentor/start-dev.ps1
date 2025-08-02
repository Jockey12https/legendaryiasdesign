# PowerShell script to start the development server
Write-Host "Starting IAS Mentor development server..." -ForegroundColor Green

# Change to the ias-mentor directory
Set-Location -Path ".\ias-mentor"

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the development server
Write-Host "Starting development server..." -ForegroundColor Green
npm run dev 