import { useDispatch } from "react-redux"
import { AppDispatch } from "../../features/todolists/model/store"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
