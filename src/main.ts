import { TaskManager } from './TaskManager';
import { Task, TaskType, TaskStatus } from './types';

const taskManager = new TaskManager();

// элементы формы
const taskForm = document.getElementById('task-form') as HTMLFormElement;
const taskTitleInput = document.getElementById('task-title') as HTMLInputElement;
const taskDescInput = document.getElementById('task-desc') as HTMLTextAreaElement;
const taskOwnerInput = document.getElementById('task-owner') as HTMLInputElement;
const taskPlaceInput = document.getElementById('task-place') as HTMLInputElement;
const taskStatusInput = document.getElementById('task-status') as HTMLSelectElement;
const taskTypeInput = document.getElementById('task-type') as HTMLSelectElement;
const saveTaskBtn = document.getElementById('save-task-btn') as HTMLButtonElement;
const addTaskBtn = document.getElementById('add-task-btn') as HTMLButtonElement;
const resetFilterBtn = document.getElementById('reset-filter-btn') as HTMLButtonElement;
const clearAll = document.getElementById('clear-all') as HTMLButtonElement;
const dateHeader = document.getElementById('sort-date') as HTMLElement; // кнопка для фильтрации по даты

let currentEditingTask: Task | null = null;

// элементы фильтров
const filterOwnerInput = document.getElementById('filter-owner') as HTMLInputElement;
const filterStatusSelect = document.getElementById('filter-status') as HTMLSelectElement;
const filterTypeSelect = document.getElementById('filter-type') as HTMLSelectElement;
const filterButton = document.getElementById('filter-btn') as HTMLButtonElement;

// Переменная для отслеживания направления сортировки по дате
let dateSortDirection: 'asc' | 'desc' | null = null;

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Собираем данные из формы
    const title = taskTitleInput.value;
    const description = taskDescInput.value;
    const owner = taskOwnerInput.value || null;
    const status = taskStatusInput.value as TaskStatus;
    const type = taskTypeInput.value as TaskType;
    const date = new Date(); // дата создания
    const place = type === TaskType.Event ? taskPlaceInput.value : null; // Получаем место, если это 'событие'

    // Создаем новую задачу
    const newTask: Task = {
        id: Math.random().toString(36).slice(2, 11),
        title,
        description,
        status,
        type,
        date,
        owner: owner ?? '',
        place: place ?? '',
    };

    taskManager.addTask(newTask);
    renderTasks();

    taskForm.reset();
    currentEditingTask = null;
    addTaskBtn.style.display = 'inline-block'; // Показываем кнопку добавления задачи
    saveTaskBtn.style.display = 'none'; // Скрываем кнопку сохранения
});

// Функция для отрисовки всех задач
const renderTasks = (tasks = taskManager.getTasks()) => {
    const taskListBody = document.querySelector('#task-list tbody') as HTMLTableSectionElement;
    taskListBody.innerHTML = ''; // Очищаем только тело таблицы

    tasks.forEach((task, index) => {
        const taskRow = document.createElement('tr');
        taskRow.innerHTML = `
            <td>${index + 1}</td>
            <td class="task-title">${task.title || '—'}</td>
            <td class="task-description">${task.description || '—'}</td>
            <td>${task.owner || '—'}</td>
            <td>${task.status}</td>
            <td>${task.type}</td>
            <td>${task.place || '—' }</td>
            <td>${task.date && formatDate(task.date)}</td>
            <td>
                <button class="edit-btn" data-id="${task.id}">Edit</button>
                <button class="delete-btn" data-id="${task.id}">Delete</button>
            </td>
        `;

        taskRow.querySelector('.edit-btn')?.addEventListener('click', () => editTask(task.id));
        taskRow.querySelector('.delete-btn')?.addEventListener('click', () => deleteTask(task.id));

        taskListBody.appendChild(taskRow);
    });
};

// Функция для форматирования даты
function formatDate(date: Date): string {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`; // Форматируем как "день.месяц.год"
}

// Функция для редактирования задачи
const editTask = (id: string) => {
    currentEditingTask = taskManager.getTasks().find(task => task.id === id) || null;

    if (currentEditingTask) {
        taskTitleInput.value = currentEditingTask.title;
        taskDescInput.value = currentEditingTask.description;
        taskOwnerInput.value = currentEditingTask.owner ?? '';
        taskStatusInput.value = currentEditingTask.status;
        taskTypeInput.value = currentEditingTask.type;
        saveTaskBtn.style.display = 'inline-block'; // Показываем кнопку сохранения
        addTaskBtn.style.display = 'none'; // Скрываем кнопку добавления задачи
    }
};

// обработчик сохранения задачи
saveTaskBtn.addEventListener('click', () => {
    // Собираем данные из формы
    const title = taskTitleInput.value;
    const description = taskDescInput.value;
    const owner = taskOwnerInput.value || null;
    const status = taskStatusInput.value as TaskStatus;
    const type = taskTypeInput.value as TaskType;
    const place = taskPlaceInput.value as TaskType;

    if (currentEditingTask) {
        // обновляем её
        currentEditingTask.title = title;
        currentEditingTask.description = description;
        currentEditingTask.owner = owner ?? '';
        currentEditingTask.status = status;
        currentEditingTask.type = type;
        currentEditingTask.place = place ?? '';

        taskManager.editTask(currentEditingTask.id, currentEditingTask);
        renderTasks();

        // После сохранения очищаем форму и возвращаем кнопки в исходное состояние
        taskForm.reset();
        currentEditingTask = null;
        saveTaskBtn.style.display = 'none'; // Скрываем кнопку сохранения
        addTaskBtn.style.display = 'inline-block'; // Показываем кнопку добавления задачи
    }
});

// Функция для удаления задачи
const deleteTask = (id: string) => {
    taskManager.deleteTask(id);
    renderTasks();
};

// Обработчик для фильтрации задач
filterButton.addEventListener('click', () => {
    const filters = {
        owner: filterOwnerInput?.value.toLowerCase(),
        status: filterStatusSelect?.value,
        type: filterTypeSelect?.value,
    };
    filterTasks(filters);
});

// Функция для фильтрации задач
function filterTasks(filters: { owner: string, status: string, type: string }) {
    const filteredTasks = taskManager.getTasks().filter(task => {
        const matchesOwner = filters.owner ? task.owner?.toLowerCase().includes(filters.owner) : true;
        const matchesStatus = filters.status ? task.status === filters.status : true;
        const matchesType = filters.type ? task.type === filters.type : true;
        return matchesOwner && matchesStatus && matchesType;
    });
    renderTasks(filteredTasks);
}

// Функция для сброса фильтров
resetFilterBtn.addEventListener('click', () => {
    // Сброс всех фильтров
    filterOwnerInput.value = '';
    filterStatusSelect.value = '';
    filterTypeSelect.value = '';
    // Перерисовываем все задачи без фильтров
    renderTasks();
});

// Добавляем обработчик для сортировки по дате на ячейку ДАТА
dateHeader.addEventListener('click', () => {
    const tasks = taskManager.filterTasksByDate(dateSortDirection);

    if (dateSortDirection === 'asc') {
        dateSortDirection = 'desc';
    } else if (dateSortDirection === 'desc') {
        dateSortDirection = null;
    } else {
        dateSortDirection = 'asc';
    }
    renderTasks(tasks);
});

clearAll.addEventListener('click', () => {
    taskManager.deleteAllTasks();
})

// Обработчик изменения типа задачи
taskTypeInput.addEventListener('change', (event) => {
    const selectedType = (event.target as HTMLSelectElement).value;

    // Показываем или скрываем поле в зависимости от выбранного типа
    if (selectedType === TaskType.Event) {
        taskPlaceInput.style.display = 'block';
    } else {
        taskPlaceInput.style.display = 'none';
    }
});


// Инициализация при загрузке страницы
renderTasks();