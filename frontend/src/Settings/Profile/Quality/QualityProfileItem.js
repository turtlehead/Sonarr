import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import classNames from 'classNames';
import Icon from 'Components/Icon';
import CheckInput from 'Components/Form/CheckInput';
import styles from './QualityProfileItem.css';

class QualityProfileItem extends Component {

  //
  // Listeners

  @autobind
  onAllowedChange({ value }) {
    const {
      qualityId,
      onQualityProfileItemAllowedChange
    } = this.props;

    onQualityProfileItemAllowedChange(qualityId, value);
  }

  //
  // Render

  render() {
    const {
      advancedSettings,
      name,
      allowed,
      isDragging,
      connectDragSource
    } = this.props;

    return (
      <div
        className={classNames(
          styles.qualityProfileItem,
          isDragging && styles.isDragging,
        )}
      >
        <CheckInput
          containerClassName={styles.checkContainer}
          name={name}
          value={allowed}
          onChange={this.onAllowedChange}
        />
        <label
          className={styles.qualityName}
          htmlFor={name}
        >
          {name}
        </label>

        {
          advancedSettings &&
            connectDragSource(
              <div className={styles.dragHandle}>
                <Icon
                  className={styles.dragIcon}
                  name="icon-sonarr-reorder"
                />
              </div>
            )
        }
      </div>
    );
  }
}

QualityProfileItem.propTypes = {
  advancedSettings: PropTypes.bool,
  qualityId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  allowed: PropTypes.bool.isRequired,
  sortIndex: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func,
  onQualityProfileItemAllowedChange: PropTypes.func
};

QualityProfileItem.defaultProps = {
  // The drag preview will not connect the drag handle.
  connectDragSource: (node) => node
};

export default QualityProfileItem;
