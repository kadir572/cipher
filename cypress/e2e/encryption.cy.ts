describe('Tauri + React App', () => {
  it('should load the app and display the correct title', () => {
    cy.visit('/') // Visits the base URL (http://localhost:1420)
    cy.title().should('include', 'Vite + React + TS') // Check the page title
  })

  it('should validate header', () => {
    cy.visit('/')
    cy.contains('Cipher').should('exist')

    cy.get('div[role="dialog"]').should('not.exist')
    cy.contains('Support').click()
    cy.get('div[role="dialog"]').should('be.visible')
    cy.get('button.absolute').click()
    cy.get('div[role="dialog"]').should('not.exist')
  })

  it('should validate footer', () => {
    cy.visit('/')
    cy.contains('Developed by').should('exist')
    cy.contains('Kadir Karadavut').should('exist')
  })

  it('should validate tabs', () => {
    cy.visit('/')
    cy.contains('Encryption').should('have.attr', 'data-state', 'active')
    cy.contains('Logs').should('have.attr', 'data-state', 'inactive')
    cy.contains('Settings').should('have.attr', 'data-state', 'inactive')
  })

  it('should validate encryption page', () => {
    const encryptButtonSelector = 'button.bg-zinc-900:nth-child(1)'
    cy.visit('/')
    cy.get(encryptButtonSelector).should('be.disabled')
    cy.contains('button', 'Decrypt').should('be.disabled')
    cy.contains('button', 'Reset').should('be.disabled')
  })

  it('should validate logs page', () => {
    cy.visit('/')
    cy.contains('Logs').click()
    cy.contains('No logs available').should('exist')
    cy.contains('Clear').should('be.disabled')
    cy.contains('Download').should('be.disabled')
  })

  it('should validate settings', () => {
    cy.visit('/')
    cy.contains('Settings').click()

    cy.get('.overflow-hidden').should('have.text', 'English (English)')
    cy.get('#theme-switch').should('have.attr', 'data-state', 'unchecked')
  })
})
