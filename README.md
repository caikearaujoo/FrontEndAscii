🚀 ASCII Challenge — Frontend da API de Produtos

Esta é a aplicação Frontend (Next.js/React) desenvolvida para consumir e demonstrar a [API de Produtos do Desafio Ascii](https://github.com/seu-usuario/backendascii).

A interface implementa o CRUD completo, busca por nome/ID e um sistema de *polling* assíncrono para exibir as imagens de produtos geradas por Inteligência Artificial no backend.

---

## 🚀 Tecnologias Utilizadas

-   **Next.js** + **React**
-   **TypeScript**
-   **Tailwind CSS**
-   **Axios** (para chamadas de API)
-   **React Context API** (para gerenciamento de Toasts/Notificações)

---

## ⚙️ Como Rodar o Frontend Localmente

### 1. Clonar o Repositório

git clone [https://github.com/seu-usuario/frontendascii.git](https://github.com/seu-usuario/frontendascii.git)
cd frontendascii

2. Instalar Dependências

npm install

3. Configurar Variáveis de Ambiente
Crie um arquivo chamado .env.local na raiz do projeto:

# .env.local

# URL do seu backend (que está rodando na porta 3000)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# A mesma API Key que você definiu no .env do backend
NEXT_PUBLIC_API_KEY=SUA_CHAVE_DE_API_SECRETA_DO_BACKEND

4. Rodar o Servidor de Desenvolvimento
npm run dev

O site estará disponível em: 👉 http://localhost:3001

🔗 Link do Backend
Este frontend depende da API de Backend (Repositório Principal). Certifique-se de que o backend esteja rodando na porta 3000 para que o frontend possa se conectar a ele.
https://github.com/caikearaujoo/DesafioBackEndAscii
