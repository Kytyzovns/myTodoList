export type ThemeModeType = "dark" | "light"

type InitialState = typeof initialState

const initialState = {
    themeMode: "dark" as ThemeModeType,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case "CHANGE_THEME":
            return { ...state, themeMode: action.payload.themeMode }
        default:
            return state
    }
}

type ActionsType = ChangeThemeActionType

export const changeThemeAC = (themeMode: ThemeModeType) => {
    return {
        type: "CHANGE_THEME",
        payload: {
            themeMode,
        },
    } as const
}

type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
