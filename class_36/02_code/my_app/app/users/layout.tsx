import Endpoint from "@/components/Endpoint";

export default function SigninLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
        <div>
            <Endpoint/>
            {children}
        </div>
    )
}

// This is custom created layout for the users routes endpoints.