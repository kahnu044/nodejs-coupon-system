
const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');

// Create a new coupon
router.post('/', couponController.createCoupon);

// Get all coupons
router.get('/', couponController.getAllCoupons);

// Update a coupon
router.put('/:id', couponController.updateCoupon);

module.exports = router;