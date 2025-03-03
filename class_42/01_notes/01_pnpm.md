### What is `pnpm`?
`pnpm` (Performant npm) is a fast, disk space-efficient package manager for Node.js projects. It is an alternative to `npm` and `yarn`, designed to improve performance and reduce disk usage by using **hard links and symlinks** instead of duplicating packages.

### Why is `pnpm` better than `npm`?
Here are some key advantages of `pnpm` over `npm`:
1. **Efficient Disk Usage**:  
   - Unlike `npm`, which installs a separate copy of each dependency for every project, `pnpm` stores packages in a global content-addressable store and links them to the project.
   - This significantly reduces disk space usage.

2. **Faster Installations**:  
   - `pnpm` only downloads packages once and reuses them across projects.
   - Its parallelized installation process makes it much faster than `npm`.

3. **Strict Dependency Management**:  
   - `pnpm` creates a non-flat `node_modules` structure, meaning dependencies are always installed in an isolated way.
   - This prevents issues where a package works in one project but breaks in another due to implicit dependency resolutions in `npm`.

4. **Better Monorepo Support**:  
   - `pnpm` has built-in support for **workspaces**, making it ideal for managing multiple projects in a monorepo.

5. **Improved Security**:  
   - `pnpm` avoids package hoisting, which reduces the risk of dependency conflicts and security vulnerabilities.

---

### How to Install `pnpm`
You can install `pnpm` globally using `npm`, `corepack`, or a script.

#### **1. Using `npm` (Recommended)**
Run the following command:
```sh
npm install -g pnpm
```
Once installed, check the version to verify:
```sh
pnpm -v
```

#### **2. Using Corepack (Built-in with Node.js)**
If you're using Node.js 16.10 or later, enable `corepack` and install `pnpm`:
```sh
corepack enable
corepack prepare pnpm@latest --activate
```

#### **3. Using a Script (Curl)**
If you don’t want to use `npm`, install `pnpm` directly with:
```sh
curl -fsSL https://get.pnpm.io/install.sh | sh -
```
On Windows (PowerShell):
```powershell
iwr -useb https://get.pnpm.io/install.ps1 | iex
```

---

### How to Use `pnpm`
#### **1. Initialize a Project**
```sh
pnpm init
```

#### **2. Install Dependencies**
```sh
pnpm install
```
Equivalent to `npm install`, but faster and more efficient.

#### **3. Add a Package**
```sh
pnpm add <package-name>
```
Example:
```sh
pnpm add express
```

#### **4. Remove a Package**
```sh
pnpm remove <package-name>
```

#### **5. Run Scripts**
Instead of `npm run`, use:
```sh
pnpm run <script>
```

#### **6. Upgrade All Dependencies**
```sh
pnpm update
```

---

### Should You Use `pnpm`?
If you're working on large projects, monorepos, or want better dependency management and performance, `pnpm` is a great choice over `npm`. However, if you're in an ecosystem where most tools assume `npm`, you may need to configure them to support `pnpm`.