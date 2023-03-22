import { Today } from "@mui/icons-material"

export const getCurrentDate = () => {
    let today = JSON.stringify(new Date()).slice(1, 11);
    return today;
}

export const getFormattedDate = () => {
    let today = JSON.stringify(new Date()).slice(1, 11);
    return today;
}