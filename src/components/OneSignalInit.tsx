"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

export default function OneSignalInit() {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || "7be09da1-280a-4252-88f8-41181b32c387";
    
    OneSignal.init({
      appId: appId,
      allowLocalhostAsSecureOrigin: true,
    }).then(() => {
      console.log("OneSignal Initialized successfully.");
    }).catch((err) => {
      console.error("OneSignal Initialization Error:", err);
    });
  }, []);

  return null;
}
