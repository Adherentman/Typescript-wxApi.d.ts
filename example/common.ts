/// <reference path="../wx.d.ts">/

function sayHello(name: string) {
  console.log(`Hello ${name} !`)
}
function sayGoodbye(name: string) {
  console.log(`Goodbye ${name} !`)
}

module.exports.sayHello = sayHello
exports.sayGoodbye = sayGoodbye