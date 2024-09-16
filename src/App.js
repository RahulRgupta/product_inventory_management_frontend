import './index.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './register';
import Login from './login';
import ProductForm from './productForm';
import ProductTable from './productTable';
import PrivateRoute from './privateroute.js';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/ProductForm' element={<PrivateRoute element={<ProductForm />}/>}></Route>
        <Route path='/ProductTable' element={<PrivateRoute element={<ProductTable />}/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
