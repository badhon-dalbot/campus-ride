import jwt from "jsonwebtoken";

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.sendStatus(401);

//   // eslint-disable-next-line no-undef
//   jwt.verify(token, 'myaccesstoken', (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "myaccesstoken", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
export default authenticateToken;
