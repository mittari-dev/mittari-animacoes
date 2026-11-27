# Instala a Indústria de Postagem como a skill "industria-de-postagem".
# Disco NTFS: cria uma junção (atalho de pasta), que acompanha o repositório sozinha.
# exFAT (o D: deste notebook): não aceita junção, então copia. Rode de novo depois de cada "git pull".
# Uso: powershell -ExecutionPolicy Bypass -File ferramentas\instalar-industria.ps1

$origem = (Resolve-Path (Join-Path $PSScriptRoot "..\industria")).Path
$destinos = @(
  "C:\ClaudeCache\skills",                # Claude Code da Central
  "D:\dev\.tools\claude\skills",          # ~/.claude/skills
  "D:\dev\.tools\gemini\config\skills"    # agy
)

foreach ($pasta in $destinos) {
  if (-not (Test-Path $pasta)) { Write-Host "pulado (não existe): $pasta"; continue }
  $alvo = Join-Path $pasta "industria-de-postagem"
  $item = Get-Item $alvo -ErrorAction SilentlyContinue
  if ($item) {
    if ($item.LinkType) {
      if ($item.Target -contains $origem) { Write-Host "já ligado: $alvo"; continue }
      $item.Delete()                       # remove só o atalho, não o conteúdo
    } elseif (-not (Test-Path (Join-Path $alvo ".instalado-pela-industria"))) {
      Write-Host "PARADO: $alvo existe e não foi criado por este script. Guarde ou apague à mão e rode de novo."
      continue
    }
  }
  $fs = (Get-Volume -DriveLetter $pasta.Substring(0,1)).FileSystemType
  if ($fs -eq "NTFS") {
    if (Test-Path $alvo) { Remove-Item $alvo -Recurse -Force }
    New-Item -ItemType Junction -Path $alvo -Target $origem | Out-Null
    Write-Host "ligado:  $alvo -> $origem"
  } else {
    robocopy $origem $alvo /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
    New-Item -ItemType File -Path (Join-Path $alvo ".instalado-pela-industria") -Force | Out-Null
    Write-Host "copiado: $alvo ($fs não aceita junção; rode de novo depois de git pull)"
  }
}
