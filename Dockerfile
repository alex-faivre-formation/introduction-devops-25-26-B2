# ⚠️ DOCKERFILE VULNÉRABLE - EXEMPLES DE MAUVAISES PRATIQUES ⚠️

# VULNÉRABILITÉ 1: Image de base obsolète sans tag spécifique (utilise 'latest')
FROM node:14

# VULNÉRABILITÉ 2: Exécution en tant que root (pas de USER défini)

# VULNÉRABILITÉ 3: Secrets hardcodés dans le Dockerfile
ENV DATABASE_PASSWORD=admin123
ENV API_SECRET_KEY=sk-1234567890abcdefghijklmnopqrstuvwxyz
ENV AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
ENV AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# VULNÉRABILITÉ 4: Installation de paquets sans nettoyer le cache
RUN apt-get update && \
    apt-get install -y curl wget git vim

# VULNÉRABILITÉ 5: COPY de tous les fichiers (y compris .git, node_modules, etc.)
WORKDIR /app
COPY . .

# VULNÉRABILITÉ 6: npm install sans --production et sans lock file
RUN npm install

# VULNÉRABILITÉ 7: Port exposé sans restriction
EXPOSE 80
EXPOSE 3000
EXPOSE 22

# VULNÉRABILITÉ 8: Commande exécutée en shell form (peut être exploitée)
CMD npm start

# VULNÉRABILITÉ 9: Permissions trop permissives
RUN chmod 777 /app

# VULNÉRABILITÉ 10: Installation de packages système non nécessaires
RUN apt-get install -y telnet ftp netcat

# VULNÉRABILITÉ 11: Pas de healthcheck défini
# VULNÉRABILITÉ 12: Pas de métadonnées (LABEL)
