A **tarball** (file ending with `.tar`, `.tgz`, or `.tar.gz`) is simply:

# 📦 **A compressed archive file that bundles multiple files/folders into one.**

Think of it like a **zip file**, but used mostly in Linux/Unix environments.

---

# 🔍 **Breakdown: What is a Tarball?**

A **tarball** has two parts:

1. **TAR (Tape Archive)** — bundles files together
2. **GZIP** — compresses those files

Together:

```
.tar + .gz = .tar.gz  (also written as .tgz)
```

Example:

```
express-4.18.3.tgz
```

This is the file npm downloads from the registry.

---

# 🎯 **Why do we use Tarballs?**

Tarballs make it easy to:

* pack a large folder into one file
* reduce its size
* send it over a network
* store it easily
* extract it anywhere

---

# 🧰 **How npm uses Tarballs**

Every npm package you install is actually a **tarball**.

When you run:

```
npm install express
```

npm internally downloads:

```
express-4.18.3.tgz
```

Inside this tarball is the **actual library**, with a structure like:

```
package/
  package.json
  lib/
  index.js
  LICENSE
  README.md
```

npm extracts the tarball into:

```
node_modules/express/
```

---

# 🔬 **Tarball Internals (simple structure)**

Inside a `.tgz`, the structure looks like:

```
package/
  file1.js
  file2.js
  package.json
```

npm always puts everything inside a `package/` folder.

---

# 🧠 **Why npm uses tarballs instead of zip?**

Because tarballs:

1. work natively with Unix/Linux
2. preserve file permissions
3. preserve symlinks
4. preserve folder structure exactly
5. compress extremely well
6. are fast to unpack

This is perfect for code distribution.

---

# 🌍 **Tarballs are everywhere**

They're used by:

* npm
* Linux distributions (.tar.xz)
* Docker layers
* GitHub releases
* Python packages
* Ruby gems
* Homebrew formulas

---

# 📌 Example of creating a tarball manually

In Linux/macOS:

```
tar -cvzf mypackage.tgz myfolder/
```

Extract:

```
tar -xvzf mypackage.tgz
```

---

# 🧠 Summary in one line

**Tarball = compressed bundle of package files that npm downloads from the registry.**
