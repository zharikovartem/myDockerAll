import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import React, { FC } from 'react';
import { FieldsType, QueryParamsType } from './UniversalTableView';

export type UpdatePaginationParamType = {
  name: 'direction' | 'sort' | 'perPage' | 'page'
  value: any
}

type TableItemRowPropsType = {
  fields: FieldsType[]
  paginationParams: QueryParamsType
  updatePaginationParam: (items: Array<UpdatePaginationParamType>) => void
};

export const TableItemRow: FC<TableItemRowPropsType> = ({fields, paginationParams, updatePaginationParam}) => {

  const createSortHandler = (property?: string) => {
    const isAsc = paginationParams.sort === property && paginationParams.direction === 'asc';
    const sort = isAsc ? 'desc' : 'asc';
    updatePaginationParam([
      { name: 'direction', value: sort },
      { name: 'sort', value: property }
    ]);
  };

  type directionType = "desc" | "asc" | undefined

  return (
    <TableRow>
      {
        fields.map((el, key) => {
          return (<TableCell key={key}>
            {el.sortName ? (
              <TableSortLabel
                active={paginationParams ? paginationParams.sort === el.sortName : false}
                direction={
                  paginationParams && paginationParams.sort === el.sortName && paginationParams.direction
                    ? paginationParams.direction as directionType
                    : 'asc'
                }
                onClick={() => {
                  createSortHandler(el.sortName);
                }}
              >
                {el.label}
              </TableSortLabel>
            ) : (
              el.label
            )}
          </TableCell>);
        })
      }

    </TableRow>
  );
};