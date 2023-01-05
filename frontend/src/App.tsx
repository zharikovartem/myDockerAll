import { Provider } from 'react-redux'
import './App.css'
import store from './Redux/store'
import RouterComponent from './Router/RouterComponent'

function App() {
    return (
      <Provider store={store}>
          <RouterComponent/>
      </Provider>
  )
}

export default App
