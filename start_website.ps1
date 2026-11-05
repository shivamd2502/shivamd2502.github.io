# Starts the portfolio website locally (live reload) using the portable Node.js in .tools
#   Right-click > Run with PowerShell, or:  powershell -ExecutionPolicy Bypass -File D:\shivam_portfolio\start_website.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$nodeDir = (Get-Content "$root\.tools\NODE_DIR.txt").Trim()
$env:Path = "$nodeDir;$env:Path"
Set-Location "$root\site"
if (-not (Test-Path node_modules)) { npm install }
Start-Process "http://localhost:5173"
npm run dev
