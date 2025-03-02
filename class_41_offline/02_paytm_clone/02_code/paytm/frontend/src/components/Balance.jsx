import axios from "axios";
import { useState, useEffect } from "react";

export const Balance = () => {
    const [balance, setBalance] = useState(0);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        "token": token
                    }
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className="flex">
            <div className="font-bold text-lg">
                Your balance
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {balance.toFixed(2)}
            </div>
        </div>
    );
};
