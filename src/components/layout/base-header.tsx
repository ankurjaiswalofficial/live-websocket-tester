import Link from "next/link"
import { Group, HeartHandshakeIcon, RefreshCcw, } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ThemeButton from "../theme-button"

function BaseHeader() {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Group className="h-6 w-6" />
                    <span className="sr-only">Live WebSocket Tester</span>
                </Link>
            </nav>
            <div className="flex w-full items-center gap-4 md:gap-2 lg:gap-4">
                <div className="w-full"></div>
                <Button variant="secondary" className="rounded-3xl shrink-0">
                    <Link href={"/"} className="flex flex-row items-center justify-center gap-2">
                        <RefreshCcw className="size-4" />
                        <span className="text-sm">Refresh</span>
                        <span className="sr-only">Refresh</span>
                    </Link>
                </Button>
                <ThemeButton />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full shrink-0">
                            <HeartHandshakeIcon className="h-5 w-5" />
                            <span className="sr-only">Toggle options menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Made with ❤️ by Ankur Jaiswal</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={"gihtub.com/ankurjaiswalofficial/live-websocket-tester"}>Github</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled>Feedback</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}


export default BaseHeader;
