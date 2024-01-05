import HistoryCard from '@src/modules/histories/components/HistoryCard.vue'
import { format } from 'date-fns'
import mockHistory from './mocks/history.mock'
import { renderComponent } from '../../../../tests/helpers/visitView'

const history = mockHistory()

describe('History card display test', () => {
  test('History card renders correctly', async () => {
    const view = renderComponent(HistoryCard, { props: { history } })

    view.getByText(history.title!)
    view.getByText(history.details!)

    const formattedDate = format(
      new Date(history.event_date_unix * 1000),
      'dd.MM.yyyy',
    )
    view.getByText(formattedDate)

    const articleLink = view.getAllByRole('link')[1]

    expect(articleLink).toHaveAttribute('href', history.links!.article)
    expect(articleLink).toHaveAttribute('target', '_blank')
  })

  test('History url renders correctly', async () => {
    const view = renderComponent(HistoryCard, { props: { history } })

    expect(view.getAllByRole('link')[0]).toHaveAttribute(
      'href',
      `/histories/${history.id}`,
    )
  })
})
