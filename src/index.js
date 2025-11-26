import fs from 'node:fs';

import Fastify from 'fastify';
import {getCats} from "./api/get-cats.js";

const fastify = Fastify({ logger: true });


const API_KEY = "some key";

fastify.get('/*', async (req, reply) => {
    const path = req.url === '/' ? '/index.html' : req.url

    const file =
        fs.readFileSync(`./static${path}`);
    if (req.url.endsWith('.png')) {
        reply.type('image/png');
    }

    if (req.url.endsWith('.html')) {
        reply.type('text/html');
    }

    if (req.url.endsWith('.css')) {
        reply.type('text/css');
    }

    if (req.url.endsWith('.js')) {
        reply.type('text/javascript');
    }

    return reply.send(file)
});


fastify.get('/api', async (req, reply) => {
    const cats = await getCats(fetch, API_KEY)

    reply.type('application/json')

    return reply.send(cats)
});



const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log('Server listening on http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
