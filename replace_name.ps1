$files = Get-ChildItem -Path "resources/js" -Include "*.tsx","*.ts" -Recurse
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match 'Business Intelligence HUV') {
        $content = $content -replace 'Business Intelligence HUV', 'Tableros de Gestión HUV'
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}
Write-Host "Replacement complete!"
