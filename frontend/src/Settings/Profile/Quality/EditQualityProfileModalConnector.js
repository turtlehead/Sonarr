import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { clearPendingChanges } from 'Stores/Actions/baseActions';
import EditQualityProfileModal from './EditQualityProfileModal';

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  clearPendingChanges
};

class EditQualityProfileModalConnector extends Component {

  //
  // Listeners

  @autobind
  onModalClose() {
    this.props.clearPendingChanges({ section: 'qualityProfiles' });
    this.props.onModalClose();
  }

  //
  // Render

  render() {
    return (
      <EditQualityProfileModal
        {...this.props}
        onModalClose={this.onModalClose}
      />
    );
  }
}

EditQualityProfileModalConnector.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  clearPendingChanges: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EditQualityProfileModalConnector);
