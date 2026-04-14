// Azure App Service expects your Node app to listen on process.env.PORT
// Next.js standalone output ships a Node server at .next/standalone/server.js
// This wrapper just forwards to it.
process.env.PORT = process.env.PORT || '8080'
import('./.next/standalone/server.js')
