import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Box,
  Grid,
  LinearProgress,
} from "@mui/material";
import { Delete as DeleteIcon, Upload } from "@mui/icons-material";

function CourseCurriculum() {
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState([]);
  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
  const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] = useState(0);
  const bulkUploadInputRef = useRef(null);

  // Load data from localStorage when component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("courseCurriculumFormData");
    if (storedData) {
      setCourseCurriculumFormData(JSON.parse(storedData));
    }
  }, []);

  // Save data to localStorage whenever the form data changes
  useEffect(() => {
    if (courseCurriculumFormData.length > 0) {
      localStorage.setItem(
        "courseCurriculumFormData",
        JSON.stringify(courseCurriculumFormData)
      );
    }
  }, [courseCurriculumFormData]);

  const handleNewLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      { title: "", freePreview: false, videoUrl: "", public_id: "" },
    ]);
  };

  const handleCourseTitleChange = (event, index) => {
    const updatedData = [...courseCurriculumFormData];
    updatedData[index] = { ...updatedData[index], title: event.target.value };
    setCourseCurriculumFormData(updatedData);
  };

  const handleFreePreviewChange = (event, index) => {
    const updatedData = [...courseCurriculumFormData];
    updatedData[index] = { ...updatedData[index], freePreview: event.target.checked };
    setCourseCurriculumFormData(updatedData);
  };

  const handleSingleLectureUpload = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    setMediaUploadProgress(true);
    setMediaUploadProgressPercentage(50);

    setTimeout(() => {
      const updatedData = [...courseCurriculumFormData];
      updatedData[index] = {
        ...updatedData[index],
        videoUrl: URL.createObjectURL(file),
        public_id: file.name,
      };
      setCourseCurriculumFormData(updatedData);
      setMediaUploadProgress(false);
      setMediaUploadProgressPercentage(0);
    }, 2000);
  };

  const handleReplaceVideo = (index) => {
    const updatedData = [...courseCurriculumFormData];
    updatedData[index] = { ...updatedData[index], videoUrl: "", public_id: "" };
    setCourseCurriculumFormData(updatedData);
  };

  const handleDeleteLecture = (index) => {
    const updatedData = courseCurriculumFormData.filter((_, i) => i !== index);
    setCourseCurriculumFormData(updatedData);
  };

  const handleBulkUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    setMediaUploadProgress(true);
    setMediaUploadProgressPercentage(0);

    const updatedData = [...courseCurriculumFormData];
    let progress = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      updatedData[i] = updatedData[i] || { title: "", freePreview: false, videoUrl: "", public_id: "" };
      updatedData[i].videoUrl = URL.createObjectURL(file);
      updatedData[i].public_id = file.name;

      progress = Math.round(((i + 1) / files.length) * 100);
      setMediaUploadProgressPercentage(progress);

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    setCourseCurriculumFormData(updatedData);
    setMediaUploadProgress(false);
    setMediaUploadProgressPercentage(0);
  };

  const isCourseCurriculumFormDataValid = () => {
    return courseCurriculumFormData.every(
      (item) => item.title.trim() !== "" && item.videoUrl.trim() !== ""
    );
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
          title={<Typography variant="h5" fontWeight="bold">Create Course Curriculum</Typography>}
          action={
            <Box>
              <input
                type="file"
                ref={bulkUploadInputRef}
                accept="video/*"
                multiple
                style={{ display: "none" }}
                onChange={handleBulkUpload}
              />
              <Button
                variant="outlined"
                startIcon={<Upload />}
                onClick={() => bulkUploadInputRef.current?.click()}
                sx={{
                  borderColor: "navy",
                  color: "navy",
                  "&:hover": { backgroundColor: "rgba(0, 0, 128, 0.1)", borderColor: "#003366" },
                }}
              >
                Bulk Upload
              </Button>
            </Box>
          }
        />
        <CardContent>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "navy",
              color: "white",
              "&:hover": { backgroundColor: "#003366" },
            }}
            disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
            onClick={handleNewLecture}
          >
            Add Lecture
          </Button>
          {mediaUploadProgress && (
            <Box mt={2}>
              <LinearProgress
                variant="determinate"
                value={mediaUploadProgressPercentage}
              />
            </Box>
          )}
          <Box mt={4}>
            {courseCurriculumFormData.map((item, index) => (
              <Box
                key={index}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  padding: 2,
                  marginBottom: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Lecture {index + 1}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Lecture Title"
                      value={item.title}
                      onChange={(e) => handleCourseTitleChange(e, index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={item.freePreview}
                          onChange={(e) => handleFreePreviewChange(e, index)}
                        />
                      }
                      label="Free Preview"
                    />
                  </Grid>
                </Grid>
                <Box mt={2}>
                  {item.videoUrl ? (
                    <Box display="flex" alignItems="center" gap={2}>
                      <video
                        src={item.videoUrl}
                        controls
                        style={{ width: "450px", height: "200px" }}
                      />
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: "navy",
                          color: "navy",
                          "&:hover": { backgroundColor: "rgba(0, 0, 128, 0.1)", borderColor: "#003366" },
                           fontSize: "0.75rem",
                        }}
                        onClick={() => handleReplaceVideo(index)}
                      >
                        Replace Video
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "navy",
                          color: "white",
                          "&:hover": { backgroundColor: "#003366" },
                           fontSize: "0.75rem",
                        }}
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteLecture(index)}
                      >
                        Delete Lecture
                      </Button>
                    </Box>
                  ) : (
                    <TextField
                      type="file"
                      fullWidth
                      onChange={(e) => handleSingleLectureUpload(e, index)}
                      InputProps={{ inputProps: { accept: "video/*" } }}
                    />
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CourseCurriculum;
