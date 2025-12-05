<!-- .docs/CI_CD_NX_CLOUD.md -->

# ☁️ Infraestructura CI/CD & Nx Cloud

> **Estado:** Activo | **Proveedor:** Nx Cloud + Vercel
> **Objetivo:** Acelerar builds mediante "Remote Caching" y asegurar despliegues atómicos.

---

## 1. Arquitectura de Caché Distribuido

Este proyecto utiliza **Nx Cloud** para memorizar el resultado de tareas computacionalmente costosas (`build`, `lint`, `test`).

### ¿Cómo funciona?
1.  Cuando ejecutas `pnpm build:web` en tu máquina local, Nx guarda el resultado en la nube.
2.  Cuando Vercel intenta hacer el build 1 minuto después, **no reconstruye nada**. Descarga el caché instantáneamente.
3.  **Resultado:** Tiempos de despliegue reducidos de minutos a segundos.

---

## 2. Configuración del Workspace

El archivo `nx.json` es la fuente de verdad para la vinculación.

*   **nxCloudId:** Identificador único público del proyecto.
*   **Gestión de Cambios:** Si Nx Cloud requiere cambios estructurales, lo hará mediante un **Pull Request** automático (bot) que debe ser aceptado (Merged) y luego descargado localmente (`git pull`).

---
