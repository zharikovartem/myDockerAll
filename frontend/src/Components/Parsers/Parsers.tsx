import React from 'react'
import UniversalModal from '../../Universal/UniversalModal/UniversalModal'
import UniversalTableView from '../../Universal/UniversalTableView/UniversalTableView'
import ParserRowActions from './Actions/ParserRowActions'

type ParsersPropsType = {
    
}

const Parsers:React.FC<ParsersPropsType> = (props) => {

    return (
        <>
            <h3>Parsers</h3>
            <UniversalTableView
                fields={[
                    {label: 'Id', name: 'id'},
                    {label: 'Name', name: 'name'},
                    {label: 'Base URL', name: 'baseUrl'},
                    {label: 'Actions', component: ParserRowActions}
                ]}
                tableName="Parsers"
                objectData={{
                    fieldName: "parsers",
                    defaultParams: {
                        page: 1,
                        perPage: 15
                    }
                }}
                headActions={
                    <UniversalModal
                        fieldName='parsers'
                        title='Parsers'
                        children={'universal'}
                        fields={[
                            {
                                type: 'input',
                                name: 'name',
                                title: 'Name'
                            },
                            {
                                type: 'input',
                                name: 'baseUrl',
                                title: 'Base URL'
                            }
                        ]}
                    />
                }
            />
        </>
    )
}

export default  Parsers