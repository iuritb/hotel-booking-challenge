// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt', // Isso configura o ambiente de teste para o contexto Nuxt
    globals: true,      // Permite usar APIs de teste como 'describe', 'it', 'expect' globalmente
  }
})