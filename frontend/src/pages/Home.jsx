/* eslint-disable no-unused-vars */
import React from "react";
import { NavBar } from "../components/NavBar"
import { Button } from "../components/Button";
import Main from "../assets/main.png"
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
        {localStorage.removeItem("SignInToken")}
        {localStorage.removeItem("SignUpToken")}
        {localStorage.removeItem("Balance")}
        {localStorage.removeItem("CurrentUser")}
      <NavBar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 border-b">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Secure and Reliable Payments
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Accept payments from your customers with ease. Our cutting-edge payment platform offers fast
                    payouts, robust security, and seamless integration.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    label="Try it Now"
                    onClick={() => {
                      navigate('/signup')
                    }}
                  />
                  <Button
                    label="Already have an Account"
                    onClick={() => {
                      navigate('/signin')
                    }}
                  />
                </div>
              </div>
              <img
                src={Main}
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 PayZap Payments. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}
