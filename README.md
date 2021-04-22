# Portfolio information Manager 
> You can use this project to manage you portfolio information :wink: :heart:

<img alt="NestJS" src="https://img.shields.io/badge/nestjs%20-%23E0234E.svg?&style=for-the-badge&logo=nestjs&logoColor=white" />

<img alt="GraphQL" src="https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql"/>

<img alt="Docker" src="https://img.shields.io/badge/docker%20-%230db7ed.svg?&style=for-the-badge&logo=docker&logoColor=white"/>

<img alt="Postgres" src ="https://img.shields.io/badge/postgres-%23316192.svg?&style=for-the-badge&logo=postgresql&logoColor=white"/>

Backend on NestJs with GraphQL (Code First Approach) for manage your personal information, this project allows execute CRUD operations in the next models:

<img src="images/portfolio-entities.png" width="700">

To update each model, you need an account, use `signUp()` mutation to create one.

After you can create an account, you will receive an email to verify your account, you should verify your email, otherwise you can't perform any operation.

Project most relevant Features:

- Send emails automatically.
- Password recovery.
- Upload Images.
- JWT Authentication.

You can see this project in production environment in the next URL:

> https://jcalarcon.me/portfolio/graphql

## Usage

After run this project you should follow the next steps:

1. Create .env file in the source folder
2. Add the next credentials to the .env file
    - EMAIL_HOST=smtp.gmail.com
    - EMAIL_PORT=465
    - AUTH_TYPE=OAuth2
    - EMAIL_ACCOUNT=username@gmail.com
    - EMAIL_CLIENT_ID=
    - EMAIL_CLIENT_SECRET=
    - EMAIL_REFRESH_TOKEN=
    - EMAIL_ACCESS_TOKEN=

3. Generate `EMAIL_CLIENT_ID=`, `EMAIL_CLIENT_SECRET`, `EMAIL_REFRESH_TOKEN` and `EMAIL_ACCESS_TOKEN`, you can follow the next guide: 
https://stackoverflow.com/questions/51933601/what-is-the-definitive-way-to-use-gmail-with-oauth-and-nodemailer


After that, you only have to execute:

```shell
docker-compose up --build
```
## Author

👤 **Jean Carlos Alarcón**

[![Twitter Follow](https://img.shields.io/twitter/follow/jcalarcon98?color=1DA1F2&label=Follow%20me%20on%20Twitter%21&logo=twitter&style=for-the-badge)](https://twitter.com/jcalarcon98)

* Twitter: [@jcalarcon98](https://twitter.com/jcalarcon98)
* Github: [@jcalarcon98](https://github.com/jcalarcon98)
* LinkedIn: [@jcalarcon98](https://linkedin.com/in/jcalarcon98)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Jean Carlos Alarcón](https://github.com/jcalarcon98).

This project is under [MIT](https://opensource.org/licenses/MIT) licensed.

***