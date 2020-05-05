import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import { loadProjects, getProjects } from "../../store/projects";
import Table from "../common/table";

const Projects = () => {
  const disptach = useDispatch();
  const projects = useSelector(getProjects);

  useEffect(() => {
    disptach(loadProjects());
  }, []);

  const columns = [
    {
      id: "name",
      label: "Name",
      content: (project) => (
        <Link to={`issue?project=${project.id}`}>{project.name}</Link>
      ),
    },
    {
      id: "issues",
      label: "issues",
    },
    {
      id: "members",
      label: "members",
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="project/new"
        >
          New Project
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Table rows={projects} columns={columns} />
      </Grid>
    </Grid>
  );
};

export default Projects;