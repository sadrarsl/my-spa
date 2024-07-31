import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Container, Typography, Box } from "@mui/material";
import withFormikMaterialUI from "../../components/withFormikMaterialUI";
import { useTranslation } from "react-i18next";
import Notification from "../../components/Notification";

const FormikTextField = withFormikMaterialUI(Field);

/**
 * Contact component renders a contact form using Formik and Material-UI.
 * It includes fields for email, subject, and description, and integrates a socket component.
 * @component
 * @returns {JSX.Element} The rendered Contact component.
 */
const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [messages, setMessages] = useState<any[]>([]);

  const handleSubmit = (values: {
    email: string;
    subject: string;
    description: string;
  }) => {
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        title: values.subject,
        agreed: true,
        type: values.description,
      },
    ]);
    setNotification({
      open: true,
      message: t("messageSent"),
      severity: "success",
    });
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {t("contact")}
      </Typography>
      <Formik
        initialValues={{ email: "", subject: "", description: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb={2}>
              <FormikTextField
                name="email"
                type="text"
                label={t("email")}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <FormikTextField
                name="subject"
                type="text"
                label={t("subject")}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <FormikTextField
                name="description"
                type="text"
                label={t("description")}
                multiline
                rows={4}
                fullWidth
              />
            </Box>
            <Button type="submit" color="primary" variant="contained" fullWidth>
              {t("submit")}
            </Button>
          </Form>
        )}
      </Formik>
      <Notification
        open={notification.open}
        message={notification.message}
        severity={
          notification.severity as "success" | "error" | "warning" | "info"
        }
        handleClose={handleNotificationClose}
      />
   
    </Container>
  );
};

export default Contact;
