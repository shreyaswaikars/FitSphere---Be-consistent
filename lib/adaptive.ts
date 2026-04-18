export type ActivityType = 'workout' | 'nutrition' | 'sleep' | 'rest';

export interface UserActivity {
  id: string;
  type: ActivityType;
  date: Date;
  intensity?: 'low' | 'medium' | 'high';
  duration?: number; // minutes
}

export interface Suggestion {
  title: string;
  message: string;
  type: 'action' | 'recovery' | 'motivation';
}

export const generateSuggestion = (activities: UserActivity[]): Suggestion => {
  const today = new Date();
  const recentActivities = activities.filter(a => {
    const diff = today.getTime() - a.date.getTime();
    return diff < (3 * 24 * 60 * 60 * 1000); // last 3 days
  });

  const highIntensityCount = recentActivities.filter(a => a.intensity === 'high').length;

  if (highIntensityCount >= 2) {
    return {
      title: "Active Recovery",
      message: "You've pushed hard for 2 days. A light walk or stretching today will help prevent injury and maintain consistency.",
      type: 'recovery'
    };
  }

  const noRecentWorkout = !recentActivities.some(a => a.type === 'workout');
  if (noRecentWorkout) {
    return {
      title: "Streak at Risk!",
      message: "It's been a while since your last workout. Even a 10-minute session will keep your streak alive.",
      type: 'action'
    };
  }

  return {
    title: "Keep the Momentum",
    message: "You're on a great path. Today's goal: Try to increase your intensity by 5% in your main lift or run.",
    type: 'motivation'
  };
};
