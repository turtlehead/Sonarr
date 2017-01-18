import React, { Component, PropTypes } from 'react';
import TableHeader from './TableHeader';
import TableHeaderCell from './TableHeaderCell';
import TableSelectAllHeaderCell from './TableSelectAllHeaderCell';

class Table extends Component {

  //
  // Render

  render() {
    const {
      className,
      selectAll,
      headers,
      children,
      onSortPress,
      ...otherProps
    } = this.props;

    return (
      <table
        className={className}
      >
        <TableHeader>
          {
            selectAll &&
              <TableSelectAllHeaderCell {...otherProps} />
          }

          {
            headers.map((header) => {
              return (
                <TableHeaderCell
                  key={header.name}
                  onSortPress={onSortPress}
                  {...header}
                >
                  {header.label}
                </TableHeaderCell>
              );
            })
          }
        </TableHeader>
        {children}
      </table>
    );
  }
}

Table.propTypes = {
  className: PropTypes.string,
  selectAll: PropTypes.bool.isRequired,
  headers: PropTypes.array,
  children: PropTypes.node,
  onSortPress: PropTypes.func
};

Table.defaultProps = {
  className: 'table table-hover',
  selectAll: false
};

export default Table;
