// vite.config.ts
import { defineConfig } from 'vite';

// Pokud používáte nějaký UI framework (React, Vue, Svelte atd.),
// budete zde potřebovat importovat a použít jeho Vite plugin.
// Například pro React:
// import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        // react(), // Příklad pro React, pokud ho používáte. Pokud ne, může být pole prázdné: []
    ],
    base: '/bravery-by-wotebo/', // Nahraďte 'bravery-by-wotebo' přesným názvem vašeho repozitáře
    build: {
        outDir: 'dist', // Toto je výchozí, ale pro jistotu
    },
});