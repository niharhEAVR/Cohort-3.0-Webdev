import axios from "axios";

async function getBlogs() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/")
    return response.data;
}

export default async function Blogs() {

    const blogs = await getBlogs();

    return <div>
        {blogs.map((blog: ITodo,index:number) => <Todo key={index} title={blog.title} completed={blog.completed} />)}
    </div>
}

interface ITodo {
    title: string;
    completed: boolean;
}

function Todo({ title, completed }: ITodo) {
    return <div>
        {title} {completed ? "--- (done)" : "--- (not done)"}
    </div>
}

// if you go to the http://localhost:3000/blogs
// then right click and open the network tab, and refresh the page you will get to see a Get request called blogs, which is the index.html of our code, that index.html will have all the todos inside it, this is better as a SEO and this is called SSR