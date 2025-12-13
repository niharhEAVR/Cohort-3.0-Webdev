export default async function Home() {
    await new Promise((r) => setTimeout(r, 5000))

    return (
        <div className="flex h-screen items-center justify-center">
            <form className="border p-6 rounded">
                <input placeholder="Email" className="border rounded-2xl p-3"/><br /><br />
                <input placeholder="Password" type="password" className="border rounded-2xl p-3"/>
            </form>
      <h1>Open the network tab and ckeck & observe the html response</h1>

        </div>
    );
}
