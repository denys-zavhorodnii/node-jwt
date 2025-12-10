import {getCats} from "../get-cats.js";

describe('getCats', () => {
    describe('when the request successful', () => {
        it('should return the result', async () => {
            const API_KEY = 'some key'
            const result = [
                {
                    id: 1,
                    some: 'value'
                }
            ]
            // mock fetch api
            const fetchAPIMock = jest.fn().mockReturnValue(Promise.resolve({
                ok: true,
                json: jest.fn().mockReturnValue(result)
            }))
            const res = await getCats(fetchAPIMock, API_KEY)
            expect(res).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: 1,
                    some: 'value'
                })
            ]))
            expect(fetchAPIMock).toHaveBeenCalledTimes(1)

        })

        it('should pass header', async () => {
            const API_KEY = 'some key'
            const result = [
                {
                    id: 1,
                    some: 'value'
                }
            ]
            // mock fetch api
            const fetchAPIMock = jest.fn().mockReturnValue(Promise.resolve({
                ok: true,
                json: jest.fn().mockReturnValue(result)
            }))
            await getCats(fetchAPIMock, API_KEY)

            expect(fetchAPIMock)
                .toHaveBeenCalledWith(
                    'https://api.thecatapi.com/v1/breeds',
                    expect.objectContaining({
                        headers: new Headers({
                            "x-api-key": API_KEY
                        })
                    }))
        })
    })

    describe('when request fails', () => {
        describe('when the response status is not OK', () => {
            it('should throw the error', async () => {
                const API_KEY = 'some key'
                const result = [
                    {
                        id: 1,
                        some: 'value'
                    }
                ]
                // mock fetch api
                const fetchAPIMock = jest.fn().mockReturnValue(Promise.resolve({
                    ok: false,
                    json: jest.fn().mockReturnValue(result)
                }))

                expect(getCats(fetchAPIMock, API_KEY))
                    .rejects
                    .toThrow(Error('The request is failed'))
            })
        })
    })

})
