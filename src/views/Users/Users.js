import React from "react";
import { withFormik } from "formik";
import Yup from "yup";
import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from 'axios';


const styles = () => ({
  card: {
    maxWidth: 420,
    marginTop: 50
  },
  container: {
    display: "Flex",
    justifyContent: "center"
  },
  actions: {
    float: "right"
  }
});

const courseCategory = [
  {
    value: "webDevelopment",
    label: "Web Development"
  },
  {
    value: "networking",
    label: "Networking"
  },
  {
    value: "computerScience",
    label: "Computer Science"
  }
];

const form = props => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
          <TextField
              id="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.name ? errors.name : ""}
              error={touched.name && Boolean(errors.name)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="dateparam"
              label="Birthday"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              value={values.dateparam}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              id="emailId"
              label="Email"
              type="email"
              value={values.emailId}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.emailId ? errors.emailId : ""}
              error={touched.emailId && Boolean(errors.emailId)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="value"
              label="Value"
              type="number"
              value={values.value}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.value ? errors.value : ""}
              error={touched.value && Boolean(errors.value)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="phoneNumber"
              label="Phone Number"
              type="number"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.phoneNumber ? errors.phoneNumber : ""}
              error={touched.phoneNumber && Boolean(errors.phoneNumber)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            
            {/* <TextField
              select
              id="course"
              label="Course Category"
              value={values.course}
              onChange={handleChange("course")}
              helperText={touched.course ? errors.course : ""}
              error={touched.course && Boolean(errors.course)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              {courseCategory.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
            {/* <TextField
              id="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth */}
            {/* /> */}
            {/* <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmPassword ? errors.confirmPassword : ""}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              margin="dense"
              variant="outlined"
              fullWidth
            /> */}
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              SUBMIT
            </Button>
            <Button color="secondary" onClick={handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const Users = withFormik({
  mapPropsToValues: ({
    name,
    emailId,
    value,
    phoneNumber,
    dateparam
  }) => {
    return {
      name: name || "",
      emailId: emailId || "",
      value: value || "",
      phoneNumber: phoneNumber || "",
      dateparam: dateparam || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    value: Yup.string().required("Required"),
    emailId: Yup.string()
      .email("Enter a valid email")
      .required("Email is required")
    // password: Yup.string()
    //   .min(8, "Password must contain at least 8 characters")
    //   .required("Enter your password"),
    // confirmPassword: Yup.string()
    //   .required("Confirm your password")
    //   .oneOf([Yup.ref("password")], "Password does not match")
  }),


   handleSubmit:async (values, { setSubmitting }) => {
    console.log(values,"sdkhgsvjsb")
    await axios.request({
        method: 'post',
        url: 'http://localhost:3000/tasks/create',
        data: {values},
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(res => {
      console.log(res);
      console.log(res.data);
    })
      
    // handleReset();
    setTimeout(() => {
      // submit to the server
      
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(form);

export default withStyles(styles)(Users);
