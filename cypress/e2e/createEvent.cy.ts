describe('Form creation event', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/events/new');
  });

  it('Form should return correct formData values', () => {
    // Completar el formulario
    cy.get('input[name="title"]').type('Evento de prueba');
    cy.get('select[name="category"]').select('Categoría 1'); // Asegúrate de que esta categoría exista
    cy.get('input[name="eventStart"]').type('2023-10-01T10:00'); // Cambia la fecha según sea necesario
    cy.get('input[name="eventEnd"]').type('2023-10-01T12:00'); // Cambia la fecha según sea necesario
    cy.get('textarea[name="description"]').type(
      'Descripción del evento de prueba.'
    );
    cy.get('input[name="isPublic"]').check();
    cy.get('input[name="image"]').attachFile('path/to/image.jpg'); // Asegúrate de que la imagen exista en la ruta especificada

    // Enviar el formulario
    cy.get('form').submit();

    // Verificar que se haya creado el evento correctamente
    cy.url().should('include', '/events'); // Asegúrate de que redirija a la página de eventos
    cy.contains('Evento de prueba'); // Verifica que el evento aparezca en la lista
  });
});
