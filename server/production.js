module.exports = (app, db, port) => {
  app.enable("trust proxy");

  app.use((req, res, next) => {
    if (req.secure) {
      // request was via https, so do no special handling
      next();
    } else {
      // request was via http, so redirect to https
      res.redirect(`https://${req.headers.host}${req.url}`);
    }
  });

  db.on("connected", () => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  });
};
