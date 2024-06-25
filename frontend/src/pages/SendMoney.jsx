import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios"
import { BACKEND_URL } from "../config";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const recipientName = searchParams.get("name");
  const navigate = useNavigate();
  
  console.log(id)

  const [amount, setAmount] = useState(0);
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{recipientName[0]}</span>
              </div>
              <h3 className="text-2xl font-semibold">{recipientName}</h3>
            </div>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                  aria-label="Amount in Rupees"
                  onChange={(e) => {
                    setAmount(e.target.value)
                  }}
                />
              </div>
              <button onClick={async () => {
                let token = null;
                if (localStorage.getItem("SignInToken") !== null) {
                  token = localStorage.getItem("SignInToken");
                } else {
                    token = localStorage.getItem("SignUpToken");
                }
                if (amount < 0) {
                  alert(`Negative amount not allowed`)
                  return null
                }
                const response = await axios.post(`${BACKEND_URL}/api/v1/account/transfer`, {
                  recipient: id,
                  amount: amount
                }, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                })
                console.log("Control reaching here")
                console.log(response.status)
                if (response.status === 200) {
                  alert(response.data.message)
                  navigate(`/dashboard?name=${localStorage.getItem("CurrentUser")}`)
                } 
                if (response.status === 400) {
                  alert(response.data.message) 
                  navigate(`/dashboard?name=${localStorage.getItem("CurrentUser")}`)
                }
              }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
