import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { FaPen, FaTrash, FaVoteYea } from "react-icons/fa"
import './App.css';

function App() {

  const [newInput, setNewInput] = useState([]);
  const [handleNullValues, setHandleNullValues] = useState(true);
  const [arrOfOptions, setArrOfOptions] = useState([]);
  const [dataApi, setDataApi] = useState({});
  const [newTimeAndDate, setTimeAndDate] = useState({ day: "", month: "", hours: "", minutes: "" });
  const [inputValues, setInputValues] = useState({
    title: "",
    expireDate: "",
    expireTime: "",

  });

  const [optionValues, setOptionValues] = useState({
    option1: null,
    option2: null,
    option3: null,
    option4: null,
    option5: null,
    option6: null,
  });

  const handleChange = (e) => {
    setInputValues(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
    setOptionValues(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
    console.log(inputValues, optionValues);

  }

  const createInput = (e) => {
    setArrOfOptions(Object.keys(optionValues).filter((data) => data.includes("option")));

    setNewInput((prevData) => [...prevData, <>
      <label>Opção {newInput.length + 4}</label>
      <input type="text" name={`option${newInput.length + 4}`} className="fade-in" value={inputValues[`option${newInput.length + 4}`]} onChange={handleChange}></input>
    </>])

    console.log(arrOfOptions);
    e.preventDefault();
  }

  const addEnquete = (e) => {
    e.preventDefault()
    const time = new Date();
    setTimeAndDate({
      day: time.getDate() < 10 ? `0${time.getDate()}` : time.getDate(),
      month: time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1,
      yearActual: time.getFullYear(),
      hours: time.getHours(),
      minutes: time.getMinutes()


    })



  }
  console.log(newInput, newInput.length);
  useEffect(() => {
    const fetchingApi = async () => {
      const axiosRequest = await Axios.get("http://localhost:3001/api/get");
      setDataApi(axiosRequest.data);
      console.log(dataApi);


    }


    fetchingApi();
  },
    [newTimeAndDate])
  /* send data to bakc */
  useEffect(() => {
    Axios.post('http://localhost:3001/api/create', {
      title: inputValues.title,
      expireDate: inputValues.expireDate,
      expireTime: inputValues.expireTime,
      actualDate: `${newTimeAndDate.yearActual}/${newTimeAndDate.month}/${newTimeAndDate.day}`,
      actualHours: `${newTimeAndDate.hours}:${newTimeAndDate.minutes < 10 ? '0' + newTimeAndDate.minutes : newTimeAndDate.minutes}`,
      option1: optionValues.option1,
      option2: optionValues.option2,
      option3: optionValues.option3,
      option4: optionValues.option4,
      option5: optionValues.option5,
      option6: optionValues.option6,
    })
  }, [newTimeAndDate])

  return (
    <div className="App">
      <div className="form-box">

        <form onSubmit={addEnquete} className={handleNullValues ? "" : "error"}>
          <h3>Adicione sua enquete:</h3>
          <div className="inputs-box">
            <label>Titulo </label>
            <input type="text" name="title" value={inputValues.title} onChange={handleChange}></input>
            <div className="datebox">
              <label>Quando você quer que termine:</label>
              <input type="date" name="expireDate" value={inputValues.expireDate} onChange={handleChange} placeholder="dia/mes/ano" />
              <input type="time" name="expireTime" value={inputValues.expireTime} onChange={handleChange} placeholder="dia/mes/ano" />

            </div>
            <label className="option">Opção 1: </label>
            <input type="text" name="option1" value={inputValues.option1} onChange={handleChange}></input>
            <label>Opção 2: </label>
            <input type="text" name="option2" value={inputValues.option2} onChange={handleChange}></input>
            <label>Opção 3: </label>
            <input type="text" name="option3" value={inputValues.option3} onChange={handleChange}></input>
            {newInput.map((data) => {
              return (
                data
              )
            })}
          </div>


          <div className="buttons-box">
            <input type="submit" value="enviar dados" />
            <button onClick={createInput} disabled={newInput.length >= 3 ? true : false} className={newInput.length >= 3 ? "disabled" : ""} >Adicionar mais uma opção</button>
          </div>
        </form>

      </div>
      <div className="posts-box">
        {dataApi[0] === null || dataApi[0] === undefined ? null : dataApi.map((data) => {
          return (
            <div className="post">
              <div className="date-and-title">
                <h2>{data.title}</h2>
                <h5>{data.post_time_date.replaceAll('-', '/')} às {data.post_time_horario}</h5>
              </div>
              <div className="content">
                <div className="option option1">
                  <p className="thisWillIncremente">05</p>
                  <p className="optionDesc">{data.option1}</p>
                  <div className="thrash-and-edit">
                    <div className="thrash"><FaTrash /></div>
                    <div className="edit"><FaPen /></div>
                    <div className="vote"><FaVoteYea /></div>
                  </div>
                </div>
                <div className="option option2">
                  <p className="thisWillIncremente">05</p>
                  <p className="optionDesc">{data.option2}</p>
                  <div className="thrash-and-edit">
                    <div className="thrash"><FaTrash /></div>
                    <div className="edit"><FaPen /></div>
                    <div className="vote"><FaVoteYea /></div>
                  </div>
                </div>
                <div className="option option3">
                  <p className="thisWillIncremente">05</p>
                  <p className="optionDesc">{data.option3}</p>
                  <div className="thrash-and-edit">
                    <div className="thrash"><FaTrash /></div>
                    <div className="edit"><FaPen /></div>
                    <div className="vote"><FaVoteYea /></div>
                  </div>
                </div>
                {data.option4 === null || data.option5 === undefined ? null :
                  <div className="option option4">
                    <p className="thisWillIncremente">05</p>
                    <p className="optionDesc">{data.option4}</p>
                    <div className="thrash-and-edit">
                      <div className="thrash"><FaTrash /></div>
                      <div className="edit"><FaPen /></div>
                      <div className="vote"><FaVoteYea /></div>
                    </div>
                  </div>
                }
                {data.option5 === null || data.option5 === undefined ? null :
                  <div className="option option5">
                    <p className="thisWillIncremente">05</p>
                    <p className="optionDesc">{data.option5}</p>
                    <div className="thrash-and-edit">
                      <div className="thrash"><FaTrash /></div>
                      <div className="edit"><FaPen /></div>
                      <div className="vote"><FaVoteYea /></div>
                    </div>
                  </div>
                }
                {data.option6 === null || data.option5 === undefined ? null :
                  <div className="option option6">
                    <p className="thisWillIncremente">05</p>
                    <p className="optionDesc">{data.option6}</p>
                    <div className="thrash-and-edit">
                      <div className="thrash"><FaTrash /></div>
                      <div className="edit"><FaPen /></div>
                      <div className="vote"><FaVoteYea /></div>
                    </div>
                  </div>
                }
              </div>
              <div className="expire-date">
                <h5>Fim da enquete: <span className="expire-date">{data.fim_enquete_date.replaceAll('-', '/')} às {data.fim_enquete_horario}</span></h5>

              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
