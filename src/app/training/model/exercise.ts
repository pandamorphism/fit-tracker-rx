export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
}

export interface ActionedExercise extends Exercise {
  actionTime: number;
  state: 'completed' | 'cancelled';
  remainingProgress?: number;
}

export interface ExerciseActionResult {
  type: 'completed' | 'cancelled';
  progress?: number;
}
