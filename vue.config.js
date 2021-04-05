module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/my-spotify-app/" : "/",
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/scss/_variables.scss";
        `
      }
    }
  }
};
