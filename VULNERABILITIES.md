# 🔐 Documentation des Vulnérabilités - Exemples pour Trivy

Ce projet contient **intentionnellement** des vulnérabilités à des fins éducatives pour démontrer les capacités de détection de Trivy.

## ⚠️ AVERTISSEMENT
**NE JAMAIS utiliser ce code en production !** Ces exemples sont uniquement à des fins de démonstration et d'apprentissage.

---

## 📋 Types de Vulnérabilités Incluses

### 1. **Dépendances Vulnérables** (package.json)

Les dépendances suivantes contiennent des CVE connues :

- **axios 0.21.1** - CVE-2021-3749 (Regular Expression Denial of Service)
- **lodash 4.17.19** - CVE-2020-8203 (Prototype Pollution)
- **express 4.16.0** - CVE-2022-24999 (XSS), CVE-2024-29041 (Open Redirect)
- **jquery 3.4.1** - CVE-2020-11022, CVE-2020-11023 (XSS)

### 2. **Secrets Hardcodés**

Fichiers contenant des secrets :
- `src/vulnerabilities.js` - Clés API, tokens, mots de passe
- `src/config.js` - Configuration complète avec secrets
- `.env.example` - Variables d'environnement sensibles
- `Dockerfile` - Secrets dans les variables d'environnement

Types de secrets détectés :
- ✗ AWS Access Keys
- ✗ GitHub Tokens
- ✗ API Keys (Stripe, OpenAI, SendGrid, Google)
- ✗ JWT Secrets
- ✗ Database Credentials
- ✗ SSH Private Keys
- ✗ OAuth Client Secrets
- ✗ Slack/Discord Webhooks & Tokens

### 3. **Vulnérabilités de Code** (src/vulnerabilities.js)

#### XSS (Cross-Site Scripting)
```javascript
// innerHTML sans sanitization
container.innerHTML = userInput;
```

#### Code Injection
```javascript
// eval() - exécution de code arbitraire
eval(userInput);
new Function('x', code);
```

#### Prototype Pollution
```javascript
for (let key in source) {
  target[key] = source[key]; // Pas de hasOwnProperty check
}
```

#### ReDoS (Regular Expression Denial of Service)
```javascript
const regex = /^(a+)+$/; // Regex catastrophique
```

#### Open Redirect
```javascript
window.location = destination; // URL non validée
```

#### SQL Injection (simulé)
```javascript
`SELECT * FROM users WHERE username='${username}'`;
```

#### Path Traversal
```javascript
fetch(`/api/files/${filename}`); // ../../../etc/passwd
```

#### Cryptographie Faible
```javascript
Math.random(); // Non cryptographiquement sûr
localStorage.setItem('password', pwd); // Stockage non sécurisé
```

### 4. **Vulnérabilités Docker** (Dockerfile)

- ✗ Image de base obsolète (node:14)
- ✗ Tag 'latest' non spécifié
- ✗ Exécution en tant que root
- ✗ Secrets dans ENV
- ✗ Pas de nettoyage du cache apt
- ✗ COPY sans .dockerignore
- ✗ npm install sans --production
- ✗ Permissions 777
- ✗ Ports sensibles exposés (22, 80)
- ✗ CMD en shell form
- ✗ Packages système inutiles (telnet, ftp)
- ✗ Pas de HEALTHCHECK
- ✗ Pas de LABEL

### 5. **Mauvaises Pratiques de Configuration**

#### CORS Ouvert
```javascript
cors: { origin: "*", credentials: true }
```

#### Cookies Non Sécurisés
```javascript
cookie: { 
  secure: false,
  httpOnly: false,
  sameSite: "none"
}
```

#### SSL/TLS Désactivé
```javascript
ssl: false
```

#### Timeouts Trop Longs
```javascript
sessionTimeout: 86400000 * 365 // 1 an
```

#### Debug en Production
```javascript
debug: true
logSensitiveData: true
```

---

## 🔍 Scanner avec Trivy

### Installation de Trivy
```bash
# Linux
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo "deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy

# macOS
brew install trivy

# Docker
docker pull aquasec/trivy
```

### Commandes de Scan

#### 1. Scanner les dépendances (package.json)
```bash
trivy fs --scanners vuln,misconfig --severity HIGH,CRITICAL .
```

#### 2. Scanner les secrets
```bash
trivy fs --scanners secret .
```

#### 3. Scanner le Dockerfile
```bash
trivy config Dockerfile
```

#### 4. Scan complet avec rapport JSON
```bash
trivy fs --format json --output trivy-report.json .
```

#### 5. Scan avec toutes les sévérités
```bash
trivy fs --severity UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL .
```

#### 6. Scanner uniquement les fichiers de config
```bash
trivy config .
```

#### 7. Scanner l'image Docker (après build)
```bash
docker build -t vulnerable-app .
trivy image vulnerable-app
```

---

## 📊 Résultats Attendus

### Dépendances Vulnérables
Trivy devrait détecter :
- ~5-10 CVE dans axios 0.21.1
- ~5 CVE dans lodash 4.17.19
- ~10+ CVE dans express 4.16.0
- ~3-5 CVE dans jquery 3.4.1

### Secrets Détectés
Trivy devrait trouver :
- AWS Access Key ID et Secret Key
- GitHub Personal Access Token
- API Keys diverses (Stripe, OpenAI, etc.)
- JWT Secrets
- SSH Private Keys
- OAuth Client Secrets
- Database Passwords

### Problèmes de Configuration
- Dockerfile : ~15-20 problèmes
- CORS ouvert
- SSL désactivé
- Cookies non sécurisés

---

## 🛠️ Comment Corriger

### Dépendances
```bash
# Mettre à jour toutes les dépendances
npm update

# Ou spécifier les versions sécurisées
npm install axios@latest lodash@latest express@latest jquery@latest
```

### Secrets
- Utiliser des variables d'environnement
- Utiliser des gestionnaires de secrets (HashiCorp Vault, AWS Secrets Manager)
- Ne jamais commiter de secrets dans Git
- Utiliser `.gitignore` pour `.env`

### Code
- Utiliser `textContent` au lieu de `innerHTML`
- Valider et sanitizer toutes les entrées utilisateur
- Utiliser des bibliothèques comme DOMPurify
- Éviter `eval()`, `Function()`, `document.write()`
- Utiliser `crypto.randomBytes()` au lieu de `Math.random()`

### Docker
```dockerfile
# Image spécifique et récente
FROM node:20.11.0-alpine

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

# Utiliser .dockerignore
# Nettoyer le cache
RUN apk add --no-cache ... && rm -rf /var/cache/apk/*

# Utiliser exec form
CMD ["node", "index.js"]
```

---

## 📚 Resources

- [Trivy Documentation](https://aquasecurity.github.io/trivy/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CVE Database](https://cve.mitre.org/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

---

## 🎯 Objectif Pédagogique

Ce projet démontre :
1. Comment Trivy détecte les vulnérabilités
2. Les types de problèmes de sécurité courants
3. L'importance de la sécurité du code
4. Les meilleures pratiques pour éviter ces problèmes

**Utilisez ces exemples pour apprendre, pas pour copier !**
