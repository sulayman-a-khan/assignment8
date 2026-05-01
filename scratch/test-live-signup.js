async function testLiveAuth() {
  const res = await fetch("https://assignment8v.vercel.app/api/auth/sign-up/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": "https://assignment8v.vercel.app" },
    body: JSON.stringify({
      email: "testlive@example.com",
      password: "password1234",
      name: "Test Live User"
    })
  });
  const text = await res.text();
  console.log(res.status, text);
}
testLiveAuth();
