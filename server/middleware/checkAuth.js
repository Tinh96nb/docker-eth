const jwt = require("../helps/jwt");
const memberRepo = require("../model/member");

module.exports = checkAuth;

function checkAuth (req, res, next) {

    return async (req, res, next) => {
        if (!req.headers || !req.headers.authorization) {
            res.send(401, { message: 'Token is required!' });
            return false;
        }
        const token = jwt.verify(req.headers.authorization.split(' ')[1]);
        // check valid token
        if (!token) {
            res.send(401, { message: 'Token is invalid!' });
            return false;
        }
        const dataToken = token.data;
        // check in database
        try {
            const mem = await memberRepo.findMemberByAddress(dataToken.address);
            if (!mem) {
                res.send(401, { message: `You don't have permission to access`});
                return false;
            }
            req.set('user', mem);
        }
        catch (error) {
            res.send(500, { message: '500 internal server error' });
        }
        return next();
    }
}
