import React, { useState } from 'react';
import './BuildChart.css';
var profitData
function BuildChart({ profitYearData }) {
    const [chartState, setChartState] = useState("nonDisplay")
    function listDataToBar() {
        profitData = profitYearData.map(function (list, index) {
            let bar = parseInt((list) / 4000)
            if (parseInt(list) >= 0) {
                if (bar > 50) bar = 50
                return (
                    <div className="result-bg" data-year={`${2020 + index}`}>
                        <div className="result-bar" style={{ height: `${bar}%`, background: '#69f788' }}></div>
                    </div>

                )
            }
            if (parseInt(list) < 0) {
                bar *= -1
                if (bar > 50) bar = 50
                return (
                    <div className="result-bg" data-year={`${2020 + index}`}>
                        <div className="result-bar2" style={{ height: `${bar}%`, bottom: `${50 - bar}%` }}></div>
                    </div>
                )
            }
        })
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
        <div>
            <button className="openChartBTN" onClick={() => chartBTN()}>圖表</button>
            <div className={chartState}>
                {profitData}
            </div>
        </div>
    )
}
export default BuildChart