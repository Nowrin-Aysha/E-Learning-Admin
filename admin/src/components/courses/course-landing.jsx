import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";

const courseLandingPageFormControls = [
  { id: "title", label: "Course Title", type: "text" },
  { id: "subtitle", label: "Subtitle", type: "text" },
  { id: "description", label: "Description", type: "text" },
];

function CourseLanding() {
  const [courseLandingFormData, setCourseLandingFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
  });

  const handleInputChange = (id, value) => {
    setCourseLandingFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", courseLandingFormData);
  };

  return (
    <Box
      sx={{
        padding: "10px",
        minHeight: "100vh",
        width: "90vw",
        backgroundColor: "#f4f4f4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ padding: 3, width: "90%", maxWidth: "1000px", boxShadow: 4 }}>
        <CardHeader
          title={
            <Typography variant="h5" fontWeight="bold" align="center">
              Course Landing Page
            </Typography>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            {courseLandingPageFormControls.map((control) => (
              <Grid item xs={12} key={control.id}>
                <TextField
                  fullWidth
                  label={control.label}
                  type={control.type}
                  value={courseLandingFormData[control.id]}
                  onChange={(e) => handleInputChange(control.id, e.target.value)}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            fullWidth
            sx={{
              marginTop: 3,
              backgroundColor: "#001F3F", 
              color: "white",
              "&:hover": {
                backgroundColor: "#001A36", 
              },
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CourseLanding;
