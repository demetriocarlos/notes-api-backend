
const {average} = require('../utils/For_testing')
//describe el contexto
describe.skip('average', () => {
    test('of one value is the value itself', () => {
        expect(average([1])).toBe(1)
    })

    test('of many is calculate correctly', () => {
        //entrada                    //lo que deberia ser el resultado
        expect(average([1,2,3,4,5,6])).toBe(3.5)
    })

    test('of empty array is zero', () => {
        expect(average([])).toBe(0)
    })
})
