# Gerenciamento de Produtos - Frontend

Aplicação Next.js completa para gerenciamento de produtos (CRUD) que consome uma API REST.

## 🚀 Tecnologias

- **Next.js 15** (App Router)
- **React 18+**
- **TypeScript**
- **Axios** para requisições HTTP
- **Tailwind CSS** para estilização

## 📋 Funcionalidades

- ✅ Listagem de produtos (tabela e cards)
- ✅ Busca/filtro por nome
- ✅ Criar novo produto
- ✅ Editar produto existente
- ✅ Deletar produto (com confirmação)
- ✅ Visualizar detalhes do produto
- ✅ Validação de formulários
- ✅ Feedback visual (toasts, loading states)
- ✅ Design responsivo (mobile e desktop)
- ✅ Formatação de preço em Real (R$)

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 18+ instalado
- API backend rodando (endpoints `/produtos`)

### Passo a Passo

1. **Clone ou baixe o projeto**

2. **Instale as dependências**
\`\`\`bash
npm install
\`\`\`

3. **Configure a URL da API**

Crie um arquivo `.env.local` na raiz do projeto:

\`\`\`env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
\`\`\`

Ajuste a URL conforme o endereço da sua API backend.

4. **Execute o projeto**
\`\`\`bash
npm run dev
\`\`\`

A aplicação estará disponível em `http://localhost:3000`

5. **Build para produção**
\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
app/
├── components/          # Componentes reutilizáveis
│   ├── Toast.tsx
│   ├── LoadingSpinner.tsx
│   ├── ConfirmModal.tsx
│   ├── ProductCard.tsx
│   ├── ProductTable.tsx
│   ├── ProductFormModal.tsx
│   └── SearchBar.tsx
├── contexts/           # Context API (Toast)
│   └── ToastContext.tsx
├── hooks/              # Custom hooks
│   ├── useFetchProdutos.ts
│   └── useProduto.ts
├── services/           # Integração com API
│   ├── api.ts
│   └── produtoService.ts
├── utils/              # Funções utilitárias
│   └── formatters.ts
├── produto/[id]/       # Página de detalhes
│   └── page.tsx
├── layout.tsx          # Layout principal
├── page.tsx            # Página inicial (listagem)
└── globals.css         # Estilos globais (Tailwind)
\`\`\`

## 🌐 Deploy

### Vercel (Recomendado para Next.js)

1. Faça push do código para GitHub
2. Conecte seu repositório no [Vercel](https://vercel.com)
3. Configure a variável de ambiente:
   - Settings → Environment Variables
   - Adicione: `NEXT_PUBLIC_API_BASE_URL` com a URL da sua API em produção
4. Deploy automático!

### Netlify

1. Faça build: `npm run build`
2. Configure o comando de build: `npm run build`
3. Configure o diretório de publicação: `.next`
4. Adicione a variável: `NEXT_PUBLIC_API_BASE_URL`

**Importante:** Certifique-se de que sua API backend está acessível publicamente e configurada para aceitar requisições do domínio do frontend (CORS).

## 🔌 Endpoints da API (Backend)

A aplicação espera que a API tenha os seguintes endpoints:

- `GET /produtos` - Lista todos os produtos
- `GET /produtos/:id` - Busca produto por ID
- `POST /produtos` - Cria novo produto
- `PUT /produtos/:id` - Atualiza produto
- `DELETE /produtos/:id` - Remove produto

**Estrutura esperada do produto:**
\`\`\`json
{
  "id": "string",
  "nome": "string",
  "preco": number,
  "categoria": "string",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string" (opcional)
}
\`\`\`

## 🐛 Troubleshooting

**Erro de CORS:**
- Configure o backend para aceitar requisições do frontend
- Adicione headers CORS apropriados na API

**API não conecta:**
- Verifique se `NEXT_PUBLIC_API_BASE_URL` está configurado corretamente
- Confirme que a API está rodando e acessível
- Verifique o console do navegador para erros de rede

**Produtos não aparecem:**
- Abra o DevTools (F12) → Network para ver as requisições
- Verifique se a API está retornando dados no formato esperado

## 📝 Licença

Este projeto é livre para uso educacional e comercial.
