# Desafio SoftExpert

Sistema com **POSTGRES** para o db, **PHP** puro no backend e **REACT + BOOTSTRAP** no front.

Sistema precisava conter: 

- Cadastro de produtos
- Cadastro de categoria do produto
- Tela de venda com informações específicas
- Salvar venda

### Instale as dependências.

Na raiz do projeto:

```cmd
composer install
```

Avance para pasta front e instale as dependências:
```cmd
cd front
npm install
```
___
Defina os dados no `.env` da raiz com os seus dados do banco. Por exemplo:

```.env
DB_HOST=
DB_PORT=5432
DB_USER=
DB_PASS=
DB_NAME=
DB_SCHEMA="soft_seller"
```

> Se atentar para `DB_SCHEMA`

> O dump está na raiz do projeto.

E no `/front/.env` defina com o IP da sua máquina + a porta que subir: **8080**. Por exemplo: 

```env
SERVER_URL=http://<ip-da-sua-máquina>:8085
```
___
### Para rodar o projeto basta iniciar o backend na pasta raiz com: 

```cmd
php -S localhost:8080
```

Em seguida, avance para a pasta do frontend com: 

```cmd
cd front
```

E rode o projeto com: 

```cmd
npm run dev
```





