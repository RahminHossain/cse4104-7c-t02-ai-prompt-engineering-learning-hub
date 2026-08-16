const Module = require('../models/Module');

const getAllModules = async (req, res, next) => {
  try {
    const modules = await Module.find({});
    res.status(200).json({ modules });
  } catch (error) {
    return next(error);
  }
};

const getModuleById = async (req, res, next) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.status(200).json({ module });
  } catch (error) {
    return next(error);
  }
};

const createModule = async (req, res, next) => {
  try {
    const module = new Module(req.body);
    await module.save();
    res.status(201).json({ message: 'Module created successfully', module });
  } catch (error) {
    return next(error);
  }
};

const updateModule = async (req, res, next) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.status(200).json({ message: 'Module updated successfully', module });
  } catch (error) {
    return next(error);
  }
};

const deleteModule = async (req, res, next) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.status(200).json({ message: 'Module deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

const completeLesson = async (req, res, next) => {
  try {
    const { id: moduleId, lessonIndex } = req.params;
    const lIndex = parseInt(lessonIndex, 10);

    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    const User = require('../models/User');
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.completedLessons) {
      user.completedLessons = [];
    }

    const isAlreadyLessonCompleted = user.completedLessons.some(
      (cl) => cl.moduleId && cl.moduleId.toString() === moduleId.toString() && cl.lessonIndex === lIndex
    );

    let xpGained = 0;
    let badgeEarned = null;

    if (!isAlreadyLessonCompleted) {
      user.completedLessons.push({
        moduleId: module._id,
        lessonIndex: lIndex,
        completedAt: new Date(),
      });

      const lesson = module.lessonList && module.lessonList[lIndex];
      xpGained = lesson && lesson.isQuiz ? 100 : 50;
      user.xp = (user.xp || 0) + xpGained;

      if (!user.badges.includes('First Steps')) {
        user.badges.push('First Steps');
        badgeEarned = 'First Steps';
      }
    }

    // Check if entire module is finished
    const totalLessonsCount = module.lessonList ? module.lessonList.length : module.lessons || 1;
    const completedForThisModule = user.completedLessons.filter(
      (cl) => cl.moduleId && cl.moduleId.toString() === moduleId.toString()
    );

    const isAllLessonsCompleted = completedForThisModule.length >= totalLessonsCount;
    let moduleCompleted = false;

    if (!user.completedModules) {
      user.completedModules = [];
    }

    const isModuleAlreadyRecorded = user.completedModules.some(
      (mId) => mId.toString() === moduleId.toString()
    );

    if (isAllLessonsCompleted && !isModuleAlreadyRecorded) {
      user.completedModules.push(module._id);
      user.xp = (user.xp || 0) + 200; // 200 bonus XP
      xpGained += 200;
      moduleCompleted = true;

      // Badges
      if (!user.badges.includes('Fast Learner')) {
        user.badges.push('Fast Learner');
        badgeEarned = badgeEarned || 'Fast Learner';
      } else if (user.completedModules.length >= 3 && !user.badges.includes('Prompt Master')) {
        user.badges.push('Prompt Master');
        badgeEarned = 'Prompt Master';
      }

      // Increment module enrollments
      module.enrollments = (module.enrollments || 0) + 1;
      await module.save();
    }

    await user.save();

    res.status(200).json({
      message: 'Lesson completed successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        xp: user.xp,
        badges: user.badges,
        completedModules: user.completedModules,
        completedLessons: user.completedLessons,
      },
      xpGained,
      moduleCompleted,
      badgeEarned,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
  completeLesson,
};
