// Типы задач для расширения типов и статуса задач
export enum TaskStatus {
    New = 'новая',
    InProgress = 'в процессе',
    Completed = 'выполнено',
}

export enum TaskType {
    Normal = 'обычная', // общая задача
    Major = 'срочная', // срочная задача
    Event = 'событие', // связанная с каким-то событием или мероприятием
}

// Интерфейс для задачи
export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus; // статус задачи
    type: TaskType; // тип задачи
    date: Date; // дата создания
    owner?: string; // ответственный за задачу
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
