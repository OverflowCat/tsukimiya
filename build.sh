# copy node_modules\@moonbit\moonpad\dist\moonpad.mjs to public
cp node_modules/@moonbit/moonpad/dist/moonpad.mjs public
cp node_modules/@moonbit/moonpad/dist/lsp-server.js public

# start a http server
pnpm http-server --port 5500
