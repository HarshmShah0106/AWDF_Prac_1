/**
 * Quick MongoDB Inspector Script for Practical 6 & 7
 * Run using: node backend/inspect-db.js
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskmanager_practical7';

async function inspectDatabase() {
  try {
    console.log(' Connecting to MongoDB at:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log(' Connected successfully!\n');

    const db = mongoose.connection.db;

    // 1. Inspect Collections
    const collections = await db.listCollections().toArray();
    console.log('====================================================');
    console.log('📂 Database Collections:', collections.map((c) => c.name).join(', '));
    console.log('====================================================\n');

    // 2. Inspect Users Collection (Practical 7)
    const users = await db.collection('users').find().toArray();
    console.log(`👤 Users Collection (${users.length} documents):`);
    if (users.length === 0) {
      console.log('   (No users found yet. Register a user in the UI or via API)');
    } else {
      users.forEach((u, i) => {
        console.log(`   [${i + 1}] ID: ${u._id}`);
        console.log(`       Email: ${u.email}`);
        console.log(`       Password Hash (bcrypt): ${u.password}`);
        console.log(`       Created: ${u.createdAt}\n`);
      });
    }

    // 3. Inspect Tasks Collection (Practical 6 & 7)
    const tasks = await db.collection('tasks').find().toArray();
    console.log('====================================================');
    console.log(`📋 Tasks Collection (${tasks.length} documents):`);
    if (tasks.length === 0) {
      console.log('   (No tasks found yet. Add a task in the UI)');
    } else {
      tasks.forEach((t, i) => {
        console.log(`   [${i + 1}] ID: ${t._id}`);
        console.log(`       Title: ${t.title}`);
        console.log(`       Description: ${t.description || '(none)'}`);
        console.log(`       Completed: ${t.completed ? 'true (Done)' : 'false (Pending)'}`);
        console.log(`       User ID: ${t.user || '(unassigned)'}`);
        console.log(`       Created: ${t.createdAt}\n`);
      });
    }

    console.log('====================================================');
    console.log(' Verification Complete: MongoDB is actively persisting your data!');
  } catch (error) {
    console.error('❌ MongoDB Inspection Error:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

inspectDatabase();
