
class APIs {
  async get(path) {
    const publicKey = "88650269c97b975d4818161795108b57";
    const hashValue = "431e41c2e160dda34bf48b1fcf4f4f7e";
    const apiUrl = `https://gateway.marvel.com:443/v1/public${path}&ts=1&apikey=${publicKey}&hash=${hashValue}`
    const response = await fetch(apiUrl)

    return await response.json();
  }
}

const API = new APIs();

export { API };
