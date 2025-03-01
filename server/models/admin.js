const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

AdminSchema.pre('save', function(next) {
  const admin = this;
  
  if (!admin.isModified('passwordHash')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(admin.passwordHash, salt, (err, hash) => {
      if (err) return next(err);
      admin.passwordHash = hash;
      next();
    });
  });
});

AdminSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.passwordHash, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const Admin = mongoose.model('Admin', AdminSchema);


const initializeAdmin = async () => {
  const existingAdmin = await Admin.findOne();
  if (!existingAdmin) {
    const initialAdmin = new Admin({
      email: 'admin@example.com',
      passwordHash: 'password123' 
    });
    await initialAdmin.save();
    console.log('Initial admin created with email: admin@example.com and password: password123');
  }
};

module.exports = { Admin, initializeAdmin };
