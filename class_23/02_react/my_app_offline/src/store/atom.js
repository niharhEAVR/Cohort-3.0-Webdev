import axios from 'axios'
import { atom, selector } from "recoil";

export const notifications = atom({
    key: "networkAtom",
    default: {
        network: 1000, 
        jobs: 6, 
        messaging: 3, 
        notifications: 1000
    }
    // default: selector({
    //     key: "networkAtomSelector",
    //     get: async () => {
    //         // await new Promise(r=> setTimeout(r,5000)) // wait for 5s
    //         const res = await axios.get("https://sum-server.100xdevs.com/notifications")
    //         return res.data
    //     }
    // })
});

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({ get }) => {
        const allNotifications = get(notifications);
        return allNotifications.network +
            allNotifications.jobs +
            allNotifications.notifications +
            allNotifications.messaging
    }
})


// read 01_recoil_async.md from 03_notes_offline
