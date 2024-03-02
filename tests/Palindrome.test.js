
const {palindrome}= require('../utils/For_testing')

test('palindrome of midudev', () => { 
    const result = palindrome('midudev')

    expect(result).toBe('vedudim')
})

test('palindrome of undefined', () => {
    const result = palindrome()

    //expect(result).toBe("")

    //se espera que el resultado se undefined
    expect(result).toBeUndefined()
})