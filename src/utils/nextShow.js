// Name and ticket URL of the next production live only in
// public/next-show.json, so the reveal is a deploy of that file. It is fetched
// fresh on every call: the server sends no Cache-Control, so browsers would
// otherwise reuse an old copy for hours. The query defeats caching proxies.
// Browser only.
export async function fetchNextShow() {
  const url = `${import.meta.env.BASE_URL}next-show.json?t=${Date.now()}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`next-show.json: HTTP ${response.status}`);
  }

  return response.json();
}
