import { ReactNode } from "react"

function BaseMain(props: Readonly<{ children: ReactNode }>) {
    return (

        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Live Websocket Tester</h1>
            </div>
            <div className="flex-1 p-4">
                {props.children}
            </div>
        </main>
    )
}


export default BaseMain;
