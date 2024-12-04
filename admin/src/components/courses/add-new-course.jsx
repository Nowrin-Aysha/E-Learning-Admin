import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography, Box, Tabs, Tab } from "@mui/material";
import CourseCurriculum from "../courses/course-curriculum";
import CourseLanding from "../courses/course-landing";
import CourseSettings from "../courses/course-settings";

const courseLandingInitialFormData = {
  title: "",
  description: "",
  category: "",
};

const courseCurriculumInitialFormData = [
  {
    title: "",
    videoUrl: "",
    public_id: "",
    freePreview: false,
  },
];

function AddNewCoursePage() {
  const [activeTab, setActiveTab] = useState(0); 
  const [courseLandingFormData, setCourseLandingFormData] = useState(courseLandingInitialFormData);
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(courseCurriculumInitialFormData);
  const [currentEditedCourseId, setCurrentEditedCourseId] = useState(null);
  const [auth, setAuth] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.courseId) setCurrentEditedCourseId(params?.courseId);
  }, [params?.courseId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue); 
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          Create New Course 
        </Typography>
        <Button
          variant="contained"
          color="primary"
          
          disabled={false} 
          onClick={() => console.log("Submit clicked!")}
          sx={{               marginTop: 3,
            backgroundColor: "#001F3F", 
            color: "white",
            "&:hover": {
              backgroundColor: "#001A36", 
            },}}
        >
          Submit
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Curriculum" />
            <Tab label="Course Landing Page" />
            <Tab label="Settings" />
          </Tabs>

          <Box sx={{ paddingTop: 2 }}>
            {activeTab === 0 && <CourseCurriculum />}
            {activeTab === 1 && <CourseLanding />}
            {activeTab === 2 && <CourseSettings />}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AddNewCoursePage;
