# ⚠️ Leia a seção de avisos ⚠️
# Nunes Sports fullstack web application
> Status: 🆗 Parcialmente concluido
## Ferramentas utilizadas:

Database: 🐘 Postgre<br>
Backend: 🍃 Java Springboot<br>
Frontend: ⚛️ React<br>
Outros: 🐋 Docker

## Problemas conhecidos

- Pagina web não atualiza automaticamente os produtos, basta dar refresh que a tabela vai ser atualizada caso não tenha nenhum erro. -> Falha e solução conhecida
- Produto não é adicionado no database caso não tenha um cadastrado -> Falha desconhecida e solução temporaria: [ver problemas conhecidos](#Problemas-Conhecidos)

## Avisos e instalação

É meu primeiro projeto compartilhado com Docker, em teoria ele subirá todos os arquivos nescessarios e não precisará de nenhuma configuração por parte do úsuario, entretanto não fiz testes em outras maquinas. <br> Logo existe-se algumas soluções ao longo dessa seção.

## Utilizando o Docker

***Importante***: Tenha certeza que as seguintes portas estejam liberadas para uso: 
>:3000 :8080 :5432
<p>Em seguida, com a pasta do projeto baixada, utilizando o terminal acesse o diretório da pasta principal(C:..\NunesSports) e digite: </p>

```console
docker-compose up
```

Com os três containers ligados e sem apresentar erro, basta entrar em seu localhost:3000 para acessar a webpage

## Manualmente sem o Docker

Para o banco de dados temos duas opções, a criação e configuração manual de uma tabela no postgre, ou utilizar o database no Docker. O funcionamento dele já foi testado e validado (29/01). <br>
Em caso de erro no Docker, leia a parte de configuração manual.

#### Para criar a tabela manualmente

Script postgres:

```sql
CREATE TABLE postgres (
    codigo SERIAL PRIMARY KEY NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(1000) NOT NULL,
    preco REAL NOT NULL
);

```

#### Usuario e senha

Caso deseja utilizar o usuario pré configurado, utilize o username ***postgres*** e a senha ***123123***

### Database sem Docker:

1.Tenha em seu computador instalado e rodando o [postgre](https://www.postgresql.org) <br>
2.Dentro de **.\backend\src\main\resources\application.properties** altere as propriedades:

>database->localhost <br>
> :5432 -> porta database local <br>
>Usuario e senha opcional <br>

```java
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:postgresql://localhost:PORTA_DATABASE/postgres
spring.datasource.username=NOVO_USERNAME
spring.datasource.password=NOVA_PASSWORD
```

### Database com Docker:

Dentro de **.\backend\src\main\resources\application.properties** altere as propriedades:

> :5432 -> :7777

```java
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:postgresql://database:7777/postgres
spring.datasource.username=postgres
spring.datasource.password=123123
```

### Backend

#### Ligando o servidor via terminal

Com o terminal aberto na pasta .\backend, entre com o seguinte comando:

```console
java -jar target/NunesSports-0.0.1-SNAPSHOT.jar
```

Com isso o springboot iniciará o Tomcat e o backend está ligado.

#### Ligando o servidor via IDE

Com sua IDE de preferência, na pasta de backend, abra o arquivo ***.\backend\src\main\java\com\bestminds\nunessports\backend\NunesSportsBackendApplication.java*** e execute o main()

### Frontend

#### É importante que você tenha o [node.js](https://nodejs.org/en) instalado

Em seu terminal, acesse a pasta ***.\frontend*** do projeto, e entre com o comando:

```console
npm start
```

Caso não dê nenhum erro, a webpage estará online em 

> http://localhost:3000


### Problemas Conhecidos

Disparar uma requisição Post via software de API na seguinte url deve resolver o problema: 

>localhost:8080/novo-produto

Com o seguinte pattern de body:

```json
{
	"nome": "",
	"descricao": "",
	"preco": 
}
```
