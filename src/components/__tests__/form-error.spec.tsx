import { render } from '@testing-library/react'
import React from 'react'
import {FormError} from '../form-error'
describe('<FormError/>', ()=>{
  it('render OK with Props', ()=>{
    const {getByText} = render(<FormError errorMessage="test" />)
    getByText("test")
  })
})
