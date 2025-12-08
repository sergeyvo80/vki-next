# Знакомство со стеком React, Next.js, TanStackQuery, SQLite, TypeORM

- [Знакомство со стеком React, Next.js, TanStackQuery, SQLite, TypeORM](#знакомство-со-стеком-react-nextjs-tanstackquery-sqlite-typeorm)
    - [План курса и критерии оценок](#план-курса-и-критерии-оценок)
  - [Установка](#установка)
    - [Открыть в браузере две вкладки](#открыть-в-браузере-две-вкладки)
  - [Конфигурация](#конфигурация)
  - [Файловый раутинг Next.js - работает из папки src/app](#файловый-раутинг-nextjs---работает-из-папки-srcapp)
  - [Назначение файлов](#назначение-файлов)
    - [Приложение - Frontend](#приложение---frontend)
    - [API - Backend](#api---backend)
  - [Работа с данными](#работа-с-данными)
  - [Стилизация](#стилизация)
  - [Инструменты](#инструменты)
  - [SSR - Server Side Rendering, передача состояния на клиент](#ssr---server-side-rendering-передача-состояния-на-клиент)
  - [Vercel - создание облачной БД Postgres](#vercel---создание-облачной-бд-postgres)
  - [Deployment (развертка проекта) на хостинге Vercel](#deployment-развертка-проекта-на-хостинге-vercel)
  - [Ссылки](#ссылки)
    - [HTML](#html)
    - [CSS](#css)
    - [Критические этапы рендеринга (Critical Rendering Path - CRP)](#критические-этапы-рендеринга-critical-rendering-path---crp)
    - [JavaScript](#javascript)
    - [Event Loop - cобытийный цикл](#event-loop---cобытийный-цикл)
    - [TypeScript](#typescript)
    - [Архитектура](#архитектура)
    - [Запуск кода онлайн](#запуск-кода-онлайн)


### [План курса и критерии оценок](docs/plan.md)

## Установка 

1) Открыть cmd, выполнить (cклонировать проект на диск С: в личную папку (на диске G: проект не развернется):
    ```
    git clone https://github.com/sergeyvo80/vki-next
    ```

2) Открыть в VSCode, в терминале VSCode выполнить:
    ```
    Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
    ```

3) Установить npm пакеты:
    ```
    npm i
    ```

4) Запустить проект:
    ```
    npm run dev
    ```

### Открыть в браузере две вкладки

http://localhost:3000/ - приложение

http://localhost:3000/api/groups - апи


## Конфигурация
Создать файл .env.local в корне проекта
```
# .env.local
DB="g:/vki-web/vki-web-orm.db"
NEXT_PUBLIC_API="http://localhost:3000/api/"
```

## Файловый раутинг Next.js - работает из папки src/app

[читать по ссылке](docs/next-routing.md)


## Назначение файлов

### Приложение - Frontend

- Главный шаблон (точка входа) - [src/app/layout.tsx](src/app/layout.tsx)
- Компоненты шаблона - [src/app/components/layout](src/app/components/layout)
- Страница - [src/app/groups/page.tsx](src/app/groups/page.tsx)
- Компонент - [src/components/Groups/Groups.tsx](src/components/Groups/Groups.tsx)
- Хук получения данных - [src/hooks/useGroups.tsx](src/hooks/useGroups.tsx)
- Получение данных из API - [src/api/groupsApi.ts](src/api/groupsApi.ts)

### API - Backend

- API возвращает список групп - [src/app/groups/route.ts](src/app/groups/route.ts)
- Запрос к БД - [src/db/groupDb.ts](src/db/groupDb.ts)
- Стартовая БД и запросы - папка db в корне проекта

## Работа с данными
![data](docs/pics/data.png)

## Стилизация
[читать по ссылке](docs/styles.md)

## Инструменты
- ### [Debug - отладка, средства разработки браузера](docs/debug.md)
- ### [TanStackQuery - работа с данными в приложении](docs/tanstack-query.md)
- ### [БД SQLite](docs/db.md)
- ### [HTTP запросы](docs/http.md)
- ### [GIT](docs/git.md)

## SSR - Server Side Rendering, передача состояния на клиент
[читать по ссылке](docs/ssr.md)

## Vercel - создание облачной БД Postgres
[читать по ссылке](docs/vercel-db.md)

## Deployment (развертка проекта) на хостинге Vercel
[читать по ссылке](docs/vercel-deploy.md)

## Ссылки

### HTML
- [Базовая структура HTML-документа с объяснением каждой строчки](https://habr.com/ru/companies/macloud/articles/555082/)
- [Что такое семантика?](https://doka.guide/html/semantics/)
- [Глобальные атрибуты](https://doka.guide/html/global-attrs/)
- [ARIA states and properties (attributes)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes)
- [Рендеринг WEB-страницы](https://habr.com/ru/articles/224187/)

- [JavaScript, отдохни! Делаем интерактивные вещи на HTML и CSS](https://habr.com/ru/companies/reksoft/articles/950918/)

### CSS
- [CSS дока](https://doka.guide/css/)
- [Вам больше не нужен JavaScript](https://habr.com/ru/articles/946498/)
- [CSS свойство will-change](https://developer.mozilla.org/ru/docs/Web/CSS/will-change)
- [Современный CSS: что важно знать в 2025 году](https://habr.com/ru/companies/timeweb/articles/951540/)

### Критические этапы рендеринга (Critical Rendering Path - CRP)
- [Как браузер рисует страницы](https://doka.guide/tools/how-the-browser-creates-pages/)
- [Критические этапы рендеринга](https://developer.mozilla.org/ru/docs/Web/Performance/Guides/Critical_rendering_path)
- [Понимание критического пути рендеринга](https://habr.com/ru/articles/320430/)

### JavaScript
- [Типы и структуры данных JavaScript](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Data_structures)
- [Прототипное наследование](https://learn.javascript.ru/prototype-inheritance)
- [Что такое hoisting](https://www.dev-notes.ru/articles/what-is-hoisting-in-javascript/)
- [ES6 по-человечески](https://habr.com/ru/articles/305900/)
- [JavaScript Roadmap](https://roadmap.sh/javascript)

### Event Loop - cобытийный цикл
- [Микрозадачи и макрозадачи](https://learn.javascript.ru/event-loop)
- [Почему браузеры ограничивают JavaScript таймеры?](https://habr.com/ru/articles/945872/)
- [Способы разделения длительных задач в JavaScript](https://habr.com/ru/companies/timeweb/articles/882418/)

### TypeScript
- [TypeScript документация](https://www.typescriptlang.org)
- [TypeScript Cheat Sheet](https://doabledanny.gumroad.com/l/typescript-cheat-sheet-pdf)

### Архитектура
- [Паттерны и рефакторинг](https://refactoringguru.cn/ru)
- [Архитектура фронтенда и какой она должна быть](https://habr.com/ru/articles/667214/)
- [Архитектура front-end приложений](https://habr.com/ru/articles/726354/)
- [Чистая архитектура во фронтенде](https://bespoyasov.ru/blog/clean-architecture-on-frontend/)

### Запуск кода онлайн
- [JavaScript](https://trycode.pw)
- [TypeScript](https://trycode.pw)

