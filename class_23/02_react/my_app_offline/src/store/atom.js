import axios from 'axios'
import { atom, selector } from "recoil";

export const notifications = atom({
    key: "networkAtom",
    default: {
        network: 1,
        jobs: 6,
        messaging: 3,
        notifications: 5
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

export const markAllReadSelector = selector({
    key: "markAllReadSelector",
    get: ({ get }) => {
        // We DON'T return anything meaningful here.
        // Selectors with setters are *write selectors*, not *value selectors*.
        return get(notifications);  // safe
    },

    set: ({ set, get }, newValue) => {
        const current = get(notifications);

        // Example of custom logic: subtract 1 from each field
        set(notifications, {
            network: Math.max(current.network - 1, 0),
            jobs: Math.max(current.jobs - 1, 0),
            messaging: Math.max(current.messaging - 1, 0),
            notifications: Math.max(current.notifications - 1, 0),
        });
    }
});

// read the 04_problem.md