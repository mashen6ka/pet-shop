export default function buildAuthHeader() {
  const token = localStorage.token;
  return token ? `Bearer ${localStorage.token}` : null;
}
