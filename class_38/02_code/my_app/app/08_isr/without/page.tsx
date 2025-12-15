export default function ISRPage() {
  const time = new Date().toLocaleTimeString();

  return (
    <div>
      <h1>ISR without API</h1>
      <p>Server build time:</p>
      <b>{time}</b>
      <p>(Check this code in build mode not in dev mode)</p>
      <p>(Even if you refresh 1000 times, the time never changes, because this page is fully static html)</p>
    </div>
  );
}