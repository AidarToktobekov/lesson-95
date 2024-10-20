import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppToolbar from './UI/AppToolbar/AppToolbar'
import { Route, Routes } from 'react-router-dom'
import Register from './features/User/Register'
import Login from './features/User/Login'
import Cocktails from './features/Cocktails/Cocktails'
import AddNewCocktail from './features/Cocktails/AddNewCocktail'
import OneCocktail from './features/Cocktails/OneCocktail'
import MyCocktails from './features/Cocktails/MyCocktails'


const App = ()=> {
  return (
    <>
      <header className='bg-dark'>
        <AppToolbar></AppToolbar>
      </header>
      <div className="container">
        <Routes>
          <Route path='/' element={
              <Cocktails/>
          }/>
          <Route path='/my-cocktails/:id' element={
              <MyCocktails/>
          }/>
          <Route path='/cocktails/:id' element={
              <OneCocktail/>
          }/>
          <Route path='/add' element={
              <AddNewCocktail/>
          }/>
          <Route path='/register' element={
            <Register/>
          }/>
          <Route path='/login' element={
            <Login/>
          }/>
          <Route path="*" element={<h1 className='text-center'>Not found</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
