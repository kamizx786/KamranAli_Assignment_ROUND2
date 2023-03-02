import { Modal } from 'antd';
import Papa from 'papaparse';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context';
const Input = ({ setshow }) => {
    const [ok, setOk] = useState(false);
    const [csv, setCsv] = useState('');
    const numbers = Array.from(Array(121).keys()); // create an array of numbers from 0 to 120
    const countries = ["Russia", "UK", "Germany", "France", "Italy", "Span"];
    const cities = ["Russia", "UK", "Germany", "France", "Italy", "Span"];
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        gender: "",
        age: "",
        country: "",
        city: "",
        CSVdata: []

    });
    const { name, email, gender, age, country, city, CSVdata } = inputData;
    const [state, setState] = useContext(UserContext);
    const navigate = useNavigate();
    //handle Form OnChange
    const onHandleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    }
    //handle CSV
    const handleCSVFile = (event) => {
        const file = event.target.files[0];
        const fileType = file.type;
        if (fileType !== 'text/csv') {
            toast.error('Please select a CSV file');
            return;
        }
        Papa.parse(file, {
            header: true,
            complete: updateData
        });
        setOk(false);
        event.target.value = null;
    }
    //handle Updated Data
    const updateData = (result) => {
        const data = result.data;
        // Validate header
        const header = result.meta.fields;
        if (header[0] !== 'Product' || header[1] !== 'Price') {
            toast.error('CSV file Columns is invalid');
            return;
        }
        // Validate data types
        const isValidData = data.every(row => {
            return typeof row.Product === 'string' && !isNaN(row.Price);
        });
        if (!isValidData) {
            toast.error('CSV file data is invalid');
            return;
        }
        const formattedData = data.map((item) => `${item.Product}: ${item.Price}`).join('\n');
        setInputData({ ...inputData, CSVdata: data });
        setCsv(formattedData);
        console.log("CSV", csv)
    }
    //handle Continue
    const handleContinue = (e) => {
        e.preventDefault();
        if (!name) toast.error("Please input Name");
        if (!email) toast.error("Please input email");
        if (!gender) toast.error("Please input gender");
        if (!age) toast.error("Please input age");
        if (CSVdata.length < 1) toast.error("Please input CSV DATA");
        else {
            setState({ ...state, userData: inputData })
            navigate("/output");
        }
    }
    //handle Pop Modal
    const handleModal = (e) => {
        e.preventDefault();
        setOk(true);
    }
    return (
        <>
            <div className='input-card pb-3'>
                <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                    <h6 style={{ font: "normal normal bold 16px/18px Arial", paddingTop: "20px" }}>
                        User
                    </h6>
                    <form onSubmit={handleContinue}>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label style={{ marginBottom: "-16px" }}>Name</label>
                                <input value={name} name="name" onChange={onHandleChange}
                                    type="text" className="form-control" placeholder="Name" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputState">Gender</label>
                                <select id="inputState" className="form-control" name='gender'
                                    onChange={onHandleChange}
                                    value={gender}>
                                    <option value="" selected>Please Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>UnSpecified</option>
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputState">Age</label>
                                <select id="inputState" className="form-control"
                                    name='age'
                                    onChange={onHandleChange}
                                    value={age}
                                >
                                    <option value="" selected>Please Select</option>
                                    {numbers.map((number) => (
                                        <option key={number} value={number}>
                                            {number}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4" style={{ marginBottom: "-16px" }}>Email</label>
                                <input
                                    name='email'
                                    onChange={onHandleChange}
                                    value={email}
                                    type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputState">Country</label>
                                <select id="inputState" className="form-control"
                                    name='country'
                                    onChange={onHandleChange}
                                    value={country}
                                >
                                    <option value="" selected>Please Select</option>
                                    {countries.map((c) => {
                                        return (<option value={c}>
                                            {c}
                                        </option>)
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputState">City</label>
                                <select
                                    name='city'
                                    onChange={onHandleChange}
                                    value={city}
                                    id="inputState" className="form-control">
                                    <option value="" selected>Please Select</option>
                                    {cities.map((c) => {
                                        return (<option value={c}>
                                            {c}
                                        </option>)
                                    })}
                                </select>
                            </div>
                        </div>
                        <h6 style={{ font: "normal normal bold 16px/18px Arial", paddingTop: "20px" }}>Input CSV Data</h6>
                        <div className="row mt-3">
                            <div className="form-group col-md-10">
                                <input type="text" accept=".csv,text/csv" disabled
                                    className="form-control" value="Upload File" />
                            </div>
                            <Modal
                                onCancel={() => setOk(false)}
                                open={ok}
                                onOk={() => setOk(false)}
                            >
                                <input type="file" accept=".csv,text/csv"
                                    className="form-control" onChange={handleCSVFile} />
                            </Modal>
                            <div className="form-group col-md-2">
                                <button onClick={handleModal} className='form-btn'>Upload</button>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="form-group col-md-12">
                                <label >Manual CSV Data Input</label>
                                <textarea value={csv} className="form-control" rows={5} />
                            </div>
                        </div>

                        <button
                            type="submit" className='form-btn mt-3 d-block mx-auto'>
                            Continue</button>
                    </form>


                </div>
            </div>
        </>
    )
}

export default Input