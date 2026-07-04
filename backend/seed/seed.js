const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../src/models/User');
const LearningResource = require('../src/models/LearningResource');
const PromptChallenge = require('../src/models/PromptChallenge');
const Module = require('../src/models/Module');
const MarketplacePrompt = require('../src/models/MarketplacePrompt');
const Setting = require('../src/models/Setting');
const env = require('../src/config/env');

const seed = async () => {
  await mongoose.connect(env.mongodbUri);
  await Promise.all([
    User.deleteMany({}), 
    LearningResource.deleteMany({}), 
    PromptChallenge.deleteMany({}),
    Module.deleteMany({}),
    MarketplacePrompt.deleteMany({}),
    Setting.deleteMany({})
  ]);

  const adminPassword = await bcrypt.hash('AdminPass123!', 12);
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@teem01.com',
    password: adminPassword,
    role: 'admin',
    xp: 500,
    badges: ['Admin', 'Early Adopter'],
  });

  const userPassword = await bcrypt.hash('UserPass123!', 12);
  const user = await User.create({
    name: 'John User',
    email: 'user@teem01.com',
    password: userPassword,
    role: 'user',
    xp: 120,
    badges: ['Fast Learner'],
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

  await Module.create({
    title: 'Zero-Shot Prompting',
    desc: 'Learn how to instruct the AI without providing any examples.',
    level: 'Beginner',
    lessons: 3,
    time: '45 min',
    status: 'Published',
    enrollments: 42,
  });

  await Module.create({
    title: 'Few-Shot Learning',
    desc: 'Master the art of providing context through examples.',
    level: 'Intermediate',
    lessons: 5,
    time: '1.5 hours',
    status: 'Published',
    enrollments: 18,
  });

  await MarketplacePrompt.create({
    title: 'Senior Developer Persona',
    authorName: 'CodeMaster99',
    category: 'Coding',
    desc: 'A robust system prompt that instructs the AI to act as a senior developer reviewing code.',
    tags: ['code-review', 'persona', 'tech'],
    likes: 124,
    downloads: 500,
    price: 'Free',
    status: 'Approved',
    createdBy: user._id,
  });

  await MarketplacePrompt.create({
    title: 'Creative Story Generator',
    authorName: 'WriterJane',
    category: 'Creative',
    desc: 'Generates detailed, compelling fantasy stories with rich world-building constraints.',
    tags: ['writing', 'fantasy', 'story'],
    likes: 89,
    downloads: 320,
    price: 'Free',
    status: 'Approved',
    createdBy: admin._id,
  });

  await Setting.create({
    key: 'openrouter_model',
    value: 'poolside/laguna-xs-2.1:free',
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
