import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  // User ID who is placing the order
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you're referencing a User model
    required: true
  },

  // Order Items as an array of objects
  orderItems: [{
    // Reference to the Product model
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to Product schema
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: [{
      type: String,
      required: true
    }],
    color: {
      type: String,
      required: true
    },
    ageGroup: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    // itemsIncluded: {
    //   type: String,
    //   required: true
    // },
    features: {
      type: String,
      required: true
    },
    benefits: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    cartQuantity: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    bestSeller: {
      type: Boolean,
      default: false
    },
    // Timestamps for when the order item is created or updated
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Shipping Address Information
  shippingAddress: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: true
    },
    streetAddress: {
      type: String,
      required: true
    },
    apartment: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postcode: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    orderNotes: {
      type: String,
      required: false
    }
  },

  // Timestamps for when the address is created or updated
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Model creation
const Address = mongoose.model('Address', addressSchema);

export default Address;