import { consulta } from "../../hooks/useFetch"



describe('consulta', () => {
  test('debería enviar una solicitud HTTP real', async () => {
    // Configurar
    const url = '/api/users';
    const method = 'get';
    
    // Ejecutar
    const response = await consulta(url, method);
    const responseData = await response.json();

    // Verificar
    expect(responseData).toHaveProperty('ok')
  });
});