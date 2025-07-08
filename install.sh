#!/bin/bash

echo "Démarrage de l'installation de la plateforme administrative..."

# Étape 1 : Vérification que Docker est bien installé
if ! command -v docker &> /dev/null
then
    echo " Docker n'est pas installé. Veuillez l'installer d'abord : https://docs.docker.com/get-docker/"
    exit 1
fi

# Étape 2 : Vérification que Docker Compose est installé
if ! command -v docker compose &> /dev/null
then
    echo " Docker Compose n'est pas installé ou mal configuré. Veuillez installer Docker Compose v2+."
    exit 1
fi

# Étape 3 : Positionner le dossier projet si besoin
echo " Déplacement dans le dossier du projet..."
cd "$(dirname "$0")"

# Étape 4 : Nettoyage (optionnel)
echo " Nettoyage des anciens conteneurs et images (optionnel)..."
docker compose down --volumes --remove-orphans

# Étape 5 : Build et lancement
echo " Construction et démarrage des conteneurs..."
docker compose up --build -d

# Étape 6 : Vérification
echo " Vérification des conteneurs actifs..."
docker ps

echo " L'application est installée et fonctionne sur :"
echo "   Frontend : http://localhost:3000"
echo "   Backend API : http://localhost:8080"
echo "   Base de données : accessible sur port 3306 (MySQL)"

exit 0
