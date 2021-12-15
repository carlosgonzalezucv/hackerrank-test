import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
  Typography,
  Grid,
  TextField,
  Tooltip,
  Button,
  Divider,
  Alert,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../application/hooks";
import {
  putAnotherCity,
  registerUserAttemp,
  selectCity,
  selectCorrectUserAttemps,
  selectUserAttemps,
  selectUserguess,
  selectUsername,
  setUserGuess,
} from "../slices/gameSlice";
import wheaterAPI from "../services/weatherApi";
import guessChecker from "../services/guessChecker";

export const MainApplication = () => {
  const userName = useAppSelector(selectUsername);
  const city = useAppSelector(selectCity);
  const userGuess = useAppSelector(selectUserguess);
  const userAttemps = useAppSelector(selectUserAttemps);
  const correctUserAttemps = useAppSelector(selectCorrectUserAttemps);

  const dispatch = useAppDispatch();

  const updateUserGuess = (e) => {
    dispatch(setUserGuess(e.target.value));
  };

  const onSubmit = async () => {
    let { temp, err } = await wheaterAPI.getTemperature(city);

    if (err) {
      return alert("Please try again.");
    }

    dispatch(
      registerUserAttemp({
        city,
        userGuess,
        actualTemp: temp,
        isRight: guessChecker.checkUserGuess(userGuess, temp),
      })
    );

    dispatch(setUserGuess(0));
    dispatch(putAnotherCity());
  };



  // console.log("data!", data)
  return (
    <Container maxWidth="xs">
      <Grid
        container
        spacing={1}
        justify="center"
        alignItems="center"
        alignContent="stretch"
      >
        <Grid item xs={12}>
          <Box p={4}>
            <Typography align="center">{city}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <TextField
              fullWidth
              value={userGuess}
              InputProps={{
                endAdornment: <Typography>Celsius</Typography>,
                type: "number",
              }}
              onChange={updateUserGuess}
            ></TextField>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box p={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={onSubmit}
              disabled={userAttemps.length === 5}
            >
              Check!
            </Button>
          </Box>
        </Grid>
        {
          (userAttemps.length === 5) && (
            <Box width="100%">
              <Alert severity={ correctUserAttemps < 3 ? 'error' : 'success' } action={
                <Button variant="contained" color="info" onClick={ () => window.location.reload() }>
                  try again
                </Button>
              }>
                You { correctUserAttemps >= 3 ? 'won!' : 'loose :(.'}
              </Alert>
            </Box>
          )
        }
      </Grid>

      <Divider />

      {userAttemps.length > 0 && (
        <Grid item xs={12}>
          <Box display="flex">
            {userAttemps.map(({ city, userGuess, actualTemp, isRight }) => {
              return (
                <AttempCard
                  key={city}
                  {...{ city, userGuess, actualTemp, isRight }}
                />
              );
            })}
          </Box>
        </Grid>
      )}
    </Container>
  );
};

const AttempCard = ({ city, userGuess, actualTemp, isRight }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{ color: isRight ? "green" : "red" }}
      flex={ 1 }
    >
      <Typography variant="h3">{userGuess}</Typography>
      <Typography variant="p" fontSize="small">
        Was {actualTemp}
      </Typography>
    </Box>
  );
};
