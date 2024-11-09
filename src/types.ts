// Типы задач для расширения типов и статуса задач
export enum TaskStatus {
    New = 'new',
    InProgress = 'in-progress',
    Completed = 'completed',
}

export enum TaskType {
    General = 'general',
    Deadline = 'deadline',
    Event = 'event',
}

// Интерфейс для задачи
export interface Task {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    status: TaskStatus;
    type: TaskType;
    dueDate?: Date; // Только для задач с типом "deadline"
    assignedTo?: string; // Только для задач с типом "event"
    location?: string; // Только для задач с типом "event"
}

// Интерфейс для фильтрации задач
export interface TaskFilter {
    status?: TaskStatus;
    type?: TaskType;
}

// Интерфейс для менеджера задач
export interface TaskManager {
    addTask(task: Task): void;
    editTask(id: string, updatedTask: Partial<Task>): void;
    deleteTask(id: string): void;
    filterTasks(filter: TaskFilter): Task[];
    getTasks(): Task[];
    saveTasks(tasks: Task[]): void; // Сохранение задач
    loadTasks(): Task[]; // Загрузка задач
}
