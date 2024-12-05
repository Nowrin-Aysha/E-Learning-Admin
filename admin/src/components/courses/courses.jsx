import React, { useContext } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "../config"
import { InstructorContext } from "../context";

function Courses({ listOfCourses }) {
  const navigate = useNavigate();
  const { setCurrentEditedCourseId, setCourseLandingFormData, setCourseCurriculumFormData } = useContext(InstructorContext);

  return (
    <div style={{ padding: "10px", height: "100vh", width: "100vw", backgroundColor: "#f4f4f4" }}>
      <Card style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <CardHeader
          title={
            <Typography variant="h4" component="div" style={{ fontWeight: "bold" }}>
              All Courses
            </Typography>
          }
          action={
            <Button
              variant="contained"
              style={{
                backgroundColor: "#001f54",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={() => {
                setCurrentEditedCourseId(null);
                setCourseLandingFormData(courseLandingInitialFormData);
                setCourseCurriculumFormData(courseCurriculumInitialFormData);
                navigate("/create-new-course");
              }}
            >
              Create New Course
            </Button>
          }
        />
        <CardContent>
          <TableContainer component={Paper} style={{ borderRadius: "8px", overflow: "hidden" }}>
            <Table>
              <TableHead style={{ backgroundColor: "#e0e0e0" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Course</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Students</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Revenue</TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOfCourses && listOfCourses.length > 0 ? (
                  listOfCourses.map((course) => (
                    <TableRow key={course._id}>
                      <TableCell>{course?.title}</TableCell>
                      <TableCell>{course?.students?.length}</TableCell>
                      <TableCell>${course?.students?.length * course?.pricing}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => {
                            navigate(`/course-landing/${course._id}`);
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography>No courses available</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default Courses;
