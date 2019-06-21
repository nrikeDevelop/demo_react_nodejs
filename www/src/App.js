import React from 'react'
import './assets/styles.css'
import NavMenu from './components/Navbar'
import News from './components/News'
import { BrowserRouter, Route } from 'react-router-dom'
import Archive from './components/Archive'

function App () {
  return (
    <div className='bg_color'>
      <BrowserRouter>
        <div style={{width:'100%'}}>
          <NavMenu path='News' component={NavMenu}/>
          <Route path='/News' component={News} />
          <Route path='/Archive' component={Archive} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
