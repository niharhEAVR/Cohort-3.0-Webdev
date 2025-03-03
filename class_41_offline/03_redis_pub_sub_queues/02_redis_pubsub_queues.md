In a **LeetCode-like system**, where users submit code for execution, different backend mechanisms work together to process and return results efficiently. Here's how **Redis, Pub/Sub, and Queues** are used:

---

## **1. Redis in a LeetCode-Like System**
**Redis** is an **in-memory data store** used for:
- **Caching** user submissions, results, and frequently accessed data.
- **Storing temporary job statuses** (e.g., pending, running, completed).
- **Managing queues and Pub/Sub** for handling task execution.

👉 *Example:* If multiple users submit code, Redis can cache frequently used test cases to speed up execution.

---

## **2. Queues in a LeetCode-Like System**
A **queue** helps manage task execution in an **asynchronous and scalable way**. 

🔹 **Why use a queue?**
- When a user submits code, instead of executing it immediately, it is **pushed to a queue**.
- A separate **worker (or executor)** pulls submissions from the queue and processes them.
- This prevents **overloading the system** and allows smooth handling of multiple submissions.

🔹 **How it works:**
1. User submits code.
2. Submission gets **pushed to a queue** (e.g., Redis Queue, RabbitMQ, or Kafka).
3. A **worker picks up the job**, executes it in a Docker container, and stores the result.

👉 *Example:* If 1000 users submit code at once, a queue helps distribute execution across multiple workers.

---

## **3. Pub/Sub (Publish-Subscribe) in a LeetCode-Like System**
**Pub/Sub** is a **messaging pattern** where:
- A **publisher** sends a message to a channel.
- **Multiple subscribers** listen to the channel and receive updates.

🔹 **Why use Pub/Sub?**
- Helps **notify users** when their code execution is completed.
- Allows multiple services (e.g., logging, analytics, notifications) to **listen for updates**.

🔹 **How it works:**
1. A **worker finishes execution** and **publishes a message** to a Redis Pub/Sub channel (e.g., `submission_results`).
2. The frontend **subscribes