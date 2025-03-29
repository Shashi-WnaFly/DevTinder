const adminAuth =  (req, res, next) => {
  const token = "xyzfefw";
  const authorized = (token === "xyz");

  if (!authorized) {
    res.status(401).send("unauthorized access");
  }
  else
    next();
}

module.exports = {
    adminAuth,
}
