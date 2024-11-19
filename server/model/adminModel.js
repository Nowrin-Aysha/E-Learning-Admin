import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  firstName: {
    type: String,
    // required: true,
  },
  phoneNumber: {
    type: String,
    // required: true,
    match: /^[0-9]{10}$/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superAdmin'],
    default: 'user',
  },
  gender: {
    type: String,
    // required: true,
    enum: ['male', 'female', 'other'],
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.models.adminModel || mongoose.model('adminModels', adminSchema);
