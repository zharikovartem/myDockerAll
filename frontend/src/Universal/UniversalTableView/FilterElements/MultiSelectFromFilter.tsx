import React, { useEffect } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'

type DataType = string[] | {
    id: number
    name?: string
    title?: string
}[] | {
    [key: string]: string | number
}

type MultiSelectFromFilterPropsType = {
    name: string
    label: string
    value?: string | number
    options: DataType
    onChangeOption: (option: any) => void
    className?: string
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const MultiSelectFromFilter: React.FC<MultiSelectFromFilterPropsType> = (props) => {
    const [personName, setPersonName] = React.useState<string[]>([])
        
    useEffect(() => {
        props.onChangeOption(personName)
    }, [personName])

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const getValuesForSelect = (data: DataType) => {
        console.log('getValuesForSelect', data)
        let mappedOptions: JSX.Element[] = []
        if (Array.isArray(data)) {
            mappedOptions = data.map((o, index) => {
                console.log('!!!!!!!!!!!', o)
                return (
                    <MenuItem value={typeof o === 'object' ? o.id : o} key={o + '-' + index}>
                        {/* {typeof o === 'object' ? o.name ? o.name : o.title : o} */}
                        {/* <Checkbox checked={ personName.includes(o.id.toString()) } /> */}
                        <ListItemText primary={ typeof o === 'object' ? o.name ? o.name : '('+o.id+')'+o.title : o} />
                    </MenuItem>
                )

            })
        } else {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    // статус NEW не должен появлятся в фильтрах
                    mappedOptions.push(
                        <MenuItem value={key} key={key}>
                            {/* {data[key as keyof DataType]} */}
                            <Checkbox checked={personName.indexOf(key) > -1} />
                            <ListItemText primary={data[key]} />
                        </MenuItem>
                    )
                }
            }
        }
        return mappedOptions
    }

    return (
        <FormControl sx={{ m: 0, width: '100%' }}>
            <InputLabel id="demo-multiple-checkbox-label">{props.label}</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label={props.label} />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                style={{width: '100%'}}
            >
                {getValuesForSelect(props.options)}
                {/* {names.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))} */}
            </Select>
        </FormControl>
    )
}

export default MultiSelectFromFilter