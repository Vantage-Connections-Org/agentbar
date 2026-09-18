<#
  Builds AgentBar and installs it for the current user.

    .\install.ps1                      build, install, add a Start menu shortcut, launch
    .\install.ps1 -StartWithWindows    ...and launch it at login

  Installs to %LOCALAPPDATA%\AgentBar (AgentBar.exe + hooks\agent-status.js).
  Needs the .NET 8 SDK (winget install Microsoft.DotNet.SDK.8).
#>
[CmdletBinding()]
param([switch]$StartWithWindows)

$ErrorActionPreference = 'Stop'
$dest = Join-Path $env:LOCALAPPDATA 'AgentBar'
$exe = Join-Path $dest 'AgentBar.exe'

if (-not (Get-Command dotnet -ErrorAction SilentlyContinue)) {
  throw '.NET 8 SDK not found. Install it with: winget install Microsoft.DotNet.SDK.8'
}

# A running copy locks the exe.
Get-Process AgentBar -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Milliseconds 500

Write-Host "Building AgentBar -> $dest"
dotnet publish "$PSScriptRoot\src\AgentBar.csproj" -c Release -r win-x64 --self-contained false `
  -p:PublishSingleFile=true -o $dest --nologo -v quiet
if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }

New-Item -ItemType Directory -Force (Join-Path $dest 'hooks') | Out-Null
Copy-Item "$PSScriptRoot\hooks\agent-status.js" (Join-Path $dest 'hooks') -Force

$shortcut = Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs\AgentBar.lnk'
$s = (New-Object -ComObject WScript.Shell).CreateShortcut($shortcut)
$s.TargetPath = $exe
$s.WorkingDirectory = $dest
$s.Description = 'Claude Code and Codex chat status in the taskbar'
$s.Save()

if ($StartWithWindows) {
  Set-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run' -Name 'AgentBar' -Value "`"$exe`""
}

Start-Process $exe
Write-Host "AgentBar is running. Optional hooks: see README (hook script at $dest\hooks\agent-status.js)."
