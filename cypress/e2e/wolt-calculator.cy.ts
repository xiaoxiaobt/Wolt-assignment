describe('Wolt Calculator Frontend', () => {

  beforeEach(function () {
    cy.visit('http://localhost:5173')
  })

  it('is accessible', () => {
    cy.contains("Wolt Delivery Fee Calculator")
  })

  it('renders the form', () => {
    cy.get('form').should('exist')
    cy.get('input[name="cartValue"]').should('exist')
    cy.get('input[name="deliveryDistance"]').should('exist')
    cy.get('input[name="numberOfItems"]').should('exist')
    cy.get('input[name="time"]').should('exist')
  })

  it('renders the buttons', () => {
    cy.get('button').contains('Clear').should('exist')
    cy.get('button').contains('Calculate').should('exist')
    cy.get('button').contains('Calculate').should('be.disabled')
  })

  it('can calculate the delivery fee', () => {
    cy.get('input[name="cartValue"]').type('100')
    cy.get('input[name="deliveryDistance"]').type('1000')
    cy.get('input[name="numberOfItems"]').type('1')
    cy.get('input[name="time"]').type('01/30/202405:41')
    cy.get('button').contains('Calculate').should('not.be.disabled').click()
    cy.contains('The delivery cost is 2.00€')
  })

  it('can clear the form', () => {
    cy.get('input[name="cartValue"]').type('100')
    cy.get('input[name="deliveryDistance"]').type('1000')
    cy.get('input[name="numberOfItems"]').type('1')
    cy.get('button').contains('Clear').click()
    cy.get('input[name="cartValue"]').should('have.value', '')
    cy.get('input[name="deliveryDistance"]').should('have.value', '')
    cy.get('input[name="numberOfItems"]').should('have.value', '')
  })

  it('can display error message', () => {
    cy.get('input[name="numberOfItems"]').type('0')
    cy.get('body').click()
    cy.contains('Must be larger than 0')
  })

  it('can prevent inputting illegal characters', () => {
    cy.get('input[name="deliveryDistance"]').type('Hooray!')
    cy.get('input[name="deliveryDistance"]').should('have.value', '')
  })

  it('can display the time picker', () => {
    cy.get('#openPickerButton').click()
    cy.get('.MuiPaper-root').should('exist')
  })

  it('can display the cost breakdown', () => {
    cy.get('input[name="cartValue"]').type('100')
    cy.get('input[name="deliveryDistance"]').type('1000')
    cy.get('input[name="numberOfItems"]').type('24')
    cy.get('input[name="time"]').type('01/26/202418:41')
    cy.get('button').contains('Calculate').click()
    cy.wait(100)
    cy.get('[data-test-id="fee"]').contains('15.00')
    cy.contains('Cost breakdown')
    cy.contains('Distance cost')
    cy.contains('Number of items cost')
    cy.contains('Bulk item surcharge')
    cy.contains('Rush hour surcharge')
    cy.contains('Cap price deduction')
  })

  it('respects input locale', () => {
    cy.get('input[name="cartValue"]').type('100,00')
    cy.get('input[name="deliveryDistance"]').type('1000')
    cy.get('input[name="numberOfItems"]').type('1')
    cy.get('input[name="time"]').type('01/30/202405:41')
    cy.get('button').contains('Calculate').should('not.be.disabled').click()
    cy.contains('The delivery cost is 2,00€')
  })
})