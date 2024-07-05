import React from 'react'
import AppointmentBooking from './AppointmentBooking'

describe('<AppointmentBooking />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AppointmentBooking />)
  })
})