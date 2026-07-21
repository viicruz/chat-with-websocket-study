# Chat App

Um chat simples que fiz com o objetivo de praticar o uso de **WebSockets** e aprender mais sobre o **Elysia**. A ideia do projeto foi explorar comunicação em tempo real e entender melhor como estruturar uma aplicação utilizando essas tecnologias.

## Rodando o projeto

### Frontend

Instale as dependências:

```bash
bun install
```

Depois inicie o projeto normalmente.

### Backend

Inicie o servidor com:

```bash
bun run elysia
```

## Variáveis de ambiente

Antes de iniciar o frontend, crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```