# Étape 1 : Build de l'application
FROM node:20-alpine as build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./
RUN npm install

# Copier tout le reste du projet
COPY . .

# Compiler l'application React pour la production
RUN npm run build

# Étape 2 : Servir les fichiers avec Nginx
FROM nginx:alpine

# Copier le build dans le dossier que Nginx sert
COPY --from=build /app/build /usr/share/nginx/html

# Supprimer la config par défaut et copier la tienne (optionnel)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
