import Fastify from 'fastify';
import {addApiRoute} from "./routes/proxy.js";
import {addStaticRoute} from "./routes/static-files.js";
import {addLoginRoute} from "./routes/login.js";
import {authHook} from "./hooks/auth.js";

export const fastify = Fastify({ logger: true });

const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log('Server listening on http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};


addApiRoute();
addStaticRoute();
addLoginRoute();

fastify.addHook('onRequest', authHook)

start();
