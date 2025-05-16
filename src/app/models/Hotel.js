import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    bedType: {
        type: String,
        required: true,
        enum: ['King size', 'Queen size', '2 queen', '3 queen']
    }
});

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    ubDetail: {
        type: String,
        required: function() {
            return this.location === 'Ulaanbaatar';
        }
    },
    stars: {
        type: Number,
        min: 1,
        max: 5
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    rooms: [roomSchema],
    extraAddress: String,
    amenities: {
        wifi: {
            type: Boolean,
            default: false
        },
        breakfast: {
            type: Boolean,
            default: false
        },
        parking: {
            type: Boolean,
            default: false
        },
        restaurant: {
            type: Boolean,
            default: false
        }
    },
    images: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
hotelSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);

export default Hotel; 