import fs from 'node:fs';
import {fastify} from "../index.js";


export function addStaticRoute() {
    fastify.get('/*', async (req, reply) => {
        const path = req.url === '/' ? '/index.html' : req.url

        const file = fs.readFileSync(`./static${path}`);

        if (path.endsWith('.png')) {
            reply.type('image/png');
        }

        if (path.endsWith('.html')) {
            reply.type('text/html');
        }

        if (path.endsWith('.css')) {
            reply.type('text/css');
        }

        if (path.endsWith('.js')) {
            reply.type('text/javascript');
        }

        return reply.send(file)
    });
}

