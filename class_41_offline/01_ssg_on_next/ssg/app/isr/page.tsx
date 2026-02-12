export const revalidate = 5

export default async function Page() {
  const time = new Date().toLocaleTimeString()

  return (
    <div>
      <h1>ISR Page</h1>
      <p>Generated at: {time}</p>
    </div>
  )
}
