async function testAuth() {
  const res = await fetch("http://localhost:3000/api/auth/sign-up/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": "http://localhost:3000" },
    body: JSON.stringify({
      email: "test8@example.com",
      password: "password1234",
      name: "Test User"
    })
  });
  const text = await res.text();
  console.log(res.status, text);
}
testAuth();
