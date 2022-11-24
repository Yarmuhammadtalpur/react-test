import "./App.css";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  ImageList,
  ImageListItem,
  TextField,
} from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "./DogState";
import axios from "axios";

//
function App() {
  const dispatch = useDispatch();
  const DogsBreeds = useSelector((state) => state.Dog.dogName);
  const [ApidataBreed, setApidataBreed] = useState("");

  const [dog, setdog] = useState("");
  const [breeds, setbreeds] = useState("");
  const [open, setOpen] = useState(false);
  const param = breeds ? `${dog}/${breeds}/` : `${dog}/`;
  console.log(dog, "dog", breeds, "breeds");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getDogs());
    console.log(DogsBreeds, "effect");
  }, [dispatch]);
  const test = Object.keys(DogsBreeds).length !== 0;

  console.log(DogsBreeds, test);

  useEffect(() => {
    console.log(param);
    axios.get(`https://dog.ceo/api/breed/${param}images`).then(
      (response) => {
        setApidataBreed(response.data.message);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [param]);

  console.log(ApidataBreed, "ApidataBreed");

  const handleChange = (event) => {
    setdog(event.target.value);
    setbreeds("");
  };

  const handleChangeBreed = (event) => {
    setbreeds(event.target.value);
  };

  return (
    <>
      <div className="App">
        <Navbar />
        <Container fixed className="Container-app">
          <h2>Check the Breeds of dog with pictures</h2>

          <div className="App-Input">
            <TextField
              id="outlined-select-currency-native"
              select
              value={dog}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              helperText="Please select a Dog"
            >
              <option>Select a Dog</option>
              {Object.keys(DogsBreeds).length !== 0 &&
                Object.entries(DogsBreeds.message).map(
                  ([dog, breeds], index) => (
                    <option key={index} value={dog}>
                      {dog}
                    </option>
                  )
                )}
            </TextField>
            <TextField
              id="outlined-select-currency-native"
              select
              value={breeds}
              onChange={handleChangeBreed}
              SelectProps={{
                native: true,
              }}
              helperText="Please select a Breed"
            >
              <option>Select a breed</option>
              {Object.keys(DogsBreeds).length !== 0 &&
                Object.entries(DogsBreeds.message)
                  .filter((name) => name.includes(dog))
                  .map(([dog, breeds], index) => (
                    <>
                      {breeds.map((breed, i) => (
                        <option key={i}>{breed}</option>
                      ))}
                    </>
                  ))}
            </TextField>
          </div>

          <div>
            <Button variant="contained" onClick={handleClickOpen}>
              Show
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogContent>
                {!dog ? (
                  <h1>Please Select a Dog</h1>
                ) : (
                  <div>
                    <ImageList
                      sx={{ width: 500, height: 450 }}
                      cols={3}
                      rowHeight={164}
                    >
                      {ApidataBreed &&
                        ApidataBreed.map((item) => (
                          <ImageListItem key={item.img}>
                            <img
                              src={item}
                              srcSet={item}
                              alt="dog"
                              loading="lazy"
                            />
                          </ImageListItem>
                        ))}
                    </ImageList>
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="error">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Container>
      </div>
    </>
  );
}

export default App;
