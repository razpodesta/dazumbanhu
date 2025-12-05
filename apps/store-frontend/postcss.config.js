const { join } = require('path');

module.exports = {
  plugins: {
    // CAMBIO CRÍTICO: Usar el nuevo paquete para Tailwind v4
    '@tailwindcss/postcss': {
      // En v4, la configuración vive en CSS, pero mantenemos esto por compatibilidad si es necesario
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
