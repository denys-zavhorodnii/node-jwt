import {fastify} from "../index.js";
import jwt from "jsonwebtoken";


export function addLoginRoute() {
    const JWT_KEY = process.env.JTW_KEY;
    fastify.post('/login', async (req, reply) => {
        const {
            login, password
        } = req.body

        if (!userIsValid(login, password)) {
             reply.code(401);
             return;
        }

        reply.type('application/json')
        const token = jwt.sign({
            login
        }, JWT_KEY)



        return reply.send({
            token: token,
        })
    });
}

function userIsValid(login, password) {
    // check
    return true;
}
