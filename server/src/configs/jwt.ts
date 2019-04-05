import jwt from 'jsonwebtoken';

const JWT_CONFIG = {
    JWT_SECRET: 'F&6j5WgTx"&mfn@',
    noAuthUrls: [
        '/users/register',
        '/users/login',
        '/users/verify'
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
