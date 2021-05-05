describe('Test', function () {
  it('running successfully', () => {
    // Making sure it runs successfully
    
    // Visit page url
    cy.visit('http://localhost:8080')


    //making share header is visible
    cy.get('.header')
      .should('be.visible')
   
    cy.wait(2000)
    
    //making share table is visible
    cy.get('#dataTable')
      .should('be.visible')
    
    cy.get('td:first-child')
      .should('be.visible')

    //making share filters is working ***************
    
    //filling the input
    cy.get('input#name')
      .type('Nima')
      .should('have.value', 'Nima')


    // check filter button exists
    cy.get('button#filterbtn').
      invoke('width')
      .should('be.gt', 0)
    cy.wait(1000)

     // Click on filter button
    cy.get('button#filterbtn')
      .click()

    cy.wait(3000)

    cy.get('td:nth-child(2)')
    .should('contain', 'Nima')

  })

})
