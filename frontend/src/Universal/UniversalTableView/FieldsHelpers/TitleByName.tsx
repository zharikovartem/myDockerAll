import { FC } from 'react'

type TitleByNamePropsType = {
  data: any,
  name: string
}

export const TitleByName: FC<TitleByNamePropsType> = (props) => {
  return (
      <div style={{width: '100%', textAlign: 'start'}}>
        {props.data[props.name].title}
      </div>
  )
}