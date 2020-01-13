import React from 'react';
import classes from './Chart.module.css';

const chart = props => {
    let valuesX = [], posPrim, posSec, primLocY, secLocY, showDisclaimer;
    const dataX = [...props.dataX];
    const pixelHeight = Math.abs(260 / (props.highestY - props.lowestY));

    const valuesY = (
        <div className={classes.VerticalAxisValues}>
            <span>{props.highestY}</span>
            <span>{props.highestY - ((props.highestY - props.lowestY)/2)}</span>
            <span>{props.lowestY}</span>
        </div>
    )

    for (let i = 0; i < dataX.length; i++) {
        primLocY = Math.abs(props.primData[i] - props.lowestY) * pixelHeight - 2.5;
        secLocY = Math.abs(props.secData[i] - props.lowestY) * pixelHeight - 2.5;
        if (primLocY === secLocY) showDisclaimer = true;
        
        posPrim = {
            bottom: primLocY + 'px'
        }

        posSec = {
            bottom: props.secData ? secLocY + 'px' : null
        }
        
        valuesX.push(
            <div className={classes.Values} key={i} style={{ left: ((55 + i * (220 / dataX.length)) + 'px')}}>
                <p className={classes.Value} style={posPrim}>
                    <span>{props.primData[i]}</span>
                </p>
                {props.secData ? 
                    <p className={classes.Value} style={posSec}>
                        <span>{props.secData[i]}</span>
                    </p>
                : null}
                <div></div>
                <p className={classes.HorizontalAxisValues}>
                    {dataX[i]}
                </p>
            </div> 
        )
    }

    return (
        <div className={classes.ChartContainer}>
            <div className={classes.Chart}>
                {valuesY}
                <div className={classes.ChartData}>
                    <div className={classes.HorizontalAxis}></div>
                    {valuesX}
                </div>
            </div>
            <div>
                <div className={classes.LegendContainer}>
                    <p className={classes.BottomText}>
                        <span className={classes.primLegend}></span>{props.primDataLegend} ({props.unit})
                    </p>
                    <p className={classes.BottomText}>
                        <span className={classes.secLegend}></span>{props.secDataLegend} ({props.unit})
                    </p>
                </div>
                {showDisclaimer ? <p style={{ fontSize: '11px'}}>If no '{props.secDataLegend}' data visible, then '{props.primDataLegend}' equals '{props.secDataLegend}'.</p> : null}
            </div>
        </div>
    )
}

export default chart;