import {getCats} from "../api/get-cats.js";
import {fastify} from "../index.js";
import { loadEnvFile } from 'node:process';

loadEnvFile()


export function addApiRoute() {
    const API_KEY = process.env.SOME_API_KEY;

    fastify.get('/api', async (req, reply) => {
        const cats = await getCats(fetch, API_KEY)

        reply.type('application/json')

        return reply.send(cats)
    });
}

