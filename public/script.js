const authForm = document.getElementById('auth-form');

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const endpoint = e.submitter.id === 'login-btn' ? '/auth/login' : '/auth/register';
  const response = await fetch(`http://localhost:3000${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (response.ok) {
    console.log('Success:', data);
    alert('Login successful! Token: ' + data.token); // Show success message
    // Save the token to localStorage or sessionStorage
    localStorage.setItem('token', data.token);
  } else {
    console.error('Error:', data.message);
    alert(data.message); // Show error message
  }
});