import ReactDOM from 'react-dom/client'
import 'src/styles/index.css'
// preflight.css拷贝的tailwindcss中文件解决button透明问题
import 'src/styles/preflight.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // React.StrictMode开启严格模式,dev模式，页面渲染两次
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
)
