let data = {
    _string: 'Hello, Lightness!',
    _number: 1,
    _boolean: true,
    _obj: {
        data: 'Get-Normal-Object-Value',
        obj: {
            data: 'Get-Deeper-Object-Value'
        }
    },
    _array: ['Get-Array-Type-Value'],
}

let lighten = new Lighten({
    el: '#app',
    data: data
})