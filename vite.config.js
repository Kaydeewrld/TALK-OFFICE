import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { pathToFileURL } from 'url';

// Vite dev middleware to emulate Vercel serverless functions locally
function vercelApiDevPlugin() {
  return {
    name: 'vercel-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) {
          return next();
        }

        const urlPath = req.url.split('?')[0].replace('/api/', '');
        const handlerPath = path.resolve(process.cwd(), 'api', `${urlPath}.js`);

        try {
          // Parse json body for POST / PUT requests
          let body = {};
          if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const buffers = [];
            for await (const chunk of req) {
              buffers.push(chunk);
            }
            const rawBody = Buffer.concat(buffers).toString();
            try {
              body = rawBody ? JSON.parse(rawBody) : {};
            } catch {
              body = {};
            }
          }

          req.body = body;

          // Polyfill res.status and res.json for compatibility with Vercel serverless functions
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };

          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return res;
          };

          const fileUrl = pathToFileURL(handlerPath).href;
          const module = await import(`${fileUrl}?t=${Date.now()}`);
          if (module.default) {
            await module.default(req, res);
          } else {
            res.status(404).json({ error: `No handler found in ${urlPath}.js` });
          }
        } catch (error) {
          console.error(`Error in /api/${urlPath}:`, error);
          res.status(500).json({ error: error.message || 'Server error' });
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), vercelApiDevPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    host: true,
    open: false
  }
});
