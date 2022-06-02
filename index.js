// const { Shop, Item } = require("./src/gilded-rose")
import { Shop, Item } from "./src/gilded-rose"
import { Constant } from "./src/config/config";
import thirdPartyservices from "./src/service/thirdPartyEndPoint";
let { ENPOINT } = Constant;
let questions = [
  "How many times to update shop",
  "How many times to make Api Calls"

];
let numberOfApiCalls;
let numberOfShop;

let answers = []

process.stdin.on('data', async (data) => {

  answers.push(data.toString().trim());
  if (answers.length < questions.length) {
    askQuestion(answers.length)
  } else {
    numberOfApiCalls = answers[0]
    numberOfShop = answers[1]
    let result = await thirdPartyservices.parallelCall(numberOfApiCalls, ENPOINT)
    process.stdout.write(result)
    // return result

    // process.exit()
  }

  process.on('exit', () => {

    process.stdout.write(`${numberOfShop} ${numberOfApiCalls}`)


  })
})

askQuestion(0)

function askQuestion(index) {
  process.stdout.write(`\n\n ${questions[index]}`)
  process.stdout.write("  >  ")

}


