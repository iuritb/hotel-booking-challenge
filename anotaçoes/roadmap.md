🗺️ Roadmap Detalhado do Desafio
Agora que a configuração inicial está pronta, aqui está um roadmap detalhado, dividido em pequenas tarefas sequenciais, para abordarmos o desafio. Cada etapa será um "checkpoint" onde eu fornecerei o código completo e as orientações necessárias.

# ✅ Fase 1: Configuração Essencial e Estrutura Básica
1. ✅ *Configuração Inicial do Projeto Nuxt 3:* (Concluído acima)
  * Criação do projeto com yarn create nuxt-app.
  * Instalação e configuração de Tailwind CSS e Pinia.
  * nuxt.config.ts e tailwind.config.ts configurados.
  * Criação de .env para variáveis de ambiente.

2. ✅ *Estrutura de Pastas e Componentes Base:*
  * Definição da estrutura de diretórios (components, pages, layouts, composables, stores, server/api, etc.).
  * Criação de um default.vue layout.
  * Criação de componentes UI básicos (ex: BaseButton, BaseInput).

3. ✅ *Configuração de Autenticação com Pinia:*
  * Criação da store Pinia para gerenciar o estado de autenticação (usuário, token).
  * Definição de server/api/auth/login.post.ts e server/api/auth/register.post.ts (mocks).
  * Criação de uma página de login (pages/login.vue) e registro (pages/register.vue).
  * Implementação de um mecanismo de autenticação via middleware do Nuxt (middleware/auth.ts) para rotas protegidas.
  ____________________________________________________________________________________________________________________________

# Fase 2: Pesquisa e Listagem de Hotéis
4. ✅ *Criação da Mock API para Hotéis:*
  * Definição de server/api/hotels.get.ts para simular a busca de hotéis.
  * Definição de server/api/hotels/[id].get.ts para simular detalhes de um hotel específico.
  * Criação de dados mock de hotéis.

5. ✅ *Página de Pesquisa (pages/index.vue):*
  * Formulário de pesquisa com campos para destino, datas (check-in/check-out), número de quartos e hóspedes.
  * Lógica para submeter o formulário e buscar hotéis via useFetch ou $fetch do Nuxt.
  * Exibição dos resultados em uma lista.

6. ✅ *Componentes de Hotéis:*
  * HotelSearchForm.vue (componente para o formulário de pesquisa).
  * sHotelCard.vue (componente para exibir um hotel na lista de resultados).
  * HotelList.vue (componente para gerenciar a exibição da lista e interação).

7. ✅ *Filtragem e Ordenação dos Resultados:*
  * Funcionalidade para ordenar a lista de hotéis por preço, avaliações, etc.
  * Funcionalidade básica de filtragem (opcional, como por amenidades).
  ____________________________________________________________________________________________________________________________

# Fase 3: Comparação e Detalhes do Hotel
8. ✅ *Página de Detalhes do Hotel (pages/hotels/[id].vue):*
  * Exibição de informações detalhadas de um hotel específico.
  * Botão para iniciar o processo de reserva.

9. ✅ *Mecanismo de Comparação de Hotéis:*
  * Adicionar funcionalidade para selecionar hotéis para comparação (ex: checkbox ou botão "Adicionar para Comparar" no HotelCard).
  * Página de Comparação (pages/compare.vue) que exibe os hotéis selecionados lado a lado.
  * Componente HotelComparisonTable.vue.
  ____________________________________________________________________________________________________________________________

# Fase 4: Reserva e Notificações
10. ✅ *Página de Reserva (pages/hotels/[id]/book.vue):*
  * Formulário de reserva solicitando nome, contato, detalhes de pagamento.
  * Validação de formulário (ex: com Zod ou VeeValidate).
  * Lógica para submeter a reserva para a mock API.

11. ✅ *Mock API de Reserva:*
  * Definição de server/api/bookings.post.ts para simular a criação de uma reserva.

12. ✅ *Sistema de Notificações:*
  * Criação de um composable useNotification para exibir mensagens (sucesso/erro/informação) ao usuário.
  * Integração do sistema de notificação nos fluxos de login/registro, pesquisa e reserva.
  ____________________________________________________________________________________________________________________________

# Fase 5: Otimização, Testes e Entrega
13. ✅ *Otimização de Desempenho:*
  * Revisão para LazyLoading de componentes ou rotas.
  * Verificação do Code Splitting.
  * Otimização de imagens (se aplicável).

14. *Testes Básicos:*
  * Instalação de Vitest e @nuxt/test-utils.
  * Criação de testes unitários básicos para alguns componentes ou composables críticos.

15. *Configuração de CI/CD (GitHub Actions):*
  * Criação de um workflow básico no GitHub Actions para build e deploy (ex: para Netlify/Vercel ou simplesmente para verificar o build).

16. *Documentação (README.md):*
  * Criação de um README.md detalhado com instruções de instalação, execução, descrição do projeto, escolhas técnicas e arquiteturais.