import React, { Component, PropTypes } from 'react';
import formatAge from 'Utilities/Number/formatAge';
import formatBytes from 'Utilities/Number/formatBytes';
import { icons, kinds, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import SpinnerIconButton from 'Components/SpinnerIconButton';
import Label from 'Components/Label';
import Link from 'Components/Link';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import Popover from 'Components/Tooltip/Popover';
import EpisodeQuality from 'Episode/EpisodeQuality';
import ProtocolLabel from 'Activity/Queue/ProtocolLabel';
import styles from './InteractiveEpisodeSearchRow.css';

function getDownloadIcon(grabbing, grabbed, grabError) {
  if (grabbing) {
    return icons.SPINNER;
  } else if (grabbed) {
    return icons.DOWNLOADING;
  } else if (grabError) {
    return icons.DOWNLOADING;
  }

  return icons.DOWNLOAD;
}

function getDownloadTooltip(grabbing, grabbed, grabError) {
  if (grabbing) {
    return '';
  } else if (grabbed) {
    return 'Added to downloaded queue';
  } else if (grabError) {
    return grabError;
  }

  return 'Add to downloaded queue';
}

class InteractiveEpisodeSearchRow extends Component {

  //
  // Listeners

  onGrabPress = () => {
    this.props.onGrabPress(this.props.guid);
  }

  //
  // Render

  render() {
    const {
      protocol,
      age,
      ageHours,
      ageMinutes,
      title,
      infoUrl,
      indexer,
      size,
      seeders,
      leechers,
      quality,
      rejections,
      downloadAllowed,
      grabbing,
      grabbed,
      grabError
    } = this.props;

    return (
      <TableRow>
        <TableRowCell>
          <ProtocolLabel
            protocol={protocol}
          />
        </TableRowCell>

        <TableRowCell>
          {formatAge(age, ageHours, ageMinutes)}
        </TableRowCell>

        <TableRowCell className={styles.title}>
          <Link to={infoUrl}>
            {title}
          </Link>
        </TableRowCell>

        <TableRowCell>
          {indexer}
        </TableRowCell>

        <TableRowCell>
          {formatBytes(size)}
        </TableRowCell>

        <TableRowCell>
          {
            protocol === 'torrent' &&
              <Label kind={kinds.WARNING}>
                {seeders}/{leechers}
              </Label>
          }
        </TableRowCell>

        <TableRowCell className={styles.quality}>
          <EpisodeQuality
            quality={quality}
          />
        </TableRowCell>

        <TableRowCell>
          <Popover
            anchor={
              <Icon
                name={icons.DANGER}
                kind={kinds.DANGER}
              />
            }
            title="Release Rejected"
            body={
              <ul>
                {
                  rejections.map((rejection, index) => {
                    return (
                      <li key={index}>
                        {rejection}
                      </li>
                    );
                  })
                }
              </ul>
            }
            position={tooltipPositions.LEFT}
          />
        </TableRowCell>

        <TableRowCell>
          {
            downloadAllowed &&
              <SpinnerIconButton
                name={getDownloadIcon(grabbing, grabbed, grabError)}
                kind={grabError ? kinds.DANGER : kinds.DEFAULT}
                title={getDownloadTooltip(grabbing, grabbed, grabError)}
                isSpinning={grabbing}
                onPress={this.onGrabPress}
              />
          }
        </TableRowCell>
      </TableRow>
    );
  }
}

InteractiveEpisodeSearchRow.propTypes = {
  guid: PropTypes.string.isRequired,
  protocol: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  ageHours: PropTypes.number.isRequired,
  ageMinutes: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  infoUrl: PropTypes.string.isRequired,
  indexer: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  seeders: PropTypes.number,
  leechers: PropTypes.number,
  quality: PropTypes.object.isRequired,
  rejections: PropTypes.arrayOf(PropTypes.string).isRequired,
  downloadAllowed: PropTypes.bool.isRequired,
  grabbing: PropTypes.bool.isRequired,
  grabbed: PropTypes.bool.isRequired,
  grabError: PropTypes.string,
  onGrabPress: PropTypes.func.isRequired
};

InteractiveEpisodeSearchRow.defaultProps = {
  grabbing: false,
  grabbed: false
};

export default InteractiveEpisodeSearchRow;
