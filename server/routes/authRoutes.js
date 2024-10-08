const express = require('express')
const {registerController,loginController, currentUserController, addCenterController} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()

router.post('/register', registerController)
router.post('/login',loginController)

router.get('/current-user', authMiddleware, currentUserController)
router.post('/addCenter', addCenterController)

module.exports = router;