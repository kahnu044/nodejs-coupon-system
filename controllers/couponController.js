// controllers/couponController.js

const Coupon = require('../models/couponModel');

const couponController = {
    createCoupon: async (req, res) => {
        try {

            // Validate request body
            const { couponCode, discountType, discountAmount, expirationDate, maxRedemptions, redeemedCount } = req.body;
            if (!couponCode || !discountType || !discountAmount || !expirationDate) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            if (discountType !== 'percentage' && discountType !== 'fixed') {
                return res.status(400).json({ message: 'Invalid discount type' });
            }
            if (discountAmount < 0) {
                return res.status(400).json({ message: 'Discount amount must be non-negative' });
            }
            if (expirationDate <= Date.now()) {
                return res.status(400).json({ message: 'Expiration date must be in the future' });
            }
            if (maxRedemptions !== undefined && maxRedemptions < 0) {
                return res.status(400).json({ message: 'Max redemptions must be non-negative' });
            }
            if (redeemedCount !== undefined && redeemedCount < 0) {
                return res.status(400).json({ message: 'Redeemed count must be non-negative' });
            }

            const findExistingCoupon = await Coupon.findOne({ couponCode: couponCode });

            if (findExistingCoupon != null) {
                return res.status(500).json({
                    status: false,
                    message: "The given coupon code is already exists"
                });
            }

            const result = await Coupon.create(req.body);
            return res.status(201).json(result);
        } catch (error) {
            console.error('Error creating coupon:', error);
            return res.status(500).json({
                status: false,
                message: error?.message,
                error: 'Internal server error'
            });
        }
    },

    getAllCoupons: async (req, res) => {
        try {
            const coupons = await Coupon.find();
            res.status(200).json({
                status: true,
                message: "Coupons fetched successfully",
                data: coupons
            });
        } catch (error) {
            console.error('Error fetching coupons:', error);
            return res.status(500).json({
                status: false,
                message: error?.message,
                error: 'Internal server error'
            });
        }
    },

    updateCoupon: async (req, res) => {
        try {
            const { id } = req.params;

            const { couponCode, discountType, discountAmount, expirationDate, maxRedemptions, redeemedCount } = req.body;

            // Validate input data (optional)
            if (!id) {
                return res.status(400).json({ message: 'Coupon ID is required' });
            }

            const findExistingCoupon = await Coupon.findOne({ couponCode: couponCode });

            if (findExistingCoupon != null) {
                return res.status(500).json({
                    status: false,
                    message: "The given coupon code is already exists"
                });
            }

            // Update coupon in the database
            const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedCoupon) {
                return res.status(404).json({ message: 'Coupon not found' });
            }

            res.status(200).json(updatedCoupon);
        } catch (error) {
            console.error('Error updating coupon:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = couponController;
