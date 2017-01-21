import React, { Component, PropTypes } from 'react';
import formatBytes from 'Utilities/Number/formatBytes';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import FieldSet from 'Components/FieldSet';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';

class DiskSpace extends Component {

  //
  // Render

  render() {
    const {
      fetching,
      items
    } = this.props;

    const headers = [
      {
        name: 'path',
        label: 'Location'
      },
      {
        name: 'freeSpace',
        label: 'Free Space'
      },
      {
        name: 'totalSpace',
        label: 'Total Space'
      }
    ];

    return (
      <FieldSet
        legend="Disk Space"
      >
        {
          fetching &&
            <LoadingIndicator />
        }

        {
          !fetching &&
            <Table
              headers={headers}
            >
              <TableBody>
                {
                  items.map((item) => {
                    return (
                      <TableRow key={item.path}>
                        <TableRowCell>
                          {item.path}

                          {
                            item.label &&
                              ` (${item.label})`
                          }
                        </TableRowCell>
                        <TableRowCell>{formatBytes(item.freeSpace)}</TableRowCell>
                        <TableRowCell>{formatBytes(item.totalSpace)}</TableRowCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
        }
      </FieldSet>
    );
  }

}

DiskSpace.propTypes = {
  fetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired
};

export default DiskSpace;
