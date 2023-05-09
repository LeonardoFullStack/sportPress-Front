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
    expect(responseData).toHaveProperty('ok', true)
  });

  test('Debería cambiar correctamente el rol', async () => {
    const url = '/api/users/updaterole';
      const body = {
        role:"admin",
        email:"torno@gmail.com"
    }
      const method = 'put'
      const response = await consulta(url, method, body);
      const responseData = await response.json();
      expect(responseData.data[0].role).toBe(body.role);

  });

  test('Todas las noticias deberían recibir el estado indicado', async () => {

    const state = 'aproved'
    const url = `/api/news/newsbystate/${state}`;
     
      const method = 'put'
      const response = await consulta(url);
      const responseData = await response.json();
      expect(responseData.data.every(obj => obj.hasOwnProperty('state') && obj.state === state)).toBe(true);
    });

});