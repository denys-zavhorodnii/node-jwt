import {getCats} from "../api/get-cats.js";
import {fastify} from "../index.js";


export function addApiRoute() {
    const API_KEY = "some key";

    fastify.get('/api', async (req, reply) => {
        const authHeader = req.headers.authorization;


        if (!authHeader) {
            reply.headers({
                'WWW-Authenticate': 'Bearer',
            })
            reply.code(401)
            return reply()
        }

        const cats = await getCats(fetch, API_KEY)

        reply.type('application/json')

        return reply.send(cats)
    });
}

