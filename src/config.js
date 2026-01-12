// ⚠️ FICHIER DE CONFIGURATION VULNÉRABLE ⚠️

// VULNÉRABILITÉ: Secrets hardcodés dans le code source
export const appConfig = {
  // Clés API hardcodées
  apiKeys: {
    stripe: "sk_live_51234567890abcdefghijklmnopqrstuvwxyz",
    google: "AIzaSyDaGmWKa4JsXZ-HjGw7ISLn_3namBGewQe",
    sendgrid: "SG.1234567890abcdefghijklmnopqrstuvwxyz",
    openai: "sk-proj-1234567890abcdefghijklmnopqrstuvwxyz",
  },

  // Credentials de base de données
  database: {
    host: "production-db.example.com",
    port: 5432,
    username: "admin",
    password: "SuperSecret123!",
    database: "production_db",
    ssl: false, // VULNÉRABILITÉ: SSL désactivé
  },

  // AWS Credentials
  aws: {
    accessKeyId: "AKIAIOSFODNN7EXAMPLE",
    secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    region: "us-east-1",
    bucket: "my-s3-bucket",
  },

  // JWT Configuration
  jwt: {
    secret: "my-insecure-jwt-secret-key",
    expiresIn: "365d", // VULNÉRABILITÉ: Expiration trop longue
    algorithm: "HS256",
  },

  // Session Configuration
  session: {
    secret: "keyboard-cat-session-secret",
    cookie: {
      secure: false, // VULNÉRABILITÉ: Cookies non sécurisés
      httpOnly: false, // VULNÉRABILITÉ: Accessible via JS
      sameSite: "none", // VULNÉRABILITÉ: CSRF possible
      maxAge: 86400000 * 365, // VULNÉRABILITÉ: 1 an
    },
  },

  // CORS Configuration
  cors: {
    origin: "*", // VULNÉRABILITÉ: CORS ouvert
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  },

  // OAuth Secrets
  oauth: {
    github: {
      clientId: "Iv1.1234567890abcdef",
      clientSecret: "1234567890abcdef1234567890abcdef12345678",
    },
    google: {
      clientId: "123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com",
      clientSecret: "GOCSPX-abcdefghijklmnopqrstuvwxyz",
    },
  },

  // Encryption Keys
  encryption: {
    key: "0123456789abcdef0123456789abcdef",
    iv: "fedcba9876543210",
    algorithm: "aes-256-cbc",
  },

  // Private SSH Key
  ssh: {
    privateKey: `-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
NhAAAAAwEAAQAAAYEA1234567890abcdefghijklmnop
-----END OPENSSH PRIVATE KEY-----`,
    publicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ... user@host",
  },

  // Admin Credentials
  admin: {
    username: "admin",
    password: "admin123", // VULNÉRABILITÉ: Mot de passe faible
    email: "admin@example.com",
    apiKey: "admin-api-key-12345",
  },

  // Third-party Services
  services: {
    slack: {
      webhook: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX",
      botToken: "xoxb-1234567890123-1234567890123-abcdefghijklmnopqrstuvwx",
    },
    discord: {
      botToken: "MTE1MjE5ODM4NDU2NzE5MTYwMg.G1a2b3.c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0",
      webhookUrl: "https://discord.com/api/webhooks/1234567890/abcdefghijklmnopqrstuvwxyz",
    },
    twilio: {
      accountSid: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      authToken: "your_auth_token_here",
      phoneNumber: "+1234567890",
    },
  },

  // API Endpoints with embedded credentials
  endpoints: {
    legacy: "http://admin:password@api.example.com/v1", // VULNÉRABILITÉ: HTTP + credentials dans URL
    internal: "https://internal-api.example.com?apiKey=1234567890abcdef",
  },

  // Security Settings (mauvaises pratiques)
  security: {
    enableCSRF: false, // VULNÉRABILITÉ: CSRF désactivé
    enableRateLimiting: false, // VULNÉRABILITÉ: Pas de rate limiting
    passwordMinLength: 4, // VULNÉRABILITÉ: Trop court
    maxLoginAttempts: 1000, // VULNÉRABILITÉ: Trop élevé
    sessionTimeout: 86400000 * 30, // VULNÉRABILITÉ: 30 jours
    allowedHosts: ["*"], // VULNÉRABILITÉ: Tous les hosts
  },

  // Debug mode activé
  debug: true,
  verbose: true,
  logSensitiveData: true, // VULNÉRABILITÉ: Log des données sensibles
};

// Token hardcodé
const BEARER_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// Password hash (MD5 - obsolète et non sécurisé)
const PASSWORD_HASH = "5f4dcc3b5aa765d61d8327deb882cf99"; // MD5 de "password"

export { BEARER_TOKEN, PASSWORD_HASH };
