# quotes-app

## Installation

Follow this instruction.

```bash
npm i --save
```

Set config in sequelize and run
```bash
sequelize db:init
```
```bash
sequelize db:migrate
```
```bash
npm run start
```

## Path

```javascript
u can get this : https://www.getpostman.com/collections/02303355c97933661234
or
GET('/fetch')
Get('/all')
Post('/quote') Req.body: {quote: ``, favorites: true || false}
Put('/quote/:id') Req.body: {favorites: true || false}
Delete('/quote/:id')
```

## License
[MIT](https://choosealicense.com/licenses/mit/)