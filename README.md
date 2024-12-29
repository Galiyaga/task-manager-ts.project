# Фронтенд-разработка проекта таск-менеджер

### Описание

> Данный веб-сайт разработан с помощью create-react-app и TypeScript и осуществляет возможность добавления, удаления, фильтрации и редактирования задач, используя современные инструменты для разработки.

## Клиентская часть сервиса состоит из:

- формы авторизации
- страницы с выводом задач

### Основной функционал

Зарегистрированный пользователь может хранить и изменять задачи и подзадачи, отмечать их выполненными, а также фильтровать.

---

**Также в проекте реализовано:**

1. Работа с авторизацией с помощью токенов для безопасной авторизации

2. Сделаны обязательные поля и маскировка личной информации, валидация данных

3. Написан lazy loading при ожидании ответа с сервера, делая пользовательский опыт комфортным.

## Технологии:

<img src="https://img.shields.io/badge/-REACT-000000?logo=React&logoColor=#00fff" alt="REACT"/>&nbsp;
<img src="https://img.shields.io/badge/TypeScript-blue?logo=TypeScript&logoColor=blue&color=white" alt="TYPESCRIPT"/>&nbsp;
<img src="https://img.shields.io/badge/-REDUX-8a2eb2?logo=Redux&logoColor=#00fff" alt="REDUX"/>&nbsp;
<img src="https://img.shields.io/badge/HTML5-red?logo=html5&logoColor=white" alt="HTML5"/>&nbsp;
<img src="https://img.shields.io/badge/CSS3-blue?logo=css3&logoColor=white" alt="CSS3"/>&nbsp;
<img src="https://img.shields.io/badge/Node.js-green?logo=Node.js&logoColor=green&color=black
" alt="Node.js"/>&nbsp;

## В проекте реализованы технические требования:

- Клиентская часть написана с помощью React
- Использован компонентный подход
- Использованы библиотеки ReactRouter, Redux и Redux Toolkit
- Для запросов к API используются методы createAsyncThunk
- Приложение корректно отображается на различных разрешениях
- Отзывчивая и адаптивная верстка (десктоп, планшет и мобильные телефоны)
- На интерактивных элементах (ссылках, кнопках), при наведении курсора появляется cursor: pointer
- Использование осмысленных имен для всех переменных, классов и функций
- Соблюдение правил написания кода – кодстайла

### Начало работы с React-приложением

#### Этот проект создан с использованием [Create React App](https://github.com/facebook/create-react-app).

---

**Для запуска проекта (на своем устройстве) выполнить действия в терминале:**

1. Клонировать репозиторий на свой ПК:

```bash
git clone https://github.com/Galiyaga/task-manager-ts.project.git
```

2. Поставить пакеты в корне проекта:

```bash
yarn add
```

3. Для запуска приложения в режиме development выполнить:

```bash
yarn start
```

4. Для запуска приложения в режиме production необходимо собрать проект:

```bash
yarn build
```

5. После сборки выполнить:

```bash
yarn preview
```

**Ссылка для просмотра проекта:** ***https://finally-project-three.vercel.app***

#### Доступные команды

- `yarn start`: запускает приложение в режиме разработки.
- `yarn test`: запускает тесты.
- `yarn build`: собирает приложение для производственной среды.
- `yarn preview`: запускает локальный сервер для предпросмотра собранного проекта.
- `yarn lint`: запускает статический анализатор кода.

#### Дополнительные ресурсы

- [Документация Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- [Документация React](https://reactjs.org/)
- [Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

#### Данные для входа

- **Логин:** `galiyaga@yandex.ru`
- **Пароль:** `galiya`
