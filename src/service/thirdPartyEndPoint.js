import Axios from "axios";


class apiCall {
  static async parallelCall(numberOfCalls, endpoint) {

    let Urls = [];
    let result = [];
    let firstcall = 1;

    while (numberOfCalls <= numberOfCalls) {
      promises.push(endpoint);
      firstcall++;
    }

    const responses = await Promise.allSettled(
      Urls.map(async url => {
        const res = await Axios.get(url);
      })
    );

  }
}

export default apiCall;
