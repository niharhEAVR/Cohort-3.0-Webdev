export const revalidate = 5; // regenerate the html after 5 seconds

export default function ISRPage() {
  const time = new Date().toLocaleTimeString();

  return (
    <div>
      <h1>ISR without API</h1>
      <p>Server build time:</p>
      <b>{time}</b>
      <p>(HTML regenerates every 5 seconds)</p>
      <p>(Check this code in build mode not in dev mode)</p>
      <p>(refresh after 5 seconds, you will notice that the time changes)</p>

    </div>
  );
}