import { render, RenderOptions } from '@testing-library/vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@src/router'
import { ComponentPublicInstance, h } from 'vue'

const FontAwesomeIconStub = {
  template: '<div class="font-awesome-icon" />',
}

const AppTemplate = {
  template: '<div> <router-view/> </div>',
}

const TransitionGroupStub = {
  render(ctx: ComponentPublicInstance) {
    return h('div', ctx.$props, ctx.$slots)
  },
}

export async function visitView(path: string, options: RenderOptions = {}) {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  await router.push(path)

  return render(AppTemplate, {
    global: {
      plugins: [router],
      stubs: {
        FontAwesomeIcon: FontAwesomeIconStub,
        'transition-group': TransitionGroupStub,
      },
    },

    ...options,
  })
}

export function renderComponent(component: any, options: RenderOptions = {}) {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  return render(component, {
    global: {
      plugins: [router],
      stubs: {
        FontAwesomeIcon: FontAwesomeIconStub,
      },
    },

    ...options,
  })
}
