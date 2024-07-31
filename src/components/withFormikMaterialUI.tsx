import React from "react";
import { Field, FieldAttributes } from "formik";
import { Select, TextField, Checkbox, RadioGroup } from "formik-material-ui";
import { MenuItem, FormGroup, FormControlLabel, Radio } from "@mui/material";

interface FormikComponentProps extends FieldAttributes<any> {
  type: string;
  label: string;
  options?: Array<{ value: string; label: string }>;
}

/**
 * Higher-order component to integrate Formik with Material-UI components.
 * @param {React.ComponentType<any>} Component - The base component to wrap.
 * @returns {React.FC<FormikComponentProps>} The wrapped component with Formik and Material-UI integration.
 */
const withFormikMaterialUI = (Component: React.ComponentType<any>): React.FC<FormikComponentProps> => {
  /**
   * FormikMaterialUIWrapper renders the appropriate Formik field based on the provided type.
   * @param {FormikComponentProps} props - The props for the component.
   * @returns {JSX.Element} The rendered Formik field.
   */
  const FormikMaterialUIWrapper: React.FC<FormikComponentProps> = ({ type, label, options, ...props }) => {
    switch (type) {
      case "text":
        return <Field component={TextField} label={label} {...props} />;
      case "checkbox":
        return (
          <FormGroup>
            <Field type="checkbox" component={Checkbox} label={label} {...props} />
          </FormGroup>
        );
      case "select":
        return (
          <Field component={Select} label={label} {...props}>
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field>
        );
      case "radio":
        return (
          <Field component={RadioGroup} {...props}>
            {options?.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </Field>
        );
      default:
        return <Component {...props} />;
    }
  };

  return FormikMaterialUIWrapper;
};

export default withFormikMaterialUI;
