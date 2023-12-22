import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useGetKpisQuery } from "@/state/api";

const Predictions = () => {
    const {palette} = useTheme();
    const [isPredictions, setIsPredictions] = useState(false);
    const { data: kpiData} = useGetKpisQuery();
  return (
    <div>Predictions</div>
  )
}

export default Predictions;