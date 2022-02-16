export const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min)

export const objectToBinary = (obj:Object) => {
    let output = ''
    let input = JSON.stringify(obj) 
    for (let i = 0; i < input.length; i++) output += input[i].charCodeAt(0).toString(2) + " "
    return output.trimEnd()
}

export const binaryToObject = (str: string) => {
    var newBin = str.split(" ")
    var binCode = []
    for (let i = 0; i < newBin.length; i++) binCode.push(String.fromCharCode(parseInt(newBin[i], 2)))
    let jsonString = binCode.join("")
    return JSON.parse(jsonString)
}

export const getRandomColor = () => {
    let r = Math.random()*255>>0
    let g = Math.random()*255>>0
    let b = Math.random()*255>>0
    return "rgba(" + r + ", " + g + ", " + b + ", 1)"
}