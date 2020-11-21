import "./../styles.css";
import React, { useCallback, useEffect, useState } from "react";
import SimpleCard from "./SimpleCard";
import DatePickers from "./DatePickers";
import { Box, TextField } from "@material-ui/core";
export default function Home() {
  const modifydata = [];
  const [match, setMatch] = useState([]);
  const [fetchData, setFetchData] = useState([]);
  const [ts, setTs] = useState("");
  const [fs, setFs] = useState("");
  const [is, setIs] = useState("");
  const [cs, setCs] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(1359999200).getFullYear() +
      "-" +
      new Date(1359999200).getMonth() +
      1 +
      "-" +
      new Date(1359999200).getDate()
  );
  const [endDate, setEndDate] = useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
  );
  //fetchFilterData
  const filterDataFunction = () => {
    const copydata = [...fetchData];
    console.log(copydata);
    const myNewData = copydata.filter((el) => {
      const daterangestart = new Date(startDate);
      const daterangeend = new Date(endDate);
      const eldate = new Date(el.date);
      console.log(
        eldate >= daterangestart && eldate <= daterangeend,
        eldate,
        daterangestart,
        daterangeend
      );
      return (
        (ts === "" ? true : el.twubric.total.toString() === ts) &&
        (fs === "" ? true : el.twubric.friends.toString() === fs) &&
        (is === "" ? true : el.twubric.influence.toString() === is) &&
        (cs === "" ? true : el.twubric.chirpiness.toString() === cs) &&
        (startDate === "" || endDate === ""
          ? true
          : eldate >= daterangestart && eldate <= daterangeend)
      );
    });
    console.log(myNewData);
    return myNewData;
  };

  //APi Call
  const apiurl = `https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/9667fc19a0f89193e894da7aaadf6a4b7758b45e/twubric.json`;
  useEffect(() => {
    loacalData();
  }, []);
  const loacalData = async () => {
    const response = await fetch(apiurl);
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      modifydata.push({
        uid: data[i].uid,
        username: data[i].username,
        twubric: data[i].twubric,
        date: new Date(data[i].join_date)
      });
    }
    setMatch(modifydata);
    setFetchData(modifydata);
  };

  //handledelete
  function handleDelete(id) {
    const filtermatch = match.filter((el) => el.uid !== id);
    setMatch(filtermatch);
  }

  //handleFilter
  const handleFilterClick = () => {
    // if (!ts && !fs && !is && !cs && !endDate && !startDate) return;
    console.log("Amit");
    setMatch(filterDataFunction());
  };

  //handleReset
  const handleResetFilterClick = () => {
    setTs("");
    setFs("");
    setIs("");
    setCs("");
    setStartDate(
      new Date(1359999200).getFullYear() +
        "-" +
        (new Date(1359999200).getMonth() + 1) +
        "-" +
        new Date(1359999200).getDate()
    );
    setEndDate(
      new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate()
    );
  };

  //handledate
  const handleDateChange = (id, value) => {
    if (id === "start") setStartDate(value);
    if (id === "end") setEndDate(value);
  };
  const handleDefault = () => {
    handleResetFilterClick();
    setMatch(fetchData);
  };
  return (
    <>
      <div className="sortby col">
        <h3>SortBy</h3>
        <div className="inputfilled">
          <div className="col ">
            <TextField
              id="Twubric_Score"
              label="Twubric_Score"
              type="number"
              onChange={(el) => setTs(el.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="col">
            <TextField
              id="Friends"
              label="Friends"
              type="number"
              onChange={(el) => setFs(el.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="col">
            <TextField
              id="Influence"
              label="Influence"
              type="number"
              onChange={(el) => setIs(el.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="col">
            <TextField
              id="Chirpinessr"
              label="Chirpiness"
              type="number"
              onChange={(el) => setCs(el.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
        </div>
      </div>

      <div className="col">
        <h4>Joined Twitter between</h4>

        {/* {datapicker} */}
        <div className="row">
          <DatePickers
            id={`start`}
            tag={`start`}
            selected={startDate}
            onChange={handleDateChange}
          />
          <DatePickers
            id={`end`}
            tag={`end`}
            selected={endDate}
            maxDate={new Date()}
            onChange={handleDateChange}
          />
        </div>
        <br />

        {/* {button } */}
        <div className="row">
          <div>
            <button onClick={() => handleFilterClick()}>Filter</button>
          </div>
          <div>
            <button onClick={() => handleResetFilterClick()}>
              Rest Filter
            </button>
          </div>
          <div>
            <button onClick={() => handleDefault()}>Default Value</button>
          </div>
        </div>
      </div>

      {/* {card compenmet} */}
      <Box
        display="flex"
        m={2}
        p={2}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {match.map((el) => (
          <Box m={2}>
            <SimpleCard
              key={el.uid}
              id={el.uid}
              total={el.twubric.total}
              friends={el.twubric.friends}
              influence={el.twubric.influence}
              chirpiness={el.twubric.chirpiness}
              month={el.date.getMonth()}
              date={el.date.getDate()}
              year={el.date.getFullYear()}
              onDelete={handleDelete}
            />
          </Box>
        ))}
      </Box>
    </>
  );
}
