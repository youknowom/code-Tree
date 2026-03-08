import React from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Auth pages get no Header — clean focused auth flow
    return <>{children}</>;
}
