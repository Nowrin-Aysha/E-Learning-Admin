import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography, Box, Tabs, Tab } from "@mui/material";
import CourseCurriculum from "../courses/course-curriculum";
import CourseLanding from "../courses/course-landing";
import CourseSettings from "../courses/course-settings";
import { addNewCourseService, updateCourseByIdService, fetchInstructorCourseDetailsService } from "../../helper/helper";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "../config";

const AddNewCoursePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [courseLandingFormData, setCourseLandingFormData] = useState(courseLandingInitialFormData);
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(courseCurriculumInitialFormData);
  const [currentEditedCourseId, setCurrentEditedCourseId] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.courseId) {
      setCurrentEditedCourseId(params?.courseId);
      fetchCourseDetails(params.courseId);
    }
  }, [params?.courseId]);

  const fetchCourseDetails = async (courseId) => {
    try {
      const response = await fetchInstructorCourseDetailsService(courseId);
      if (response.success) {
        setCourseLandingFormData(response.data.landing || courseLandingInitialFormData);
        setCourseCurriculumFormData(response.data.curriculum || courseCurriculumInitialFormData);
      } else {
        console.error("Failed to fetch course details:", response.message);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSubmit = async () => {
    try {
      const courseData = {
        landing: courseLandingFormData,
        curriculum: courseCurriculumFormData,
      };

      let response;
      if (currentEditedCourseId) {
        response = await updateCourseByIdService(currentEditedCourseId, courseData);
      } else {
        response = await addNewCourseService(courseData);
      }

      if (response.success) {
        console.log(`${currentEditedCourseId ? "Course updated" : "Course created"} successfully!`);
        navigate("/courses");
      } else {
        console.error("Failed to submit course:", response.message);
      }
    } catch (error) {
      console.error("Error submitting course data:", error);
    }
  };

  const isFormValid = () => {
    return (
      courseLandingFormData.title &&
      courseLandingFormData.description &&
      courseCurriculumFormData.every(
        (item) => item.title && item.videoUrl && item.public_id
      )
    );
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          {currentEditedCourseId ? "Edit Course" : "Create New Course"}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          disabled={!isFormValid()}
          onClick={handleSubmit}
          sx={{
            marginTop: 3,
            backgroundColor: "#001F3F",
            color: "white",
            "&:hover": {
              backgroundColor: "#001A36",
            },
          }}
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
            {activeTab === 0 && (
              <CourseCurriculum
                formData={courseCurriculumFormData}
                setFormData={setCourseCurriculumFormData} // Ensure this is correctly updating the parent state
              />
            )}
            {activeTab === 1 && (
              <CourseLanding
                formData={courseLandingFormData}
                setFormData={setCourseLandingFormData} // Ensure this is correctly updating the parent state
              />
            )}
            {activeTab === 2 && <CourseSettings />}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddNewCoursePage;
