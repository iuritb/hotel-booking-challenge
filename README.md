# 🏨 Hotel Booking Challenge

Um desafio de desenvolvimento frontend para uma aplicação de reserva de hotéis, construído com Nuxt 3, Pinia e Tailwind CSS.

## 🚀 Visão Geral do Projeto

Este projeto consiste em uma aplicação web moderna para busca e reserva de hotéis. Desenvolvida como parte de um desafio técnico, ela demonstra proficiência em frameworks reativos, gerenciamento de estado e estilização eficiente, focando em uma experiência de usuário fluida e responsiva.

## ✨ Funcionalidades

*   **Listagem de Hotéis:** Exibe uma lista de hotéis disponíveis com detalhes essenciais.
*   **Detalhes do Hotel:** Página dedicada para cada hotel, mostrando informações completas, imagens e opções de reserva.
*   **Formulário de Reserva:** Interface intuitiva para que os usuários possam preencher e submeter suas reservas.
*   **Gerenciamento de Estado Global:** Utilização do Pinia para gerenciar o estado da aplicação de forma centralizada e reativa.
*   **Design Responsivo:** A aplicação se adapta a diferentes tamanhos de tela (desktop, tablet, mobile).

## 🛠️ Tecnologias Utilizadas

*   **Frontend Framework:** [Nuxt 3](https://nuxt.com/) (Vue 3, Vite, Nitro)
    *   **Por que Nuxt 3?** Escolhido por sua flexibilidade (SSR, SSG, SPA), roteamento baseado em arquivos, auto-imports, e otimizações de performance. Facilita o desenvolvimento de aplicações Vue complexas e escaláveis.
*   **Gerenciamento de Estado:** [Pinia](https://pinia.vuejs.org/)
    *   **Por que Pinia?** Uma solução de gerenciamento de estado leve e intuitiva para Vue, com excelente suporte a TypeScript. Oferece uma API simples para criar stores modulares e reativas, melhorando a organização e manutenção do código em relação a soluções mais verbosas.
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
    *   **Por que Tailwind CSS?** Um framework CSS utility-first que permite construir designs complexos diretamente no markup. Acelera o desenvolvimento, garante consistência no design e permite uma personalização profunda sem a necessidade de escrever CSS do zero.
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
    *   **Por que TypeScript?** Adiciona tipagem estática ao JavaScript, aumentando a robustez do código, facilitando a detecção de erros em tempo de desenvolvimento e melhorando a manutenibilidade de grandes bases de código.
*   **Gerenciador de Pacotes:** [Yarn](https://yarnpkg.com/) (ou npm)

## ��️ Arquitetura e Design

O projeto segue a arquitetura padrão de um aplicativo Nuxt 3, que promove uma separação clara de responsabilidades e facilita a manutenção.

*   **Estrutura de Pastas:**
    *   `pages/`: Contém as visualizações do aplicativo, com roteamento automático baseado na estrutura de arquivos. Ex: `pages/hotels/[id]/index.vue` para detalhes de um hotel específico.
    *   `components/`: Componentes Vue reutilizáveis em toda a aplicação. O Nuxt auto-importa componentes, simplificando o uso.
    *   `layouts/`: Define a estrutura de layout para diferentes seções da aplicação.
    *   `assets/`: Armazena arquivos estáticos como imagens, fontes e arquivos CSS globais (ex: `tailwind.css`).
    *   `composables/`: Funções reutilizáveis e reativas que encapsulam lógica específica do Vue 3.
    *   `stores/`: Contém os módulos Pinia para gerenciamento de estado global. Cada arquivo aqui representa um store Pinia.
    *   `public/`: Arquivos estáticos que serão servidos diretamente (ex: `favicon.ico`).
    *   `nuxt.config.ts`: O arquivo de configuração principal do Nuxt, onde módulos, plugins e outras configurações são definidos.
*   **Fluxo de Dados (Pinia):** As informações dos hotéis e o estado da reserva são gerenciados por stores Pinia. Os componentes acessam e atualizam o estado através de actions e getters definidos nos stores, garantindo um fluxo de dados previsível e fácil de depuração.
*   **Estilização com Tailwind:** A abordagem utility-first do Tailwind é utilizada para estilizar os componentes. Isso mantém o CSS co-localizado com o HTML, resultando em estilos altamente reutilizáveis e fáceis de adaptar. A configuração de cores e fontes é centralizada via `tailwind.config.ts`.
*   **Interação com API (Assumida):** Presume-se que a aplicação interage com uma API RESTful para buscar dados de hotéis e submeter reservas. Esta comunicação é geralmente encapsulada em `composables` ou diretamente nas `actions` do Pinia, utilizando o `useFetch` do Nuxt para chamadas assíncronas e otimização de dados.

## ⚙️ Instalação e Execução

Para configurar e rodar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

*   [Node.js](https://nodejs.org/en/) (versão 18.x ou superior recomendada)
*   [Yarn](https://yarnpkg.com/) (ou npm)

### Passos de Instalação

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/seu-usuario/hotel-booking-challenge.git
    cd hotel-booking-challenge
    ```

2.  **Instale as Dependências:**
    ```bash
    yarn install
    # ou
    # npm install
    ```

### Execução Local

1.  **Modo de Desenvolvimento:**
    Para iniciar o servidor de desenvolvimento com hot-reloading e relatórios de erro, execute:
    ```bash
    yarn dev
    # ou
    # npm run dev
    ```
    A aplicação estará disponível em `http://localhost:3000`.

### Build para Produção

Para construir a aplicação para deploy em produção:
```bash
yarn build
# ou
# npm run build

Este comando irá compilar e otimizar a aplicação, gerando os arquivos estáticos e o servidor de produção no diretório .output/.

## Execução em Produção (Local)
Após o build, você pode testar a aplicação em um ambiente de produção localmente:

```bash
yarn preview
# ou
# npm run preview

## Deploy
Deploy
Este projeto é configurado para ser facilmente deployado em plataformas como 

vercel.com
. O arquivo .github/workflows/deploy.yml contém a configuração para deploy automatizado via GitHub Actions.

🤝 Contribuição
Contribuições são bem-vindas! Se você tiver sugestões ou quiser reportar um bug, por favor, abra uma issue ou um pull request.

📄 Licença
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes.