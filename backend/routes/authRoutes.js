import express from 'express'; 
import authController from '../controllers/authController.js';
import authenticateToken from '../middleware/authenticate.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);    
router.post('/logout', authenticateToken, authController.logout);
router.get('/refresh', authController.refresh); // Refresh token route
router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
} );

export default router;