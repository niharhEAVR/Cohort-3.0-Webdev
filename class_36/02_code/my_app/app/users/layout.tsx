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

// this is custom created layout for the signin endpoint