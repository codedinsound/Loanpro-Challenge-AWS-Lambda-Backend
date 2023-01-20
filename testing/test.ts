const { authenticate } = require('../src/index'); 

// MARK: Test Authentication Route if user is found 
describe('Test if user successfully logs in with the proper credentials', () => {
    const data = require('./auth_dummy_data.json'); 

    test('Token is retrieved from the lambda function', async () => {
      let payload = await authenticate(data);       
      let body = JSON.parse(payload.body); 

      expect(body.status).toBe("active");
    });
});

// MARK: Test if incorrect data is found and we get an error