async function testLiveAuth() {
  const res = await fetch("https://assignment8v.vercel.app/api/auth/sign-in/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": "https://assignment8v.vercel.app" },
    body: JSON.stringify({
      email: "test8@example.com",
      password: "password1234"
    })
  });
  const text = await res.text();
  console.log(res.status, text);
}
testLiveAuth();
