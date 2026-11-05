# Builds the site and publishes site\dist to the gh-pages branch of shivamd2502.github.io
#   powershell -ExecutionPolicy Bypass -File D:\shivam_portfolio\deploy.ps1
# Commits on top of the existing gh-pages history (no force push).
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$env:Path = "$((Get-Content "$root\.tools\NODE_DIR.txt").Trim());C:\Program Files\Git\cmd;$env:Path"
$repo = "https://github.com/shivamd2502/shivamd2502.github.io.git"

Set-Location "$root\site"
npm run build
if ($LASTEXITCODE) { throw "build failed" }

$tmp = Join-Path $env:TEMP ("sd-pages-" + [guid]::NewGuid().ToString("N").Substring(0, 8))
git clone --quiet --branch gh-pages --single-branch $repo $tmp
if ($LASTEXITCODE) {  # first deployment: start an empty gh-pages branch
  New-Item -ItemType Directory -Force $tmp | Out-Null
  git -C $tmp init --quiet -b gh-pages
  git -C $tmp remote add origin $repo
}
Get-ChildItem $tmp -Force | Where-Object Name -ne ".git" | Remove-Item -Recurse -Force
Copy-Item "$root\site\dist\*" $tmp -Recurse -Force
New-Item -ItemType File -Force "$tmp\.nojekyll" | Out-Null
git -C $tmp add -A
git -C $tmp -c user.name="Shivam Dapkekar" commit --quiet -m "Deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git -C $tmp push --quiet origin gh-pages
Write-Host "Deployed. Live at https://shivamd2502.github.io (GitHub Pages may take ~1 minute)."
