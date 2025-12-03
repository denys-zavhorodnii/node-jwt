import jwt from "jsonwebtoken";
import { loadEnvFile } from 'node:process';
loadEnvFile();

export function authHook(request, reply, done) {
    const currentURL = request.url;
    if (!currentURL.startsWith('/api')) {
        done()
        return;
    }

    const JWY_KEY = process.env.JTW_KEY;
    const authHeader = request.headers.authorization ?? '';
    const parsedAuthHeader = authHeader.split(' ');
    if (parsedAuthHeader.length < 2) {
        reply.code(401)
        reply.send({
            code: 401,
            message: "Unauthorized",
        })
        done()
        return
    }
    const isTokenValid = jwt.verify(parsedAuthHeader[1], JWY_KEY)

    if (!isTokenValid) {
        reply.code(401)
        reply.send({
            code: 401,
            message: "Unauthorized",
        })
        done()
        return
    }
    done()
}
