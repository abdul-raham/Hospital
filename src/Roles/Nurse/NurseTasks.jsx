import React, { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Button, Divider } from "@mui/material";

const NurseTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, description: "Administer medications to Room 12", status: "Pending" },
    { id: 2, description: "Update patient chart for Bed 5", status: "Completed" },
    { id: 3, description: "Prepare discharge papers for Room 7", status: "Pending" },
  ]);

  const markAsCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: "Completed" } : task
      )
    );
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography
        variant="h4"
        sx={{
          marginBottom: "20px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Nurse Tasks
      </Typography>

      <List>
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                marginBottom: "10px",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <ListItemText
                primary={task.description}
                secondary={`Status: ${task.status}`}
              />
              {task.status === "Pending" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => markAsCompleted(task.id)}
                >
                  Mark as Completed
                </Button>
              )}
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default NurseTasks;
