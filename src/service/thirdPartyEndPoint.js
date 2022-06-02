import Axios from "axios";
import path from "path";

const dirname = path.join( 'src/log.txt')
const fs = require('fs')


class thirdPartyService {
  static async parallelCall(numberOfCalls, endpoint) {
    return new Promise(async (resolve, reject) => {
      try {
        let Urls = [];
        let firstcall = 1;

        while (firstcall <= numberOfCalls) {

          Urls.push(endpoint);
          firstcall++;
        }
        console.log(JSON.stringify(Urls))
        let data = ""
        let result = await Promise.all(Urls.map((url) => Axios.get(url))).then(
          Axios.spread((...allData) => {
            fs.writeFile(dirname, allData, err => {
              if (err) {
                // console.log(allData)
                return
              }
              //file written successfully
            })
            resolve(allData)
          })
        );

        // console.log({ result });
        resolve(result)
      } catch (e) {
        reject(new Error(e))
      }
    })

  }
}

export default thirdPartyService;
