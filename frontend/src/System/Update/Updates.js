import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import * as kinds from 'Helpers/kinds';
import shortDate from 'Utilities/Date/shortDate';
import LoadingIndicator from 'Components/LoadingIndicator';
import Button from 'Components/Button';
import Icon from 'Components/Icon';
import UpdateChanges from './UpdateChanges';
import styles from './Updates.css';

class Updates extends Component {

  //
  // Render

  render() {
    const {
      fetching,
      items,
      onInstallLatestPress
    } = this.props;

    const hasUpdates = !fetching && items.length > 0;
    const noUpdates = !fetching && !items.length;
    const hasUpdateToInstall = _.some(items, { installable: true, latest: true });
    const noUpdateToInstall = hasUpdates && !hasUpdateToInstall;

    return (
      <div>
        {
          fetching &&
            <LoadingIndicator />
        }

        {
          noUpdates &&
            <div>No updates are available</div>
        }

        {
          hasUpdateToInstall &&
            <Button
              kind={kinds.PRIMARY}
              className={styles.updateAvailable}
              onPress={onInstallLatestPress}
            >
              Install Latest
            </Button>
        }

        {
          noUpdateToInstall &&
            <div className={styles.upToDate}>
              <Icon
                name="fa fa-check-circle"
                className={styles.upToDateIcon}
              />
              <div className={styles.upToDateMessage}>
                The latest version of Sonarr is already installed
              </div>
            </div>
        }

        {
          hasUpdates &&
            <div>
              {
                items.map((update) => {
                  const hasChanges = !!update.changes;

                  return (
                    <div
                      key={update.version}
                      className={styles.update}
                    >
                      <div className={styles.info}>
                        <div className={styles.version}>{update.version}</div>
                        <div className={styles.space}>&mdash;</div>
                        <div className={styles.date}>{shortDate(update.releaseDate)}</div>

                        {
                          update.branch !== 'master' &&
                            <div className={styles.branch}>{update.branch}</div>
                        }
                      </div>

                      {
                        !hasChanges &&
                          <div>Maintenance release</div>
                      }

                      {
                        hasChanges &&
                          <div className={styles.changes}>
                            <UpdateChanges
                              title="New"
                              changes={update.changes.new}
                            />

                            <UpdateChanges
                              title="Fixed"
                              changes={update.changes.fixed}
                            />
                          </div>
                      }
                    </div>
                  );
                })
              }
            </div>
        }
      </div>
    );
  }

}

Updates.propTypes = {
  fetching: PropTypes.bool,
  items: PropTypes.array,
  onInstallLatestPress: PropTypes.func.isRequired
};

export default Updates
