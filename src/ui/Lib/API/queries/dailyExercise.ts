export const query = `{
    dailyExerciseCollection {
      items {
        level,
        objective,
        description,
        image {
          url
        }
        duration
      }
    }
  }`;
