import { Task, TaskFilter } from './types';

export class TaskManager {
    private tasks: Task[] = [];
    private STORAGE_KEY = 'taskManager';

    constructor() {
        this.tasks = this.loadTasks(); // загружаем задачи из localStorage
    }

    // Добавление новой задачи
    addTask(task: Task): void {
        this.tasks.push(task);
        this.saveTasks(); // сохраняем задачи в localStorage
    }

    // Редактирование задачи
    editTask(id: string, updatedTask: Partial<Task>): void {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
            this.saveTasks(); // Сохраняем задачи в localStorage после редактирования
        }
    }

    // Удаление задачи
    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks(); // Сохраняем задачи в localStorage после удаления
    }

    // Удаление всех задач
    deleteAllTasks(): void {
        this.tasks = [];
        this.saveTasks(); // Сохраняем задачи в localStorage после удаления
    }

    // Фильтрация задач
    filterTasks(filter: TaskFilter): Task[] {
        return this.tasks.filter(task => {
            const matchesStatus = filter.status ? task.status === filter.status : true;
            const matchesType = filter.type ? task.type === filter.type : true;
            return matchesStatus && matchesType;
        });
    }

    // Фильтрация задач по дате (по возрастанию или убыванию)
    filterTasksByDate(direction: 'asc' | 'desc' | null): Task[] {
        let sortedTasks = [...this.tasks]; // Создаем копию задач, чтобы не изменять оригинальный массив
        if (direction === 'asc') {
            // Сортировка по возрастанию даты
            sortedTasks.sort((a, b) => (a.date?.getTime() ?? 0) - (b.date?.getTime() ?? 0));
        } else if (direction === 'desc') {
            // Сортировка по убыванию даты
            sortedTasks.sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
        }

        return sortedTasks;
    }

    // Получение всех задач
    getTasks(): Task[] {
        return this.tasks;
    }

    // Сохранение задач в localStorage
    private saveTasks(): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks)); // Сохраняем задачи в localStorage
    }

    // Загрузка задач из localStorage
    private loadTasks(): Task[] {
        const storedTasks = localStorage.getItem(this.STORAGE_KEY);
        return storedTasks ? JSON.parse(storedTasks) : []; // Загружаем задачи из localStorage
    }
}