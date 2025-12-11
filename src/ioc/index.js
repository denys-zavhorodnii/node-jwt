export class IoCContainer {
    #deps = new Map()
    static #instance

    static getInstance() {
        if (IoCContainer.#instance) {
            return IoCContainer.#instance
        }

        IoCContainer.#instance = new IoCContainer()
        return IoCContainer.#instance
    }

    resolve(name) {
        if(this.#deps.has(name)) {
            return this.#deps.get(name)
        }
        throw new Error(`${name} not found`)
    }

    register(name, constructorFn) {
        const newInstance = constructorFn()
        this.#deps.set(name, newInstance);
    }
}
