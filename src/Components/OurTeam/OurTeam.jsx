import React from 'react';
import { Container, Grid, Typography, Box, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import './OurTeam.css'
const teamMembers = [
  'Rahma Tarek',
  'Roaa Aiman',
  'Sohaila Mohamed',
  'Asmaa Wael',
  'Bassant Saeed',
  'Fadi Wagih',
];

const TeamContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#FEF5DC',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
}));

const TeamMemberBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const TeamAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: '#174A90',
  color: '#ffffff',
  marginBottom: theme.spacing(2),
  width: theme.spacing(10),
  height: theme.spacing(10),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const OurTeam = () => {
  return (
    <TeamContainer className='our-team'>
              <h3 className="section-title">Our Team</h3>

      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={6} md={4} lg={2} key={index}>
            <TeamMemberBox>
              <TeamAvatar>
                <PersonIcon fontSize="large" />
              </TeamAvatar>
              <Typography variant="body1" align="center">
                {member}
              </Typography>
            </TeamMemberBox>
          </Grid>
        ))}
      </Grid>
    </TeamContainer>
  );
};

export default OurTeam;
