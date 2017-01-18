import React, { PropTypes } from 'react';
import inputTypes from 'Utilities/inputTypes';
import Icon from 'Components/Icon';
import CheckInput from './CheckInput';
import PathInputConnector from './PathInputConnector';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import FormInputHelpText from './FormInputHelpText';
import styles from './FormInputGroup.css';

function getComponent(type) {
  switch (type) {
    case inputTypes.CHECK:
      return CheckInput;
    case inputTypes.SELECT:
      return SelectInput;
    case inputTypes.PATH:
      return PathInputConnector;
    default:
      return TextInput;
  }
}

function FormInputGroup(props) {
  const {
    className,
    containerClassName,
    type,
    helpText,
    pending,
    errors,
    warnings,
    ...otherProps
   } = props;

  const InputComponent = getComponent(type);
  const checkInput = type === inputTypes.CHECK;
  const hasError = !!errors.length;
  const hasWarning = !hasError && !!warnings.length;

  return (
    <div className={containerClassName}>
      <div className={className}>
        <div className={styles.inputContainer}>
          <InputComponent
            helpText={helpText}
            hasError={hasError}
            hasWarning={hasWarning}
            {...otherProps}
          />
        </div>

        {/* <div className={styles.pendingChangesContainer}>
          {
            pending &&
              <Icon
                name="icon-sonarr-unsaved-setting"
                className={styles.pendingChangesIcon}
                title="Change has not been saved yet"
              />
          }
        </div> */}
      </div>

      {
        !checkInput && helpText &&
          <FormInputHelpText
            text={helpText}
          />
      }

      {
        errors.map((error, index) => {
          return (
            <FormInputHelpText
              key={index}
              text={error}
              isError={true}
              isCheckInput={checkInput}
            />
          );
        })
      }

      {
        warnings.map((warning, index) => {
          return (
            <FormInputHelpText
              key={index}
              text={warning}
              isWarning={true}
              isCheckInput={checkInput}
            />
          );
        })
      }
    </div>
  );
}

FormInputGroup.propTypes = {
  className: PropTypes.string.isRequired,
  containerClassName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  pending: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  warnings: PropTypes.arrayOf(PropTypes.string)
};

FormInputGroup.defaultProps = {
  className: styles.inputGroup,
  containerClassName: styles.inputGroupContainer,
  type: inputTypes.TEXT,
  errors: [],
  warnings: []
};

export default FormInputGroup;
