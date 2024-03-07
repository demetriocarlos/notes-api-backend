
const {palindrome}= require('../utils/For_testing')

test.skip('palindrome of midudev', () => { 
    const result = palindrome('midudev')

    expect(result).toBe('vedudim')
})

test.skip('palindrome of empty string', () => { 
    const result = palindrome('')

    expect(result).toBe('')
})

test.skip('palindrome of undefined', () => {
    const result = palindrome()

    //expect(result).toBe("")

    //se espera que el resultado se undefined
    expect(result).toBeUndefined()
})