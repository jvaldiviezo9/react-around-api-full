const baseURL = 'https://register.nomoreparties.co';

export async function Signup(email, password) {
  const url = `${baseURL}/signup`;

  const data = {
    password,
    email
  };

  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (response.ok) {
      return await response.json();
    } else {
      return response;
    }
  } catch (error) {
    return error;
  }
}

export async function Signin(email, password) {
  const url = `${baseURL}/signin`;

  const data = {
    password,
    email
  };

  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (response.ok) {
      return await response.json();
    } else {
      return response;
    }
  } catch (error) {
    return error;
  }
}

export async function TokenValidation(JWT) {
  const url = `${baseURL}/users/me`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JWT}`
  };

  try {
    const response = await fetch(url, {
      headers: headers
    });

    if (response.ok) {
      return await response.json();
    } else {
      return response;
    }
  } catch (error) {
    return error;
  }
}

