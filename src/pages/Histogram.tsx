import { Typography } from "@mui/material";
import LeftNavBar from "../components/LeftNavBar";

export default function() {
    return (
        <main className="main-page">
            <LeftNavBar/>
            <Typography variant="h3">Histogram Page</Typography>
        </main>
    )
}