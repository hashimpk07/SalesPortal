/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-plugin-tsconfig-paths';

const reactImport = react;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactImport(), tsconfigPaths()],
    optimizeDeps: {
        include: ['@mui/material/Tooltip'],
    },
});
