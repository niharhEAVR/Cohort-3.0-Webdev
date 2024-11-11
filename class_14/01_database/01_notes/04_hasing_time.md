This image explains how the number of hashing "rounds" affects the time it takes to generate a hash on a 2 GHz CPU core. Here’s a breakdown:

1. **What is a "round"?**
   - In hashing, a "round" refers to an iteration or cycle of hashing applied to data. When you specify a number of rounds, you’re telling the hashing function to perform multiple cycles, making it harder to reverse (decrypt) the hash. The more rounds, the more secure the hash but the longer it takes to compute.

2. **Cost of Rounds (2^rounds iterations):**
   - The module doesn't just perform a fixed number of hashing cycles. Instead, it uses an exponential calculation: \(2^{\text{rounds}}\) iterations. For example, 10 rounds mean \(2^{10}\) (or 1024) hashing cycles, and 20 rounds mean \(2^{20}\) cycles.

3. **Expected Speed on a 2 GHz CPU Core:**
   - The table shows approximate speeds for different numbers of rounds on a 2 GHz processor:
     - **8 rounds**: Around 40 hashes per second
     - **9 rounds**: Around 20 hashes per second
     - **10 rounds**: Around 10 hashes per second
     - **11 rounds**: Around 5 hashes per second
     - **12 rounds**: Around 2–3 hashes per second
     - **13 rounds**: Around 1 second per hash
     - **14 rounds**: Around 1.5 seconds per hash
     - **15 rounds**: Around 3 seconds per hash
     - **25 rounds**: Around 1 hour per hash
     - **31 rounds**: Around 2–3 days per hash

4. **Impact on Security and Performance:**
   - Increasing the rounds strengthens security, as it takes longer for someone to crack the hash by brute force. However, it also slows down performance significantly, especially at high rounds like 25 or 31, where hashing might take hours or days for just one hash.

This trade-off between security and performance is important to consider, especially for applications that need both security and reasonable processing speed.


---


This image is particularly relevant to bcrypt, a password hashing algorithm designed to be computationally intensive to prevent brute-force attacks. Here’s how bcrypt and the concept of "rounds" work:

### How bcrypt Works with Rounds

1. **Purpose of bcrypt:**
   - Bcrypt is a hashing algorithm specifically built for secure password storage. Its main feature is that it’s intentionally slow and adaptive, meaning you can adjust the "cost" (number of rounds) to make it harder for attackers to brute-force or guess passwords over time.

2. **What are Rounds in bcrypt?**
   - Bcrypt takes an input parameter called the "cost factor" or "work factor," often denoted as the number of "rounds." Each increase in the cost factor doubles the time required to compute a hash.
   - The algorithm performs \(2^{\text{rounds}}\) hashing iterations, which increases exponentially as rounds increase. This makes bcrypt slower with more rounds, improving resistance to attacks.

3. **Why Use Rounds?**
   - By adjusting the number of rounds, bcrypt can adapt to increasingly powerful hardware. This means you can increase the cost factor over time as processors get faster, making it more difficult for attackers to break passwords using brute-force methods.
   - For example, setting bcrypt to 10 rounds (a common choice) would involve \(2^{10}\) (1024) hashing iterations. Increasing it to 12 rounds (4096 iterations) would significantly slow down the hash generation process, which enhances security.

4. **Performance Impact of Rounds:**
   - The table in the image gives a rough idea of how many hashes per second you can expect on a 2 GHz processor:
     - At **8 rounds**, bcrypt can perform roughly 40 hashes per second.
     - At **12 rounds**, this drops to about 2-3 hashes per second.
     - By **15 rounds**, each hash takes about 3 seconds.
     - Higher rounds (25+) can make hashing extremely slow (1 hour or more per hash), making it impractical for regular applications but very secure.

5. **Choosing the Right Number of Rounds:**
   - Most applications today use around **10–14 rounds** as a balance between security and performance. Too few rounds (like 8) might not provide enough security, while too many (like 25) could make logins or password operations unreasonably slow.
   - As hardware gets faster, the recommended number of rounds can increase to keep bcrypt's strength effective against modern computing power.

### Summary

Bcrypt uses an adjustable "cost factor" (number of rounds) to make password hashing slow, enhancing security against brute-force attacks. The more rounds, the longer it takes to compute a hash, making bcrypt more secure but slower. This design allows bcrypt to remain effective as a secure password hashing mechanism, adapting over time as hardware advances.