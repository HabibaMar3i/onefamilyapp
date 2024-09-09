import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './ContactUs.css'
const ContactContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#FEF5DC',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  textAlign: 'left',
  width: '100%',
}));

const ContactIcon = styled('i')(({ theme }) => ({
  color: '#174A90',
  marginRight: theme.spacing(2),
}));

const OfficeVisitBox = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  width: '100%',
}));

const ContactUs = () => {
  return (
    <ContactContainer className='contact-us'>
      <h3 className="section-title">Contact Us</h3>
      <p className="blog-page-description">
        We welcome all of you to our place. If you have any issues,
        please call ahead to schedule a visit.
      </p>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <ContactInfo>
            <ContactItem>
              <ContactIcon className="fas fa-map-marker-alt" />
              <Typography>
                Banks Center St, New Cairo 1, Cairo Governorate 4730112
              </Typography>
            </ContactItem>
            <ContactItem>
              <ContactIcon className="fas fa-phone-alt" />
              <Typography>+20 1XX XXX XXXX</Typography>
            </ContactItem>
            <ContactItem>
              <ContactIcon className="fas fa-envelope" />
              <Typography>support@onefamily.com</Typography>
            </ContactItem>
            <OfficeVisitBox>
              <ContactItem>
                <ContactIcon className="fas fa-clock" />
                <Box>
                  <Typography variant="body1" component="div" fontWeight="bold">
                    Office Hours:
                  </Typography>
                  <Typography variant="body2">
                    Sunday to Thursday: 9:00 AM - 4:00 PM
                    <br />
                    Friday and Saturday: Closed
                  </Typography>
                </Box>
              </ContactItem>
            </OfficeVisitBox>
          </ContactInfo>
        </Grid>
        <Grid item xs={12} md={6}>
          <h3 className="section-title our-location">Our Location</h3>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.662751346717!2d31.423467300000006!3d30.01783870000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d028cb4e5c9%3A0x30387fde5456377b!2sMakateb!5e0!3m2!1sen!2seg!4v1718514736065!5m2!1sen!2seg"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Grid>
      </Grid>
    </ContactContainer>
  );
};

export default ContactUs;

