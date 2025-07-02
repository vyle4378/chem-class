// global vs window
// global is used in node.js while window is used in js
// Ex: global.console.log("hi") 
// Usually the prefix "global" and "window" are omitted



// console.log(module) allows you to see what's in the module, esp any "exports"

// to export
// module.exports.[name] = [variableNameInFile]

// to import, assign the filepath to a local variable
// [varName] = require('[filePath]')
// then, use it
// [varName].[function inside the file imported]


const logger = require('./logger.js')
logger.log('hi there')

const v = logger.newNameOfURL
console.log(v)