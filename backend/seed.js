require('dotenv').config();

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const User = require('./model/User');
const Product = require('./model/Product');
const Order = require('./model/Order');

const seedDB = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    const password = await bcrypt.hash('123456', 10);

    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@shopit.com',
        password,
        role: 'admin',
        verified: true,
      },
      {
        name: 'John Customer',
        email: 'john@shopit.com',
        password,
        role: 'user',
        verified: true,
      },
      {
        name: 'Sarah Customer',
        email: 'sarah@shopit.com',
        password,
        role: 'user',
        verified: false,
      },
      {
        name: 'Alice Customer',
        email: 'alice@shopit.com',
        password,
        role: 'user',
        verified: true,
      },
      {
        name: 'Bob Customer',
        email: 'bob@shopit.com',
        password,
        role: 'user',
        verified: true,
      },
      {
        name: 'Charlie Customer',
        email: 'charlie@shopit.com',
        password,
        role: 'user',
        verified: false,
      },
      {
        name: 'Diana Customer',
        email: 'diana@shopit.com',
        password,
        role: 'user',
        verified: true,
      },
      {
        name: 'Eva Customer',
        email: 'eva@shopit.com',
        password,
        role: 'user',
        verified: true,
      },
      {
        name: 'Frank Customer',
        email: 'frank@shopit.com',
        password,
        role: 'user',
        verified: false,
      },
      {
        name: 'Grace Customer',
        email: 'grace@shopit.com',
        password,
        role: 'user',
        verified: true,
      },
    ]);

    const products = await Product.insertMany([
      {
        name: 'Nike Air Max',
        description: 'A lightweight running shoe with premium support.',
        price: 4999,
        category: 'Footwear',
        stock: 12,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        rating: 4.5,
        numReviews: 10,
      },
      {
        name: 'Urban Backpack',
        description: 'A durable backpack for daily work and travel.',
        price: 2499,
        category: 'Accessories',
        stock: 8,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
        rating: 4.2,
        numReviews: 5,
      },
      {
        name: 'Wireless Headphones',
        description: 'Noise reducing wireless headphones with 30-hour battery life.',
        price: 3299,
        category: 'Electronics',
        stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        numReviews: 18,
      },
      {
        name: 'Classic Cotton Hoodie',
        description: 'Soft cotton hoodie with premium everyday comfort.',
        price: 1899,
        category: 'Clothing',
        stock: 20,
        imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
        rating: 4.3,
        numReviews: 8,
      },
    ]);

    await Order.insertMany([
      {
        user: users[1]._id,
        items: [
          {
            productId: products[0]._id,
            quantity: 1,
            price: products[0].price,
          },
          {
            productId: products[2]._id,
            quantity: 1,
            price: products[2].price,
          },
        ],
        totalAmount: products[0].price + products[2].price,
        address: {
          fullname: 'John Customer',
          street: '22 Market Street',
          city: 'Mumbai',
          postalCode: '400001',
          country: 'India',
        },
        paymentId: 'pay_dummy_001',
        status: 'pending',
      },
      {
        user: users[3]._id,
        items: [
          {
            productId: products[1]._id,
            quantity: 2,
            price: products[1].price,
          },
        ],
        totalAmount: products[1].price * 2,
        address: {
          fullname: 'Alice Customer',
          street: '18 Rose Avenue',
          city: 'Delhi',
          postalCode: '110001',
          country: 'India',
        },
        paymentId: 'pay_dummy_002',
        status: 'shipped',
      },
      {
        user: users[6]._id,
        items: [
          {
            productId: products[3]._id,
            quantity: 1,
            price: products[3].price,
          },
          {
            productId: products[2]._id,
            quantity: 1,
            price: products[2].price,
          },
        ],
        totalAmount: products[3].price + products[2].price,
        address: {
          fullname: 'Diana Customer',
          street: '80 Lake Road',
          city: 'Bengaluru',
          postalCode: '560001',
          country: 'India',
        },
        paymentId: 'pay_dummy_003',
        status: 'delivered',
      },
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedDB();
