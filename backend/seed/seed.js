const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../src/models/User');
const LearningResource = require('../src/models/LearningResource');
const PromptChallenge = require('../src/models/PromptChallenge');
const env = require('../src/config/env');

const seed = async () => {
  await mongoose.connect(env.mongodbUri);
  await Promise.all([User.deleteMany({}), LearningResource.deleteMany({}), PromptChallenge.deleteMany({})]);

  const adminPassword = await bcrypt.hash('AdminPass123!', 12);
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@teem01.com',
    password: adminPassword,
    role: 'admin',
  });

  await LearningResource.create({
    title: 'Prompt Engineering Basics',
    description: 'Introductory module covering prompt structure and role prompting.',
    level: 'beginner',
    category: 'Foundations',
    createdBy: admin._id,
  });

  await PromptChallenge.create({
    title: 'Rewrite Prompt Challenge',
    promptTask: 'Rewrite a vague prompt into a specific, constrained prompt for better outputs.',
    expectedOutcome: 'User learns how context, constraints, and format improve responses.',
    difficulty: 'easy',
    createdBy: admin._id,
  });

  // eslint-disable-next-line no-console
  console.log('Database seeded successfully');
  await mongoose.disconnect();
};

seed().catch(async (error) => {
  // eslint-disable-next-line no-console
  console.error('Seed failed:', error);
  await mongoose.disconnect();
  process.exit(1);
});
