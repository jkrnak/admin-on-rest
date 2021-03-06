import React, { PropTypes } from 'react';
import shouldUpdate from 'recompose/shouldUpdate';
import { TableBody, TableRow } from 'material-ui/Table';
import DatagridCell from './DatagridCell';

const DatagridBody = ({ resource, children, ids, data, basePath, styles, rowStyle, options, rowOptions, ...rest }) => (
    <TableBody displayRowCheckbox={false} {...rest} {...options}>
        {ids.map((id, rowIndex) => (
            <TableRow style={rowStyle ? rowStyle(data[id], rowIndex) : styles.tr} key={id} selectable={false} {...rowOptions}>
                {React.Children.map(children, (field, index) => (
                    <DatagridCell
                        key={`${id}-${field.props.source || index}`}
                        record={data[id]}
                        defaultStyle={index === 0 ? styles.cell['td:first-child'] : styles.cell.td}
                        {...{ field, basePath, resource }}
                    />
                ))}
            </TableRow>
        ))}
    </TableBody>
);

DatagridBody.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    isLoading: PropTypes.bool,
    resource: PropTypes.string,
    data: PropTypes.object.isRequired,
    basePath: PropTypes.string,
    options: PropTypes.object,
    rowOptions: PropTypes.object,
    styles: PropTypes.object,
    rowStyle: PropTypes.func,
};

DatagridBody.defaultProps = {
    data: {},
    ids: [],
};

const PureDatagridBody = shouldUpdate((props, nextProps) => nextProps.isLoading === false)(DatagridBody);

// trick material-ui Table into thinking this is one of the child type it supports
PureDatagridBody.muiName = 'TableBody';

export default PureDatagridBody;
