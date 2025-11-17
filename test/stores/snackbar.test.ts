import { setActivePinia, createPinia } from 'pinia'
import { useSnackbarStore } from '~/stores/snackbar' 
import { beforeEach, describe, it, expect, vi } from 'vitest'

describe('useSnackbarStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  it('o estado inicial deve ser o padrão', () => {
    const snackbar = useSnackbarStore()
    expect(snackbar.isVisible).toBe(false)
    expect(snackbar.message).toBe('')
    expect(snackbar.type).toBe('info')
  })

  it('deve mostrar o snackbar com a mensagem e tipo corretos', () => {
    const snackbar = useSnackbarStore()
    snackbar.showSnackbar('Teste de mensagem!', 'success')

    expect(snackbar.isVisible).toBe(true)
    expect(snackbar.message).toBe('Teste de mensagem!')
    expect(snackbar.type).toBe('success')
  })

  it('deve esconder o snackbar', () => {
    const snackbar = useSnackbarStore()
    snackbar.showSnackbar('Mensagem para esconder', 'error')
    expect(snackbar.isVisible).toBe(true)

    snackbar.hideSnackbar()
    expect(snackbar.isVisible).toBe(false)
  })

  it('deve esconder automaticamente após um tempo', async () => {
    const snackbar = useSnackbarStore()
    snackbar.showSnackbar('Mensagem temporária', 'info')
    expect(snackbar.isVisible).toBe(true)

    vi.advanceTimersByTime(3000)

    expect(snackbar.isVisible).toBe(false)
    vi.useRealTimers() 
  })

  it('deve definir o tipo padrão para "info" se nenhum for fornecido', () => {
    const snackbar = useSnackbarStore()
    snackbar.showSnackbar('Apenas mensagem')
    expect(snackbar.type).toBe('info')
  })
})