import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { icons } from 'Helpers/Props';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import styles from './SettingsToolbar.css';

function SettingsToolbar(props) {
  const {
    advancedSettings,
    showSave,
    saving,
    hasPendingChanges,
    onSavePress,
    onAdvancedSettingsPress
  } = props;

  return (
    <PageToolbar>
      <PageToolbarSection>
        <PageToolbarButton
          className={classNames(
            styles.advancedSettings,
            advancedSettings && styles.advancedSettingsEnabled
          )}
          iconName={icons.ADVANCED_SETTINGS}
          title="Advanced Settings"
          onPress={onAdvancedSettingsPress}
        />

        {
          showSave &&
            <PageToolbarButton
              iconName={icons.SAVE}
              title="Save"
              isSpinning={saving}
              isDisabled={!hasPendingChanges}
              onPress={onSavePress}
            />
        }
      </PageToolbarSection>
    </PageToolbar>
  );
}

SettingsToolbar.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  showSave: PropTypes.bool.isRequired,
  saving: PropTypes.bool,
  hasPendingChanges: PropTypes.bool,
  onSavePress: PropTypes.func,
  onAdvancedSettingsPress: PropTypes.func.isRequired
};

SettingsToolbar.defaultProps = {
  showSave: true
};

export default SettingsToolbar;
