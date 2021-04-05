export default {
  getLoginURL(scopes = ["user-read-private", "user-read-email"]) {
    return `https://accounts.spotify.com/authorize?client_id=${
      process.env.VUE_APP_SPOTIFY_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      process.env.VUE_APP_SPOTIFY_REDIRECT_URI
    )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token`;
  },

  existsHashValue(hash) {
    const matches = hash.split("#/");
    return matches ? matches[1] : null;
  },

  getHashParams(hash) {
    let elem;
    let hashParams = {};
    const regExp = /([^&;=]+)=?([^&;]*)/g;
    const params = hash.substring(2); // Clear "#/" chars of URL path

    while ((elem = regExp.exec(params))) {
      hashParams[elem[1]] = decodeURIComponent(elem[2]);
    }

    return hashParams;
  }
};
