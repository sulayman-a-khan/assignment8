const { auth } = require('./lib/auth');

try {
  console.log("Auth initialized:", !!auth);
  console.log("Handlers:", Object.keys(auth.handler || {}));
} catch (e) {
  console.error("Auth init failed:", e.message);
}
