import React, { useState } from 'react';
import './BuildChart.css';
var profitData = []
function BuildChart({ profitYearData }) {
    const [chartState, setChartState] = useState("nonDisplay")
    function listDataToBar() {
        console.log(profitYearData)
        for (var i = 0; i < 10; i++) {
            let bar = parseInt((profitYearData[i]) / 4000)
            if (parseInt(profitYearData[i]) >= 0) {
                if (bar > 50) bar = 50
                profitData[i] =
                    <div className="result-bg" data-year={`${2020 + i + 1}`}>
                        <div className="result-bar" style={{ height: `${bar}%`, background: '#69f788' }}></div>
                    </div>
            }
            if (parseInt(profitYearData[i]) < 0) {
                bar *= -1
                if (bar > 50) bar = 50
                profitData[i] =
                    <div className="result-bg" data-year={`${2020 + i + 1}`}>
                        <div className="result-bar2" style={{ height: `${bar}%`, bottom: `${50 - bar}%` }}></div>
                    </div>
            }
        }
    }

    function chartBTN() {
        listDataToBar()
        if (chartState == "nonDisplay" || chartState == "chartDel") {
            setChartState("chart")
            return
        }

        if (chartState == "chart") {
            setChartState("chartDel")
            return
        }
    }
    return (
        <div className='chartContainer'>
            <button className="openChartBTN" onClick={() => chartBTN()}>圖表</button>
            <div className={chartState}>
                {profitData}
            </div>
        </div>
    )
}
export default BuildChart