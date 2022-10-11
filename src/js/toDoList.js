import { settingsState } from "../data/settingsState";
import { toDoTranslation } from "../data/toDoTranslation";

const todoListTitle = document.querySelector('.todo-list__title');
export const todoListBtn = document.querySelector('.todo-list__btn');
export const todoListItems = document.querySelector('.todo-list__items');
export const addTaskBtn = document.querySelector('.todo-list__add');
export const todoListInput = document.querySelector('.todo-list__input');

export function handleTaskStatus(evt) {
    if (evt.target.tagName === 'LI') {
        evt.target.classList.toggle('todo-list__item_checked');
    }
};

export function updateToDoLang() {
    todoListTitle.textContent = toDoTranslation[settingsState.language].title;
    todoListInput.setAttribute('placeholder', toDoTranslation[settingsState.language].placeholder);
    addTaskBtn.textContent = toDoTranslation[settingsState.language].add;
};

export function createNewTask() {
    const todoInputValue = todoListInput.value;

    if (todoInputValue !== '') {
        const listItem = document.createElement("li");
        listItem.classList.add('todo-list__item');
        const taskText = document.createTextNode(todoInputValue);

        const button = document.createElement("button");
        button.className = "todo-list__delete-btn";

        listItem.append(taskText);
        listItem.append(button);
        todoListItems.prepend(listItem);

        todoListInput.value = '';
        updateTaskEventListeners();
    }
};

function updateTaskEventListeners() {
    const deleteTaskBt = document.querySelectorAll('.todo-list__delete-btn');

    deleteTaskBt.forEach((el, i) => el.addEventListener('click', (evt) => {
        evt.target.parentNode.remove();
    }))
};
