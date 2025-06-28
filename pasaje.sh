#!/bin/bash
set -e

current_branch=$(git rev-parse --abbrev-ref HEAD)

echo "Cambiando a la rama main..."
git checkout main

echo "Obteniendo ultimos cambios de origin/main..."
git pull origin main

echo "Haciendo push de la rama main..."
git push origin main

echo "Cambiando a la rama produccion..."
git checkout produccion

echo "Haciendo merge de la rama main en produccion..."
git merge main -m "Merge main a producción"

echo "Haciendo push de la rama produccion..."
git push origin produccion

echo "Volviendo a la rama main..."
git checkout main

echo "Proceso completado. Regresando a ${current_branch} si es necesario."
