import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Reconstruimos __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_DIR = path.join(__dirname, '../src/raw');
const OUTPUT_FILE = path.join(__dirname, '../src/generated/dictionary.ts');

const toCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

async function generate() {
  console.log('📚 [Content Engine] Generando diccionario de textos...');

  if (!fs.existsSync(RAW_DIR)) {
    console.error('❌ No se encontró la carpeta src/raw');
    process.exit(1);
  }

  const files = fs.readdirSync(RAW_DIR).filter(file => file.endsWith('.json'));
  const dictionary = {};

  files.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(RAW_DIR, file), 'utf-8');
      const key = toCamelCase(file.replace('.json', ''));
      dictionary[key] = JSON.parse(content);
      console.log(`   ✨ Procesado: ${file} -> key: ${key}`);
    } catch (error) {
      console.error(`   ❌ Error procesando ${file}:`, error.message);
    }
  });

  const fileContent = `
/**
 * ------------------------------------------------------------------
 * ⚠️ ARCHIVO GENERADO AUTOMÁTICAMENTE - NO EDITAR MANUALMENTE
 * ------------------------------------------------------------------
 * Para modificar textos, edita los archivos JSON en:
 * libs/shared/util-content/src/raw/
 *
 * Generado el: ${new Date().toISOString()}
 */

export const ContentDictionary = ${JSON.stringify(dictionary, null, 2)} as const;
`;

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log('✅ [Content Engine] Diccionario generado exitosamente.\n');
}

generate();
