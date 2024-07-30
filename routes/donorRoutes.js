const express = require('express')
const {changePasswordController, searchLocationController, searchCenterController} = require('../controllers/donorController')

const router = express.Router()

router.post('/change-password', changePasswordController)
router.get('/search-location',searchLocationController)
router.get('/search-center',searchCenterController)

module.exports = router;