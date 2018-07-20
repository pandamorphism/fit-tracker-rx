export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  remainingProgress?: number;
}

export interface ActionedExercise extends Exercise {
  actionTime: number;
}

export interface ExerciseActionResult {
  type: 'completed' | 'cancelled';
  progress?: number;
}
