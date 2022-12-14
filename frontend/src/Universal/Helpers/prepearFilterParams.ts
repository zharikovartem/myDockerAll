import { PaginationParamsType } from "../UniversalTableView/UniversalTableView";

export const prepearFilterParams = (params: any, from?: any): string => {
    console.log('1) prepearFilterParams(', from,')', {...params})
    console.log('2) prepearFilterParams', !params.isActiv)
    // console.group('prepearFilterParams!!!: ', from)
    from!=='api' && console.log('prepearFilterParams', params)
    let filterParam = '';
 
    if (params.allActive) {
        delete(params.isActive)
        // delete(params.allActive)
    } else {
        params.isActive = true
    }

    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            const param = params[key as keyof PaginationParamsType];
            from!=='api' && console.log('param: ',key, '=',  param)
            if (!Array.isArray(param) && typeof param === 'object') {
                console.log('isObject!!!', key)
                for (const paramKey in param) {
                    if (Object.prototype.hasOwnProperty.call(param, paramKey)) {
                        // if ( parseInt(paramKey) !== 0) {
                        if ( parseInt(paramKey)) {
                            from!=='api' && console.log('parseInt(paramKey', parseInt(paramKey))
                            from!=='api' && console.log('1', key+'[]='+param[paramKey])
                            from!=='api' && console.log(parseInt(paramKey))
                            from!=='api' && console.log(typeof parseInt(paramKey) ===  'number')

                            filterParam = filterParam + '&'+key+'[]='+param[paramKey]
                        } else {
                            from!=='api' && console.log('2', key+'['+paramKey+']')
                            from!=='api' && console.log(parseInt(paramKey))

                            filterParam = filterParam + '&'+key+'['+paramKey+']='+param[paramKey]
                        }
                    }
                }
            } else if (Array.isArray(param)) {
                param.forEach(i => {
                    from!=='api' && console.log('3', key+'[]')
                    if (i) filterParam = filterParam + '&'+key+'[]='+i
                })
            } else {
                
                const newKey = key.replace('[0]','[]')

                from!=='api' && console.log('4', key, newKey)
                if(param) filterParam = filterParam + '&'+newKey+'='+param
            }
        }
    }

    from!=='api' && console.log('query string', filterParam)
    from!=='api' && console.groupEnd()

    return filterParam.replace('&', '?')
  }