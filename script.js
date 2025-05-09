function checkPassword() {
  // Get the password input value
  const password = document.getElementById('passwordInput').value;
  
  // Check if the password is "shahzad"
  if (password.toLowerCase() === 'shahzad') {
    // Redirect to the desired page
    window.location.href = 'https://example.com/secret-page.html';
  } else {
    alert('Incorrect password!');
  }

  
}