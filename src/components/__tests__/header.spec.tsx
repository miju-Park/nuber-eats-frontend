import { render } from '@testing-library/react'
import {Header} from '../header'
import {MockedProvider} from '@apollo/client/testing'
import {BrowserRouter as Router} from 'react-router-dom'

describe('<Header />', ()=>{
  it('renders OK', ()=>{
    render(
      <MockedProvider>
        <Router>
          <Header />
        </Router>
      </MockedProvider>
    )
  })
})