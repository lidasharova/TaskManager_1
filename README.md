# Проект: Менеджер задач

## 📋 Описание
Приложение "Менеджер задач" предназначено для управления списком задач с возможностью добавления, редактирования, удаления и фильтрации задач. Цель проекта — продемонстрировать работу с типизированными данными и классами в TypeScript, а также обеспечить гибкость для последующего расширения функционала.

## 🚀 Функциональные возможности

### Базовая функциональность
- **Добавление задач**: Создание новых задач с указанием необходимых параметров.
- **Редактирование задач**: Изменение информации о существующих задачах.
- **Удаление задач**: Удаление задач из списка.
- **Фильтрация задач**: Фильтрация по статусу и типу задачи для более удобного управления.

### Структура задачи
Каждая задача включает в себя следующие поля:
- **Заголовок** — краткое название задачи.
- **Описание** — подробное описание задачи.
- **Дата создания** — автоматически проставляется при создании задачи.
- **Статус** — выполнено или не выполнено.

### Дополнительные поля для задач по типу
- **Крайний срок** — для задач с фиксированной датой выполнения.
- **Ответственное лицо** — для задач, требующих назначения исполнителя.
- **Место проведения** — для задач, связанных с определённым местом.

## 🔍 Возможности фильтрации
- Фильтрация задач по статусу (*выполнено/не выполнено*).
- Фильтрация по типу задачи для отображения только релевантных задач.

## 💾 Сохранение данных
- **LocalStorage** используется для сохранения задач, что позволяет сохранять состояние между перезагрузками страницы.
- Защита от повреждения данных при загрузке из LocalStorage.