"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

export default function OneSignalInit() {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    if (!appId) {
      console.warn("OneSignal App ID is missing. Please set NEXT_PUBLIC_ONESIGNAL_APP_ID in your environment variables.");
      return;
    }

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
