# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Gemini analytics backend

The analytics summary endpoint uses Google's Gemini API through the official
`@google/genai` SDK. Copy `.env.example` to `.env`, set your Google AI Studio
key in `GEMINI_API_KEY`, and start the backend in a second terminal:

```bash
npm run backend
```

`GEMINI_MODEL` defaults to `gemini-3.6-flash` and can be changed to another
Gemini model available to your API key. The API key stays server-side and is
never sent to the browser.

### Local EdStem MCP bridge

The backend can also launch a local EdStem MCP server and expose its tools to
Gemini. Add the actual local server path and EdStem token to `.env`:

```bash
EDSTEM_MCP_PATH=/absolute/path/to/edstem-mcp/dist/index.js
EDSTEM_MCP_COMMAND=node
ED_API_TOKEN=your_token
EDSTEM_MCP_TEST_ENDPOINTS=true
```

Then restart the backend. The MCP process connects when the backend starts.
Check `/api/health` for `edstem_mcp_status: "connected"`.
This uses the Google GenAI SDK's local `mcpToTool` bridge; the MCP server runs
locally alongside the backend rather than in the browser.

To test EdStem without involving Gemini, list the available tools:

```bash
curl http://localhost:3001/api/edstem/tools
```

Then call a tool directly, such as `list_threads`:

```bash
curl -X POST http://localhost:3001/api/edstem/call \
  -H 'Content-Type: application/json' \
  -d '{"name":"list_threads","arguments":{}}'
```

Keep `EDSTEM_MCP_TEST_ENDPOINTS=false` outside local testing because the call
endpoint can execute any tool exposed by the MCP server.

If `list_threads` requires parameters, use the input schema returned by
`/api/edstem/tools` to populate the `arguments` object.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
