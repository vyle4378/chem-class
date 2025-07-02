var url = 'random URL var'

function log(message) {
    console.log(message)
}

module.exports.log = log
module.exports.newNameOfURL = url

console.log(module)