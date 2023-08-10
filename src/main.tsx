import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'src/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // React.StrictMode开启严格模式,dev模式，页面渲染两次
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
