import {IoCContainer} from "../index.js";

describe('iocContainer', () => {
    beforeEach(() => {
        const dep1 = new MockClassA()
        const container = IoCContainer.getInstance()
        container.register('Foo', () => dep1)
    })
    it('should be a singleton', () => {
        const container1 = IoCContainer.getInstance()
        const container2 = IoCContainer.getInstance()
        expect(container1).toBe(container2)
    })

    it('should be able to add new dependencies', () => {
        const container = IoCContainer.getInstance()
        const dep = new MockClassA()
        container.register('Foo1', () => dep)
        const res = container.resolve('Foo1')
        expect(res).toBe(dep)
    })

    it('should be able to resolve a multiple dependencies', () => {
        const container = IoCContainer.getInstance()
        const dep = new MockClassB(container.resolve('Foo'))
        container.register('New', () => dep)
        const res = container.resolve('New')
        expect(res).toBe(dep)
    })
})

class MockClassA {

}

class MockClassB {
    constructor(classA) {
        this.classA = classA
    }
}
