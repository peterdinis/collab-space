"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { FC, ReactNode } from "react";

interface IClerkAppProviderProps {
  children?: ReactNode;
}

const ClerkAppProvider: FC<IClerkAppProviderProps> = ({
  children,
}: IClerkAppProviderProps) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default ClerkAppProvider;
