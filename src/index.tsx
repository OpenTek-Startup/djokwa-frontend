import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from './App'
import { Provider } from 'react-redux'
import './styles/globals.css'
import { store } from 'utils/userUtils'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App />{' '}
  </Provider>
)
