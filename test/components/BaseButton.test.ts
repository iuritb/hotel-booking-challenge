// test/components/BaseButton.test.ts
import { mount } from '@vue/test-utils'
import BaseButton from '~/components/BaseButton.vue' // Ajuste o caminho se necessário

describe('BaseButton', () => {
  it('deve renderizar o slot padrão corretamente', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Meu Botão'
      }
    })
    expect(wrapper.text()).toContain('Meu Botão')
  })

  it('deve aplicar a classe de variante correta (primary)', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('bg-indigo-600') // Verifique se essa classe corresponde à sua variante 'primary'
  })

  it('deve aplicar a classe de variante correta (secondary)', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'secondary'
      }
    })
    expect(wrapper.classes()).toContain('bg-gray-200') // Verifique se essa classe corresponde à sua variante 'secondary'
  })

  it('deve aplicar a classe de variante correta (danger)', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'danger'
      }
    })
    expect(wrapper.classes()).toContain('bg-red-600') // Verifique se essa classe corresponde à sua variante 'danger'
  })

  it('deve emitir o evento "click" quando clicado', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toHaveLength(1)
  })

  it('não deve emitir o evento "click" quando desativado', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeUndefined()
  })
})