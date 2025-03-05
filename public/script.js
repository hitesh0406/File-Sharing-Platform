const authForm = document.getElementById('auth-form');
const authMessage = document.getElementById('auth-message');
const fileSection = document.getElementById('file-section');
const uploadForm = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const uploadMessage = document.getElementById('upload-message');
const fileList = document.getElementById('file-list');

// Handle Login/Register
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
    authMessage.textContent = 'Login successful!';
    localStorage.setItem('token', data.token);
    authForm.classList.add('hidden');
    fileSection.classList.remove('hidden');
    fetchFiles();
  } else {
    console.error('Error:', data.message);
    authMessage.textContent = data.message;
  }
});

// Handle File Upload
uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];

  if (!file) {
    uploadMessage.textContent = 'Please select a file.';
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:3000/files/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();
  if (response.ok) {
    console.log('File uploaded successfully:', data);
    uploadMessage.textContent = 'File uploaded successfully!';
    fetchFiles();
  } else {
    console.error('Error:', data.message);
    uploadMessage.textContent = data.message;
  }
});

// Fetch User's Files
const fetchFiles = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:3000/files', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const files = await response.json();
  fileList.innerHTML = files.map(file => `
    <li>${file.filename} <a href="http://localhost:3000/files/download/${file._id}" download>Download</a></li>
  `).join('');
};