import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TablePagination } from '@mui/material'
import { QueryParamsType } from './UniversalTableView'
import styled from "styled-components";
import { selectCurrentListCount } from '../Redux/universalSelector'

type TablePaginationPropsType = {
    params: QueryParamsType
    setParams: React.Dispatch<React.SetStateAction<QueryParamsType>>
    objectName: string
}

const TablePaginationComponent: React.FC<TablePaginationPropsType> = (props) => {

    const totalCount = useSelector(selectCurrentListCount(props.objectName) )

    const [paginationParams, setPaginationParams] = useState<QueryParamsType>()

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        console.log('handleChangeRowsPerPage: ', event.target.value)
        props.setParams({
            ...props.params,
            page: 1,
            perPage: parseInt(event.target.value)
        })
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        console.log('handleChangePage: ', newPage)
        props.setParams({
            ...props.params,
            page: newPage+1
        })
    }

    console.group('TablePaginationComponent')
        console.log('props: ', props)
        console.log('totalCount: ', totalCount)
    console.groupEnd()

    return (
        <>
            <TablePaginationWrapper
                rowsPerPageOptions={[5, 10, 15, 25, 50, 75, 100]}
                count={totalCount ? totalCount : 0}
                rowsPerPage={props.params.perPage}
                page={props.params.page - 1}
                SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' }
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}

export default TablePaginationComponent

const TablePaginationWrapper = styled(TablePagination)`
  p{
    margin-bottom: 0;
  }
`