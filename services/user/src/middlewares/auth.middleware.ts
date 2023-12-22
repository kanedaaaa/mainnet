import jwt from 'jsonwebtoken';

async function onlyAuth(req: any, res: any, next: any) {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN!);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export default onlyAuth;