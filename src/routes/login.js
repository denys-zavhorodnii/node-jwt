import {fastify} from "../index.js";


export function addLoginRoute() {
    fastify.post('/login', async (req, reply) => {
        const {
            login, password
        } = req.body



        reply.type('application/json')

        return reply.send({
            token: 'some',
        })
    });
}

