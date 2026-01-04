export default function withBase(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
