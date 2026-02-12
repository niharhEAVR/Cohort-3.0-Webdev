export default async function Page() {
  const time = new Date().toLocaleTimeString()

  return (
    <div>
      <h1>Pure SSG Page</h1>
      <p>Generated at: {time}</p>
    </div>
  )
}
