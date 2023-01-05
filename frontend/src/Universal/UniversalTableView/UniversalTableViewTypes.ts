import { GridTypeMap } from "@mui/material"
import { UserType } from "../../Redux/authReducer"
import { AppStateType } from "../../Redux/store"
import { FieldsType, QueryParamsType } from "./UniversalTableView"

export type UniversalTableViewPropsTypeNew = {
    /**
     * Объект содержащий thunk для получения массива items
     */
    fetch: {
        function: (params?: any) => void
        action?: any
        countSelector?: (state: AppStateType) => number | undefined
        selector?: (state: AppStateType) => any[] | undefined
    }

    /**
     * Данные обьекта из Redux
     */
    objectData: ObjectDataType

    /**
     * Selector для данных items
     */
    selector: (state: AppStateType) => any

    /**
     * key нужной закладки в Tabs
     * Используется только при наличии <Tab> на странице.
     */
    tab?: string
    /**
     * key текущей закладки в Tabs
     * Используется только при наличии <Tab> на странице.
     */
    activeTab?: string
    /**
     * Описание параметров фильтрации
     * Используется только при наличии фильтра на странице.
     */
    filter?: FilterType[]
    /**
     * JSX.Element эдемент будет выводится возле названия таблицы в Header
     */
    headActions: JSX.Element
    /**
     * Названия таблицы
     */
    tableName: string
    /**
     * Описание параметров Полей таблицы
     */
    fields: FieldsType[]

    /**
     * Будут ли дублироваться параметры пагинации в query параметрах url
     */
    isQuery?: boolean
}

export type ObjectDataType = {
    fieldName: string
    reducerField?: string
    defaultParams?: QueryParamsType
    actions?: any
}

export type GridItemSettingsType = {

}

export type FilterType = {
    type: 'string' | 'number' | 'select' | 'multiSelect' | 'checkbox' | 'date' | 'sortBy'
    props: any
    gridItemSettings: {
        xs: number
    }
}

export type FilterTypeNew = StringFilterType | SelectFilterType | MultiSelectFilterType | CheckboxFilterType | NumberFilterType | DateFilterType | SortByFilterType

const test: FilterTypeNew = {
    type: 'string',
    props: {
        fullWidth: true,
        label: 'testStr',
        name: 'testStr',
    }
}

export type SortByFilterType = {
    type: 'sortBy'
}

export type DateFilterType = {
    type: 'date'
    props: {
        name: string
        label: string
        variant?: string//'outlined',
        /**
         * Отображение поля на всю ширину родителя
         */
        fullWidth: boolean
        InputLabelProps?: any
    }
}

export type NumberFilterType = {
    type: 'number'
    props: {
        name: string
        label: string
        variant?: string//'outlined',
        /**
         * Отображение поля на всю ширину родителя
         */
        fullWidth: boolean
        InputLabelProps?: any
    }
}

export type CheckboxFilterType = {
    type: 'checkbox',
    props: {
        name: string,
        label: string,
    },
    gridItemSettings: GridTypeMap
}

export type SelectFilterType = {
    type: 'select'
    props: {
        name: string,
        label: string,
        options: any,
    }
    gridItemSettings: GridTypeMap
}

export type MultiSelectFilterType = {
    type: 'multiSelect'
    props: {
        name: string,
        label: string,
        options: any,
    }
    gridItemSettings: GridTypeMap
}

export type StringFilterType = {
    type: 'string'
    props: {
        name: string
        label: string
        variant?: string//'outlined',
        /**
         * Отображение поля на всю ширину родителя
         */
        fullWidth: boolean
        InputLabelProps?: any
    }
}

// export type FieldsType = {
//     sortName?: string
//     label: string
//     name?: string
//     component?: any //React.FC<UniversalActionsPropsType> | ReactNode
//     target?: 'template' | 'fragment' | 'chain' | null
//     action?: (targetId: number, fieldName?: string, value?: any) => void
//     isPublic?: boolean
// }

export type RulesType = 'required'

export type FormFieldsType = InputFieldsType | InputNumberFieldsType | CheckboxFieldsType 
    | InnerFormFieldsType | SelectFieldsType | DependedSelectFieldsType
    | UploadFormFieldsType | TextAreaFormFieldsType | IsOwnerFormFieldsType 
    | DependedSelectWithAddFieldsType | SunEditorFormFieldsType | InputDateFieldsType

export type IsOwnerFormFieldsType = {
    type: 'isOwner'
    name: string
    title: string
    rules?: RulesType[]
    userData: UserType | undefined
}

export type SunEditorFormFieldsType = {
    type: 'SunEditor'
    name: string
    title: string
    rules?: RulesType[]
}

export type TextAreaFormFieldsType = {
    type: 'textArea'
    name: string
    title: string
    rules?: RulesType[]
}

export type UploadFormFieldsType = {
    type: 'upload'
    name: string
    title: string
    maxImageCount: number
    rules?: RulesType[]
}

export type DependedSelectWithAddFieldsType = {
    type: 'dependedSelectWithAdd'
    name: string
    title: string
    updateFieldName: string
    rules?: RulesType[]
    /**
     * Селектор для получения значений селекта
     */
    optionsSelector: (state: AppStateType) => any[] | undefined,
    /**
     * Геттер для получения значений селекта. Срабатывает при смене параметров отображения
     */
    optionsGetter: (countryId: number, queryParams: QueryParamsType) => any
    /**
     * Название поля в Reducer
     */
    parrentField: string
    /**
     * ??????????????
     */
    targetField?: string
}

export type DependedSelectFieldsType = {
    type: 'dependedSelect'
    name: string
    title: string
    rules?: RulesType[]
    /**
     * Селектор для получения значений селекта
     */
    optionsSelector: (state: AppStateType) => any[] | undefined,
    /**
     * Геттер для получения значений селекта. Срабатывает при смене параметров отображения
     */
    optionsGetter: (countryId: number, queryParams: QueryParamsType) => any
    /**
     * Название поля в Reducer
     */
    parrentField: string
    /**
     * ??????????????
     */
    targetField?: string
}

export type SelectFieldsType = {
    type: 'select'
    name: string
    title: string
    rules?: RulesType[]
    /**
     * ???????????
     */
    targetField?: string
    /**
     * Селектор для получения значений селекта
     */
    optionsSelector: (state: AppStateType) => any[] | undefined,
    /**
     * Геттер для получения значений селекта. Срабатывает при смене параметров отображения
     */
    optionsGetter: (params: any) => any
}

export type InnerFormFieldsType = {
    type: 'innerForm',
    name: string
    title: string
    objectName: string,
    fields: FormFieldsType[]
    rules?: RulesType[]
}

export type InputNumberFieldsType = {
    type: 'inputNumber'
    name: string
    title: string
    rules?: RulesType[]
}

export type CheckboxFieldsType = {
    type: 'checkbox'
    name: string
    title: string
    rules?: RulesType[]
}

export type InputFieldsType = {
    type: 'input'
    name: string
    title: string
    rules?: RulesType[]
}

export type InputDateFieldsType = {
    type: 'inputDate'
    name: string
    title: string
    rules?: RulesType[]
}