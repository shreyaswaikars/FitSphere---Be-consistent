export interface Milestone {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export const MILESTONES: Milestone[] = [
  { id: '1', name: 'Starting Strong', description: 'Log your first activity', icon: 'zap', unlocked: true },
  { id: '2', name: 'Consistent Week', description: 'Maintain a 7-day streak', icon: 'flame', unlocked: false },
  { id: '3', name: 'Iron Will', description: 'Complete 30 high-intensity sessions', icon: 'trophy', unlocked: false },
  { id: '4', name: 'Zen Master', description: 'Log 10 recovery sessions', icon: 'heart', unlocked: false },
];

export const calculateStreak = (activityDates: Date[]): number => {
  if (activityDates.length === 0) return 0;
  
  // Sort dates descending
  const sortedDates = [...activityDates].sort((a, b) => b.getTime() - a.getTime());
  
  let streak = 1;
  const oneDay = 24 * 60 * 60 * 1000;
  
  for (let i = 0; i < sortedDates.length - 1; i++) {
    const diff = sortedDates[i].getTime() - sortedDates[i+1].getTime();
    if (diff <= oneDay) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

export const getProgressTowardsMilestone = (current: number, target: number): number => {
  return Math.min((current / target) * 100, 100);
};
