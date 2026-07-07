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
    lessonList: [
      {
        title: 'Introduction to Zero-Shot',
        duration: '10 min',
        content: "Zero-shot prompting is the simplest way to interact with an LLM. You just ask a question without providing any examples of the expected format. For example, 'Translate this text to French.' This relies entirely on the model's pre-trained knowledge.",
      },
      {
        title: 'When to Use Zero-Shot',
        duration: '15 min',
        content: 'Zero-shot is best used for simple, well-defined tasks like translation, summarization, or answering general knowledge questions. If the task requires a very specific output format, you might need to use few-shot prompting instead.',
      },
      {
        title: 'Zero-Shot Quiz',
        duration: '20 min',
        content: 'Test your knowledge on Zero-Shot prompting.',
        isQuiz: true
      }
    ]
  });

  await Module.create({
    title: 'Few-Shot Learning',
    desc: 'Master the art of providing context through examples.',
    level: 'Intermediate',
    lessons: 5,
    time: '1.5 hours',
    status: 'Published',
    enrollments: 18,
    lessonList: [
      {
        title: 'What is Few-Shot Learning?',
        duration: '8 min',
        status: 'completed',
        content: 'Few-shot learning involves providing the model with a few examples of the desired input and output before giving it the actual task. This helps the model understand the exact format, tone, and logic you want it to apply.',
      },
      {
        title: 'Providing Examples',
        duration: '12 min',
        status: 'completed',
        content: 'When providing examples, ensure they are high-quality and diverse. Use a clear separator between examples, such as `---` or `###`. For instance:\\n\\nInput: The food was terrible.\\nOutput: Negative\\n\\nInput: I loved the movie!\\nOutput: Positive',
      },
      {
        title: 'Example Selection Strategies',
        duration: '15 min',
        status: 'completed',
        content: 'Select examples that cover edge cases and represent the typical distribution of inputs you expect. Avoid providing examples that are too similar to each other.',
      },
      {
        title: 'Practical Exercise: Few-Shot Classification',
        duration: '20 min',
        status: 'completed',
        content: 'Write a few-shot prompt to classify customer support tickets into Categories: Billing, Technical, or General Inquiry. Provide 3 examples.',
      },
      {
        title: 'Common Mistakes to Avoid',
        duration: '10 min',
        content: 'A common mistake is providing contradictory examples. Make sure your examples follow a consistent pattern. Another mistake is providing too many examples, which can exceed the context window and dilute the actual instruction.',
      }
    ]
  });

  await MarketplacePrompt.create({
    title: 'Senior Developer Persona',
    authorName: 'CodeMaster99',
    category: 'Coding',
    desc: 'A robust system prompt that instructs the AI to act as a senior developer reviewing code.',
    promptText: 'Act as a Senior Software Engineer with 15 years of experience. Review this code for performance, security, and maintainability. Provide specific, actionable feedback.',
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
    promptText: 'Write a fantasy short story set in a world where magic is powered by memories. Include at least two characters, one plot twist, and vivid sensory details.',
    tags: ['writing', 'fantasy', 'story'],
    likes: 89,
    downloads: 320,
    price: 'Free',
    status: 'Approved',
    createdBy: admin._id,
  });

  await Module.create({
    title: 'Chain of Thought Reasoning',
    desc: 'Encourage the AI to think step-by-step for complex problem solving.',
    level: 'Advanced',
    lessons: 4,
    time: '2 hours',
    status: 'Published',
    enrollments: 12,
    lessonList: [
      {
        title: 'Introduction to CoT',
        duration: '15 min',
        content: 'Chain of Thought (CoT) prompting involves asking the model to explain its reasoning step-by-step before arriving at the final answer. This significantly improves accuracy on complex logic, math, and reasoning tasks by forcing the model to allocate more computation to the intermediate steps.',
      },
      {
        title: 'Zero-Shot CoT',
        duration: '20 min',
        content: "The simplest way to implement CoT is by simply adding the phrase 'Let\\'s think step by step' to the end of your prompt. This triggers the model\\'s training on step-by-step explanations.",
      },
      {
        title: 'Few-Shot CoT',
        duration: '30 min',
        content: 'For even better results, provide examples that include the step-by-step reasoning. For example:\\n\\nQ: If John has 5 apples and eats 2, how many are left?\\nA: John starts with 5. He eats 2. 5 - 2 = 3. The answer is 3.\\n\\nQ: ...',
      },
      {
        title: 'CoT Quiz',
        duration: '15 min',
        content: 'Test your understanding of Chain of Thought prompting.',
        isQuiz: true
      }
    ]
  });

  await PromptChallenge.create({
    title: 'JSON Data Extraction',
    promptTask: 'Extract names and emails from a raw text block and format exactly as a JSON array.',
    expectedOutcome: 'Output is strictly valid JSON with no markdown wrapping or additional text.',
    difficulty: 'medium',
    createdBy: admin._id,
  });

  await PromptChallenge.create({
    title: 'Tone Adjustment',
    promptTask: 'Rewrite a highly technical, aggressive email into a polite, professional, and easy-to-understand message for a client.',
    expectedOutcome: 'The final output must be polite, non-technical, and professional.',
    difficulty: 'hard',
    createdBy: user._id,
  });

  await MarketplacePrompt.create({
    title: 'SEO Blog Post Generator',
    authorName: 'MarketingPro',
    category: 'Marketing',
    desc: 'Generates fully SEO-optimized blog posts including meta descriptions, headings, and keyword density rules.',
    promptText: 'Write a 1000-word blog post on the topic of {Topic}. Use H2 and H3 headings. Include a meta description. Target the keywords {Keywords} at least 3 times each.',
    tags: ['seo', 'blog', 'writing'],
    likes: 215,
    downloads: 1200,
    price: 'Free',
    status: 'Approved',
    createdBy: admin._id,
  });

  await MarketplacePrompt.create({
    title: 'UX Copywriter Assistant',
    authorName: 'DesignNinja',
    category: 'Design',
    desc: 'Specialized prompt to generate short, punchy microcopy for buttons, tooltips, and error messages.',
    promptText: 'Generate 5 options for a CTA button that encourages users to sign up for a free trial. The tone should be urgent but friendly. Max 3 words per option.',
    tags: ['ux', 'copywriting', 'design'],
    likes: 56,
    downloads: 190,
    price: 'Free',
    status: 'Approved',
    createdBy: user._id,
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
