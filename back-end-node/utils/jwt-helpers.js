const jwt = require("jsonwebtoken");

function jwtTokens({user_id,username,email}) {
    const user = {user_id, username, email};
/*  const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'20s'});
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'5m'}); */
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
    return ({accessToken, refreshToken});
}

module.exports = jwtTokens;