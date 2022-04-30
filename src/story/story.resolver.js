const StoryResolver = {
  Query: {
    getRandomStory: async (parent, args, context, info) => {
      try {
        return {
          success: true,
          errors: [],
          story: await context.dataSources.storyRepository.getRandomStory(),
        };
      } catch (err) {
        return {
          success: false,
          errors: [err],
          story: null,
        };
      }
    },
  },
  Mutation: {
    createStory: async (parent, { input }, context, info) => {
      try {
        const newStory = await context.dataSources.storyRepository.createStory(input);
        return {
          success: true,
          errors: [],
          story: newStory[0],
        };
      } catch (err) {
        return {
          success: false,
          errors: [err],
          story: null,
        };
      }
    },
  },
};

export default StoryResolver;
