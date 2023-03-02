import React, { useState } from 'react'
import { useEffect } from 'react'
import { UserContext } from '../context';
import { useContext } from 'react';
import BarPlot from './BarPlot';
import PieChart from './PieChart';
import Header from './Header';
import ProtectedRoutes from './ProtectedRoutes';
const Output = () => {
    const [state, setState] = useContext(UserContext);
    const [outputData, setoutputData] = useState({});
    //useeffect to get Data
    useEffect(() => {
        if (state && state.userData) {
            setoutputData(state.userData)
        }
    }, [])
    //filter hightest prices
    const top10Prices = outputData && outputData.CSVdata && outputData.CSVdata.length
        && outputData.CSVdata
            .map(product => product.Price)
            .sort((a, b) => b - a)
            .slice(0, 10);
    const top10 = outputData && outputData.CSVdata && outputData.CSVdata.length
        && outputData.CSVdata.filter(product => top10Prices.includes(product.Price));
    const Labels = top10 &&
        top10.length && top10.map((c) => c.Product);
    const data = top10 &&
        top10.length && top10.map((c) => c.Price);
    //ends here
    return (
        <ProtectedRoutes>
          <Header/>
            <div className='input-card pb-3'>
                <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                    <h6 style={{ font: "normal normal bold 16px/18px Arial", paddingTop: "20px" }}>
                        Personal Information
                    </h6>
                    <div className="row">
                        <div
                            className="col-md-6 d-flex justify-content-between Output_field">
                            <p >Name:</p>
                            <div>{outputData && outputData.name}</div>
                        </div>

                        <div className="col-md-6 d-flex justify-content-between Output_field">
                            <p
                            >Email:</p>
                            <div>{outputData && outputData.email}</div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6 d-flex justify-content-between Output_field">
                            <p >Gender:</p>
                            <div>{outputData && outputData.gender}</div>
                        </div>

                        <div className="col-md-6 d-flex justify-content-between Output_field">
                            <p
                            >Country:</p>
                            <div>{outputData && outputData.country}</div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6 d-flex justify-content-between Output_field">
                            <p >Age:</p>
                            <div>{outputData && outputData.age}</div>
                        </div>

                        <div className="col-md-6 d-flex justify-content-between Output_field">
                            <p
                            >City</p>
                            <div>{outputData && outputData.city}</div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <h6 style={{ font: "normal normal bold 16px/18px Arial", paddingTop: "20px" }}>
                                Top 10 Products
                            </h6>
                            <div className='bar_chart' >
                                <BarPlot labels={Labels} data={data}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h6 style={{ font: "normal normal bold 16px/18px Arial", paddingTop: "20px" }}>
                                Top 5 Products
                            </h6>
                            <div className='bar_chart' >
                            <PieChart outputData={outputData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoutes>
    )
}

export default Output