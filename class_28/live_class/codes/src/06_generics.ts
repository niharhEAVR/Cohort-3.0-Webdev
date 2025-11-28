function createForm<T>(initialValues: T) {
  return {
    values: initialValues,
    get<K extends keyof T>(key: K) {
      return initialValues[key];
    }
  };
}

const form = createForm({
  username: "raj",
  password: "123"
});

console.log(form.get("username")); // OK
console.log(form.get("password")); // OK
// form.get("email");    // ❌ ERROR
