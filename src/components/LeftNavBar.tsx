import { IconButton } from "@mui/material";

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';


import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate();
    return (
        <div className="sidebar left">
            <IconButton color="white" onClick={() => navigate('/home')}>
                <CandlestickChartIcon />
            </IconButton>
            <IconButton color="white" onClick={() => navigate('/strategy')}>
                <TrendingUpIcon />
            </IconButton>
            <IconButton color="white" onClick={() => navigate('/histogram')}>
                <BarChartIcon/>
            </IconButton>

        </div>
    )
}