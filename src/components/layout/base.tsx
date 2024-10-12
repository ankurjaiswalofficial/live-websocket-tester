import BaseMain from "./base-main"
import BaseHeader from "./base-header"
import { ReactNode } from "react";


function BaseLayout(props: Readonly<{ children: ReactNode }>) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <BaseHeader />
            <BaseMain>
                {props.children}
            </BaseMain>
        </div>
    )
}


export default BaseLayout;
