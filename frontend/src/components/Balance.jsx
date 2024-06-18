import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Balance() {
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    let memory = null;
    if (localStorage.getItem("SignInToken") !== null) {
      memory = localStorage.getItem("SignInToken");
    } else {
      memory = localStorage.getItem("SignUpToken");
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: `Bearer ${memory}`
        }
      });
      const balance = Math.trunc(response.data.balance);
      setBalance(balance);
      localStorage.setItem("Balance", balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
      <div className="font-bold text-lg">
        Your Balance
      </div>
      <div className="font-semibold text-lg">
        ₹ {balance}
      </div>
    </div>
  );
}
