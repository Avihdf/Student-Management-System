const { OAuth2Client } = require('google-auth-library');
const User = require('../Models/user');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google OAuth login
exports.googleAuth = async (req, res) => {
    try {
        const { tokenId } = req.body;
        

        // const base64Url = tokenId.split('.')[1];
        // const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // const payloads = JSON.parse(Buffer.from(base64, 'base64').toString('utf8'));
        // console.log(payloads.aud);
        // console.log(process.env.GOOGLE_CLIENT_ID);
        // if (payloads.aud !== process.env.GOOGLE_CLIENT_ID) {
        //     return res.status(400).json({ message: 'Invalid token' });
        // }

        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture: avatar } = payload;

        let user = await User.findOne({ $or: [{ email }, { googleId }] });

        if (!user) {
            user = new User({
                name,
                email,
                googleId: googleId,
                avatar: avatar
            })
            await user.save();
        } else if (!user.googleId) {
            user.googleId = googleId;
            if (!user.avatar) user.avatar = avatar
            await user.save()
        }

        // Jwt token generation
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Restrict admin login through this condition
        if (user.role == 'admin') {
            res.clearCookie('admin');
            res.cookie('admin', token, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax',
            });
            return res.status(200).json({ message: `Welcome Admin! ${user.name}`, role: user.role });
        }

        // For student login
        res.clearCookie('student');
        res.cookie('student', token, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
        });
        res.status(200).json({ message: `Welcome ${user.name} `, role: user.role });
    }
    catch (error) {
        console.error('Google Auth error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
