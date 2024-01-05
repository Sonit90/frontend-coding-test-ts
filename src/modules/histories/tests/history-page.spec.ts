import { ref } from 'vue'

import { useQuery } from '@vue/apollo-composable'
import { expect, Mock } from 'vitest'
import { fireEvent } from '@testing-library/vue'
import {
  NotificationType,
  useNotifications,
} from '@src/notifications/useNotifications.ts'
import mockHistories from './mocks/histories.mock'
import { visitView } from '../../../../tests/helpers/visitView'

vi.mock('@vue/apollo-composable', () => ({
  __esModule: true,
  useQuery: vi.fn(),
}))

describe('History page test', () => {
  test('History page correctly shows loading', async () => {
    ;(useQuery as Mock).mockImplementationOnce(() => ({
      onResult: () => ({
        data: {
          histories: [],
        },
      }),
      loading: true,
    }))
    const view = await visitView('/histories')

    view.getByText('Loading')
  })
  test('When we receive no histories, we show text, that we don`t have any histories', async () => {
    const result = ref([])
    ;(useQuery as Mock).mockImplementationOnce(() => ({
      onResult: () => ({
        data: {
          histories: [],
        },
      }),
      result,
    }))

    const view = await visitView('/histories')

    view.getByText('There are no histories yet :(')
  })

  test('History page correctly loads histories and shows them', async () => {
    const histories = mockHistories()

    const result = ref({
      histories,
    })
    // Probably we have to run some kind mock server to overcome this
    const { addNotification } = useNotifications()
    ;(useQuery as Mock).mockImplementationOnce(() => ({
      onResult: () =>
        addNotification({
          message: 'Successfully fetched histories',
          type: NotificationType.Success,
        }),
      result,
      error: false,
      loading: false,
    }))

    const view = await visitView('/histories')

    const firstHistory = histories[0]

    view.getByText(firstHistory.title!)

    view.getByText('Successfully fetched histories')
  })

  test('We see refetch button on error', async () => {
    ;(useQuery as Mock).mockImplementationOnce(() => ({
      onResult: () => ({}),

      error: true,
      loading: false,
    }))

    const view = await visitView('/histories')

    view.getByText('Error occurred. Want to reload data?')

    view.getByText('Refetch')
  })

  test('Refetch button actually triggers refecth and shows error popup', async () => {
    const refetch = vi.fn()
    ;(useQuery as Mock).mockImplementationOnce(() => ({
      onResult: () => ({}),
      refetch,
      error: true,

      loading: false,
    }))

    const view = await visitView('/histories')

    await fireEvent.click(view.getByText('Refetch'))

    expect(refetch).toHaveBeenCalledOnce
  })
})
