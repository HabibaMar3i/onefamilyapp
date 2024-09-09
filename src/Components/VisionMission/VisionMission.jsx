import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BookIcon from '@mui/icons-material/Book';
import './VisionMission.css';

const VisionMission = () => {
  return (
    <div className="vision-mission">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className="vision-card">
            <CardContent className="card-content-blue">
              <LightbulbIcon className="icon" />
              <Typography variant="h5" component="div" className="card-title">
                Vision
              </Typography>
              <Typography variant="body1" className="card-text">
                "To create a world where every child, irrespective of their diversities, is embraced with understanding and love, and every parent has the knowledge and support needed to help their children thrive in a supportive and inclusive environment."
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="mission-card">
            <CardContent className="card-content-orange">
              <BookIcon className="icon" />
              <Typography variant="h5" component="div" className="card-title">
                Mission
              </Typography>
              <Typography variant="body1" className="card-text">
                "Our mission is to provide parents with the essential tools and knowledge necessary to foster effective communication, understanding, and unwavering support for their children. We aim to create an inclusive environment where every child is valued and understood."
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default VisionMission;
