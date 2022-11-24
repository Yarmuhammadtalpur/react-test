import "./App.css";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  ImageList,
  ImageListItem,
  TextField,
} from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "./DogState";
import { getBreeds } from "./BreedState";

//
function App() {
  const dispatch = useDispatch();
  const DogsBreeds = useSelector((state) => state.Dog.dogName);
  const BreedsList = useSelector((state) => state.Breed.BreedNames);

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

  useEffect(() => {
    if (param) {
      dispatch(getBreeds(param));
    }
  }, [dispatch, param]);

  console.log(BreedsList, "BreedsList");

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
              id="outlined-select-currency"
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
            <div className="Button-group">
              <Button variant="contained" onClick={handleClickOpen}>
                Show
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setdog("");
                  setbreeds("");
                }}
                color="success"
              >
                Clear
              </Button>
            </div>
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
                      {BreedsList.length > 0 &&
                        Object.entries(BreedsList).map((item, i) => (
                          <ImageListItem key={item[0]}>
                            <img
                              src={item[1]}
                              srcSet={item[1]}
                              alt="dog"
                              loading="lazy"
                              key={item[0]}
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
