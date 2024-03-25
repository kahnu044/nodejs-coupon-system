const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    couponCode: {
        type: String,
        required: true,
        unique: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    discountAmount: {
        type: Number,
        required: true,
        min: [0, 'Discount amount must be non-negative']
    },
    expirationDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value && value > Date.now();
            },
            message: 'Expiration date must be in the future'
        }
    },
    maxRedemptions: {
        type: Number,
        default: null,
        min: [0, 'Max redemptions must be non-negative']
    },
    redeemedCount: {
        type: Number,
        default: 0,
        min: [0, 'Redeemed count must be non-negative']
    }
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
