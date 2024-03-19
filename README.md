# Testes Automatizados - Projeto final Ada Tech

## 💻 Sobre o projeto

Esse é um projeto desenvolvido para aplicar os conhecimentos adquiridos durante o aprendizado do módulo de Testes automatizados da Ada Tech.

---

## ⚙️ Funcionalidades 

- [x] **Testes unitários para o fluxo de criação de sessão de usuários**
- [x] **Testes unitários para funções de utilidades**
- [x] **Testes de integração para o fluxo de criação de usuários**
- [x] **Testes e2e para o fluxo de criação de sessão de usuários**
- [x] **Testes e2e para o fluxo de criação de usuários**

---

## 📂 Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```bash
.
├── tests/                  # Diretório contendo os testes
│   ├── e2e/                # Diretório contendo os testes e2e de criação de sessão e criação de usuários
│   ├── integrations/       # Diretório contendo os testes de integração do fluxo de criação de usuários (Controllers e Services)
│   ├── mocks/              # Diretório contendo os mocks do request e response
│   ├── units/              # Diretório contendo os testes unitários do fluxo de sessão de usuários (Controllers e Services)
│   │   ├── utils/          # Diretório contendo os testes unitários de funções de utilidades
│   └── ...
└── ...
```

---

## 👨‍💻 Como executar localmente

1. Abra o terminal ou o prompt de comando e `clone` este repositório:
```bash
git clone https://github.com/Paulo-Ricard0/projeto-testes-automatizados.git
```

2. Acesse a pasta do projeto no seu terminal/cmd e inicialize o projeto no seu editor de código.
```bash
cd projeto-testes-automatizados
```

3. Renomeie o arquivo chamado `.env.example` para apenas `.env`, e o preencha-o com as informações que se pede:
```bash
# A porta onde o backend estará onvindo as requisições.
PORT=

# A chave secreta que será usada para gerar os tokens JWT
SECRET_KEY=

# A url de conexão com o banco de dados mongoDB. utilize o: https://www.mongodb.com/atlas/database
MONGO_DB_URL=
```

4. Instale as Dependências necessárias para rodar o projeto:
```bash
npm install
```

5. Para rodar os testes automatizados do projeto, execute o seguinte comando:
```bash
npm run test
```

6. Para verificar a cobertura dos testes automatizados, execute o seguinte comando:
```bash
npm run test:coverage
```
<br>

> :information_source: **Nota:** Se o teste "Should return status 200 when a new user is created" falhar na primeira vez, execute novamente o comando `npm run test`

---

## 🧑‍💻 Autor

Esse projeto foi desenvolvido por:

<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/paulo-ricardo-magalh%C3%A3es/"><img src="https://firebasestorage.googleapis.com/v0/b/quiz-baleias.appspot.com/o/ultima2.jpg?alt=media&token=68c74a20-9738-4d63-9aaf-b02608678c93" width="80px" alt="Foto Paulo Ricardo"/><br /><sub><b>Paulo Ricardo</b></sub></a><br /></td>
  </tr>
</table>

---
