<#
  Removes AgentBar: stops it, removes the login entry and Start menu shortcut,
  and deletes %LOCALAPPDATA%\AgentBar. Hook entries you added to Claude Code /
  Codex settings are left for you to remove.
#>
$ErrorActionPreference = 'SilentlyContinue'
Get-Process AgentBar | Stop-Process -Force
Remove-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run' -Name 'AgentBar'
Remove-Item (Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs\AgentBar.lnk')
Start-Sleep -Milliseconds 500
Remove-Item (Join-Path $env:LOCALAPPDATA 'AgentBar') -Recurse -Force
Write-Host 'AgentBar removed.'
