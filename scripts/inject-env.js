const fs = require('fs');
const path = require('path');

// Path to the real environment file
const envFilePath = path.resolve(__dirname, '../src/environments/environment.prod.ts');

// Map of placeholders to actual ENV variable names
const replacements = {
  '__EMAILJS_SERVICE_ID__': process.env.NG_APP_EMAILJS_SERVICE_ID,
  '__EMAILJS_TEMPLATE_ID__': process.env.NG_APP_EMAILJS_TEMPLATE_ID,
  '__EMAILJS_PUBLIC_KEY__': process.env.NG_APP_EMAILJS_PUBLIC_KEY,
  '__RESERVATION_RECIPIENT__': process.env.NG_APP_RESERVATION_RECIPIENT,
};

// Validate that all required environment variables are present
const missing = Object.entries(replacements).filter(([_, value]) => !value);
if (missing.length > 0) {
  console.error('❌ Missing environment variables:');
  for (const [key, value] of missing) {
    console.error(`  ${key} → ${value}`);
  }
  process.exit(1);
}

// Read current environment.prod.ts content
let fileContent = fs.readFileSync(envFilePath, 'utf8');

// Replace all placeholders with actual env values
for (const [placeholder, value] of Object.entries(replacements)) {
  fileContent = fileContent.replaceAll(placeholder, JSON.stringify(value));
}

// Write the updated file back
fs.writeFileSync(envFilePath, fileContent, 'utf8');
console.log('✅ environment.prod.ts updated successfully with runtime values.');
