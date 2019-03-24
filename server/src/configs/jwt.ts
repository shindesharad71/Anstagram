import jwt from 'jsonwebtoken';

const JWT_CONFIG = {
    JWT_SECRET: 'shindesharad71',
    noAuthUrls: [
        '/users/register',
        '/users/login'
    ]
};

const requestValidator = (req: any): boolean => {
    let token = null;

    if (!JWT_CONFIG.noAuthUrls.includes(req.url)) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        }

        if (token) {
            jwt.verify(token, JWT_CONFIG.JWT_SECRET, (err: Error, decoded: any) => {
                if (err) {
                    return false;
                } else {
                    req.user = decoded.user;
                    return true;
                }
            });
        } else {
            return false;
        }
    }
    return true;
};

export { JWT_CONFIG, requestValidator };
