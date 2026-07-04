const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const adminEmail = 'admin@teem01.com';
    let admin = await User.findOne({ email: adminEmail });

    const adminPassword = await bcrypt.hash('AdminPass123!', 12);

    if (admin) {
      admin.password = adminPassword;
      admin.role = 'admin';
      await admin.save();
      console.log('Admin user updated!');
    } else {
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log('Admin user created!');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
