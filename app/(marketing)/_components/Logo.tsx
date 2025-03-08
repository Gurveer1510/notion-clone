import Image from "next/image"
import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils"

const font = Poppins({
    weight: ["400","600"],
    subsets: ["latin"],
})

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
        <Image
            className="dark:hidden"
            src="/logo.svg"
            width={40}
            height={40}
            alt="Logo"
        />
        <Image
            className="hidden dark:block"
            src="/logo-dark.svg"
            width={40}
            height={40}
            alt="Logo"
        />
        <p className={cn("font-semibold", font.className)}>
            Notion
        </p>
    </div>
  )
}

export default Logo