const { authenticate } = require('../src/index'); 
const data = require('./auth_dummy_data.json'); 

// MARK: Test Authentication Route if user is found 
describe('AUTHENTICATE: Test if user successfully logs in with the proper credentials', () => {
    
    test('Token is retrieved from the lambda function and session is active', async () => {
      const jsonPayloadTest = {
        body: JSON.stringify(data[0])
      };

      const payload = await authenticate(jsonPayloadTest);       
      const body = JSON.parse(payload.body); 

      expect(body.status).toBe("active");
    });
});

// MARK: Test if incorrect data is found and we get an error
describe('AUTHENTICATE: Test what happens if user has wrong user id credentials', () => {

  test('error is found', async () => {
    const jsonPayloadTest = {
      body: JSON.stringify(data[1])
    };

    const payload = await authenticate(jsonPayloadTest);       
    const body = JSON.parse(payload.body); 

    expect(body.error).toBe("User not found in excel sheet database");
  });
});

// MARK: User found but wrong password test
describe('AUTHENTICATE: Test what happens if user types wrong password', () => {
  test('user is found but password did not match', async () => {
    const jsonPayloadTest = {
      body: JSON.stringify(data[2])
    };

    let payload = await authenticate(jsonPayloadTest);       
    let body = JSON.parse(payload.body); 

    expect(body.error).toBe("Wrong Password!");
  });
});

// MARK: User found but account is inactive 
describe('AUTHENTICATE: Test what happens if account is inactive', () => {
  test('user account is found in db but account is inactive', async () => {
    const jsonPayloadTest = {
      body: JSON.stringify(data[3])
    };

    let payload = await authenticate(jsonPayloadTest);       
    let body = JSON.parse(payload.body); 

    expect(body.error).toBe("User account is inactive!");
  });
});

// ===============================================================================================================