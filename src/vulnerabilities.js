// ⚠️ FICHIER D'EXEMPLES DE VULNÉRABILITÉS - NE PAS UTILISER EN PRODUCTION ⚠️

// VULNÉRABILITÉ 1: Secrets hardcodés
const API_KEY = "sk-1234567890abcdefghijklmnopqrstuvwxyz";
const DATABASE_PASSWORD = "admin123";
const AWS_SECRET = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
const GITHUB_TOKEN = "ghp_1234567890abcdefghijklmnopqrstuvwxyz";

// VULNÉRABILITÉ 2: eval() - Exécution de code arbitraire
export function dangerousEval(userInput) {
  // eval est extrêmement dangereux car il exécute du code JavaScript arbitraire
  return eval(userInput);
}

// VULNÉRABILITÉ 3: innerHTML avec données non sanitisées - XSS (Cross-Site Scripting)
export function renderUserContent(userInput) {
  const container = document.getElementById('user-content');
  // Injection XSS possible: <img src=x onerror=alert('XSS')>
  container.innerHTML = userInput;
}

// VULNÉRABILITÉ 4: document.write avec données non sanitisées
export function writeToDocument(data) {
  document.write(data); // Peut injecter du code malveillant
}

// VULNÉRABILITÉ 5: Utilisation de Function() constructor (comme eval)
export function createDynamicFunction(code) {
  const fn = new Function('x', code);
  return fn;
}

// VULNÉRABILITÉ 6: RegEx Denial of Service (ReDoS)
export function vulnerableRegex(input) {
  // Cette regex est vulnérable au ReDoS
  const regex = /^(a+)+$/;
  return regex.test(input);
}

// VULNÉRABILITÉ 7: Prototype Pollution
export function mergeObjects(target, source) {
  for (let key in source) {
    // Pas de vérification de hasOwnProperty - permet prototype pollution
    target[key] = source[key];
  }
  return target;
}

// VULNÉRABILITÉ 8: Utilisation de cookies sans flags de sécurité
export function setUnsafeCookie(name, value) {
  // Pas de Secure, HttpOnly, SameSite
  document.cookie = `${name}=${value}`;
}

// VULNÉRABILITÉ 9: Récupération de données sensibles sans validation
export async function fetchDataUnsafe(url) {
  // Pas de validation de l'URL - SSRF possible
  const response = await fetch(url);
  return response.json();
}

// VULNÉRABILITÉ 10: Stockage de données sensibles dans localStorage
export function storeSensitiveData(token, password) {
  localStorage.setItem('authToken', token);
  localStorage.setItem('password', password); // Jamais stocker les mots de passe en clair
}

// VULNÉRABILITÉ 11: Utilisation de window.location avec données non validées
export function redirectUser(destination) {
  // Open Redirect vulnerability
  window.location = destination;
}

// VULNÉRABILITÉ 12: SQL Injection (simulé)
export function buildSQLQuery(username, password) {
  // Si cela était envoyé à un backend
  return `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
}

// VULNÉRABILITÉ 13: Path Traversal
export function readFile(filename) {
  // Permettrait d'accéder à des fichiers arbitraires: ../../../etc/passwd
  return fetch(`/api/files/${filename}`);
}

// VULNÉRABILITÉ 14: Utilisation de Math.random() pour la sécurité
export function generateToken() {
  // Math.random() n'est pas cryptographiquement sûr
  return Math.random().toString(36).substring(2);
}

// VULNÉRABILITÉ 15: CORS ouvert
export function setupCORS(req, res) {
  // Permet à n'importe quelle origine d'accéder aux ressources
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
}

// Configuration vulnérable
export const config = {
  apiEndpoint: "http://api.example.com", // HTTP au lieu de HTTPS
  apiKey: API_KEY,
  debug: true, // Debug activé en production
  allowedOrigins: ['*'], // CORS ouvert
  sessionTimeout: 86400000, // 24h - trop long
  passwordMinLength: 4, // Trop court
};

console.log("⚠️ Ce fichier contient des exemples de vulnérabilités à des fins éducatives");
