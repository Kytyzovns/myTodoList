import { useState } from "react"

export function useMenu() {
    const [openMenu, setOpenMenu] = useState<boolean>(false)

    const onClickHandler = () => setOpenMenu((prevState) => !prevState)

    return { openMenu, setOpenMenu, onClickHandler }
}
