# Hashing password

## Why should you hash passwords?

Password hashing is a technique used to securely store passwords in a way that makes them difficult to recover or misuse. Instead of storing the actual password, you store a hashed version of it. 

## salt

A popular approach to hashing passwords involves using a hashing algorithm that incorporates a salt—a random value added to the password before hashing. This prevents attackers from using precomputed tables (rainbow tables) to crack passwords.

## bcrypt

**Bcrypt**: It is a cryptographic hashing algorithm designed for securely hashing passwords. Developed by Niels Provos and David Mazières in 1999, bcrypt incorporates a salt and is designed to be computationally expensive, making brute-force attacks more difficult.

**This is the link to learn more about Bcrypt**
```link
https://www.npmjs.com/package/bcrypt
```
---

Let's break down each part of the paragraph in detail:

### 1. **Why should you hash passwords?**

When storing passwords, it's essential to use password hashing to protect users and systems from security breaches. Hashing is a process that converts a password (or any input) into a fixed-length string of characters, usually a hexadecimal value, by running it through a hashing algorithm. 

Key reasons to hash passwords:
   - **Security**: By storing only the hashed version of a password, even if a database is compromised, attackers won’t have direct access to the actual passwords.
   - **Irreversibility**: Hash functions are designed to be one-way, meaning that you can’t "unhash" or reverse the hashed value to get back the original password. This makes it difficult for attackers to retrieve original passwords.
   - **Prevention against misuse**: If the hashed passwords are stolen, they are much harder to use in attacks on other accounts or systems since the actual password is unknown.

### 2. **What is a Salt?**

A **salt** is a random value added to a password before hashing to make the hash more secure. When you add a salt, even if two users have the same password, their stored hashed passwords will look different. This is essential for:
   - **Defending against rainbow table attacks**: Rainbow tables are precomputed tables of common passwords and their corresponding hashes. Adding a salt makes rainbow tables ineffective because the same password with different salts will produce different hashes, meaning precomputed tables won’t match.

---

Let’s clarify what it means to "defend against rainbow table attacks" by adding salt to passwords:

### Rainbow Table Attack
A **rainbow table** is essentially a large collection of precomputed hashes for many possible passwords. Attackers create these tables by hashing common passwords (like "password123") and storing both the passwords and their corresponding hashes in a table. Then, if they get access to a database of hashed passwords, they can quickly look up the hashes in the table to see if any match. If they find a match, they can identify the original password without doing any work to crack it—just by using this precomputed table.

### How Salting Defends Against This
When you add a **salt** (a random value) to a password before hashing, you’re making it unique every time it’s hashed. For example:
1. Let’s say the password is "password123".
2. Without salt, the hash of "password123" might be `5f4dcc3b5aa765d61d8327deb882cf99`.
3. With a salt (like a random string "xyz123"), it might look like "password123xyz123".
4. The hash of "password123xyz123" would be entirely different from "password123" without a salt.

Each user will have a unique salt added to their password before hashing, meaning even if multiple people use the same password (like "password123"), their final hashes will be different. This makes rainbow tables ineffective, as a rainbow table created for one salted version of a password won’t work for another. 

**In summary:** Salting means the hashes stored in your database are unique, even if users have the same password. This uniqueness makes rainbow tables useless, as attackers would need a separate rainbow table for every unique salt—a nearly impossible task.

---

   - **Preventing hash collisions**: Salting makes it less likely that different users with the same password will have the same hash, reducing potential points of attack in a database.

### 3. **What is Bcrypt?**

**Bcrypt** is a popular password hashing algorithm, specifically designed to store passwords securely. Here are the key reasons for using bcrypt:
   - **Salt and Hashing Combined**: Bcrypt automatically generates a unique salt each time a password is hashed, and it combines the salt with the password before hashing, making it simple to use securely.
   - **Computational Cost**: Bcrypt allows you to adjust the computational cost through a parameter called the "work factor" or "cost factor." The higher this cost, the longer it takes to compute the hash, which makes brute-force attacks significantly more time-consuming.

---

A **brute-force attack** is a method used by attackers to try and guess a password by systematically checking every possible combination of characters until the correct one is found. 

### How Brute-Force Attacks Work
In a brute-force attack:
1. An attacker uses software to try different combinations of characters (letters, numbers, symbols) for a password.
2. The software runs through each possibility one by one, starting with the simplest passwords (like "a" or "123") and moving up to longer, more complex combinations (like "aBc123!$").

The time required for a successful brute-force attack depends on:
- **Password Length**: Longer passwords have more possible combinations, making them harder to crack.
- **Password Complexity**: Adding uppercase letters, numbers, and symbols significantly increases the number of possible combinations, slowing down the attack.
- **Hashing Algorithm**: Some hashing algorithms (like bcrypt) are designed to be "computationally expensive," meaning they take longer to compute a hash. This slows down brute-force attempts, as each guess takes more time.

### How Bcrypt Defends Against Brute-Force Attacks
**Bcrypt** is effective against brute-force attacks because:
- It’s designed to be slow and can be configured to take more time by adjusting its “cost factor” or “work factor.” The higher this factor, the longer each hashing operation takes.
- If an attacker tries to brute-force a bcrypt hash, each attempt will be slowed down by the hashing algorithm, making it infeasible to try large numbers of combinations within a reasonable time frame.

By using bcrypt (or another slow hashing algorithm) and choosing complex passwords, systems can effectively defend against brute-force attacks.

---

   - **Adaptive**: Bcrypt’s computational cost can be increased over time as computing power improves, meaning it can adapt to advancements in hardware, staying secure as technology evolves.

Bcrypt is widely used for secure password storage in applications because of its combination of salting, adaptive complexity, and robustness against brute-force and rainbow table attacks.


---

Salting and bcrypt actually serve complementary roles, and both are essential for secure password storage. They work best together, not as alternatives. Here’s a breakdown:

### Salting
- **Purpose**: Makes hashes unique by adding a random value to each password before hashing.
- **Effectiveness**: Prevents attackers from using precomputed rainbow tables because each password+salt combination produces a different hash.
- **Limitation**: Salting alone does not slow down the hashing process, so it doesn’t inherently defend against brute-force attacks. It's most effective for preventing rainbow table attacks.

### Bcrypt
- **Purpose**: A hashing algorithm specifically designed to securely store passwords.
- **Features**: Bcrypt automatically includes a salt and uses a computationally expensive process, meaning it’s slow by design.
- **Effectiveness**: It defends against both rainbow tables and brute-force attacks. The computational cost (work factor) can be adjusted to make the hashing slower as technology advances.
- **Limitation**: Bcrypt's strength lies in combining salting and slowing down the hashing process, but it’s only effective when correctly configured.

### Which is Better?
**Bcrypt** is generally considered the better choice because it automatically handles both salting and the hashing process. Bcrypt not only salts each password but also makes the hashing process slower, significantly reducing the chances of brute-force attacks. 

#### Why Use Both Together?
- Since bcrypt already includes a salt, it’s usually sufficient on its own. When bcrypt is used correctly, there’s no need to add a separate salt manually—bcrypt takes care of this.
  
In summary:
- **If you’re using bcrypt**, you don’t need a separate salt since bcrypt takes care of salting and slow hashing.
- **If you’re using a regular hashing function (e.g., SHA-256)**, you must add a salt, but bcrypt is still preferred for password storage because it’s specifically designed for that purpose.