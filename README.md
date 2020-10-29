# Тестовое задание.

1. Для запуска необходимо клонировать к себе репозиторий
   git clone https://github.com/anaxronik/yeti-crab-test.git

2. Установить зависимости для серверной части

   - npm install

3. Установить зависимости для фронтовой части

- cd client/

- npm install

4. Запустить серверную часть и фронтовую в одном терминале

- cd ..
- npm run dev

5. Фронтовая часть по умолчанию доступна по адресу http://localhost:3000/

6. Cерверная часть по умолчанию запускается на http://localhost:5555

# API документаця

## 'POST' /api/order/create

В теле запроса принимает объект с необходимыми данными для создания нового заказа.

Принимает body :

{

- "number": Number = 1,
- "firmName": String = "Корманчик",
- "name": String = "Вася пупкун",
- "phoneNumber": String = "5467458768978",
- "comment": String = "bfy0webyfew433434gq3g4 asdasdqf23g23 23g2g23 23g",
- "atiCode": String = "23525",

  }

Возвращает { message: 'Новая заявка созданна', id: order.\_id } или ошибку

## 'POST' /api/order/edit/:id

В теле запроса принимает объект с необходимыми данными для изменения данных заказа. Добавляет в базу датут последнего изменения.

Принимает body :

{

- "firmName": String = "Корманчик",
- "name": String = "Вася пупкун",
- "phoneNumber": String = "5467458768978",
- "comment": String = "bfy0webyfew433434gq3g4 asdasdqf23g23 23g2g23 23g",
- "atiCode": String = "23525",

  }

Возвращает { message: 'Изменения сохранены' } или ошибку

## 'DELETE' /api/order/delete/:id

Удаляет заявку с id указаннм в адресе.

Возвращает { message: 'Заявка удалена' } или ошибку

## 'GET' /api/order/

Возвращает массив со всеми найденными в БД заявками

Возвращает массив объектов [{},{},{}] или ошибку

{

- "lastEditDate": Date | null,
- "\_id" : String = "5f9b025bf15b5bb2589fb197",
- "number": Number = 1,
- "firmName": String = "Корманчик",
- "name": String = "fin9ubn9",
- "phoneNumber": String = "5467458768978",
- "comment": String = "bfy0webyfew433434gq3g4 asdasdqf23g23 23g2g23 23g",
- "atiCode": String = "23525",
- "createDate": Date = "2020-10-29T17:56:43.959Z",

}

## 'GET' /api/order/:id

Возвращает объект с заявкой найденно по id указзаной в адресер запроса :id

Возвращает {

- "lastEditDate": Date | null,
- "\_id" : String = "5f9b025bf15b5bb2589fb197",
- "number": Number = 1,
- "firmName": String = "Корманчик",
- "name": String = "fin9ubn9",
- "phoneNumber": String = "5467458768978",
- "comment": String = "bfy0webyfew433434gq3g4 asdasdqf23g23 23g2g23 23g",
- "atiCode": String = "23525",
- "createDate": Date = "2020-10-29T17:56:43.959Z",

} или ошибку

## 'POST' /api/auth/register

Принимет объект в теле запроса с регистрациооными данными, Проверяет на валидность с помощью middleware email и длинну пароля

### Принимает

{

- email: String = 'email@email.ru',
- password: String = 'password' миниму 6 символов

}

### Возвращает

{

- status: 'ok',
- message: 'Пользователь успешно создан.'

}

## 'POST' /api/auth/login

Принимет объект в теле запроса с данными для логина,

### Принимает

{

- email: String = 'email@email.ru',
- password: String = 'password' миниму 6 символов

}

### Возвращает

{

- token: String = "eyJhbGciOi...a5cUnASx79o3k",
- userId: String = "5f988c487b901423082d4d96"

}
