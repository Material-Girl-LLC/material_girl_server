import moment from 'moment';
import jwt from 'jsonwebtoken';

// Create and save token

const createToken = async(userId, type, duration) => {
    const issuedAt = moment();
    const expiresAt = moment().add(duration, 'minutes');

    // Create a JWT
    const tokenString = jwt.sign(
        {
            sub: userId,
            type,
            iat: issuedAt.unix(),
            exp: expiresAt(duration, 'minutes').unix(),
        },
        TOKEN_JWT_SECRET
    );
}