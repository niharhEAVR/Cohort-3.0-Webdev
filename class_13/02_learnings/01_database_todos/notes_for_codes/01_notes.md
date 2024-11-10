### **Retrieving All User Documents as an Array of Objects**
   If you want to get a list of all users (which would return an array of user objects), you can use the `.find()` method in Mongoose without specifying any conditions:

   ```javascript
   const allUsers = await userModel.find({});
   console.log(allUsers); // This will be an array of user objects
   ```

   This returns all documents in the `users` collection as an array, where each document is represented as an object.