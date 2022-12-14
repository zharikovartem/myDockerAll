import React from 'react';
import { Fade, TableCell, TableRow } from '@mui/material';
import { FieldsType, ObjectDataType, QueryParamsType } from './UniversalTableView';
import { useAppDispatch } from "../../Redux/store";
import { updateItem } from '../Redux/universalReducer';

type TableBodyPropsType = {
  items: Array<any>
  fields: Array<FieldsType>
  refreshData: () => void
  paginationParams: QueryParamsType
  // fetch?: {
  //   function: (params?: any) => void
  // }
  objectData?: ObjectDataType
};

export const TableContentBody: React.FC<TableBodyPropsType> = (props) => {

  const dispatch = useAppDispatch()

  const defaultAction = (targetId: number, fieldName?: string | undefined, value?: any) => {
    const target = { ...props.items.find(i => i.id === targetId) }
    if (fieldName) {
      target[fieldName] = value
      props.objectData && fieldName && target && dispatch(updateItem(
        props.objectData.fieldName,
        target,
        props.paginationParams
      ))
    }

  }

  console.log('TableContentBody', props)

  return (
    <>
      {props.items && Array.isArray(props.items) &&
        props.items.map((item, keyItem) => {
          return <Fade key={keyItem} in={true} timeout={500}
          >
            <TableRow>
              {props.fields.map((field, fieldKey) => {
                if (!field.component) {
                  return (
                    <TableCell key={keyItem + '-' + fieldKey}>
                      {field.name !== undefined ? item[field.name] : null}
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={keyItem + '-' + fieldKey}>
                      {
                        // @ts-ignore
                        <field.component
                          data={item}
                          name={field.name}
                          refreshData={props.refreshData}
                          target={field.target ? field.target : null}
                          paginationParams={props.paginationParams}
                          fetch={fetch}
                          action={field.action ? field.action : defaultAction}
                          isPublic={field.isPublic}
                          objectData={props.objectData}
                        />
                      }
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          </Fade>;
        })}
    </>
  );
};