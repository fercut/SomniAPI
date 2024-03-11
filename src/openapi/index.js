import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Función para cargar y parsear archivos YAML
export function parseYaml(file) {
    const filePath = resolve(__dirname, `./${file}.yml`);
    return yaml.load(readFileSync(filePath, 'utf8'));
}

// Definición del objeto swaggerDoc
export const swaggerDoc = {
    openapi: "3.0.0",
    info: {
        title: "Somni Joyas",
        description: "Venta de artículos de joyería",
    },
    paths: {
        ...parseYaml('orders'),
        ...parseYaml('users'),
        ...parseYaml('articles'),
    },
    components: {
        schemas: parseYaml('schemas'),
        securitySchemes: parseYaml('security'),
        examples: parseYaml('examples'),
        responses: parseYaml('responses'),
    },
};
