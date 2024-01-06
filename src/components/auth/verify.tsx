"use client";

import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/server/actions/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { sharedAnimationCards } from "./animation-cards";

// 💡 Note: In production, ``onSubmit`` will be called twice. This is because
// React strict mode renders twice in development. "Invalid token" is expected
// and is not a bug.

const VerifyToken = () => {
  const [message, setMessage] = useState<string | undefined>();
  const [success, setSuccess] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    
    if (success) return;
    setMessage("Verifying token...");

    if (!token) {
      setMessage("No token provided");
      setSuccess(true);
      return;
    }
    try {
      await newVerification(token).then((data) => {
        if (data.isError) {
          setMessage(data.message);
          setSuccess(true);
          return;
        }
        setMessage(data.message);
        setSuccess(true);
      });
    } catch (error) {}
  }, [token, success]);

  useEffect(() => {
    void onSubmit();
  }, [onSubmit]);

  return (
    <Card className={sharedAnimationCards}>
      <CardHeader>
        <CardTitle className="text-xl">Verify Token</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-2">
        {!success ? (
          <>
            <Loader className="animate-spin" size={20} />
            <p>Confirming your verification token...</p>
          </>
        ) : (
          <p>{message}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default VerifyToken;
