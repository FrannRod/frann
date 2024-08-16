#!/bin/bash

# Hacer push de la rama main
echo "Haciendo push de la rama main..."
git push origin main

# Cambiar a la rama produccion
echo "Cambiando a la rama produccion..."
git checkout produccion

# Hacer merge de la rama main en produccion
echo "Haciendo merge de la rama main en produccion..."
git merge main -m "Merge main a producción"

# Hacer push de la rama produccion
echo "Haciendo push de la rama produccion..."
git push origin produccion

# Volver a la rama main
echo "Volviendo a la rama main..."
git checkout main

echo "Proceso completado."