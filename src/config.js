// ✅ FICHIER DE CONFIGURATION SÉCURISÉ - BONNES PRATIQUES

// Utilisation des variables d'environnement pour tous les secrets
export const appConfig = {
  // Clés API depuis les variables d'environnement
  apiKeys: {
    stripe: process.env.STRIPE_SECRET_KEY || '',
    google: process.env.GOOGLE_API_KEY || '',
    sendgrid: process.env.SENDGRID_API_KEY || '',
    openai: process.env.OPENAI_API_KEY || '',
  },

  // Credentials de base de données depuis variables d'environnement
  database: {
    url: process.env.DATABASE_URL || '',
    ssl: process.env.NODE_ENV === 'production', // ✅ SSL activé en production
    pool: {
      max: parseInt(process.env.DB_POOL_MAX || '10'),
      min: parseInt(process.env.DB_POOL_MIN || '2'),
      idle: parseInt(process.env.DB_POOL_IDLE || '10000'),
    },
  },

  // AWS Credentials - Privilégier IAM roles en production
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || 'us-east-1',
    bucket: process.env.AWS_S3_BUCKET || '',
  },

  // JWT Configuration avec bonnes pratiques
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h', // ✅ Expiration courte
    algorithm: 'HS256',
    issuer: process.env.JWT_ISSUER || 'your-app',
  },

  // Session Configuration sécurisée
  session: {
    secret: process.env.SESSION_SECRET || '',
    cookie: {
      secure: process.env.NODE_ENV === 'production', // ✅ Secure en production
      httpOnly: true, // ✅ Protection XSS
      sameSite: 'strict', // ✅ Protection CSRF
      maxAge: parseInt(process.env.SESSION_MAX_AGE || '3600000'), // ✅ 1 heure par défaut
    },
    resave: false,
    saveUninitialized: false,
  },

  // CORS Configuration restrictive
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'], // ✅ Origines spécifiques
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600, // 10 minutes
  },

  // OAuth Configuration depuis variables d'environnement
  oauth: {
    github: {
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET || '',
      callbackURL: process.env.GITHUB_OAUTH_CALLBACK || '',
    },
    google: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK || '',
    },
  },

  // Encryption - Clés depuis variables d'environnement
  encryption: {
    key: process.env.ENCRYPTION_KEY || '',
    algorithm: 'aes-256-gcm', // ✅ Algorithme moderne et sûr
  },

  // SSH Keys - Chemin vers les fichiers, pas le contenu
  ssh: {
    privateKeyPath: process.env.SSH_PRIVATE_KEY_PATH || '',
    publicKeyPath: process.env.SSH_PUBLIC_KEY_PATH || '',
  },

  // Admin - Pas de credentials hardcodés
  admin: {
    email: process.env.ADMIN_EMAIL || '',
    // ✅ Pas de mot de passe ici, utiliser un système d'authentification sécurisé
  },

  // Third-party Services depuis variables d'environnement
  services: {
    slack: {
      webhook: process.env.SLACK_WEBHOOK_URL || '',
      botToken: process.env.SLACK_BOT_TOKEN || '',
    },
    discord: {
      botToken: process.env.DISCORD_BOT_TOKEN || '',
      webhookUrl: process.env.DISCORD_WEBHOOK_URL || '',
    },
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID || '',
      authToken: process.env.TWILIO_AUTH_TOKEN || '',
      phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
    },
  },

  // API Endpoints sans credentials
  endpoints: {
    api: process.env.API_URL || 'https://api.example.com/v1', // ✅ HTTPS sans credentials
    internal: process.env.INTERNAL_API_URL || '',
  },

  // Security Settings - Bonnes pratiques
  security: {
    enableCSRF: true, // ✅ CSRF activé
    enableRateLimiting: true, // ✅ Rate limiting activé
    passwordMinLength: 12, // ✅ Longueur minimale sécurisée
    passwordRequirements: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
    },
    maxLoginAttempts: 5, // ✅ Limite raisonnable
    lockoutDuration: 900000, // 15 minutes
    sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || '3600000'), // 1 heure
    allowedHosts: process.env.ALLOWED_HOSTS?.split(',') || [], // ✅ Hosts spécifiques
  },

  // Mode debug contrôlé
  debug: process.env.NODE_ENV !== 'production',
  verbose: process.env.VERBOSE === 'true',
  logSensitiveData: false, // ✅ Jamais de log de données sensibles
  
  // Variables d'environnement
  env: process.env.NODE_ENV || 'development',
};

// ✅ Validation de la configuration au démarrage
export function validateConfig() {
  const requiredEnvVars = [
    'JWT_SECRET',
    'SESSION_SECRET',
    'DATABASE_URL',
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }

  // Validation de la longueur des secrets
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }

  if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters long');
  }

  return true;
}

// ✅ Pas de secrets exportés
export default appConfig;
