import {useSelector} from "react-redux";
import {RootState} from "../../features/todolists/model/store";

export const useAppSelector = useSelector.withTypes<RootState>()