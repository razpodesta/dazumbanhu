/**
 * @file generate-dictionary.js
 * @description Generador de Diccionarios Type-Safe con arquitectura de carpetas por idioma.
 *              Genera: src/generated/[lang]/dictionary.ts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Rutas
const PROJECT_ROOT = path.resolve(__dirname, '../../../../'); // Raíz del monorepo
const LIB_ROOT = path.join(__dirname, '../'); // Raíz de la librería
const SRC_DIR = path.join(LIB_ROOT, 'src/raw');
const OUT_DIR_BASE = path.join(LIB_ROOT, 'src/generated');

// Idioma por defecto (para exportaciones rápidas)
const DEFAULT_LANG = 'pt';

const toCamelCase = (str) => "Import Hell" en el frontend.
3.  **Robustez:** Mejor manejo de errores y rutas.

Copia y pega este contenido en **`libs/shared/util-content/scripts/generate-dictionary.js`**:

```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Configuración de Entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas relativas al script
const ROOT_DIR = path.resolve(__dirname, '../../../../'); // Raíz del Monorepo (ajustar según profundidad)
const SRC_DIR = path.join(__dirname, '../src/raw');
const OUT_DIR = path.join(__dirname, '../src/generated');

// Configuración del Generador
const DEFAULT_LANG = 'pt';
const FILE_NAME = 'dictionary.ts';

// 2. Helpers
const toCamelCase = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

async function generate() {
  console.log('📚 [Content Engine] Iniciando generación de diccionario...');

  // Validación de entrada
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`❌ Error Crítico: No existe el directorio fuente: ${SRC_DIR}`);
    process.exit(1);
  }

  // Asegurar directorio de salida
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  // 3. Escaneo de Idiomas (Estructura de Carpetas)
  const items = fs.readdirSync(SRC_DIR, { withFileTypes: true });
  const languages = items.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

  // Fallback si no hay carpetas (Migración legacy)
  const langsToProcess = languages.length > 0 ? languages : [DEFAULT_LANG];
  const isFlatStructure = languages.length === 0;

  const masterDictionary = {};

  // 4. Procesamiento de Archivos JSON
  langsToProcess.forEach(lang => {
    console.log(`   🌐 Idioma detectado: [${lang}]`);
    const langDir = isFlatStructure ? SRC_DIR : path.join(SRC_DIR, lang);
 str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

async function generate() {
  console.log('📚 [Content Engine] Iniciando generación atómica por idioma...');

  if (!fs.existsSync(SRC_DIR)) {
    console.error(`❌ Error: No existe ${SRC_DIR}`);
    process.exit(1);
  }

  // Detectar carpetas de idiomas
  const items = fs.readdirSync(SRC_DIR, { withFileTypes: true });
  const languages = items.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

  // Soporte legacy (si no hay carpetas, forzamos 'pt')
  const langsToProcess = languages.length > 0 ? languages : [DEFAULT_LANG];
  const isFlatStructure = languages.length === 0;

  langsToProcess.forEach(lang => {
    const langDir = isFlatStructure ? SRC_DIR : path.join(SRC_DIR, lang);
    const outLangDir = path.join(OUT_DIR_BASE, lang);
    const files = fs.readdirSync
    if (!fs.existsSync(langDir)) return;

    const files = fs.readdirSync(langDir).filter(file => file.endsWith('.json'));

    masterDictionary[lang] = {};

    files.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(langDir, file), 'utf-8');
        const namespace = toCamelCase(file.replace('.json', ''));
        masterDictionary[lang][namespace] = JSON.parse(content);
        console.log(`      ✨ Namespace agregado: ${namespace}`);
      } catch (err) {
        console.error(`      ❌ Error parseando ${file}:`, err.message);
      }
    });
  });

  // 5. Construcción del Archivo TypeScript
  const fullOutputPath = path.join(OUT_DIR, FILE_NAME);

  // Calculamos la ruta relativa desde la raíz del proyecto para el comentario
  const relativePath = path.relative(ROOT_DIR, fullOutputPath).replace(/\\/g, '/');

  const fileContent = `
/**
 * ------------------------------------------------------------------
 * ⚠️ ARCHIVO GENERADO AUTOMÁTICAMENTE - NO EDITAR MANUALMENTE
 * ------------------------------------------------------------------
 * Origen de datos: libs/shared/util-content/src/raw
 * Generado en:     ${relativePath}
 * Fecha:           ${new Date().toISOString()}
 * ------------------------------------------------------------------
 */

export const i18nDictionary = ${JSON.stringify(masterDictionary, null, 2)} as const(langDir).filter(file => file.endsWith('.json'));

    const dictionaryData = {};

    console.log(`   🌐 Procesando idioma: [${lang}]`);

    files.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(langDir, file), 'utf-8');
        const namespace = toCamelCase(file.replace('.json', ''));
        dictionaryData[namespace] = JSON.parse(content);
        console.log(`      ✨ Namespace: ${namespace}`);
      } catch (err) {
        console.error(`      ❌ Error en ${file}:`, err.message);
      }
    });

    // Crear directorio de salida si no existe (libs/shared/util-content/src/generated/pt)
    if (!fs.existsSync(outLangDir)) {
      fs.mkdirSync(outLangDir, { recursive: true });
    }

    const outputFilePath = path.join(outLangDir, 'dictionary.ts');

    // Calculamos la ruta relativa para el comentario del header (UX para el dev)
    const relativePath = path.relative(PROJECT_ROOT, outputFilePath).replace(/\\/g, '/');

    // Nombre de variable único para evitar colisiones (ej: ptDictionary)
    const varName = `${lang}Dictionary`;

    const fileContent = `
/**
 * ;

/**
 * Exportación directa del idioma por defecto ('${DEFAULT_LANG}')
 * Utilizado para acceso rápido sin selectores de idioma complejos.
 */
export const ContentDictionary = i18nDictionary['${DEFAULT_LANG}'];

export type DictionaryType = typeof ContentDictionary;
export type I18nDictionaryType = typeof i18nDictionary;
`;

  // 6. Escritura en Disco
  fs.writeFileSync(fullOutputPath, fileContent);
  console.log(`✅ [Content Engine] Diccionario generado exitosamente en: ${relativePath}\n`);
}

generate();
